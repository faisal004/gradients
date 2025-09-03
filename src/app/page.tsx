
import GradientScreen from "@/components/gradient-screen";
import RightSidebar from "@/components/right-sidebar";

export default function Home() {
  return (
    <div className="h-screen grid grid-rows-10 md:grid-rows-1 md:grid-cols-12 w-full p-2 space-x-2 relative font-mono">


      <div className="row-span-4 md:col-span-9 z-10 ">
        <GradientScreen />

      </div>
      <div className="row-span-6 md:col-span-3 z-10 dark:bg-[var(--brand)] bg-[var(--brand)]  border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-y-auto shadow-lg p-4 no-scrollbar">
        <RightSidebar />
      </div>
    </div>
  );
}