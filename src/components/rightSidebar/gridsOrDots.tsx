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

        <div className="flex flex-col gap-3 w-full border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-[0_1px_5px_rgb(0,0,0,0.2)] p-3">
            <div className="flex items-center justify-between w-full text-sm px-1">
                <div className=" font-bold tracking-widest">
                    Grids Or Dots
                </div>
            </div>
            <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full rounded-[2px]">
                    <TabsTrigger value="account" className="rounded-[3px]">Grids</TabsTrigger>
                    <TabsTrigger value="password" className="rounded-[3px]">Dots</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="border border-zinc-800/20 dark:border-zinc-800 rounded-[3px] overflow-hidden p-3 space-y-5">
                    <div className="flex items-center   justify-end">

                        <div className="flex items-center gap-2">
                            <Label>Add Grids</Label>
                            <Switch checked={addGrid} onCheckedChange={(checked) => { if (addDots) { setAddDots(false) } setAddGrid(!addGrid) }} />
                        </div>

                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Grid Size</div>
                        <Slider value={[gridSize]} min={5} max={100} onValueChange={(e) => setGridSize(Number(e))} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Grid Color</div>
                        <ColorPicker label="Grid Color" value={gridColor} onChange={(e) => setGridColor(e)} />
                    </div>
                </TabsContent>
                <TabsContent value="password" className="border border-zinc-800/20 dark:border-zinc-800 rounded-[3px] overflow-hidden p-3 space-y-5">
                    <div className="flex items-center   justify-end">

                        <div className="flex items-center gap-2">
                            <Label>Add Dots</Label>
                            <Switch checked={addDots} onCheckedChange={(checked) => { if (addGrid) { setAddGrid(false) } setAddDots(!addDots) }} />
                        </div>

                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Dots Size</div>
                        <Slider value={[dotsSize]} min={5} max={100} onValueChange={(e) => setDotsSize(Number(e))} />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="font-bold text-sm w-full text-left">Dots Color</div>
                        <ColorPicker label="Dots Color" value={dotsColor} onChange={(e) => setDotsColor(e)} />
                    </div>
                </TabsContent>
            </Tabs> 
        </div>
    )
}


export default GridsOrDots