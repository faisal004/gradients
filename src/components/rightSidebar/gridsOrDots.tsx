"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGradientStore } from "@/store/gradient-store";

const GridsOrDots = () => {
    const addGrid = useGradientStore(s => s.addGrid);
    const setAddGrid = useGradientStore(s => s.setAddGrid);
    const addDots = useGradientStore(s => s.addDots);
    const setAddDots = useGradientStore(s => s.setAddDots);


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
                <TabsContent value="account">

                    <input className="size-5" type="checkbox" checked={addGrid} onChange={(e) => setAddGrid(!addGrid)} />
                </TabsContent>
                <TabsContent value="password">
                    <input className="size-5" type="checkbox" checked={addDots} onChange={(e) => setAddDots(!addDots)} />
                </TabsContent>
            </Tabs>
        </div>
    )
}


export default GridsOrDots