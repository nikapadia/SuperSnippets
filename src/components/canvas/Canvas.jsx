import React, { useLayoutEffect, useState, useRef } from "react";
import rough from "roughjs/bundled/rough.esm";
import { getStroke } from "perfect-freehand";

import "./canvas.css"
import { useEffect } from "react";

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
    let roughElement = null;
    switch (type) {
        case "line":
            roughElement = generator.line(x1, y1, x2, y2, { roughness: 0 });
            break;
        case "rectangle":
            roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, { roughness: 0 });
            break;
        case "pen":
            return {id, type, points: [{x: x1, y: y1}]};
        case "text":
            return {id, type, x1, y1, text: ""};
        default:
            throw new Error(`Invalid element type: ${type}`);
    }
    return {
        id,
        roughElement,
        type,
        x1,
        y1,
        x2,
        y2,
    };
}

const nearPoint = (x, y, x1, y1, name) => {
    return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
}

const onLine = (x, y, x1, y1, x2, y2) => {
    const a = {x: x1, y: y1};
    const b = {x: x2, y: y2};
    const c = {x, y};
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    return Math.abs(offset) < 1 ? "inside" : null;
};

const positionWithinElement = (x, y, element) => {
    const {type, x1, x2, y1, y2} = element;
    switch(type) {
        case "line":
            const on = onLine(x, y, x1, y1, x2, y2);
            const start = nearPoint(x, y, x1, y1, "start");
            const end = nearPoint(x, y, x2, y2, "end");
            return start || end || on;
        case "rectangle":
            const topLeft = nearPoint(x, y, x1, y1, "tl");
            const topRight = nearPoint(x, y, x2, y1, "tr");
            const bottomLeft = nearPoint(x, y, x1, y2, "bl");
            const bottomRight = nearPoint(x, y, x2, y2, "br");
            const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
            return topLeft || topRight || bottomLeft || bottomRight || inside;
        case "pen":
            const betweenAnyPoint = element.points.some((point, index) => {
                const nextPoint = element.points[index + 1];
                if (nextPoint) {
                    return onLine(x, y, point.x, point.y, nextPoint.x, nextPoint.y);
                }
                return false;
            });
        case "text":
            return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
        default:
            throw new Error(`Invalid element type: ${type}`);
    }
};

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
    return elements
        .map(element => ({...element, position: positionWithinElement(x, y, element)}))
        .find(element => element.position !== null);
};

// Makes sure that x1, x2, y1, y2 are in the correct order, 
// regardless of which direction the user drew the rectangle
const adjustElementCoordinates = (element) => { 
    const {type, x1, x2, y1, y2} = element;
    if (type === "rectangle") {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return {x1: minX, x2: maxX, y1: minY, y2: maxY};
    } else {
        if (x1 < x2 || (x1 === x2 && y1 < y2)) {
            return {x1, x2, y1, y2};
        } else {
            return {x1: x2, x2: x1, y1: y2, y2: y1};
        }
    }
};

// Returns the cursor type for a given position, used when hovering over an element
const cusorForPosition = position => {
    switch (position) {
        case "tl":
        case "br":
        case "start":
        case "end":
            return "nwse-resize";
        case "tr":
        case "bl":
            return "nesw-resize";
        default:
            return "move";
    }
};

// Returns the new coordinates for the element being resized
const resizedCoordinates = (clientX, clientY, position, coordiates) => {
    const {x1, x2, y1, y2} = coordiates;
    switch (position) {
        case "tl":
        case "start":
            return {x1: clientX, y1: clientY, x2, y2};
        case "tr":
            return {x1, y1: clientY, x2: clientX, y2};
        case "bl":
            return {x1: clientX, y1, x2, y2: clientY};
        case "br":
        case "end":
            return {x1, y1, x2: clientX, y2: clientY};
        default:
            return null;
    }
}

