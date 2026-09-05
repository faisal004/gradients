"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGridDotsStore } from "@/store/grid-dots-store";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Slider } from "@/components/ui/slider"
import ColorPicker from "../color-picker";
const GridsOrDots = () => {

    const { addGrid, setAddGrid, addDots, setAddDots, gridSize, setGridSize, dotsSize, setDotsSize,gridColor,setGridColor,dotsColor,setDotsColor } = useGridDotsStore();


    return (

        <section className="control-card">
            <div className="flex items-center justify-between w-full text-sm px-1">
                <div className=" font-bold tracking-widest">
                    Grids Or Dots
                </div>
            </div>
            <Tabs defaultValue={addDots ? "dots" : "grid"} className="w-full">
                <TabsList className="w-full rounded-[2px]">
                    <TabsTrigger value="grid" className="rounded-[3px]">Grid</TabsTrigger>
                    <TabsTrigger value="dots" className="rounded-[3px]">Dots</TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="border border-zinc-800/20 dark:border-zinc-800 rounded-[3px] overflow-hidden p-3 space-y-5">
                    <div className="flex items-center   justify-end">

                        <div className="flex items-center gap-2">
                            <Label>Add Grids</Label>
                            <Switch checked={addGrid} onCheckedChange={(checked) => { if (checked) setAddDots(false); setAddGrid(checked); }} />
                        </div>

                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Grid Size</div>
                        <Slider value={[gridSize]} min={5} max={100} onValueChange={(values) => setGridSize(values[0])} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Grid Color</div>
                        <ColorPicker label="Grid Color" value={gridColor} onChange={(e) => setGridColor(e)} />
                    </div>
                </TabsContent>
                <TabsContent value="dots" className="border border-zinc-800/20 dark:border-zinc-800 rounded-[3px] overflow-hidden p-3 space-y-5">
                    <div className="flex items-center   justify-end">

                        <div className="flex items-center gap-2">
                            <Label>Add Dots</Label>
                            <Switch checked={addDots} onCheckedChange={(checked) => { if (checked) setAddGrid(false); setAddDots(checked); }} />
                        </div>

                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Dots Size</div>
                        <Slider value={[dotsSize]} min={5} max={100} onValueChange={(values) => setDotsSize(values[0])} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Dots Color</div>
                        <ColorPicker label="Dots Color" value={dotsColor} onChange={(e) => setDotsColor(e)} />
                    </div>
                </TabsContent>
            </Tabs> 
        </section>
    )
}


export default GridsOrDots
