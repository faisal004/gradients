"use client"
import ThemeToggle from "./theme-toggle"
import { useGradientStore } from "../store/gradient-store";
import ColorPicker from "./color-picker";
const RightSidebar = () => {
    const from = useGradientStore(s => s.from);
    const to = useGradientStore(s => s.to);
    const setFrom = useGradientStore(s => s.setFrom);
    const setTo = useGradientStore(s => s.setTo);
    return (
        <div className="flex flex-col items-center justify-between gap-5 ">
            <div className="flex items-center justify-between w-full ">
                <div className="text-2xl font-bold tracking-widest">
                    Gradio
                </div>
                <ThemeToggle />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <ColorPicker label="From" value={from} onChange={setFrom} />
                <ColorPicker label="To" value={to} onChange={setTo} />

            </div>

        </div>
    )
}

export default RightSidebar
