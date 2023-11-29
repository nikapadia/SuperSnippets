import { useRef, useEffect, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import hljs from "highlight.js";

import CodeModal from "./CodeModal";

import "highlight.js/styles/atom-one-dark.css";

import languageJavascript from "highlight.js/lib/languages/javascript";

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
				strokeWidth: 4,
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
			console.log("Unknown type");
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

	// draw a box with half the dimensions as the stage whenever the page
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
				case "8":
					if (selectedElement && selectedElement.type === "line") {
						selectedElement.element.strokeWidth(
							selectedElement.element.strokeWidth() + 1
						);
						layerRef.current?.batchDraw();
					}
					break;
				case "9":
					if (selectedElement) {
						console.log("delete");
						const index = elements.findIndex(
							(e) => e.element === selectedElement.element
						);
						if (index === -1) return;
						selectedElement.element.remove();
						elements.splice(index, 1);
						setElements([...elements]);
						selectElement(null);
						layerRef.current?.batchDraw();
						transformer.nodes([]);
						transformerRef.current.getLayer().batchDraw();
					}
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
		} else {
			console.log("no selected element");
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
				selectedElement.element.draggable(true);
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
			transformer.nodes([element.element]);
		}
	};

	const handleMouseUp = (e: any) => {
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
			fill: "#22272e",
			strokeWidth: 4,
			cornerRadius: [25, 25, 20, 20],
		});
		codeBlockGroup.add(box);
		box = new Konva.Rect({
			x: 320,
			y: 180,
			width: 640,
			height: 76,
			fill: "#282c34",
			strokeWidth: 4,
			cornerRadius: [20, 20, 0, 0],
		});
		codeBlockGroup.add(box);
		let circle = new Konva.Circle({
			x: 320 + 33,
			y: 180 + 38,
			radius: 10,
			fill: "#ff5f56",
			strokeWidth: 4,
		});
		codeBlockGroup.add(circle);
		circle = new Konva.Circle({
			x: 320 + 66,
			y: 180 + 38,
			radius: 10,
			fill: "#ffbd2e",
			strokeWidth: 4,
		});
		codeBlockGroup.add(circle);
		circle = new Konva.Circle({
			x: 320 + 96,
			y: 180 + 38,
			radius: 10,
			fill: "#27c93f",
			strokeWidth: 4,
		});
		codeBlockGroup.add(circle);
		let text = new Konva.Text({
			x: 350,
			y: 280,
			text: "// double click to edit code",
			fontSize: 20,
			draggable: false,
			fill: "gray",
		});
		codeBlockGroup.add(text);

        codeBlockGroup.on("dblclick", () => {
            console.log("double click");
            setModalVisible(true);
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

    const closeCodeModal = (modalCode = "") => {
        setModalVisible(false);
        console.log(modalCode);
        setCode(modalCode);
        console.log("code: " + code);
    }

	return (
		<div style={{ backgroundColor: "#fff" }}>
            {modalVisible && <CodeModal closeModal={closeCodeModal} />}
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
