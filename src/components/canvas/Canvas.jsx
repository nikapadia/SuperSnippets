import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

import "./canvas.css"
import { useEffect } from "react";

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
    const roughElement = type === "line" 
        ? generator.line(x1, y1, x2, y2, {roughness: 0})
        : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {roughness: 0});
        // : generator.circle(x1, y1, Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), {roughness: 0.25, fill: "red"});
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

const positionWithinElement = (x, y, element) => {
    const {type, x1, x2, y1, y2} = element;
    if (type === "rectangle") {
        const topLeft = nearPoint(x, y, x1, y1, "tl");
        const topRight = nearPoint(x, y, x2, y1, "tr");
        const bottomLeft = nearPoint(x, y, x1, y2, "bl");
        const bottomRight = nearPoint(x, y, x2, y2, "br");
        const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
        return topLeft || topRight || bottomLeft || bottomRight || inside;
    } else {
        const a = {x: x1, y: y1};
        const b = {x: x2, y: y2};
        const c = {x, y};
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        const start = nearPoint(x, y, x1, y1, "start");
        const end = nearPoint(x, y, x2, y2, "end");
        const inside = Math.abs(offset) < 1 ? "inside" : null;
        return start || end || inside;
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

    return [history[index], setState, undo, redo];
}

const App = () => {
	const [elements, setElements, undo, redo] = useHistory([]);
	const [action, setAction] = useState("none");
    const [tool, setTool] = useState("line");
    const [selectedElement, setSelectedElement] = useState(null);
    
	useLayoutEffect(() => {
		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

		const roughCanvas = rough.canvas(canvas);
		elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
	}, [elements]);

    useEffect(() => {
        const undoRedoHandler = event => {
            if ((event.metaKey || event.ctrlKey) && event.key === "z") {
                undo();
            } else if ((event.metaKey || event.ctrlKey) && event.key === "y") {
                redo();
            }
        };

        document.addEventListener("keydown", undoRedoHandler);
        return () => {
            document.removeEventListener("keydown", undoRedoHandler);
        };
	}, [undo, redo]);

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const updatedElement = createElement(id, x1, y1, x2, y2, type);

        const elementsCopy = [...elements];
        elementsCopy[id] = updatedElement;
        setElements(elementsCopy, true);
    };

	const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        if (tool === "selection") {
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                const offsetX = clientX - element.x1; 
                const offsetY = clientY - element.y1; 
                setSelectedElement({...element, offsetX, offsetY});
                // setElements(prevState => prevState.filter(el => el.id !== element.id));
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
            setAction("drawing");          
        }
    };
    
	const handleMouseUp = (event) => {
        if (selectedElement) {
            const index = selectedElement.id;
            const {id, type} = elements[index];
            if (action === "drawing" || action === "resizing") {
                const {x1, x2, y1, y2} = adjustElementCoordinates(elements[index]);
                updateElement(id, x1, y1, x2, y2, type);
            }
        }
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
            const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
            const width = x2 - x1;
            const height = y2 - y1;
            const newX1 = clientX - offsetX;
            const newY1 = clientY - offsetY;
            updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
        } else if (action === "resizing") {
            const { id, type, position, ...coordiates } = selectedElement;
            const {x1, y1, x2, y2} = resizedCoordinates(clientX, clientY, position, coordiates);
            updateElement(id, x1, y1, x2, y2, type);
        }

    };

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
            </div>
            <div style={{position: "fixed", bottom: 0, padding: 10, zIndex: 2}}>
                <button onClick={undo}>Undo</button>
                <button onClick={redo}>Redo</button>
            </div>
            <canvas
                id="canvas"
                style={canvasStyle}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            />
        </div>
	);
};

const canvasStyle = {
    border: "1px solid black",
    // margin: "auto",
    // marginTop: "50px",
    // display: "block",
    backgroundColor: "white",
    position: "fixed",
    top: 0,
    left: 0,
};

export default App;
