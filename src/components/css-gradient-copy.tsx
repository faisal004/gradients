"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Copy, Check } from "lucide-react"
import { useGradientStore } from "../store/gradient-store"
import { useGridDotsStore } from "../store/grid-dots-store"

export function getVanillaCSS({
    from, to, via, direction, fromPercentage, toPercentage, viaPercentage, gradientType, radialShape, shapePosition,
    addGrid, addDots, gridSize, dotsSize, gridColor, dotsColor
}: any) {
    const colorStops = [
        `${from} ${fromPercentage}%`,
        ...(via ? [`${via} ${viaPercentage}%`] : []),
        `${to} ${toPercentage}%`
    ];

    let gradient = "";
    if (gradientType === "linear") {
        gradient = `linear-gradient(to ${direction}, ${colorStops.join(',')})`;
    } else if (gradientType === "radial") {
        gradient = `radial-gradient(${radialShape} at ${shapePosition.x}% ${shapePosition.y}%, ${colorStops.join(',')})`;
    }

    let gridPattern = "";
    if (addDots) {
        gridPattern = `radial-gradient(circle, ${dotsColor} 1px, transparent 1px), radial-gradient(circle, ${dotsColor} 1px, transparent 1px)`;
    } else if (addGrid) {
        gridPattern = `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`;
    }

    let backgroundImage = gridPattern ? `${gridPattern}, ${gradient}` : gradient;
    let backgroundSize = gridPattern
        ? (addDots
            ? `${dotsSize}px ${dotsSize}px, ${dotsSize}px ${dotsSize}px, cover`
            : `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, cover`)
        : 'cover';
    let backgroundRepeat = gridPattern ? 'repeat, repeat, no-repeat' : 'no-repeat';
    let backgroundPosition = gridPattern ? 'center, center, center' : 'center';

    return [
        `background-image: ${backgroundImage};`,
        `background-size: ${backgroundSize};`,
        `background-repeat: ${backgroundRepeat};`,
        `background-position: ${backgroundPosition};`
    ].join('\n');
}

const CssGradientCopyButton = () => {
    const gradientStore = useGradientStore();
    const gridDotsStore = useGridDotsStore();
    const [isCopied, setIsCopied] = useState(false);

    const cssString = getVanillaCSS({ ...gradientStore, ...gridDotsStore });

    const copy = () => {
        navigator.clipboard.writeText(cssString);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <Button onClick={copy} className="cursor-pointer" asChild>
            <motion.button whileTap={{ scale: 0.95 }} transition={{ duration: 0.1 }}>
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
                <div>Vanilla CSS</div>
            </motion.button>
        </Button>
    );
};

export default CssGradientCopyButton;