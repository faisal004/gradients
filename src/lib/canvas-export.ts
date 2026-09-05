import type { GeneratorSnapshot } from "./generator-state";

type Stop = { color: string; percentage: number };

function getLinearPoints(direction: string, width: number, height: number) {
  const normalized = direction.replaceAll("-", " ");
  const points: Record<string, [number, number, number, number]> = {
    top: [width / 2, height, width / 2, 0],
    "top right": [0, height, width, 0],
    right: [0, height / 2, width, height / 2],
    "bottom right": [0, 0, width, height],
    bottom: [width / 2, 0, width / 2, height],
    "bottom left": [width, 0, 0, height],
    left: [width, height / 2, 0, height / 2],
    "top left": [width, height, 0, 0],
  };
  return points[normalized] || points.right;
}

function addStops(gradient: CanvasGradient, stops: Stop[]) {
  stops.forEach(stop => gradient.addColorStop(Math.max(0, Math.min(stop.percentage / 100, 1)), stop.color));
}

function paintGradient(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  type: "linear" | "radial",
  direction: string,
  shape: "circle" | "ellipse",
  position: { x: number; y: number },
  stops: Stop[],
) {
  if (type === "linear") {
    const gradient = context.createLinearGradient(...getLinearPoints(direction, width, height));
    addStops(gradient, stops);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    return;
  }

  const centerX = width * position.x / 100;
  const centerY = height * position.y / 100;
  const radiusX = Math.max(centerX, width - centerX);
  const radiusY = Math.max(centerY, height - centerY);
  const scaleX = shape === "ellipse" ? radiusX / Math.max(radiusY, 1) : 1;
  const radius = shape === "ellipse" ? radiusY : Math.hypot(radiusX, radiusY);
  context.save();
  context.translate(centerX, centerY);
  context.scale(scaleX, 1);
  const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radius);
  addStops(gradient, stops);
  context.fillStyle = gradient;
  context.fillRect(-centerX / scaleX, -centerY, width / scaleX, height);
  context.restore();
}

export function renderSnapshotToCanvas(snapshot: GeneratorSnapshot, width = 1600, height = 900) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is not available in this browser.");

  const gradientStops: Stop[] = [
    { color: snapshot.gradient.from, percentage: snapshot.gradient.fromPercentage },
    ...(snapshot.gradient.addVia ? [{ color: snapshot.gradient.via, percentage: snapshot.gradient.viaPercentage }] : []),
    { color: snapshot.gradient.to, percentage: snapshot.gradient.toPercentage },
  ];
  paintGradient(context, width, height, snapshot.gradient.gradientType, snapshot.gradient.direction, snapshot.gradient.radialShape, snapshot.gradient.shapePosition, gradientStops);

  if (snapshot.pattern.type === "grid") {
    context.strokeStyle = snapshot.pattern.gridColor;
    context.lineWidth = 1;
    for (let x = 0.5; x <= width; x += snapshot.pattern.gridSize) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
    for (let y = 0.5; y <= height; y += snapshot.pattern.gridSize) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }
  } else if (snapshot.pattern.type === "dots") {
    context.fillStyle = snapshot.pattern.dotsColor;
    for (let y = snapshot.pattern.dotsSize / 2; y < height; y += snapshot.pattern.dotsSize) {
      for (let x = snapshot.pattern.dotsSize / 2; x < width; x += snapshot.pattern.dotsSize) {
        context.beginPath(); context.arc(x, y, 1, 0, Math.PI * 2); context.fill();
      }
    }
  }

  if (snapshot.mask.enabled) {
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width; maskCanvas.height = height;
    const maskContext = maskCanvas.getContext("2d");
    if (!maskContext) throw new Error("Mask rendering is not available in this browser.");
    const maskStops: Stop[] = [
      { color: snapshot.mask.from, percentage: snapshot.mask.fromPercentage },
      ...(snapshot.mask.via ? [{ color: snapshot.mask.via, percentage: snapshot.mask.viaPercentage }] : []),
      { color: snapshot.mask.to, percentage: snapshot.mask.toPercentage },
    ];
    paintGradient(maskContext, width, height, snapshot.mask.type, snapshot.mask.direction, snapshot.mask.radialShape, snapshot.mask.radialPosition, maskStops);
    context.globalCompositeOperation = "destination-in";
    context.drawImage(maskCanvas, 0, 0);
    context.globalCompositeOperation = "source-over";
  }

  return canvas;
}

export function canvasToPngBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("PNG encoding failed.")), "image/png");
  });
}
