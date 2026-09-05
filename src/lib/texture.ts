export type TextureType = "none" | "noise" | "dither";

export interface TextureSettings {
  type: TextureType;
  intensity: number;
  scale: number;
}

export const DEFAULT_TEXTURE: TextureSettings = {
  type: "none",
  intensity: 22,
  scale: 160,
};

export const BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
] as const;

export interface TextureLayer {
  image: string;
  size: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function grayForBayer(value: number, intensity: number) {
  const amount = clamp(intensity, 4, 60) / 100;
  return Math.round(128 + (value / 15 - 0.5) * 255 * amount);
}

export function noiseScale(scale: number) {
  return clamp(Math.round(scale), 80, 260);
}

export function ditherCell(scale: number) {
  return clamp(Math.round(scale), 2, 12);
}

export function buildTextureLayer(texture: TextureSettings): TextureLayer | null {
  if (texture.type === "none") return null;
  if (texture.type === "noise") {
    const size = noiseScale(texture.scale);
    const frequency = (0.42 + (1 - (size - 80) / 180) * 0.55).toFixed(3);
    const contrast = (0.35 + clamp(texture.intensity, 4, 60) / 100 * 0.9).toFixed(3);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${frequency}" numOctaves="4" stitchTiles="stitch" result="t"/><feColorMatrix type="saturate" values="0" in="t" result="g"/><feComponentTransfer in="g"><feFuncR type="linear" slope="${contrast}" intercept="${((1 - Number(contrast)) / 2).toFixed(3)}"/><feFuncG type="linear" slope="${contrast}" intercept="${((1 - Number(contrast)) / 2).toFixed(3)}"/><feFuncB type="linear" slope="${contrast}" intercept="${((1 - Number(contrast)) / 2).toFixed(3)}"/></feComponentTransfer></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
    return { image: `url('data:image/svg+xml,${encodeURIComponent(svg)}')`, size: `${size}px ${size}px` };
  }

  const cell = ditherCell(texture.scale);
  const tile = cell * 4;
  const rects = BAYER_4.flatMap((row, y) =>
    row.map((value, x) => {
      const gray = grayForBayer(value, texture.intensity);
      return `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}" fill="rgb(${gray},${gray},${gray})"/>`;
    }),
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile}" height="${tile}" shape-rendering="crispEdges">${rects}</svg>`;
  return { image: `url('data:image/svg+xml,${encodeURIComponent(svg)}')`, size: `${tile}px ${tile}px` };
}

export function paintTexture(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  texture: TextureSettings,
) {
  if (texture.type === "none") return;

  if (texture.type === "noise") {
    const image = context.getImageData(0, 0, width, height);
    const { data } = image;
    const strength = clamp(texture.intensity, 4, 60) / 100 * 42;
    for (let index = 0; index < data.length; index += 4) {
      const n = (Math.random() - 0.5) * 2 * strength;
      data[index] = clamp(data[index] + n, 0, 255);
      data[index + 1] = clamp(data[index + 1] + n, 0, 255);
      data[index + 2] = clamp(data[index + 2] + n, 0, 255);
    }
    context.putImageData(image, 0, 0);
    return;
  }

  const cell = ditherCell(texture.scale);
  const tile = cell * 4;
  const stamp = document.createElement("canvas");
  stamp.width = tile;
  stamp.height = tile;
  const stampContext = stamp.getContext("2d");
  if (!stampContext) return;
  BAYER_4.forEach((row, y) => {
    row.forEach((value, x) => {
      const gray = grayForBayer(value, texture.intensity);
      stampContext.fillStyle = `rgb(${gray},${gray},${gray})`;
      stampContext.fillRect(x * cell, y * cell, cell, cell);
    });
  });
  const pattern = context.createPattern(stamp, "repeat");
  if (!pattern) return;
  context.save();
  context.globalCompositeOperation = "overlay";
  context.fillStyle = pattern;
  context.fillRect(0, 0, width, height);
  context.restore();
}
