import {useOnDraw} from './Hooks';
import './Canvas.css';

const Canvas = ({
    width,
    height
}) => {

    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
    }

    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();

    }

    return(
        <div class="canvas-container">
            <canvas
                width={width}
                height={height}
                onMouseDown={onCanvasMouseDown}
                style={canvasStyle}
                ref={setCanvasRef}
            />
        </div>
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black",
    backgroundColor: "white"
}