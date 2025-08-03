"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Copy, Check } from "lucide-react"
import { useGradientStore } from "../store/gradient-store"
import convertCSSDirectionToTailwindDirection from "@/lib/functions/convert-css-to-tailwind-dir"
import convertToTailwind from "@/lib/functions/convert-to-tailwind"
import { useGridDotsStore } from "@/store/grid-dots-store"

const GradientCopyButton = () => {
    const [isCopied, setIsCopied] = useState(false)
    const { from, to, via, direction, fromPercentage, toPercentage, viaPercentage ,gradientType,radialShape , shapePosition} = useGradientStore();
    const { addDots, addGrid, gridSize, dotsSize, gridColor, dotsColor } = useGridDotsStore();


    const copy = () => {
        const tailwindDirection = convertCSSDirectionToTailwindDirection(direction)
        const tailwind = convertToTailwind({
            type: gradientType,
            from,
            to,
            via,
            direction: tailwindDirection,
            fromPercentage,
            toPercentage,
            viaPercentage,
            addGrid,
            addDots,
            gridSize,
            dotsSize,
            gridColor,
            dotsColor,
            radialShape,
            shapePosition
        })
        navigator.clipboard.writeText(tailwind)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <Button
            onClick={copy}
            className="cursor-pointer"
            asChild
            
        >
            <motion.button
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
            >
                <AnimatePresence mode="wait">
                    {isCopied ? (
                        <motion.div
                            key="check"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Check />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="copy"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Copy />
                        </motion.div>
                    )}
                </AnimatePresence>
                <div>
                     Tailwind CSS
                </div>
            </motion.button>
        </Button>
    )
}

export default GradientCopyButton