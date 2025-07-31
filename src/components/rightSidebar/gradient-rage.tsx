"use client"
import { useGradientStore } from "../../store/gradient-store"

import AnimatedSlider from "../percentage-slider"
import { motion, AnimatePresence } from "framer-motion"

const GradientRange = () => {


    const addVia = useGradientStore(s => s.addVia);
    return (

        <div className="flex flex-col gap-3 w-full border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-[0_1px_5px_rgb(0,0,0,0.2)] p-3">
            <div className="flex items-center justify-between w-full text-sm px-1">
                <div className=" font-bold tracking-widest">
                    Gradient Range
                </div>

            </div>
            <div className="flex h-full   w-full p-3">
                <AnimatedSlider label="From" defaultValue={0} onChange={(value) => console.log(value)} />
            
                <AnimatedSlider label="Via" defaultValue={50} onChange={(value) => console.log(value)} disabled={!addVia} />

                <AnimatedSlider label="To" defaultValue={100} onChange={(value) => console.log(value)} />

            </div>
        </div>
    )
}


export default GradientRange