const useHistory = (initialState) => {
    const [index, setIndex] = useState(0); // index of current state 
    const [history, setHistory] = useState([initialState]); // array of states

    const setState = (action, overwrite = false) => {
        const newState = typeof action === "function" ? action(history[index]) : action;
        if (overwrite) {
            const historyCopy = [...history];
            historyCopy[index] = newState;
            setHistory(historyCopy);
        } else {
            const updatedState = [...history].slice(0, index + 1);
            setHistory([...updatedState, newState]);
            setIndex(prevIndex => prevIndex + 1);
        }
    };

    const undo = () => index > 0 && setIndex(prevIndex => prevIndex - 1);
    const redo = () => index < history.length - 1 && setIndex(prevIndex => prevIndex + 1);
    const clear = () => { setHistory([initialState]); setIndex(0); }; 
    
    return [history[index], setState, undo, redo, clear];
}

const getSvgPathFromStroke = stroke => {
    if (!stroke.length) return "";
  
    const d = stroke.reduce(
      (acc, [x0, y0], i, arr) => {
        const [x1, y1] = arr[(i + 1) % arr.length];
        acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
        return acc;
      },
      ["M", ...stroke[0], "Q"]
    );
  
    d.push("Z");
    return d.join(" ");
  };


const drawElement = (roughCanvas, context, element) => {
    switch (element.type) {
        case "line":
            roughCanvas.draw(element.roughElement);
            break;
        case "rectangle":
            roughCanvas.draw(element.roughElement);
            break;
        case "pen":
            const stroke = getSvgPathFromStroke(getStroke(element.points, {
                size: 24,
                thinning: 0.7,
                smoothing: 0.5,
                streamline: 0.5,
                easing: (t) => t * t,
                simulatePressure: false,
            }));
            context.fill(new Path2D(stroke));
            break;
        case "text":
            context.textBaseline = "top";
            context.font = "48px serif";
            context.fillText(element.text, element.x1, element.y1);
            break;
        default:
            throw new Error(`Invalid element type: ${element.type}`);
    }
}

const adjustmentRequired = type => type === ["line", "rectangle"].includes(type);

