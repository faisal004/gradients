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
import KnobWidget from "../knob"

const GradientRange = () => {
    const setDirection = useGradientStore(s => s.setDirection);
    const direction = useGradientStore(s => s.direction);
    return (

        <div className="flex flex-col gap-3 w-full border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-[0_1px_5px_rgb(0,0,0,0.2)] p-3">
            <div className="flex items-center justify-between w-full text-sm px-1">
                <div className=" font-bold tracking-widest">
                    Gradient Range
                </div>

            </div>
            <div className="flex flex-col gap-2 w-full">
             <KnobWidget label="From" percentage={0} onChange={ (value) => console.log(value)} />

            </div>
        </div>
    )
}


export default GradientRange