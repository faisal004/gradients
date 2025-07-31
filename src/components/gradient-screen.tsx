"use client"
import { useGradientStore } from "../store/gradient-store";
import GradientCopyButton from "./gradient-copy-button";

const GradientScreen = () => {
  const from = useGradientStore(s => s.from);
  const to = useGradientStore(s => s.to);
  const via = useGradientStore(s => s.via);
  const direction = useGradientStore(s => s.direction);
  const fromPercentage = useGradientStore(s => s.fromPercentage);
  const toPercentage = useGradientStore(s => s.toPercentage);
  const viaPercentage = useGradientStore(s => s.viaPercentage);

  const buildGradient = () => {
    const colorStops = [
      `${from} ${fromPercentage}%`,
      ...(via ? [`${via} ${viaPercentage}%`] : []),
      `${to} ${toPercentage}%`
    ];

    return `linear-gradient(to ${direction}, ${colorStops.join(', ')})`;
  };

  return (
    <div className="h-full flex flex-col gap-5 mt-6 md:mt-0 items-center justify-center">
      <div
        className="aspect-[16/9] w-full max-w-[500px] max-h-[500px] border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-lg p-4 flex items-center justify-center"
        style={{
          backgroundImage: buildGradient(),
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