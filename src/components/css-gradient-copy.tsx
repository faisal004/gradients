"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { getVanillaCSS } from "@/lib/gradient-output";
import { getSnapshot } from "@/lib/generator-state";
import { useGradientStore } from "@/store/gradient-store";
import { useGridDotsStore } from "@/store/grid-dots-store";
import { useMaskStore } from "@/store/masking-store";

export { getVanillaCSS } from "@/lib/gradient-output";

export default function CssGradientCopyButton() {
  useGradientStore(); useGridDotsStore(); useMaskStore();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(getVanillaCSS(getSnapshot()));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch { setCopied(false); }
  };
  return <Button onClick={copy}>{copied ? <Check /> : <Copy />} {copied ? "Copied" : "Vanilla CSS"}</Button>;
}
