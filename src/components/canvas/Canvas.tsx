import { useRef, useEffect, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import hljs from "highlight.js";
import CodeModal from "./CodeModal";
import html2canvas from "html2canvas";

import "highlight.js/styles/atom-one-dark.css";

// import languageJavascript from "highlight.js/lib/languages/javascript";

function createElement(
	id: string,
	type: string,
	x1: number,
	y1: number,
	x2: number,
	y2: number
) {
	let element: Konva.Shape;
	switch (type) {
		case "rectangle":
			element = new Konva.Rect({
				x: x1,
				y: y1,
				width: 0,
				height: 0,
				id: id,
				fill: "red",
				draggable: false,
			});
			break;
		case "line":
			element = new Konva.Line({
				points: [x1, y1, x2, y2],
				id: id,
				stroke: "black",
				strokeWidth: 10,
				draggable: true,
			});
			break;
		case "arrow":
			element = new Konva.Line({
				id: id,
				points: [x1, y1, x2, y2],
				pointerLength: 20,
				pointerWidth: 20,
				fill: "black",
				stroke: "black",
				strokeWidth: 2,
				draggable: true,
			});
			break;
		case "text":
			element = new Konva.Text({
				x: x1,
				y: y1,
				text: "Text",
				id: id,
				fontSize: 20,
				fontFamily: "Calibri",
				draggable: true,
				fill: "black",
			});
			break;
		case "codeblock":
			// return createCodeBlock();
			break;
		default:
			return;
	}
	return {
		id,
		type,
		element,
		x1,
		y1,
	};
}

const Canvas = () => {
	const [elements, setElements] = useState([]);
	const [selectedElement, selectElement] = useState(null);
	const [drawingElement, setDrawingElement] = useState(null);
	const [action, setAction] = useState("none");
	const [tool, setTool] = useState("selection");
	// const stageRef = useRef<Konva.Stage>();
	const layerRef = useRef<Konva.Layer>();
	const transformerRef = useRef<Konva.Transformer>();
	const transformer = new Konva.Transformer();
    const [modalVisible, setModalVisible] = useState(false);
    const [code, setCode] = useState("");
	layerRef.current?.add(transformer);

	useEffect(() => {
		let element = createCodeBlock();
		transformer.nodes([element.element]);
		setElements([...elements, element]);
		layerRef.current?.add(element.element).batchDraw();
	}, []);

	// Handle keyboard shortcuts
	useEffect(() => {
		const keyHandler = (event) => {
			switch (event.key) {
				case "s":
				case "1":
					setTool("selection");
					break;
				case "l":
				case "2":
					setTool("line");
					break;
				case "r":
				case "3":
					setTool("rectangle");
					break;
				case "t":
				case "4":
					setTool("text");
					break;
				case "p":
				case "5":
					setTool("pen");
					break;
				case "6":
					setTool("arrow");
					break;
				case "7":
					setTool("codeblock");
					break;
				case "z":
					if (event.metaKey || event.ctrlKey) {
						// undo();
					}
					break;
				case "Z":
					if (event.metaKey || (event.ctrlKey && event.shiftKey)) {
						// redo();
					}
					break;
				// The below cases are for testing purposes
				case "Delete":
                case "Backspace":
                    if (selectedElement === null || selectElement === undefined) break;        
                    console.log("delete");
                    let element = selectedElement?.element;
                    element.destroy();
                    transformerRef.current?.detach();
                    selectElement(null);
                    // element.remove();
                    layerRef.current?.batchDraw();
					break;
				default:
					break;
			}
		};

		document.addEventListener("keydown", keyHandler);
		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
	}, []);

	useEffect(() => {
		if (selectedElement) {
			transformerRef.current.nodes([selectedElement.element]);
			transformerRef.current.getLayer().batchDraw();
		}
	}, [selectedElement]);

	const handleMouseDown = (e: any) => {
		let pos = e.target.getStage().getPointerPosition();
		let clientX = pos.x;
		let clientY = pos.y;
		if (tool === "selection") {
			// deselect when clicked on empty area
			let clickedElement: Konva.Shape;
			const clickedOnEmpty = e.target === e.target.getStage();
			if (clickedOnEmpty) {
				selectElement(null);
			} else {
				clickedElement = e.target;
				// find clickedElement in elements
				const index = elements.findIndex(
					(e) => e.element === clickedElement
				);
				if (index === -1) return;
				let offsetX = clientX - elements[index].x1;
				let offsetY = clientY - elements[index].y1;
				selectElement({ ...elements[index], offsetX, offsetY });
				selectedElement?.element.draggable(true);
				setAction("moving");
			}
		} else {
			let element = createElement(
				elements.length.toString(),
				tool,
				clientX,
				clientY,
				clientX,
				clientY
			);
			setElements([...elements, element]);
			setAction("drawing");
			setDrawingElement(element);
			layerRef.current?.add(element.element).batchDraw();
			// transformer.nodes([element.element]);
		}
	};

	const handleMouseUp = (/* e: any */) => {
		if (action === "drawing") {
			selectElement(drawingElement);
		}
		setAction("none");
		setTool("selection");
		setDrawingElement(null);
		layerRef.current?.batchDraw();
	};

	const handleMouseMove = (e: any) => {
		let pos = e.target.getStage().getPointerPosition();
		let clientY = pos.y;
		let clientX = pos.x;
		if (action === "drawing") {
			if (tool === "rectangle") {
				const newWidth = pos.x - drawingElement.x1;
				const newHeight = pos.y - drawingElement.y1;
				drawingElement.element.width(newWidth).height(newHeight);
			} else if (tool === "line") {
				drawingElement.element.points([
					drawingElement.x1,
					drawingElement.y1,
					clientX,
					clientY,
				]);
			}
			layerRef.current?.batchDraw();
		} else if (action === "moving") {
			if (selectedElement.type === "line") {
				selectedElement.x1 = selectedElement.element.x();
				selectedElement.y1 = selectedElement.element.y();
			}
			let dx =
				clientX - selectedElement.offsetX - selectedElement.element.x();
			let dy =
				clientY - selectedElement.offsetY - selectedElement.element.y();
			selectedElement.element.move(dx, dy);
			selectedElement.x1 = selectedElement.element.x();
			selectedElement.y1 = selectedElement.element.y();

			// update the element in elements
			updateElement(selectedElement);
			layerRef.current?.batchDraw();
		}
	};

	const updateElement = (element) => {
		const index = elements.findIndex((e) => e.id === element.id);
		if (index === -1) return;
		elements[index] = element;
		setElements([...elements]);
	};

    function createCodeBlock() {
		let codeBlockGroup = new Konva.Group();
		let box = new Konva.Rect({
			x: 320,
			y: 180,
			width: 640,
			height: 360,
			fill: "#282c34",
			strokeWidth: 4,
			cornerRadius: [25, 25, 20, 20],
		});
		codeBlockGroup.add(box);
		box = new Konva.Rect({
			x: 320,
			y: 180,
			width: 640,
			height: 56,
			fill: "#353840",
			strokeWidth: 4,
			cornerRadius: [20, 20, 0, 0],
		});
		codeBlockGroup.add(box);
		let circle = new Konva.Circle({
			x: 320 + 33,
			y: 180 + 28,
			radius: 10,
			fill: "#ff5f56",
			strokeWidth: 4,
		});
		codeBlockGroup.add(circle);
		circle = new Konva.Circle({
			x: 320 + 66,
			y: 180 + 28,
			radius: 10,
			fill: "#ffbd2e",
			strokeWidth: 4,
		});
		codeBlockGroup.add(circle);
		circle = new Konva.Circle({
			x: 320 + 96,
			y: 180 + 28,
			radius: 10,
			fill: "#27c93f",
			strokeWidth: 4,
		});
        let text = new Konva.Text({
            x: 335,
            y: 255,
            text: "// double click to edit",
            fontSize: 20,
            draggable: false,
            fill: "gray",
            zIndex: -10,
        });
        codeBlockGroup.add(text);
		codeBlockGroup.add(circle);
        var imageObj = new Image();
        imageObj.onload = function () {
            var textBlockImage = new Konva.Image({
                x: 330,
                y: 240,
                image: imageObj,
                // width: 630,
                // height: 270,
            });
            codeBlockGroup.add(textBlockImage);
        };
        // This is needed because you can't have an image without a source for some reason
        imageObj.src = "https://raw.githubusercontent.com/nikapadia/SuperSnippets/main/src/assets/dot.png";

        codeBlockGroup.on("dblclick", () => {
            setModalVisible(true);
            selectElement(null);
        });

		codeBlockGroup.draggable(false);
		return {
			id: "0",
			type: "codeblock",
			element: codeBlockGroup,
			x1: 320,
			y1: 180,
		};
	}

    const closeCodeModal = (modalCode: string) => {
        setModalVisible(false);
        if (modalCode === null || modalCode === "") {
            let codeBlock = elements[0];
            codeBlock.element.find("Image")[0].image(null);
            if (codeBlock.element.find("Text")[0] === undefined) {
                let text = new Konva.Text({
                    x: 335,
                    y: 255,
                    text: "// double click to edit",
                    fontSize: 20,
                    draggable: false,
                    fill: "gray",
                    zIndex: -10,
                });
                elements[0].element.add(text);
            }
            return;
        };
        setCode(modalCode);
        const highlightedCode = hljs.highlight(modalCode, { language: "python" }).value;
        const offScreenDiv = document.createElement("div");
        offScreenDiv.innerHTML = `<pre><code>${highlightedCode}</code></pre>`;
        offScreenDiv.style.fontSize = "18px";
        offScreenDiv.style.lineHeight = "1.2";
        document.body.appendChild(offScreenDiv);

        html2canvas(offScreenDiv, {backgroundColor: null, height: 360, width: 640, x: -10, scale: 1}).then((canvas) => {
            let dataURL = canvas.toDataURL("image/svg", 1);
            let img = new Image();
            img.src = dataURL;
            img.onload = () => {
                let codeBlock = elements[0];
                codeBlock.element.find("Image")[0].image(img);
                codeBlock.element.find("Text")[0].destroy(); // remove the "double click to edit" text
                layerRef.current?.batchDraw();
            };
        });
        document.body.removeChild(offScreenDiv);
        setAction("none");
        setTool("selection");
    }

	return (
		<div style={{ backgroundColor: "#fff", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            {modalVisible && <CodeModal closeModal={closeCodeModal} initialText={code} />}
            <div>
                <Stage
                    width={1280}
                    height={720}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchEnd={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleMouseMove}
                >
                    <Layer ref={layerRef}>
                        {selectedElement && (
                            <Transformer
                                ref={transformerRef}
                                boundBoxFunc={(oldBox, newBox) => {
                                    // limit resize
                                    if (newBox.width < 5 || newBox.height < 5) {
                                        return oldBox;
                                    }
                                    return newBox;
                                }}
                            />
                        )}
                    </Layer>
                </Stage>
            </div>
		</div>
	);
};

export default Canvas;
