import { Colorful } from "@uiw/react-color";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => (
    <div className="flex items-center justify-between w-full relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-4 h-4 p-0 absolute right-3 top-1/2 -translate-y-1/2 z-10 rounded-full border-2 dark:border-zinc-100/20 border-zinc-900/20"
            style={{ backgroundColor: value }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <Colorful
            color={value}
            onChange={(color) => onChange(color.hex)}
          />
        </PopoverContent>
      </Popover>
      <Input 
        value={value} 
        onChange={e => onChange(e.target.value)}  
        className="w-full px-12 text-right"
      />
      <span className=" font-mono text-[10px] px-[8px] py-1 rounded bg-zinc-200/50 dark:bg-zinc-700/50 absolute left-[7px] top-1/2 -translate-y-1/2 ">{label}</span>
    </div>
  );


  export default ColorPicker