"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { HexAlphaColorPicker } from "react-colorful";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  const isValid = typeof CSS === "undefined" || CSS.supports("color", value);
  return <div className="flex items-center justify-between w-full relative">
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-4 h-4 p-0 absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-none border-2 dark:border-zinc-100/20 border-zinc-900/20"
          style={{ backgroundColor: value }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-fit z-50" align="end">

        <HexAlphaColorPicker
          color={value}
          onChange={(color) => onChange(color)}

        />
      </PopoverContent>
    </Popover>
    <Input
      aria-label={`${label} color`}
      aria-invalid={!isValid}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full px-12 text-right ${isValid ? "" : "border-red-500 text-red-500"}`}
    />
    <span className=" font-mono text-[10px] px-[8px] py-1 rounded-none bg-zinc-200/50 dark:bg-zinc-700/50 absolute left-[7px] top-1/2 -translate-y-1/2 ">{label}</span>
    {!isValid && <span className="sr-only" role="alert">Invalid CSS color</span>}
  </div>
};


export default ColorPicker
