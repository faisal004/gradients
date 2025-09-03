"use client";

import { useMaskStore } from "@/store/masking-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ColorPicker from "../color-picker";
import { motion, AnimatePresence } from "framer-motion"
import AnimatedSlider from "../percentage-slider"
import { Switch } from "../ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PointSelector from "../custom-ui/axis-selector";
import { CSS_DIRECTION_VALUES } from "@/lib/data/directions";

const MaskControls = () => {
  const {
    addMask,
    setAddMask,

    from,
    setFrom,
    via,
    setVia,
    to,
    setTo,
    fromPercentage,
    setFromPercentage,
    viaPercentage,
    setViaPercentage,
    toPercentage,
    setToPercentage,
    radialShape,
    maskType,setMaskType,
    setRadialShape,
    radialPosition,
    setRadialPosition,
    direction,
    setDirection

  } = useMaskStore();


  const toggleAddVia = () => {
    if (via) {
      setVia("")
    } else {
      setVia("rgba(0,0,0,0.5)")
    }
  }

  console.log(from)
  return (
    <div className="">
      <div className="flex flex-col gap-3 w-full border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-[0_1px_5px_rgb(0,0,0,0.2)] p-3">
        <div className="flex items-center justify-between w-full text-sm px-1">
          <div className=" w-full font-bold tracking-widest">
            Mask Controls
          </div>
          <Switch checked={addMask} onCheckedChange={() => { setAddMask(!addMask) }} />

        </div>
        <div className="flex flex-col gap-2 w-full mt-1 ">
          <Label className="flex items-center gap-2 w-full justify-end text-xs">
            Add Via
            <Input type="checkbox" onChange={toggleAddVia} className="w-full cursor-pointer size-3 " />
          </Label>
          <ColorPicker label="From" value={from} onChange={setFrom} />
          <AnimatePresence>
            {via && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  height: { duration: 0.4 }
                }}
              >
                <ColorPicker label="Via" value={via || ""} onChange={setVia} />
              </motion.div>
            )}
          </AnimatePresence>
          <ColorPicker label="To" value={to} onChange={setTo} />
        </div>
             <div className="flex flex-col gap-2 w-full">
                <div className="font-bold text-sm w-full text-left">
                    Gradient Type
                </div>
                <Select onValueChange={setMaskType} defaultValue={maskType}>
                    <SelectTrigger className="w-full text-xs ">
                        <SelectValue placeholder="Select Gradient Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="linear">Linear</SelectItem>
                        <SelectItem value="radial">Radial</SelectItem>
                    </SelectContent>
                </Select>
                <AnimatePresence mode="wait">
                    {maskType === "radial" && (
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
                            <div
                                className=" mt-5"
                            >
                                
                                <PointSelector position={radialPosition} setPosition={setRadialPosition} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {maskType === "linear" &&
                    <div className="flex flex-col gap-2 w-full">
                        <div className="font-bold text-sm w-full text-left">
                            Gradient Direction
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
        <div className="flex h-full   w-full p-3">

        <AnimatedSlider label="From" defaultValue={fromPercentage} onChange={(value) => setFromPercentage(value)} />
        <AnimatedSlider label="From" defaultValue={viaPercentage} onChange={(value) => setViaPercentage(value)} disabled={!via}  />
        <AnimatedSlider label="From" defaultValue={toPercentage} onChange={(value) => setToPercentage(value)} />
      </div>
      </div>

      


    </div>
  );
};

export default MaskControls;