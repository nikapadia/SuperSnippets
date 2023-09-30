import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

// import "canvas.css"

const generator = rough.generator();

function createElement(x1, y1, x2, y2) {
    const roughElement = generator.line(x1, y1, x2-x1, y2-y1);
    return {
        roughElement,
        x1,
        y1,
        x2,
        y2,
    };
}

const App = () => {
	const [elements, setElements] = useState([]);
	const [drawing, setDrawing] = useState(false);

	useLayoutEffect(() => {
		const canvas = document.getElementById("canvas");
		const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

		const roughCanvas = rough.canvas(canvas);
		elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
	}, [elements]);

	const handleMouseDown = (event) => {
        setDrawing(true);
        
        const { clientX, clientY } = event;

        const element = createElement(clientX,clientY,clientX,clientY);
        setElements(prevState => [...prevState, element]);
    };
    
	const handleMouseUp = (event) => {
        setDrawing(false);
    };

	const handleMouseMove = (event) => {
        if (!drawing) {
            return;
        }

        const { clientX, clientY } = event;
        const index = elements.length - 1;
        const {x1, y1} = elements[index];
        const updatedElement = createElement(x1, y1, clientX, clientY);

        const elementsCopy = [...elements]; 
        elementsCopy[index] = updatedElement;
        setElements(elementsCopy);

    };

	return (
		<canvas
			id="canvas"
			width={500}
			height={500}
			onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
		/>
	);
};

export default App;
