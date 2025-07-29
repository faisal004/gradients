"use client"
import { useGradientStore } from "../store/gradient-store";
const GradientScreen = () => {

  const from = useGradientStore(s => s.from);
  const to = useGradientStore(s => s.to);
  return (
    <div className=" h-full flex items-center justify-center ">

      <div
        className="aspect-[16/9] w-full max-w-[500px] max-h-[500px] border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-lg p-4 flex items-center justify-center"
        style={{
          background: `radial-gradient(ellipse, ${from}, ${to})`,
        }}
      >
        Keep building.
      </div>
    </div>
  )
}

export default GradientScreen
