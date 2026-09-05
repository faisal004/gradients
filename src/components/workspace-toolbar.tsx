"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dice5, Redo2, RotateCcw, Undo2 } from "lucide-react";
import { applySnapshot, DEFAULT_SNAPSHOT, type GeneratorSnapshot, getSnapshot } from "@/lib/generator-state";
import { useGradientStore } from "@/store/gradient-store";
import { useGridDotsStore } from "@/store/grid-dots-store";
import { useMaskStore } from "@/store/masking-store";
import { useTextureStore } from "@/store/texture-store";
import { Button } from "./ui/button";

const MAX_HISTORY = 50;
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;

export default function WorkspaceToolbar() {
  const [, render] = useState(0);
  const current = useRef<GeneratorSnapshot>(DEFAULT_SNAPSHOT);
  const past = useRef<GeneratorSnapshot[]>([]);
  const future = useRef<GeneratorSnapshot[]>([]);
  const applying = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const refresh = () => render(value => value + 1);

  const apply = useCallback((snapshot: GeneratorSnapshot) => {
    applying.current = true;
    applySnapshot(snapshot);
    current.current = snapshot;
    window.setTimeout(() => { applying.current = false; }, 0);
    refresh();
  }, []);

  useEffect(() => {
    current.current = getSnapshot();
    const record = () => {
      if (applying.current) return;
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        const next = getSnapshot();
        if (JSON.stringify(next) === JSON.stringify(current.current)) return;
        past.current = [...past.current.slice(-(MAX_HISTORY - 1)), current.current];
        future.current = [];
        current.current = next;
        refresh();
      }, 220);
    };
    const unsubscribers = [useGradientStore.subscribe(record), useGridDotsStore.subscribe(record), useMaskStore.subscribe(record), useTextureStore.subscribe(record)];
    return () => { unsubscribers.forEach(unsubscribe => unsubscribe()); window.clearTimeout(timer.current); };
  }, []);

  const undo = () => {
    const previous = past.current.at(-1);
    if (!previous) return;
    future.current = [current.current, ...future.current];
    past.current = past.current.slice(0, -1);
    apply(previous);
  };

  const redo = () => {
    const next = future.current[0];
    if (!next) return;
    past.current = [...past.current, current.current];
    future.current = future.current.slice(1);
    apply(next);
  };

  const randomize = () => {
    const snapshot = getSnapshot();
    applySnapshot({
      ...snapshot,
      gradient: {
        ...snapshot.gradient,
        from: randomHex(),
        via: randomHex(),
        to: randomHex(),
        addVia: Math.random() > 0.45,
        direction: ["top", "top right", "right", "bottom right", "bottom", "bottom left", "left", "top left"][Math.floor(Math.random() * 8)],
      },
    });
  };

  return (
    <section className="flex w-fit items-center gap-1.5 rounded-none border border-white/15 bg-black/35 p-1.5 text-white shadow-lg backdrop-blur-md" aria-label="Design actions">
      <Button size="icon" variant="ghost" onClick={undo} disabled={!past.current.length} aria-label="Undo"><Undo2 /></Button>
      <Button size="icon" variant="ghost" onClick={redo} disabled={!future.current.length} aria-label="Redo"><Redo2 /></Button>
      <span className="mx-1 h-5 w-px bg-white/15" />
      <Button size="sm" variant="ghost" onClick={randomize}><Dice5 /> Randomize</Button>
      <Button size="sm" variant="ghost" onClick={() => applySnapshot(DEFAULT_SNAPSHOT)}><RotateCcw /> Reset</Button>
    </section>
  );
}
