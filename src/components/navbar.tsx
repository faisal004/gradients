import { Github } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import {  buttonVariants } from "./ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const Navbar = () => {
    return (
        <div className="flex fixed top-0 z-50 items-center px-4 justify-between w-full md:hidden h-14 border-b border-zinc-800/20 dark:border-zinc-800 shadow-lg dark:bg-black bg-white ">
            <div className="text-2xl font-bold tracking-widest">
                Gradio
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Link href="https://github.com/faisal004/gradients" target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}>
                    <Github className="h-5 w-5" />
                </Link>
            </div>
        </div>
    )
}
export default Navbar
