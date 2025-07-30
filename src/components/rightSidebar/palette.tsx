"use client"
import { useState } from "react"
import { useGradientStore } from "../../store/gradient-store"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "../ui/input"
import { Label } from "@/components/ui/label"
import ColorPicker from "../color-picker"

const Palette = () => {
        const [addVia, setAddVia] = useState(false)
        const from = useGradientStore(s => s.from);
        const to = useGradientStore(s => s.to);
        const setFrom = useGradientStore(s => s.setFrom);
        const setTo = useGradientStore(s => s.setTo);
        const via = useGradientStore(s => s.via);
        const setVia = useGradientStore(s => s.setVia);
    
        const toggleAddVia = () => {
            if (addVia) {
                setVia("")
            } else {
                setVia("#34692e")
            }
            setAddVia(!addVia)
        }
        return (

            <div className="flex flex-col gap-3 w-full border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-lg p-3">
            <div className="flex items-center justify-between w-full text-xs px-1">
                <div className=" font-bold tracking-widest">
                    Palette
                </div>
                <Label className="flex items-center gap-2 w-full justify-end text-xs">
                    Add Via
                    <Input type="checkbox" onChange={toggleAddVia} className="w-full cursor-pointer size-3 " />
                </Label>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <ColorPicker label="From" value={from} onChange={setFrom} />
                <AnimatePresence>
                    {addVia && (
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
        </div>
        )}


        export default Palette