"use client"
import { Colorful } from "@uiw/react-color";
import { useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ColorPicker = () => {
    const [hex, setHex] = useState("#fff");

    return (
        <div className="flex items-center justify-between w-full relative">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-4 h-4 p-0 absolute left-3 top-1/2 -translate-y-1/2 z-10 rounded-full border-2 border-zinc-100/20"
                        style={{ backgroundColor: hex }}
                    />
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                    <Colorful
                        color={hex}
                        onChange={(color) => {
                            setHex(color.hex);
                        }}
                    />
                </PopoverContent>
            </Popover>
            <Input 
                value={hex} 
                onChange={(e) => setHex(e.target.value)}  
                className="w-full pl-12"
            />
        </div>
    )
}

export default ColorPicker