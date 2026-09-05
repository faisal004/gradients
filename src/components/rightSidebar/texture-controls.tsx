"use client";

import { useTextureStore } from "@/store/texture-store";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function TextureControls() {
  const texture = useTextureStore();
  const enabled = texture.type !== "none";
  const mode = texture.type === "dither" ? "dither" : "noise";
  const sizeMin = mode === "dither" ? 2 : 80;
  const sizeMax = mode === "dither" ? 12 : 260;

  return (
    <section className="control-card">
      <div className="flex items-center justify-between">
        <h2 className="control-title">Texture</h2>
        <Switch
          checked={enabled}
          onCheckedChange={checked => texture.setType(checked ? mode : "none")}
          aria-label="Enable texture"
        />
      </div>
      <Tabs
        value={mode}
        onValueChange={value => texture.setType(value as "noise" | "dither")}
        className="w-full"
      >
        <TabsList className="w-full rounded-[2px]">
          <TabsTrigger value="noise" className="rounded-[3px]">Noise</TabsTrigger>
          <TabsTrigger value="dither" className="rounded-[3px]">Dither</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-2">
        <div className="w-full text-left text-sm font-bold">Intensity</div>
        <Slider value={[texture.intensity]} min={6} max={48} onValueChange={values => texture.setIntensity(values[0])} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-full text-left text-sm font-bold">{mode === "dither" ? "Pixel size" : "Grain size"}</div>
        <Slider value={[texture.scale]} min={sizeMin} max={sizeMax} onValueChange={values => texture.setScale(values[0])} />
      </div>
    </section>
  );
}
