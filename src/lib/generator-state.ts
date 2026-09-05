import { useGradientStore } from "@/store/gradient-store";
import { useGridDotsStore } from "@/store/grid-dots-store";
import { useMaskStore } from "@/store/masking-store";

export type GradientType = "linear" | "radial";
export type PatternType = "none" | "grid" | "dots";
export type MaskType = "linear" | "radial";

export interface GeneratorSnapshot {
  version: 1;
  gradient: {
    from: string;
    to: string;
    via: string;
    addVia: boolean;
    direction: string;
    fromPercentage: number;
    viaPercentage: number;
    toPercentage: number;
    gradientType: GradientType;
    radialShape: "circle" | "ellipse";
    shapePosition: { x: number; y: number };
  };
  pattern: {
    type: PatternType;
    gridSize: number;
    dotsSize: number;
    gridColor: string;
    dotsColor: string;
  };
  mask: {
    enabled: boolean;
    type: MaskType;
    direction: string;
    radialShape: "circle" | "ellipse";
    radialPosition: { x: number; y: number };
    from: string;
    via: string | null;
    to: string;
    fromPercentage: number;
    viaPercentage: number;
    toPercentage: number;
    size: string;
    repeat: "no-repeat" | "repeat" | "repeat-x" | "repeat-y";
  };
}

export const DEFAULT_SNAPSHOT: GeneratorSnapshot = {
  version: 1,
  gradient: {
    from: "#0c2b1a",
    to: "#439df057",
    via: "#34692e",
    addVia: false,
    direction: "top",
    fromPercentage: 0,
    viaPercentage: 50,
    toPercentage: 100,
    gradientType: "linear",
    radialShape: "circle",
    shapePosition: { x: 50, y: 50 },
  },
  pattern: {
    type: "dots",
    gridSize: 40,
    dotsSize: 60,
    gridColor: "#e5e7eb",
    dotsColor: "#e5e7eb",
  },
  mask: {
    enabled: false,
    type: "radial",
    direction: "top",
    radialShape: "circle",
    radialPosition: { x: 50, y: 50 },
    from: "black",
    via: null,
    to: "transparent",
    fromPercentage: 0,
    viaPercentage: 50,
    toPercentage: 100,
    size: "100% 100%",
    repeat: "no-repeat",
  },
};

export function getSnapshot(): GeneratorSnapshot {
  const gradient = useGradientStore.getState();
  const pattern = useGridDotsStore.getState();
  const mask = useMaskStore.getState();
  return {
    version: 1,
    gradient: {
      from: gradient.from,
      to: gradient.to,
      via: gradient.via || "",
      addVia: gradient.addVia,
      direction: gradient.direction,
      fromPercentage: gradient.fromPercentage,
      viaPercentage: gradient.viaPercentage ?? 50,
      toPercentage: gradient.toPercentage,
      gradientType: gradient.gradientType,
      radialShape: gradient.radialShape,
      shapePosition: gradient.shapePosition,
    },
    pattern: {
      type: pattern.addGrid ? "grid" : pattern.addDots ? "dots" : "none",
      gridSize: pattern.gridSize,
      dotsSize: pattern.dotsSize,
      gridColor: pattern.gridColor,
      dotsColor: pattern.dotsColor,
    },
    mask: {
      enabled: mask.addMask,
      type: mask.maskType,
      direction: mask.direction,
      radialShape: mask.radialShape,
      radialPosition: mask.radialPosition,
      from: mask.from,
      via: mask.via,
      to: mask.to,
      fromPercentage: mask.fromPercentage,
      viaPercentage: mask.viaPercentage,
      toPercentage: mask.toPercentage,
      size: mask.maskSize,
      repeat: mask.maskRepeat,
    },
  };
}

export function applySnapshot(snapshot: GeneratorSnapshot) {
  useGradientStore.setState({ ...snapshot.gradient });
  useGridDotsStore.setState({
    addGrid: snapshot.pattern.type === "grid",
    addDots: snapshot.pattern.type === "dots",
    gridSize: snapshot.pattern.gridSize,
    dotsSize: snapshot.pattern.dotsSize,
    gridColor: snapshot.pattern.gridColor,
    dotsColor: snapshot.pattern.dotsColor,
  });
  useMaskStore.setState({
    addMask: snapshot.mask.enabled,
    maskType: snapshot.mask.type,
    direction: snapshot.mask.direction as ReturnType<typeof useMaskStore.getState>["direction"],
    radialShape: snapshot.mask.radialShape,
    radialPosition: snapshot.mask.radialPosition,
    from: snapshot.mask.from,
    via: snapshot.mask.via,
    to: snapshot.mask.to,
    fromPercentage: snapshot.mask.fromPercentage,
    viaPercentage: snapshot.mask.viaPercentage,
    toPercentage: snapshot.mask.toPercentage,
    maskSize: snapshot.mask.size,
    maskRepeat: snapshot.mask.repeat,
  });
}
