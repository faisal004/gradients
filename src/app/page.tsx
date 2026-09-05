
import GradientScreen from "@/components/gradient-screen";
import RightSidebar from "@/components/right-sidebar";

export default function Home() {
  return (
    <div className="grid min-h-screen w-full min-w-0 gap-2 overflow-x-hidden p-2 pt-16 font-mono md:h-screen md:grid-cols-12 md:pt-2">
      <div className="z-10 min-h-[58vh] min-w-0 md:col-span-9 md:min-h-0">
        <GradientScreen />
      </div>
      <aside className="z-10 min-w-0 rounded-xl border border-zinc-800/20 bg-[var(--brand)] p-3 shadow-lg md:col-span-3 md:overflow-y-auto">
        <RightSidebar />
      </aside>
    </div>
  );
}
