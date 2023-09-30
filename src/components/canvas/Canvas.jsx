import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

// import "canvas.css"

const generator = rough.generator();

function createElement(id, x1, y1, x2, y2, type) {
    const roughElement = type === "line" 
        ? generator.line(x1, y1, x2, y2)
        : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
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

const isWithinElement = (x, y, element) => {
    const {type, x1, x2, y1, y2} = element;
    if (type === "rectangle") {
        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    } else {
        const a = {x: x1, y: y1};
        const b = {x: x2, y: y2};
        const c = {x, y};
        const offset = distance(a, b) - (distance(a, c) + distance(b, c));
        return Math.abs(offset) < 1;
    }
};

const distance = (a, b) => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const getElementAtPosition = (x, y, elements) => {
    return elements.find(element => isWithinElement(x, y, element));
};

const App = () => {
	const [elements, setElements] = useState([]);
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

    const updateElement = (id, x1, y1, x2, y2, type) => {
        const updatedElement = createElement(id, x1, y1, x2, y2, type);

        const elementsCopy = [...elements];
        elementsCopy[id] = updatedElement;
        setElements(elementsCopy);
    };

	const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        if (tool === "selection") {
            const element = getElementAtPosition(clientX, clientY, elements);
            if (element) {
                const offsetX = clientX - element.x1; 
                const offsetY = clientY - element.y1; 
                setSelectedElement({...element, offsetX, offsetY});
                setAction("moving");
            }
        } else {
            const id = elements.length;
            const element = createElement(id, clientX,clientY,clientX,clientY, tool);
            setElements(prevState => [...prevState, element]);
            setAction("drawing");          
        }
    };
    
	const handleMouseUp = (event) => {
        setAction("none");
        setSelectedElement(null);
    };

	const handleMouseMove = (event) => {
        const { clientX, clientY } = event;

        if (tool === "selection") {
            event.target.style.cursor = getElementAtPosition(clientX, clientY, elements) ? "move" : "default";
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
        }

    };

	return (
        <div>
            <div style={{position: "fixed", zIndex: "2"}}>
                <input 
                type="radio"
                id="selection"
                checked={tool === "selection"}
                onChange={() => setTool("selection")}
                />
                <label htmlFor="line" style={{color: "black"}}>Selection</label>
                <input 
                type="radio"
                id="line"
                checked={tool === "line"}
                onChange={() => setTool("line")}
                />
                <label htmlFor="line" style={{color: "black"}}>Line</label>
                <input
                type="radio"
                id="rectangle"
                checked={tool === "rectangle"}
                onChange={() => setTool("rectangle")}
                />
                <label htmlFor="rectangle" style={{color: "black"}}>Rectangle</label>                
            </div>
            <canvas
                id="canvas"
                style={canvasStyle}
                width={500}
                height={500}
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
    left: 0
};

export default App;