const Canvas = () => {
	const [elements, setElements, undo, redo, clear] = useHistory([]);
	const [action, setAction] = useState("none");
    const [tool, setTool] = useState("line");
    const [selectedElement, setSelectedElement] = useState(null);
    const textAreaRef = useRef();
    
	useLayoutEffect(() => {
		const canvas = document.getElementById("canvas");
		const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        const roughCanvas = rough.canvas(canvas);

        elements.forEach(element => drawElement(roughCanvas, context, element));
	}, [elements]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const keyHandler = event => {
            switch (event.key) {
                case "v":
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
                        undo();
                    }
                    break;
                case "Z":
                    if (event.metaKey || event.ctrlKey && event.shiftKey) {
                        redo();
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
	}, [undo, redo]);

    // Handle text input
    useEffect(() => {
        const textArea = textAreaRef.current;
        if (action === "writing")
            textArea.focus();
    }, [action, selectedElement]);

    const updateElement = (id, x1, y1, x2, y2, type, options) => {
		const elementsCopy = [...elements];

		switch (type) {
			case "line":
			case "rectangle":
				elementsCopy[id] = createElement(id, x1, y1, x2, y2, type);
                break;
			case "pen":
                elementsCopy[id].points = [...elementsCopy[id].points, {x: x2, y: y2}];
                break;
            case "text":
                elementsCopy[id].text = options.text;
                break;
            default:
				throw new Error(`Invalid element type: ${type}`);
        }
        setElements(elementsCopy, true);
	};

	const handleMouseDown = (event) => {
        if (action === "writing") return;


        const { clientX, clientY } = event;
        if (tool === "selection") {
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                if (element.type === "pen") {
                    const xOffsets = element.points.map(point => clientX - point.x);
                    const yOffsets = element.points.map(point => clientY - point.y);
                    setSelectedElement({...element, xOffsets, yOffsets});
                } else {
                    const offsetX = clientX - element.x1; 
                    const offsetY = clientY - element.y1; 
                    setSelectedElement({...element, offsetX, offsetY});
                }
                setElements(prevState => prevState);

                if (element.position === "inside") {
                    setAction("moving");
                } else {
                    setAction("resizing");
                }
            }
        } else {
            const id = elements.length;
            const element = createElement(id, clientX,clientY,clientX,clientY, tool);
            setElements(prevState => [...prevState, element]);
            setSelectedElement(element);
            setAction(tool === "text" ? "writing" : "drawing");          
        }
    };
    
	const handleMouseUp = (event) => {
        if (selectedElement) {
            const index = selectedElement.id;
            const {id, type} = elements[index];
            if ((action === "drawing" || action === "resizing") && adjustmentRequired(type)) {
                const {x1, x2, y1, y2} = adjustElementCoordinates(elements[index]);
                updateElement(id, x1, y1, x2, y2, type);
            }
        }

        if (action === "writing") return;


        setAction("none");
        setSelectedElement(null);
    };

	const handleMouseMove = (event) => {
        const { clientX, clientY } = event;

        if (tool === "selection") {
            const element = getElementAtPosition(clientX, clientY, elements);
            event.target.style.cursor = element ? cusorForPosition(element.position) : "default";
        }

        if (action === "drawing") {
            const index = elements.length - 1;
            const {x1, y1} = elements[index];
            updateElement(index, x1, y1, clientX, clientY, tool);
        } else if (action === "moving") {
            if (selectedElement.type === "pen") {
                const newPoints = selectedElement.points.map(_, index => ({
                    x: clientX - selectedElement.xOffsets[index],
                    y: clientY - selectedElement.yOffsets[index],
                }));
                const elementsCopy = [...elements];
                elementsCopy[selectedElement.id].points = newPoints;
                setElements(elementsCopy, true);
            } else {
                const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
                const width = x2 - x1;
                const height = y2 - y1;
                const newX1 = clientX - offsetX;
                const newY1 = clientY - offsetY;
                updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
            }
        } else if (action === "resizing") {
            const { id, type, position, ...coordiates } = selectedElement;
            const {x1, y1, x2, y2} = resizedCoordinates(clientX, clientY, position, coordiates);
            updateElement(id, x1, y1, x2, y2, type);
        }

    };

    const handleBlur = event => {
        const {id, x1, y1, type} = selectedElement;
        setAction("none");
        setSelectedElement(null);
        updateElement(id, x1, y1, null, null, type, {text: event.target.value});
    }

	return (
        <div>
            <div className="toolList" style={{position: "fixed", zIndex: "2"}}>
                <input 
                type="radio"
                id="selection"
                checked={tool === "selection"}
                onChange={() => setTool("selection")}
                />
                <label htmlFor="line">Selection</label>
                <input 
                type="radio"
                id="line"
                checked={tool === "line"}
                onChange={() => setTool("line")}
                />
                <label htmlFor="line">Line</label>
                <input
                type="radio"
                id="rectangle"
                checked={tool === "rectangle"}
                onChange={() => setTool("rectangle")}
                />
                <label htmlFor="rectangle">Rectangle</label>                
                <input
                type="radio"
                id="text"
                checked={tool === "text"}
                onChange={() => setTool("text")}
                />
                <label htmlFor="text">Text</label>                
                <input
                type="radio"
                id="pen"
                checked={tool === "pen"}
                onChange={() => setTool("pen")}
                />
                <label htmlFor="pen">Pen</label>                
            </div>
            <div style={{position: "fixed", bottom: 0, padding: 2, zIndex: 2}}>
                <button onClick={undo}>Undo</button>
                <button onClick={redo}>Redo</button>
                <button onClick={clear}>Clear</button>
            </div>
            {action === "writing" ? (
                <textarea
                    ref={textAreaRef}
                    onBlur={handleBlur} 
                    style={{position: "fixed", zIndex: 2, top: selectedElement.y1, left: selectedElement.x1}} />
            ): null}
            <canvas
                id="canvas"
                style={canvasStyle}
                width={1200}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
        </div>
	);
};

const canvasStyle = {
    border: "1px solid black",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
};

export default Canvas;
