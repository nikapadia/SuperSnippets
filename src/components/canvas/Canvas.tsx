import { useRef, useEffect, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";
import hljs from "highlight.js";

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
			return createCodeBlock(id, x1, y1);
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

function createCodeBlock(id: string, x1: number, y1: number) {
	// let element: Konva.Shape = new Konva.Rect({
	// 	x: x1,
	// 	y: y1,
	// 	width: 356,
	// 	height: 256,
	// 	id: id,
	// 	fill: "red",
	// 	draggable: false,
	// 	sceneFunc: function (context, shape) {
	// 		context.beginPath();
	// 		// don't need to set position of rect, Konva will handle it
	//         // make a rounded rect
	//         const radius = 10;
	//         const x = shape.getAttr("x");
	//         const y = shape.getAttr("y");
	//         const width = shape.getAttr("width");
	//         const height = shape.getAttr("height");
	//         context.moveTo(x + radius, y);
	//         context.lineTo(x + width - radius, y);
	//         context.quadraticCurveTo(x + width, y, x + width, y + radius);
	//         context.lineTo(x + width, y + height - radius);
	//         context.quadraticCurveTo(
	//             x + width,
	//             y + height,
	//             x + width - radius,
	//             y + height
	//         );
	//         context.lineTo(x + radius, y + height);
	//         context.quadraticCurveTo(x, y + height, x, y + height - radius);
	//         context.lineTo(x, y + radius);
	//         context.quadraticCurveTo(x, y, x + radius, y);
	//         context.closePath();
	//         context.strokeStyle = "black";
	//         context.lineWidth = 2;
	//         context.stroke();

	// 		// context.rect(0, 0, shape.getAttr("width"), shape.getAttr("height"));
	// 		// (!) Konva specific method, it is very important
	// 		// it will apply are required styles
	// 		context.fillStrokeShape(shape);
	// 	},
	// });
	// return {
	// 	id,
	// 	type: "codeblock",
	// 	element,
	// 	x1,
	// 	y1,
	// };
	const text = new Konva.Text({
        x: x1,
        y: y1,
        text: 'function helloWorld() {\n  console.log("Hello, world!");\n}',
        fontSize: 18,
        draggable: true,
      });
    
      // Make the text editable on double click
      text.on('dblclick', () => {
        // Create a textarea over the text
        const textarea = document.createElement('textarea');
        document.body.appendChild(textarea);
    
        // Style the textarea
        textarea.value = text.text();
        textarea.style.position = 'absolute';
        textarea.style.top = `${text.absolutePosition().y}px`;
        textarea.style.left = `${text.absolutePosition().x}px`;
        textarea.style.width = `${text.width() - text.padding() * 2}px`;
        textarea.style.height = `${text.height() - text.padding() * 2}px`;
        textarea.style.fontSize = `${text.fontSize()}px`;
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
    
        textarea.focus();
    
        // When the textarea loses focus, remove it and update the text
        // textarea.addEventListener('blur', () => {
        //   text.text(hljs.highlightAuto(textarea.value).value);
        //   layerRef.current.batchDraw();
        //   document.body.removeChild(textarea);
        // });
      });
    
    return {
        id,
        type: "codeblock",
        element: text,
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
	layerRef.current?.add(transformer);

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

	return (
		<div style={{ backgroundColor: "#fff" }}>
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
				</Layer>
			</Stage>
		</div>
	);
};

export default Canvas;
