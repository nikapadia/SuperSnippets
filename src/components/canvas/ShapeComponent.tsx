import React from "react";
import Konva from "konva";
import { Rect, Line, Circle } from "react-konva";

interface Props {
  shapeType: string;
  shapeProps: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

const ShapeComponent: React.FC<Props> = ({
  shapeType,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
}) => {
  const { x, y, width, height } = shapeProps;

  const commonProps = {
    x,
    y,
    width,
    height,
    stroke: "#000000",
    strokeWidth: 2,
    fill: "transparent",
    draggable: true,
    onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
      onChange({
        ...shapeProps,
        x: e.target.x(),
        y: e.target.y(),
      });
    },
  };

  const handleRectChange = (newAttrs: any) => {
    onChange({
      ...shapeProps,
      ...newAttrs,
    });
  };

  const handleLineChange = (newAttrs: any) => {
    onChange({
      ...shapeProps,
      points: newAttrs.points,
    });
  };

  const handleCircleChange = (newAttrs: any) => {
    onChange({
      ...shapeProps,
      x: newAttrs.x,
      y: newAttrs.y,
      radius: newAttrs.radius,
    });
  };

  switch (shapeType) {
    case "rectangle":
      return (
        <Rect
          {...commonProps}
          {...shapeProps}
          onClick={onSelect}
          onTap={onSelect}
          onChange={handleRectChange}
          draggable
        />
      );
    case "line":
      return (
        <Line
          {...commonProps}
          {...shapeProps}
          onClick={onSelect}
          onTap={onSelect}
          onChange={handleLineChange}
          draggable
        />
      );
    case "circle":
      return (
        <Circle
          {...commonProps}
          {...shapeProps}
          onClick={onSelect}
          onTap={onSelect}
          onChange={handleCircleChange}
          draggable
        />
      );
    default:
      return null;
  }
};

export default ShapeComponent;