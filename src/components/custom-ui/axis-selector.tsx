"use client";

import { KeyboardEvent, PointerEvent, useRef, useState } from "react";
import { Switch } from "../ui/switch";

interface Position { x: number; y: number }
interface PointSelectorProps { position: Position; setPosition: (position: Position) => void }

export default function PointSelector({ position, setPosition }: PointSelectorProps) {
  const [snappy, setSnappy] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const clamp = (value: number) => Math.max(0, Math.min(value, 100));
  const normalize = (value: number) => snappy ? Math.round(value / 10) * 10 : Math.round(value);

  const updateFromPointer = (event: PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: normalize(clamp(((event.clientX - rect.left) / rect.width) * 100)), y: normalize(clamp(((event.clientY - rect.top) / rect.height) * 100)) });
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey || snappy ? 10 : 1;
    const movement: Record<string, Position> = { ArrowLeft: { x: -step, y: 0 }, ArrowRight: { x: step, y: 0 }, ArrowUp: { x: 0, y: -step }, ArrowDown: { x: 0, y: step } };
    const delta = movement[event.key];
    if (!delta) return;
    event.preventDefault();
    setPosition({ x: clamp(position.x + delta.x), y: clamp(position.y + delta.y) });
  };

  return (
    <div className="my-2">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold">Focal position</span>
        <label className="flex items-center gap-2 text-[10px] uppercase tracking-wider">Snap <Switch checked={snappy} onCheckedChange={setSnappy} /></label>
      </div>
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label="Gradient focal position"
        aria-valuenow={Math.round((position.x + position.y) / 2)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${Math.round(position.x)}% horizontal, ${Math.round(position.y)}% vertical`}
        className="relative h-40 touch-none overflow-hidden rounded-none border bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:20px_20px] text-foreground/15 outline-none focus:ring-2 focus:ring-ring"
        onPointerDown={handlePointerDown}
        onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updateFromPointer(event); }}
        onKeyDown={handleKeyDown}
      >
        <div className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-none border-2 border-white bg-red-500 shadow-lg transition-transform active:scale-110" style={{ left: `${position.x}%`, top: `${position.y}%` }} />
      </div>
      <div className="mt-2 text-center text-xs tabular-nums">{Math.round(position.x)}% · {Math.round(position.y)}%</div>
    </div>
  );
}
