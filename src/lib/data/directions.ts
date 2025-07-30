type TailwindLinearDirection = "t" | "b" | "l" | "r" | "br" | "bl" | "tr" | "tl";
type CSSDirection = "top" | "bottom" | "left" | "right" | "top right" | "top left" | "bottom right" | "bottom left";

export const DIRECTION_LABELS: Record<TailwindLinearDirection, string> = {
    t: "Top",
    b: "Bottom",
    l: "Left",
    r: "Right",
    tr: "Top Right",
    tl: "Top Left",
    br: "Bottom Right",
    bl: "Bottom Left",
};

export const CSS_DIRECTION_VALUES: Record<CSSDirection, string> = {
    top: "Top",
    bottom: "Bottom",
    left: "Left",
    right: "Right",
    "top right": "Top Right",
    "top left": "Top Left",
    "bottom right": "Bottom Right",
    "bottom left": "Bottom Left",
};