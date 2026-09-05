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
  texture: Partial<GeneratorSnapshot["texture"]> = {},
): GradientPreset {
  return {
    id,
    name,
    description,
    snapshot: {
      version: 1,
      gradient: { ...DEFAULT_SNAPSHOT.gradient, ...gradient },
      pattern: { ...DEFAULT_SNAPSHOT.pattern, type: "none", ...pattern },
      mask: { ...DEFAULT_SNAPSHOT.mask, ...mask },
      texture: { ...DEFAULT_SNAPSHOT.texture, ...texture },
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
  preset("bone-china", "Bone China", "Warm porcelain, lit from the corner of a quiet room.", { from: "#fffdf8", via: "#f3eadc", to: "#e4d6c4", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 26, y: 20 }, viaPercentage: 54 }, { type: "none" }, {}, { type: "noise", intensity: 16, scale: 180 }),
  preset("champagne-mist", "Champagne Mist", "Dusty gold that stays pale, like silk in afternoon light.", { from: "#fbf8f1", via: "#eadfc4", to: "#d4c4a4", addVia: true, direction: "bottom right", viaPercentage: 50 }, { type: "none" }, {}, { type: "noise", intensity: 18, scale: 170 }),
  preset("studio-fog", "Studio Fog", "Cool product grey, like a quiet hardware page.", { from: "#f5f5f7", via: "#ebebef", to: "#d8d8de", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 30, y: 18 }, viaPercentage: 52 }, { type: "none" }, {}, { type: "noise", intensity: 14, scale: 200 }),
  preset("frosted-glass", "Frosted Glass", "Cool, barely tinted, like light through sandblasted glass.", { from: "#f8f9fb", via: "#e4eaf0", to: "#c5d0dc", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 36, y: 28 }, viaPercentage: 52 }, { type: "none" }, {}, { type: "noise", intensity: 12, scale: 150 }),
  preset("silk-wash", "Silk Wash", "A washed pink, lilac, and sky. Soft on purpose.", { from: "#fceef6", via: "#ebe4fb", to: "#e4f1fa", addVia: true, direction: "bottom right", viaPercentage: 50 }, { type: "none" }),
  preset("blush-stone", "Blush Stone", "Dusty blush that never tips into candy.", { from: "#f7f1ee", via: "#e5d4ce", to: "#c8b2aa", addVia: true, direction: "bottom right", viaPercentage: 48 }, { type: "none" }, {}, { type: "noise", intensity: 15, scale: 190 }),
  preset("cashmere", "Cashmere", "Camel and taupe, held in a narrow range.", { from: "#eadcc8", via: "#d0b088", to: "#b08964", addVia: true, direction: "bottom", viaPercentage: 48 }, { type: "none" }, {}, { type: "noise", intensity: 20, scale: 160 }),
  preset("olive-silk", "Olive Silk", "Muted leaf and plaster, no black at the bottom.", { from: "#e6e2ce", via: "#b0b08c", to: "#7e8064", addVia: true, direction: "bottom right", viaPercentage: 46 }, { type: "none" }, {}, { type: "noise", intensity: 18, scale: 175 }),
  preset("raw-clay", "Raw Clay", "Dusty terracotta, dried rather than fired.", { from: "#d4a088", via: "#b07860", to: "#8a5848", addVia: true, direction: "bottom right", viaPercentage: 48 }, { type: "none" }, {}, { type: "dither", intensity: 16, scale: 3 }),
  preset("oxblood", "Oxblood", "Desaturated burgundy. Old leather, not a nightclub.", { from: "#5c383c", via: "#3a2426", to: "#1a1414", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 34, y: 26 }, viaPercentage: 46 }, { type: "none" }, {}, { type: "noise", intensity: 20, scale: 150 }),
  preset("aged-cognac", "Aged Cognac", "Warm leather, kept in the mid-browns.", { from: "#9a7054", via: "#7a5440", to: "#5a382c", addVia: true, direction: "bottom right", viaPercentage: 50 }, { type: "none" }, {}, { type: "dither", intensity: 18, scale: 4 }),
  preset("quiet-indigo", "Quiet Indigo", "Deep indigo with no glow and no grid.", { from: "#2a2448", via: "#14121e", to: "#08070d", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 42, y: 8 }, viaPercentage: 36 }, { type: "none" }, {}, { type: "noise", intensity: 22, scale: 140 }),
  preset("ink-wash", "Ink Wash", "Lifted charcoal, like diluted sumi on cold paper.", { from: "#4a5260", via: "#2c3038", to: "#121416", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 70, y: 14 }, viaPercentage: 44 }, { type: "none" }, {}, { type: "dither", intensity: 20, scale: 3 }),
  preset("soft-obsidian", "Soft Obsidian", "Warm black. Almost no color, on purpose.", { from: "#2c2824", via: "#161412", to: "#0b0a09", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 40, y: 26 }, viaPercentage: 50 }, { type: "none" }, {}, { type: "noise", intensity: 18, scale: 130 }),
];
