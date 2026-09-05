import { describe, expect, it } from "vitest";
import { DEFAULT_SNAPSHOT, type GeneratorSnapshot } from "./generator-state";
import { buildGradient, buildMask, buildPattern, buildPreviewStyle, getReactStyle, getSVG, getVanillaCSS } from "./gradient-output";

const copy = (): GeneratorSnapshot => structuredClone(DEFAULT_SNAPSHOT);

describe("gradient output", () => {
  it("builds a linear gradient with ordered stops", () => {
    const snapshot = copy();
    snapshot.gradient.addVia = true;
    snapshot.gradient.direction = "bottom right";
    expect(buildGradient(snapshot)).toContain("linear-gradient(to bottom right");
    expect(buildGradient(snapshot)).toContain("#34692e 50%");
  });

  it("uses one dot layer and two grid layers", () => {
    const snapshot = copy();
    expect(buildPattern(snapshot).match(/radial-gradient/g)).toHaveLength(1);
    snapshot.pattern.type = "grid";
    expect(buildPattern(snapshot).match(/linear-gradient/g)).toHaveLength(2);
  });

  it("normalizes diagonal mask directions", () => {
    const snapshot = copy();
    snapshot.mask.enabled = true;
    snapshot.mask.type = "linear";
    snapshot.mask.direction = "top-left";
    expect(buildMask(snapshot)).toContain("to top left");
  });

  it("layers film grain and ordered dither over the gradient", () => {
    const snapshot = copy();
    snapshot.texture = { type: "noise", intensity: 20, scale: 160 };
    expect(buildPreviewStyle(snapshot).backgroundImage).toContain("feTurbulence");
    expect(buildPreviewStyle(snapshot).backgroundBlendMode).toContain("overlay");
    snapshot.texture = { type: "dither", intensity: 18, scale: 4 };
    expect(buildPreviewStyle(snapshot).backgroundImage).toContain("shape-rendering");
  });

  it("keeps preview, CSS, React, and SVG exports in sync", () => {
    const snapshot = copy();
    snapshot.mask.enabled = true;
    const style = buildPreviewStyle(snapshot);
    expect(style.backgroundImage).toBeTruthy();
    expect(getVanillaCSS(snapshot)).toContain("mask-image");
    expect(getReactStyle(snapshot)).toContain("WebkitMaskImage");
    expect(getSVG(snapshot)).toContain("<svg");
  });
});
