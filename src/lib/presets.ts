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
      pattern: { ...DEFAULT_SNAPSHOT.pattern, type: "none", ...pattern },
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
  preset("champagne-noir", "Champagne Noir", "Antique gold poured over espresso, like light on dark lacquer.", { from: "#1c1208", via: "#c9a227", to: "#f3e5c2", addVia: true, direction: "bottom right", viaPercentage: 56 }, { type: "none" }),
  preset("velvet-wine", "Velvet Wine", "A plush burgundy bloom against near-black velvet.", { from: "#be123c", via: "#4a0d1c", to: "#0c0408", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 40, y: 34 }, viaPercentage: 36 }, { type: "none" }),
  preset("pearl-smoke", "Pearl Smoke", "Cool silver drifting through a pale, expensive mist.", { from: "#ffffff", via: "#e2e8f0", to: "#64748b", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 52, y: 36 }, viaPercentage: 44 }, { type: "none" }),
  preset("copper-vein", "Copper Vein", "Burnished copper glowing through smoked bronze.", { from: "#1c0c06", via: "#b45309", to: "#f59e0b", addVia: true, direction: "top right", viaPercentage: 48 }, { type: "dots", dotsSize: 42, dotsColor: "#ffffff1c" }),
  preset("twilight-silk", "Twilight Silk", "Dusk navy dissolving into a dusty rose horizon.", { from: "#0b1220", via: "#3730a3", to: "#f9a8d4", addVia: true, direction: "bottom", viaPercentage: 40 }, { type: "none" }),
  preset("ember-ash", "Ember Ash", "A single coal of amber buried under charcoal dust.", { from: "#fbbf24", via: "#9a3412", to: "#0a0a0a", addVia: true, gradientType: "radial", shapePosition: { x: 50, y: 74 }, viaPercentage: 32 }, { type: "none" }, { enabled: true, type: "radial", from: "black", via: "black", to: "transparent", viaPercentage: 46, toPercentage: 92 }),
  preset("prussian-night", "Prussian Night", "Deep military blue with a distant silver moon.", { from: "#cbd5e1", via: "#1e3a5f", to: "#071018", addVia: true, gradientType: "radial", radialShape: "ellipse", shapePosition: { x: 78, y: 16 }, viaPercentage: 28 }, { type: "grid", gridSize: 48, gridColor: "#ffffff12" }),
  preset("sage-temple", "Sage Temple", "Muted olive and warm stone for quiet luxury surfaces.", { from: "#f4efe4", via: "#8d9a7a", to: "#2d3629", addVia: true, direction: "bottom right", viaPercentage: 40 }, { type: "none" }),
  preset("moss-cathedral", "Moss Cathedral", "Canopy light falling through a deep forest nave.", { from: "#65a30d", via: "#1a2e1a", to: "#050805", addVia: true, gradientType: "radial", shapePosition: { x: 50, y: 16 }, viaPercentage: 34 }, { type: "none" }),
  preset("carbon-lattice", "Carbon Lattice", "Product chrome: near-black with a fine technical mesh.", { from: "#3f3f46", via: "#18181b", to: "#09090b", addVia: true, gradientType: "radial", shapePosition: { x: 38, y: 28 }, viaPercentage: 46 }, { type: "grid", gridSize: 22, gridColor: "#ffffff14" }),
  preset("ion-beam", "Ion Beam", "A concentrated cobalt core cutting through void.", { from: "#3b82f6", via: "#1e3a8a", to: "#020617", addVia: true, gradientType: "radial", shapePosition: { x: 50, y: 48 }, viaPercentage: 28 }, { type: "none" }, { enabled: true, type: "linear", direction: "right", from: "transparent", via: "black", to: "transparent", viaPercentage: 50 }),
  preset("porcelain", "Porcelain", "Warm bone, a thread of gold, and a blush at the edge.", { from: "#fffdf7", via: "#fde68a", to: "#fecdd3", addVia: true, direction: "bottom right", viaPercentage: 42 }, { type: "none" }),
  preset("orchid-noir", "Orchid Noir", "A single magenta bloom on a black couture stage.", { from: "#e879f9", via: "#6b21a8", to: "#0a0414", addVia: true, gradientType: "radial", shapePosition: { x: 64, y: 38 }, viaPercentage: 30 }, { type: "none" }),
  preset("ink-ivory", "Ink & Ivory", "Warm paper falling into editorial ink.", { from: "#faf6f0", via: "#a8a29e", to: "#1c1917", addVia: true, direction: "bottom", viaPercentage: 58 }, { type: "none" }),
  preset("steel-horizon", "Steel Horizon", "Cool industrial grey meeting a thin line of dawn.", { from: "#0f172a", via: "#475569", to: "#f59e0b", addVia: true, direction: "bottom", viaPercentage: 78 }, { type: "grid", gridSize: 40, gridColor: "#ffffff10" }),
  preset("opaline", "Opaline", "Milky glass catching mint, lilac, and a hint of gold.", { from: "#f5d0fe", via: "#a7f3d0", to: "#fde68a", addVia: true, direction: "bottom right", viaPercentage: 48 }, { type: "none" }),
  preset("honey-glass", "Honey Glass", "Backlit amber, like late sun through thick honey.", { from: "#fde68a", via: "#d97706", to: "#451a03", addVia: true, gradientType: "radial", shapePosition: { x: 50, y: 42 }, viaPercentage: 44 }, { type: "none" }),
  preset("noir-cinema", "Noir Cinema", "Silver light across a letterboxed black frame.", { from: "#d4d4d8", via: "#52525b", to: "#09090b", addVia: true, direction: "bottom", viaPercentage: 42 }, { type: "none" }, { enabled: true, type: "linear", direction: "bottom", from: "transparent", via: "black", to: "transparent", viaPercentage: 50 }),
];
