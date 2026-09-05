"use client";

import { buildPreviewStyle } from "@/lib/gradient-output";
import { getSnapshot } from "@/lib/generator-state";
import { useGradientStore } from "@/store/gradient-store";
import { useGridDotsStore } from "@/store/grid-dots-store";
import { useMaskStore } from "@/store/masking-store";
import ExportPanel from "./export-panel";
import WorkspaceToolbar from "./workspace-toolbar";

const GradientScreen = () => {
  useGradientStore();
  useGridDotsStore();
  useMaskStore();
  const snapshot = getSnapshot();

  return (
    <main className="relative flex h-full min-h-[560px] min-w-0 max-w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl md:min-h-[420px]">
      <div
        data-gradient-preview
        className="absolute inset-0"
        style={buildPreviewStyle(snapshot)}
        role="img"
        aria-label="Live preview of the generated gradient"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />
      <div className="relative z-10 flex h-full min-w-0 flex-col justify-between gap-6 p-3 sm:p-5">
        <WorkspaceToolbar />
        <div className="pointer-events-none mx-auto max-w-xl text-center text-white drop-shadow-[0_2px_14px_rgba(0,0,0,.55)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/65">Live canvas</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">Make the background yours.</h1>
        </div>
        <ExportPanel />
      </div>
    </main>
  );
};

export default GradientScreen;
