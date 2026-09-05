"use client";

import { useMemo, useState } from "react";
import { Check, Code2, Copy, Download } from "lucide-react";
import { Button } from "./ui/button";
import { getCSSVariables, getReactStyle, getSVG, getTailwind, getVanillaCSS } from "@/lib/gradient-output";
import { canvasToPngBlob, renderSnapshotToCanvas } from "@/lib/canvas-export";
import { getSnapshot } from "@/lib/generator-state";
import { useGradientStore } from "@/store/gradient-store";
import { useGridDotsStore } from "@/store/grid-dots-store";
import { useMaskStore } from "@/store/masking-store";
import { useTextureStore } from "@/store/texture-store";

type Format = "CSS" | "Tailwind" | "React" | "Variables" | "SVG";

export default function ExportPanel() {
  useGradientStore(); useGridDotsStore(); useMaskStore(); useTextureStore();
  const [format, setFormat] = useState<Format>("CSS");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const snapshot = getSnapshot();
  const outputs = useMemo(() => ({ CSS: getVanillaCSS(snapshot), Tailwind: getTailwind(snapshot), React: getReactStyle(snapshot), Variables: getCSSVariables(snapshot), SVG: getSVG(snapshot) }), [snapshot]);
  const code = outputs[format];
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); window.setTimeout(() => setCopied(false), 1500); } catch { setCopied(false); }
  };
  const download = async (kind: "svg" | "png") => {
    setError("");
    const svg = getSVG(snapshot);
    if (kind === "svg") {
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })); anchor.download = "gradio-gradient.svg"; anchor.click(); URL.revokeObjectURL(anchor.href); return;
    }
    try {
      const blob = await canvasToPngBlob(renderSnapshotToCanvas(snapshot));
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob); anchor.download = "gradio-gradient.png"; anchor.click();
      URL.revokeObjectURL(anchor.href);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "PNG export failed.");
    }
  };

  return (
    <section className="w-full min-w-0 rounded-xl border border-white/15 bg-black/45 text-white shadow-lg backdrop-blur-md">
      <div className="flex min-w-0 flex-wrap items-center gap-1.5 p-1.5">
        <Button size="sm" variant="ghost" onClick={() => setOpen(value => !value)} aria-expanded={open}><Code2 /> {open ? "Hide code" : "Show code"}</Button>
        <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto" role="group" aria-label="Export format">
          {(["CSS", "Tailwind", "React", "Variables", "SVG"] as Format[]).map(item => <button key={item} onClick={() => { setFormat(item); setOpen(true); }} className={`rounded-md px-2 py-1.5 text-xs transition-colors ${format === item ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>{item}</button>)}
        </div>
        <Button size="sm" variant="ghost" onClick={copy} className="ml-auto">{copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy"}</Button>
        <Button size="sm" variant="ghost" onClick={() => void download("svg")}><Download /> SVG</Button>
        <Button size="sm" variant="ghost" onClick={() => void download("png")}><Download /> PNG</Button>
      </div>
      {error && <p className="border-t border-red-400/20 px-3 py-2 text-xs text-red-300" role="alert">{error}</p>}
      {open && <pre className="max-h-44 overflow-auto border-t border-white/10 p-3 text-left text-[11px] leading-relaxed text-white/75"><code>{code}</code></pre>}
    </section>
  );
}
