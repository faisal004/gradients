"use client";

import GridsOrDots from "./rightSidebar/gridsOrDots";
import TextureControls from "./rightSidebar/texture-controls";
import MaskControls from "./rightSidebar/mask-controller";

export default function RightSidebar() {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Overlay</p>
      <GridsOrDots />
      <TextureControls />
      <MaskControls />
    </div>
  );
}
