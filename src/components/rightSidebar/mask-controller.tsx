"use client";

import { useMaskStore } from "@/store/masking-store";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ColorPicker from "../color-picker";
import PercentageSlider from "../percentage-slider";
import PointSelector from "../custom-ui/axis-selector";
import { CSS_DIRECTION_VALUES } from "@/lib/data/directions";

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
        <select value={mask.maskType} onChange={event => mask.setMaskType(event.target.value as "linear" | "radial")} className="control-select" aria-label="Mask type">
          <option value="linear">Linear mask</option><option value="radial">Radial mask</option>
        </select>
        {mask.maskType === "linear" ? (
          <select value={mask.direction} onChange={event => mask.setDirection(event.target.value as typeof mask.direction)} className="control-select" aria-label="Mask direction">
            {Object.entries(CSS_DIRECTION_VALUES).map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        ) : (
          <select value={mask.radialShape} onChange={event => mask.setRadialShape(event.target.value as "circle" | "ellipse")} className="control-select" aria-label="Mask shape">
            <option value="circle">Circle</option><option value="ellipse">Ellipse</option>
          </select>
        )}
      </div>
      <div className="grid grid-cols-4 gap-1">
        {(["fade", "spotlight", "vignette", "edge"] as const).map(preset => <button key={preset} onClick={() => setPreset(preset)} className="rounded-md border px-1.5 py-1 text-[10px] capitalize transition-colors hover:bg-foreground hover:text-background">{preset}</button>)}
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
        <div className="grid grid-cols-2 gap-2">
          <Label className="space-y-1 text-xs"><span>Mask size</span><Input value={mask.maskSize} onChange={event => mask.setMaskSize(event.target.value)} /></Label>
          <Label className="space-y-1 text-xs"><span>Repeat</span><select value={mask.maskRepeat} onChange={event => mask.setMaskRepeat(event.target.value as typeof mask.maskRepeat)} className="control-select w-full"><option value="no-repeat">No repeat</option><option value="repeat">Repeat</option><option value="repeat-x">Repeat X</option><option value="repeat-y">Repeat Y</option></select></Label>
        </div>
      </>}
    </section>
  );
}
