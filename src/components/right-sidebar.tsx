import ThemeToggle from "./theme-toggle"
import ColorPicker from "./color-picker";
const RightSidebar = () => {

    return (
        <div className="flex flex-col items-center justify-between gap-5 ">
            <div className="flex items-center justify-between w-full ">
                <div className="text-2xl font-bold tracking-widest">
                    Gradio
                </div>
                <ThemeToggle />
            </div>
            <div className="flex flex-col gap-2">
                <ColorPicker />
                <ColorPicker />

            </div>

        </div>
    )
}

export default RightSidebar
