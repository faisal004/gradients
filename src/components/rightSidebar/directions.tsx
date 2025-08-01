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
import DegreeSelector from "../degree-selector"

const Directions = () => {
    const setDirection = useGradientStore(s => s.setDirection);
    const direction = useGradientStore(s => s.direction);
    return (

        <div className="flex flex-col gap-3 w-full border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-[0_1px_5px_rgb(0,0,0,0.2)] p-3">
            <div className="flex items-center justify-between w-full text-sm px-1">
                <div className=" font-bold tracking-widest">
                    Gradient Direction
                </div>

            </div>
            <DegreeSelector />
            <div className="flex flex-col gap-2 w-full">
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
        </div>
    )
}


export default Directions