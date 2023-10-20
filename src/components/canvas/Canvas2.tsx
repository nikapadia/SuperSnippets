import React, { useState } from "react";
import { Stage, Layer } from "react-konva";
import Konva from "konva";
import ShapeComponent from "./ShapeComponent";


const Canvas2: React.FC = () => {
    interface Shape {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        points?: number[];
        radius?: number;
        id: string;
    }

    const [rectangles, setRectangles] = useState<Shape[]>([]);
    const [lines, setLines] = useState<Shape[]>([]);
    const [circles, setCircles] = useState<Shape[]>([]);
    const [selectedId, selectShape] = useState<string | null>(null);
    const [shapeType, setShapeType] = useState<string>("rectangle");
  
    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      // if we are drawing a shape, create a new shape object and add it to the appropriate state array
      if (shapeType === "rectangle") {
        const newRect = {
          x: e.evt.offsetX,
          y: e.evt.offsetY,
          width: 0,
          height: 0,
          id: "rect" + rectangles.length,
        };
        setRectangles([...rectangles, newRect]);
        selectShape(newRect.id);
      } else if (shapeType === "line") {
        const newLine = {
          points: [e.evt.offsetX, e.evt.offsetY, e.evt.offsetX, e.evt.offsetY],
          id: "line" + lines.length,
        };
        setLines([...lines, newLine]);
        selectShape(newLine.id);
      } else if (shapeType === "circle") {
        const newCircle = {
          x: e.evt.offsetX,
          y: e.evt.offsetY,
          radius: 0,
          id: "circle" + circles.length,
        };
        setCircles([...circles, newCircle]);
        selectShape(newCircle.id);
      }
    };
  
    return (
      <div>
        <div>
          <button onClick={() => setShapeType("rectangle")}>Rectangle</button>
          <button onClick={() => setShapeType("line")}>Line</button>
          <button onClick={() => setShapeType("circle")}>Circle</button>
        </div>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
        >
          <Layer>
            {rectangles.map((rect) => (
              <ShapeComponent
                key={rect.id}
                shapeType="rectangle"
                shapeProps={rect}
                isSelected={rect.id === selectedId}
                onSelect={() => {
                  selectShape(rect.id);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  const index = rects.findIndex((r) => r.id === rect.id);
                  rects[index] = newAttrs;
                  setRectangles(rects);
                }}
              />
            ))}
            {lines.map((line) => (
              <ShapeComponent
                key={line.id}
                shapeType="line"
                shapeProps={line}
                isSelected={line.id === selectedId}
                onSelect={() => {
                  selectShape(line.id);
                }}
                onChange={(newAttrs) => {
                  const newLines = lines.slice();
                  const index = newLines.findIndex((l) => l.id === line.id);
                  newLines[index] = newAttrs;
                  setLines(newLines);
                }}
              />
            ))}
            {circles.map((circle) => (
              <ShapeComponent
                key={circle.id}
                shapeType="circle"
                shapeProps={circle}
                isSelected={circle.id === selectedId}
                onSelect={() => {
                  selectShape(circle.id);
                }}
                onChange={(newAttrs) => {
                  const newCircles = circles.slice();
                  const index = newCircles.findIndex((c) => c.id === circle.id);
                  newCircles[index] = newAttrs;
                  setCircles(newCircles);
                }}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  };

export default Canvas2;