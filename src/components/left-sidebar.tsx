"use client";

import Palette from "./rightSidebar/palette";
import Directions from "./rightSidebar/directions";
import GradientRange from "./rightSidebar/gradient-rage";
import EditorActions from "./editor-actions";

export default function LeftSidebar() {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <div className="hidden items-center justify-between lg:flex">
        <div className="text-2xl font-bold tracking-widest">Gradio</div>
        <EditorActions />
      </div>
      <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Color</p>
      <Palette />
      <Directions />
      <GradientRange />
    </div>
  );
}
