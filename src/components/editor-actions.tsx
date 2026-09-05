"use client";

import { Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import ThemeToggle from "./theme-toggle";
import { cn } from "@/lib/utils";

export default function EditorActions() {
  return (
    <div className="flex items-center gap-1">
      <ThemeToggle />
      <Link aria-label="Browse gradient presets" href="/presets" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
        <Sparkles className="h-5 w-5" />
      </Link>
      <Link aria-label="Open the Gradio GitHub repository" href="https://github.com/faisal004/gradients" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
        <Github className="h-5 w-5" />
      </Link>
    </div>
  );
}
