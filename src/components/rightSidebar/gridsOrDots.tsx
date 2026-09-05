"use client";

import { useState } from "react";
import { useGridDotsStore } from "@/store/grid-dots-store";
import { Switch } from "../ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPicker from "../color-picker";

type PatternMode = "grid" | "dots";

export default function GridsOrDots() {
  const pattern = useGridDotsStore();
  const enabled = pattern.addGrid || pattern.addDots;
  const [lastMode, setLastMode] = useState<PatternMode>(pattern.addDots ? "dots" : "grid");
  const mode: PatternMode = pattern.addDots ? "dots" : pattern.addGrid ? "grid" : lastMode;
  const size = mode === "dots" ? pattern.dotsSize : pattern.gridSize;
  const color = mode === "dots" ? pattern.dotsColor : pattern.gridColor;

  const applyMode = (next: PatternMode) => {
    setLastMode(next);
    pattern.setAddGrid(next === "grid");
    pattern.setAddDots(next === "dots");
  };

  return (
    <section className="control-card">
      <div className="flex items-center justify-between">
        <h2 className="control-title">Pattern</h2>
        <Switch
          checked={enabled}
          onCheckedChange={checked => {
            if (checked) applyMode(mode);
            else {
              pattern.setAddGrid(false);
              pattern.setAddDots(false);
            }
          }}
          aria-label="Enable pattern"
        />
      </div>
      <Tabs value={mode} onValueChange={value => applyMode(value as PatternMode)} className="w-full">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="grid" className="rounded-none">Grid</TabsTrigger>
          <TabsTrigger value="dots" className="rounded-none">Dots</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-2">
        <div className="w-full text-left text-sm font-bold">{mode === "dots" ? "Dot size" : "Grid size"}</div>
        <Slider
          value={[size]}
          min={5}
          max={100}
          onValueChange={values => mode === "dots" ? pattern.setDotsSize(values[0]) : pattern.setGridSize(values[0])}
        />
      </div>
      <ColorPicker
        label="Color"
        value={color}
        onChange={value => mode === "dots" ? pattern.setDotsColor(value) : pattern.setGridColor(value)}
      />
    </section>
  );
}
