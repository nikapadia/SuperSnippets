import { useRef, useEffect, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import Konva from "konva";

function createElement(id: string, type: string, x1: number, y1: number, x2: number, y2: number) {
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
                draggable: true,
            });
            break;
        case "line":
            element = new Konva.Line({
                points: [x1, y1, x2, y2],
                id: id,
            });
            break;
        case "circle":
            element = new Konva.Circle({
                x: x1,
                y: y1,
                radius: Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2),
                id: id,
            });
            break;
        default:
            throw new Error("Unknow type");
    }
    return {
        id, element, type, x1, y1, x2, y2
    };
}

const createRectangle = (id, x1, y1, x2, y2) => {
	const shapeRef = useRef();
	const transformerRef = useRef<Konva.Transformer>();

    const transformer = new Konva.Transformer({
        nodes: [shapeRef.current],
        enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
        // set minimum width of text
        boundBoxFunc: (oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
        },
    });

    const shape = new Konva.Rect({
        x: x1,
        y: y1,
        width: 0,
        height: 0,
        id: id,
        stroke: "black",
        strokeWidth: 1,
        fill: "red",
        draggable: true,
    });

    return {
        shape, transformer
    };

	// useEffect(() => {
	// 	if (isSelected && transformerRef.current) {
	// 		// we need to attach transformer manually
	// 		transformerRef.current.nodes([shapeRef.current]);
	// 		transformerRef.current.getLayer().batchDraw();
	// 	}
	// }, [isSelected]);

    // let rect = new Konva.Rect({
    //     x: 10,
    //     y: 10,
    //     width: 100,
    //     height: 100,
    //     fill: "red",
    //     id: "1",
    // });

	// return
	// 		<Rect
	// 			onClick={onSelect}
	// 			onTap={onSelect}
	// 			ref={shapeRef}
	// 			{...shapeProps}
	// 			draggable={isSelected}
	// 			onDragEnd={(e) => {
	// 				onChange({
	// 					...shapeProps,
	// 					x: e.target.x(),
	// 					y: e.target.y(),
	// 				});
	// 			}}
	// 			onTransformEnd={() => {
	// 				const node = shapeRef.current as Konva.Node;
	// 				if (node) {
	// 					const scaleX = node.scaleX();
	// 					const scaleY = node.scaleY();

	// 					// we will reset it back
	// 					node.scaleX(1);
	// 					node.scaleY(1);
	// 					onChange({
	// 						...shapeProps,
	// 						x: node.x(),
	// 						y: node.y(),
	// 						// set minimal value
	// 						width: Math.max(5, node.width() * scaleX),
	// 						height: Math.max(node.height() * scaleY),
	// 					});
	// 				}
	// 			}}
	// 		/>
	// 		{isSelected && (
	// 			<Transformer
	// 				ref={transformerRef}
	// 				boundBoxFunc={(oldBox, newBox) => {
	// 					// limit resize
	// 					if (newBox.width < 5 || newBox.height < 5) {
	// 						return oldBox;
	// 					}
	// 					return newBox;
	// 				}}
	// 			/>
	// 		)}
	// 	</Fragment>
	
};

// const initialShapes = [
// 	{
//         type: "rectangle",
// 		x: 10,
// 		y: 10,
// 		width: 100,
// 		height: 100,
// 		fill: "red",
// 		id: "1",
// 	},
// 	{
//         type: "rectangle",
// 		x: 150,
// 		y: 150,
// 		width: 100,
// 		height: 100,
// 		fill: "green",
// 		id: "2",
// 	},
// ];


const Canvas = () => {
	const [elements, setElements] = useState([]);
	const [selectedElement, selectElement] = useState(null);
    const [drawingElement, setDrawingElement] = useState(null);
    const [action, setAction] = useState("none");
    const [tool, setTool] = useState("selection");
    const layerRef = useRef<Konva.Layer>();
    const stageRef = useRef<Konva.Stage>();
    const transformerRef = useRef<Konva.Transformer>();
    const transformer = new Konva.Transformer();
    layerRef.current?.add(transformer);

    // Handle keyboard shortcuts
    useEffect(() => {
        const keyHandler = event => {
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
                case "z":
                    if (event.metaKey || event.ctrlKey) {
                        // undo();
                    }
                    break;
                case "Z":
                    if (event.metaKey || event.ctrlKey && event.shiftKey) {
                        // redo();
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
            transformerRef.current.nodes([selectedElement]);
            transformerRef.current.getLayer().batchDraw();
        }
    }, [selectedElement]);

	const handleMouseDown = (e: any) => {
        const pos = e.target.getStage().getPointerPosition();
        const clientX = pos.x;
        const clientY = pos.y;
        if (tool === "selection") {
            // deselect when clicked on empty area
            const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) {
                selectElement(null);
            } else {
                const clickedElement = e.target;
                selectElement(clickedElement);
            }
            setAction("moving");
        } else if (tool === "rectangle") {
            let element = createElement(elements.length.toString(), "rectangle", clientX, clientY, clientX, clientY);
            setElements([...elements, element]);
            setAction("drawing");
            setDrawingElement(element);
            layerRef.current?.add(element.element).batchDraw();
            transformer.nodes([element.element]);
        } else {
            console.log("tool not implemented");
            return;
        }
	};

    const handleMouseUp = (e: any) => {
        setAction("none");
        setTool("selection");
    }

    const handleMouseMove = (e: any) => {
        if (action !== "drawing") return;

        if (action === "drawing") {
            const pos = e.target.getStage().getPointerPosition();
            if (tool === "rectangle") {
                const newWidth = pos.x - drawingElement.x1;
                const newHeight = pos.y - drawingElement.y1;
                console.log(drawingElement, newWidth, newHeight);
                drawingElement.element.width(newWidth).height(newHeight);
            }
            layerRef.current?.batchDraw();
        } else if (action === "moving") {
            const pos = e.target.getStage().getPointerPosition();
            const clientX = pos.x;
            const clientY = pos.y;
            const dx = clientX - drawingElement.x1;
            const dy = clientY - drawingElement.y1;
            drawingElement.element.x(drawingElement.x1 + dx).y(drawingElement.y1 + dy);
            layerRef.current?.batchDraw();
        }
    }

    const updateElement = (element) => {
        const index = elements.findIndex(e => e.id === element.id);
        if (index === -1) return;
        elements[index] = element;
        setElements([...elements]);
    }

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
