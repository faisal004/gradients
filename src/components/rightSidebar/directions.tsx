"use client"
import { useGradientStore } from "../../store/gradient-store"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CSS_DIRECTION_VALUES } from "@/lib/data/directions"
import PointSelector from "../custom-ui/axis-selector"
import { motion, AnimatePresence } from "framer-motion"

const Directions = () => {
    const { gradientType, setGradientType, direction, setDirection, radialShape, setRadialShape } = useGradientStore();
    return (

        <div className="flex flex-col gap-3 w-full border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-[0_1px_5px_rgb(0,0,0,0.2)] p-3">

            <div className="flex flex-col gap-2 w-full">
                <div className="font-bold text-sm w-full text-left">
                    Gradient Type
                </div>
                <Select onValueChange={setGradientType} defaultValue={gradientType}>
                    <SelectTrigger className="w-full text-xs ">
                        <SelectValue placeholder="Select Gradient Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                </Select>
                <AnimatePresence mode="wait">
                    {gradientType === "radial" && (
                        <motion.div
                            key="radial"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <div className="flex flex-col gap-2 w-full">
                                <div className="font-bold text-sm w-full text-left">
                                    Radial Shape
                                </div>
                                <Select onValueChange={setRadialShape} defaultValue={radialShape}>
                                    <SelectTrigger className="w-full text-xs ">
                                        <SelectValue placeholder="Select a radial shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="circle">Circle</SelectItem>
                                        <SelectItem value="ellipse">Ellipse</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <motion.div>
                                <PointSelector />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {gradientType === "linear" &&
                    <div className="flex flex-col gap-2 w-full">
                        <div className="font-bold text-sm w-full text-left">
                            Gradient Type
                        </div>
                        <Select onValueChange={setDirection} defaultValue={direction}>
                            <SelectTrigger className="w-full text-xs ">
                                <SelectValue placeholder="Select a direction" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(CSS_DIRECTION_VALUES).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                }


            </div>
        </div>
    )
}


export default Directions