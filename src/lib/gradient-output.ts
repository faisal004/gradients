import type { CSSProperties } from "react";
import type { GeneratorSnapshot } from "./generator-state";

const directionValue = (direction: string) => `to ${direction.replaceAll("-", " ")}`;

export function buildGradient(snapshot: GeneratorSnapshot) {
  const { gradient } = snapshot;
  const stops = [
    `${gradient.from} ${gradient.fromPercentage}%`,
    ...(gradient.addVia ? [`${gradient.via} ${gradient.viaPercentage}%`] : []),
    `${gradient.to} ${gradient.toPercentage}%`,
  ];
  return gradient.gradientType === "linear"
    ? `linear-gradient(${directionValue(gradient.direction)}, ${stops.join(", ")})`
    : `radial-gradient(${gradient.radialShape} at ${gradient.shapePosition.x}% ${gradient.shapePosition.y}%, ${stops.join(", ")})`;
}

export function buildPattern(snapshot: GeneratorSnapshot) {
  if (snapshot.pattern.type === "grid") {
    return `linear-gradient(to right, ${snapshot.pattern.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${snapshot.pattern.gridColor} 1px, transparent 1px)`;
  }
  if (snapshot.pattern.type === "dots") {
    return `radial-gradient(circle, ${snapshot.pattern.dotsColor} 1px, transparent 1px)`;
  }
  return "";
}

export function buildMask(snapshot: GeneratorSnapshot) {
  const { mask } = snapshot;
  if (!mask.enabled) return "";
  const stops = [
    `${mask.from} ${mask.fromPercentage}%`,
    ...(mask.via ? [`${mask.via} ${mask.viaPercentage}%`] : []),
    `${mask.to} ${mask.toPercentage}%`,
  ];
  return mask.type === "linear"
    ? `linear-gradient(${directionValue(mask.direction)}, ${stops.join(", ")})`
    : `radial-gradient(${mask.radialShape} at ${mask.radialPosition.x}% ${mask.radialPosition.y}%, ${stops.join(", ")})`;
}

export function buildPreviewStyle(snapshot: GeneratorSnapshot): CSSProperties {
  const gradient = buildGradient(snapshot);
  const pattern = buildPattern(snapshot);
  const patternSize = snapshot.pattern.type === "grid" ? snapshot.pattern.gridSize : snapshot.pattern.dotsSize;
  const mask = buildMask(snapshot);
  return {
    backgroundImage: pattern ? `${pattern}, ${gradient}` : gradient,
    backgroundSize: snapshot.pattern.type === "grid"
      ? `${patternSize}px ${patternSize}px, ${patternSize}px ${patternSize}px, cover`
      : snapshot.pattern.type === "dots" ? `${patternSize}px ${patternSize}px, cover` : "cover",
    backgroundRepeat: snapshot.pattern.type === "grid" ? "repeat, repeat, no-repeat" : snapshot.pattern.type === "dots" ? "repeat, no-repeat" : "no-repeat",
    backgroundPosition: "center",
    ...(mask ? {
      WebkitMaskImage: mask,
      WebkitMaskRepeat: snapshot.mask.repeat,
      WebkitMaskSize: snapshot.mask.size,
      WebkitMaskPosition: "center",
      maskImage: mask,
      maskRepeat: snapshot.mask.repeat,
      maskSize: snapshot.mask.size,
      maskPosition: "center",
    } : {}),
  };
}

export function getVanillaCSS(snapshot: GeneratorSnapshot) {
  const style = buildPreviewStyle(snapshot);
  return Object.entries(style)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^webkit-/, "-webkit-")}: ${value};`)
    .join("\n");
}

export function getCSSVariables(snapshot: GeneratorSnapshot) {
  return `:root {\n  --gradient: ${buildGradient(snapshot)};\n${buildPattern(snapshot) ? `  --pattern: ${buildPattern(snapshot)};\n` : ""}${buildMask(snapshot) ? `  --mask: ${buildMask(snapshot)};\n` : ""}}\n\n.gradient {\n  background-image: ${buildPattern(snapshot) ? "var(--pattern), " : ""}var(--gradient);\n}`;
}

export function getReactStyle(snapshot: GeneratorSnapshot) {
  const entries = Object.entries(buildPreviewStyle(snapshot))
    .map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`)
    .join("\n");
  return `const gradientStyle: React.CSSProperties = {\n${entries}\n};`;
}

export function getTailwind(snapshot: GeneratorSnapshot) {
  const css = getVanillaCSS(snapshot).replaceAll("_", "\\_");
  return `<div className="min-h-screen bg-[${buildGradient(snapshot).replaceAll(" ", "_")}]">\n  {/* Add overlay styles when using a grid, dots, or mask. */}\n</div>\n\n/* Full fidelity */\n.gradient {\n${css.split("\n").map(line => `  ${line}`).join("\n")}\n}`;
}

export function getSVG(snapshot: GeneratorSnapshot, width = 1600, height = 900) {
  const style = getVanillaCSS(snapshot).replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">\n  <foreignObject width="100%" height="100%">\n    <div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;${style.replaceAll("\n", "")}"></div>\n  </foreignObject>\n</svg>`;
}
