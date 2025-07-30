"use client"
import { useGradientStore } from "../store/gradient-store";
import GradientCopyButton from "./gradient-copy-button";
const GradientScreen = () => {

  const from = useGradientStore(s => s.from);
  const to = useGradientStore(s => s.to);
  const via = useGradientStore(s => s.via);
  const direction = useGradientStore(s => s.direction);
  return (
    <div className=" h-full flex flex-col gap-5 items-center justify-center ">

      <div
        className="aspect-[16/9] w-full max-w-[500px] max-h-[500px] border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-lg p-4 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to ${direction}, ${from}${via ? `, ${via}` : ""}, ${to})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        Keep building.
      </div>
      <div className="flex items-center justify-center">
        <GradientCopyButton />
      </div>
    </div>
  )
}

export default GradientScreen
