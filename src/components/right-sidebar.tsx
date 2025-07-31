"use client"
import { Github } from "lucide-react"
import Directions from "./rightSidebar/directions"
import Palette from "./rightSidebar/palette"
import ThemeToggle from "./theme-toggle"
import { Button, buttonVariants } from "./ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import GradientRange from "./rightSidebar/gradient-rage"

const RightSidebar = () => {
    return (
        <div className="flex flex-col items-center justify-between gap-5 ">
            <div className="md:flex items-center justify-between w-full hidden ">
                <div className="text-2xl font-bold tracking-widest">
                    Gradio
                </div>
                <div className="flex items-center gap-1">
                <ThemeToggle />
                <Link href="https://github.com/faisal004/gradients" target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                    <Github className="h-5 w-5" />
                </Link>
            </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <Palette />
                <Directions />
                <GradientRange />
            </div>
        </div>
    )
}

export default RightSidebar