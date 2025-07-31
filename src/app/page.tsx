
"use client"
import GradientScreen from "@/components/gradient-screen";
import KnobWidget from "@/components/knob";
import RightSidebar from "@/components/right-sidebar";

export default function Home() {
  return (
    <div className="h-screen grid md:grid-cols-12 w-full p-2 space-x-2  relative font-mono">
      <div
        className="absolute inset-0
      bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
      dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)]
      bg-[size:30px_30px]
      mask-r-from-80% mask-b-from-80% mask-radial-from-0% mask-radial-to-90%"
      ></div>

      <div className=" md:col-span-9 z-10">
        <GradientScreen />
 
      </div>
      <div className=" md:col-span-3 z-10 dark:bg-[var(--brand)] bg-[var(--brand)]  border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-lg p-4">
        <RightSidebar />
      </div>
    </div>
  );
}