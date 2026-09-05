import EditorActions from "./editor-actions"

const Navbar = () => {
    return (
        <div className="flex fixed top-0 z-50 items-center px-4 justify-between w-full lg:hidden h-14 border-b border-zinc-800/20 dark:border-zinc-800 shadow-lg dark:bg-black bg-white ">
            <div className="text-2xl font-bold tracking-widest">
                Gradio
            </div>
            <EditorActions />
        </div>
    )
}
export default Navbar
