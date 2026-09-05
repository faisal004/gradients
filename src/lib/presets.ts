import { DEFAULT_SNAPSHOT, type GeneratorSnapshot } from "./generator-state";

export interface GradientPreset {
  id: string;
  name: string;
  description: string;
  snapshot: GeneratorSnapshot;
}

function preset(
  id: string,
  name: string,
  description: string,
  gradient: Partial<GeneratorSnapshot["gradient"]>,
  pattern: Partial<GeneratorSnapshot["pattern"]> = {},
  mask: Partial<GeneratorSnapshot["mask"]> = {},
): GradientPreset {
  return {
    id,
    name,
    description,
    snapshot: {
      version: 1,
      gradient: { ...DEFAULT_SNAPSHOT.gradient, ...gradient },
      pattern: { ...DEFAULT_SNAPSHOT.pattern, ...pattern },
      mask: { ...DEFAULT_SNAPSHOT.mask, ...mask },
    },
  };
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  preset("aurora-grid", "Aurora Grid", "Deep violet, electric blue, and a quiet technical grid.", { from: "#050816", via: "#6d28d9", to: "#22d3ee", addVia: true, direction: "bottom right" }, { type: "grid", gridSize: 44, gridColor: "#ffffff1f" }),
  preset("mango-sunset", "Mango Sunset", "Warm mango melting into a saturated evening pink.", { from: "#ffb347", via: "#ff5f6d", to: "#8b1e5a", addVia: true, direction: "bottom" }, { type: "dots", dotsSize: 34, dotsColor: "#ffffff35" }),
  preset("arctic-halo", "Arctic Halo", "A bright radial glow with icy cyan edges.", { from: "#ffffff", via: "#9be7ff", to: "#075985", addVia: true, gradientType: "radial", radialShape: "circle", shapePosition: { x: 48, y: 42 } }, { type: "none" }),
  preset("midnight-mesh", "Midnight Mesh", "Indigo light suspended over an ink-dark grid.", { from: "#312e81", via: "#111827", to: "#020617", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 62, y: 22 } }, { type: "grid", gridSize: 36, gridColor: "#818cf82b" }),
  preset("rose-quartz", "Rose Quartz", "Soft rose and cream for calm, editorial surfaces.", { from: "#fff1f2", via: "#fecdd3", to: "#c4b5fd", addVia: true, direction: "bottom right" }, { type: "none" }),
  preset("limewire", "Limewire", "Acid green signal cutting through black.", { from: "#020617", via: "#14532d", to: "#a3e635", addVia: true, direction: "top right" }, { type: "grid", gridSize: 28, gridColor: "#bef26426" }),
  preset("solar-flare", "Solar Flare", "A concentrated yellow core burning through orange and red.", { from: "#fef9c3", via: "#fb923c", to: "#991b1b", addVia: true, gradientType: "radial", shapePosition: { x: 36, y: 35 }, viaPercentage: 42 }, { type: "dots", dotsSize: 42, dotsColor: "#ffffff30" }),
  preset("ocean-floor", "Ocean Floor", "Cool teal descends into a near-black ocean blue.", { from: "#22d3ee", via: "#0f766e", to: "#020617", addVia: true, direction: "bottom" }, { type: "dots", dotsSize: 48, dotsColor: "#a5f3fc24" }),
  preset("lavender-fog", "Lavender Fog", "A hazy lilac bloom with a pale atmospheric edge.", { from: "#f5f3ff", via: "#c4b5fd", to: "#6366f1", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 28, y: 32 } }, { type: "none" }),
  preset("candy-grid", "Candy Grid", "Playful cyan, violet, and pink with crisp graph paper.", { from: "#67e8f9", via: "#8b5cf6", to: "#f472b6", addVia: true, direction: "bottom right" }, { type: "grid", gridSize: 32, gridColor: "#ffffff42" }),
  preset("soft-spotlight", "Soft Spotlight", "A focused blue-violet stage light fading at its edges.", { from: "#38bdf8", via: "#7c3aed", to: "#111827", addVia: true, gradientType: "radial", shapePosition: { x: 50, y: 45 } }, { type: "dots", dotsSize: 38, dotsColor: "#ffffff2b" }, { enabled: true, type: "radial", from: "black", via: "black", to: "transparent", viaPercentage: 48, toPercentage: 92 }),
  preset("neon-edge", "Neon Edge", "A cinematic magenta-to-cyan field with softened sides.", { from: "#ec4899", via: "#7c3aed", to: "#06b6d4", addVia: true, direction: "right" }, { type: "none" }, { enabled: true, type: "linear", direction: "right", from: "transparent", via: "black", to: "transparent", viaPercentage: 50 }),
];
