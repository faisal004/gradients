"use client";

import { useMaskStore } from "@/store/masking-store";
import { Switch } from "../ui/switch";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import ColorPicker from "../color-picker";
import PercentageSlider from "../percentage-slider";
import PointSelector from "../custom-ui/axis-selector";

const MASK_DIRECTIONS = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "left", label: "Left" },
  { value: "right", label: "Right" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
] as const;

export default function MaskControls() {
  const mask = useMaskStore();
  const setPreset = (preset: "fade" | "spotlight" | "vignette" | "edge") => {
    if (preset === "fade") useMaskStore.setState({ addMask: true, maskType: "linear", direction: "bottom", from: "black", via: null, to: "transparent" });
    if (preset === "spotlight") useMaskStore.setState({ addMask: true, maskType: "radial", radialShape: "circle", from: "black", via: "black", to: "transparent", fromPercentage: 0, viaPercentage: 35, toPercentage: 75 });
    if (preset === "vignette") useMaskStore.setState({ addMask: true, maskType: "radial", radialShape: "ellipse", from: "black", via: "black", to: "transparent", fromPercentage: 20, viaPercentage: 55, toPercentage: 100 });
    if (preset === "edge") useMaskStore.setState({ addMask: true, maskType: "linear", direction: "right", from: "transparent", via: "black", to: "transparent", fromPercentage: 0, viaPercentage: 50, toPercentage: 100 });
  };

  return (
    <section className="control-card">
      <div className="flex items-center justify-between">
        <h2 className="control-title">Mask</h2>
        <Switch checked={mask.addMask} onCheckedChange={mask.setAddMask} aria-label="Enable mask" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Select value={mask.maskType} onValueChange={value => mask.setMaskType(value as "linear" | "radial")}>
          <SelectTrigger className="w-full text-xs" aria-label="Mask type">
            <SelectValue placeholder="Mask type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="radial">Radial</SelectItem>
          </SelectContent>
        </Select>
        {mask.maskType === "linear" ? (
          <Select value={mask.direction.replaceAll(" ", "-")} onValueChange={value => mask.setDirection(value as typeof mask.direction)}>
            <SelectTrigger className="w-full text-xs" aria-label="Mask direction">
              <SelectValue placeholder="Direction" />
            </SelectTrigger>
            <SelectContent>
              {MASK_DIRECTIONS.map(item => (
                <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Select value={mask.radialShape} onValueChange={value => mask.setRadialShape(value as "circle" | "ellipse")}>
            <SelectTrigger className="w-full text-xs" aria-label="Mask shape">
              <SelectValue placeholder="Shape" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="ellipse">Ellipse</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {(["fade", "spotlight", "vignette", "edge"] as const).map(preset => <button key={preset} onClick={() => setPreset(preset)} className="rounded-none border px-1.5 py-1 text-[10px] capitalize transition-colors hover:bg-foreground hover:text-background">{preset}</button>)}
      </div>
      {mask.addMask && <>
        <label className="flex items-center justify-between text-xs"><span>Middle stop</span><Switch checked={Boolean(mask.via)} onCheckedChange={checked => mask.setVia(checked ? "black" : null)} /></label>
        <ColorPicker label="From" value={mask.from} onChange={mask.setFrom} />
        {mask.via && <ColorPicker label="Via" value={mask.via} onChange={mask.setVia} />}
        <ColorPicker label="To" value={mask.to} onChange={mask.setTo} />
        <div className="flex p-2">
          <PercentageSlider label="From" value={mask.fromPercentage} onChange={mask.setFromPercentage} />
          <PercentageSlider label="Via" value={mask.viaPercentage} onChange={mask.setViaPercentage} disabled={!mask.via} />
          <PercentageSlider label="To" value={mask.toPercentage} onChange={mask.setToPercentage} />
        </div>
        {mask.maskType === "radial" && <PointSelector position={mask.radialPosition} setPosition={mask.setRadialPosition} />}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-xs">
            <label htmlFor="mask-size">Mask size</label>
            <Input
              id="mask-size"
              value={mask.maskSize}
              onChange={event => mask.setMaskSize(event.target.value)}
              className="font-mono text-xs"
            />
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <span>Repeat</span>
            <Select value={mask.maskRepeat} onValueChange={value => mask.setMaskRepeat(value as typeof mask.maskRepeat)}>
              <SelectTrigger className="w-full text-xs" aria-label="Mask repeat">
                <SelectValue placeholder="Repeat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-repeat">No repeat</SelectItem>
                <SelectItem value="repeat">Repeat</SelectItem>
                <SelectItem value="repeat-x">Repeat X</SelectItem>
                <SelectItem value="repeat-y">Repeat Y</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </>}
    </section>
  );
}
