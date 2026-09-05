"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shuffle, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { applySnapshot } from "@/lib/generator-state";
import { buildPreviewStyle } from "@/lib/gradient-output";
import { GRADIENT_PRESETS, type GradientPreset } from "@/lib/presets";
import { cn } from "@/lib/utils";

const shuffled = (items: GradientPreset[]) => [...items].sort(() => Math.random() - 0.5);

export default function PresetsPage() {
  const router = useRouter();
  const [presets, setPresets] = useState(GRADIENT_PRESETS);

  const selectPreset = (item: GradientPreset) => {
    applySnapshot(structuredClone(item.snapshot));
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-background px-4 pb-16 pt-20 text-foreground sm:px-6 md:pt-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-5 border-b pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "-ml-3 mb-4")}><ArrowLeft /> Back to editor</Link>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground"><Sparkles className="size-4" /> Gradio collection</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">Start somewhere beautiful.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">A small collection of gradients, patterns, and masks. Pick one, then make it completely yours in the editor.</p>
          </div>
          <Button variant="outline" onClick={() => setPresets(shuffled(presets))}><Shuffle /> Shuffle</Button>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Gradient presets">
          {presets.map(item => (
            <article key={item.id} className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
              <button className="block w-full text-left" onClick={() => selectPreset(item)} aria-label={`Use ${item.name} preset`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900" style={buildPreviewStyle(item.snapshot)}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">Use preset</span>
                </div>
                <div className="p-4">
                  <h2 className="font-semibold tracking-tight">{item.name}</h2>
                  <p className="mt-1.5 min-h-10 text-xs leading-5 text-muted-foreground">{item.description}</p>
                </div>
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
