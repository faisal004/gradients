"use client"
import { Github, Sparkles } from "lucide-react"
import Directions from "./rightSidebar/directions"
import Palette from "./rightSidebar/palette"
import ThemeToggle from "./theme-toggle"
import {  buttonVariants } from "./ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import GradientRange from "./rightSidebar/gradient-rage"
import GridsOrDots from "./rightSidebar/gridsOrDots"
import TextureControls from "./rightSidebar/texture-controls"
import MaskControls from "./rightSidebar/mask-controller"

const RightSidebar = () => {
    return (
        <div className="flex flex-col items-center justify-between gap-4">
            <div className="md:flex items-center justify-between w-full hidden ">
                <div className="text-2xl font-bold tracking-widest">
                    Gradio
                </div>
                <div className="flex items-center gap-1">
                <ThemeToggle />
                <Link aria-label="Browse gradient presets" href="/presets" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                    <Sparkles className="h-5 w-5" />
                </Link>
                <Link aria-label="Open the Gradio GitHub repository" href="https://github.com/faisal004/gradients" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                    <Github className="h-5 w-5" />
                </Link>
            </div>
            </div>
            <div className="flex flex-col gap-2.5 w-full">
                <Palette />
                <Directions />
                <GradientRange />
                <GridsOrDots />
                <TextureControls />
                <MaskControls />
            </div>
        </div>
    )
}

export default RightSidebar
