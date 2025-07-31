"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Copy, Check } from "lucide-react"
import { useGradientStore } from "../store/gradient-store"
import convertCSSDirectionToTailwindDirection from "@/lib/functions/convert-css-to-tailwind-dir"
import convertToTailwind from "@/lib/functions/convert-to-tailwind"

const GradientCopyButton = () => {
    const [isCopied, setIsCopied] = useState(false)
    const from = useGradientStore(s => s.from);
    const to = useGradientStore(s => s.to);
    const via = useGradientStore(s => s.via);
    const direction = useGradientStore(s => s.direction);
    const fromPercentage = useGradientStore(s => s.fromPercentage);
    const toPercentage = useGradientStore(s => s.toPercentage);
    const viaPercentage = useGradientStore(s => s.viaPercentage);

    const copy = () => {
        const tailwindDirection = convertCSSDirectionToTailwindDirection(direction)
        const tailwind = convertToTailwind({
            type: "linear",
            from,
            to,
            via,
            direction: tailwindDirection,
            fromPercentage,
            toPercentage,
            viaPercentage
        })
        navigator.clipboard.writeText(tailwind)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    return (
        <Button
            onClick={copy}
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
            </motion.button>
        </Button>
    )
}

export default GradientCopyButton