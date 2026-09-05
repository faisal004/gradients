"use client";

import { useState, type ReactNode } from "react";
import GradientScreen from "@/components/gradient-screen";
import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";
import { cn } from "@/lib/utils";

type Pane = "color" | "overlay";

function SidebarFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside
      aria-label={label}
      className="z-10 min-w-0 rounded-xl border border-zinc-800/20 bg-[var(--brand)] p-3 shadow-lg lg:h-full lg:overflow-y-auto"
    >
      {children}
    </aside>
  );
}

export default function EditorLayout() {
  const [pane, setPane] = useState<Pane>("color");

  return (
    <div className="grid min-h-screen w-full min-w-0 gap-2 p-2 pt-16 font-mono lg:h-screen lg:grid-cols-[minmax(17rem,19rem)_minmax(0,1fr)_minmax(17rem,19rem)] lg:pt-2">
      <div className="hidden min-h-0 lg:block">
        <SidebarFrame label="Color controls">
          <LeftSidebar />
        </SidebarFrame>
      </div>

      <div className="z-10 min-h-[52vh] min-w-0 overflow-x-hidden lg:min-h-0">
        <GradientScreen />
      </div>

      <div className="hidden min-h-0 lg:block">
        <SidebarFrame label="Overlay controls">
          <RightSidebar />
        </SidebarFrame>
      </div>

      <section className="z-10 min-w-0 space-y-2 lg:hidden">
        <div className="grid grid-cols-2 gap-1 rounded-xl border border-zinc-800/20 bg-[var(--brand)] p-1 font-sans shadow-lg" role="tablist" aria-label="Editor panels">
          {([
            ["color", "Color"],
            ["overlay", "Overlay"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={pane === id}
              onClick={() => setPane(id)}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-[transform,background-color,color] duration-150 ease-out active:scale-[0.97]",
                pane === id ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <SidebarFrame label={pane === "color" ? "Color controls" : "Overlay controls"}>
          {pane === "color" ? <LeftSidebar /> : <RightSidebar />}
        </SidebarFrame>
      </section>
    </div>
  );
}
