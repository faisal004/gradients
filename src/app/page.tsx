export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-8">
      <h1 className="text-white text-3xl font-bold text-center mb-8">Complete Gradient Collection</h1>
      
      {/* Your Original Examples */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Your Original Examples</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-radial from-pink-400 from-40% to-fuchsia-700"></div>
          <div className="size-18 rounded-full bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"></div>
          <div className="size-18 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% preserve-3d perspective-1000"></div>
          <div className="size-18 rounded-full [background:radial-gradient(ellipse_at_top_right,#79ba3f_4%,#df505c_47%,#820abb_42%)]"></div>
          <div className="size-18 rounded-full bg-radial-[ellipse_30px_15px_at_60%_40%] from-rose-200 via-pink-400 to-indigo-900 to-95%"></div>
        </div>
      </div>

      {/* Linear Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Linear Gradients</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div className="size-18 rounded-full bg-gradient-to-br from-green-400 to-blue-600"></div>
          <div className="size-18 rounded-full bg-gradient-to-t from-yellow-400 via-red-500 to-pink-500"></div>
          <div className="size-18 rounded-full bg-gradient-to-bl from-cyan-400 to-blue-600"></div>
          <div className="size-18 rounded-full bg-gradient-to-tr from-orange-400 via-red-400 to-purple-600"></div>
          <div className="size-18 rounded-full bg-gradient-to-l from-emerald-400 to-cyan-400"></div>
          <div className="size-18 rounded-full bg-[linear-gradient(45deg,_#ff6b6b,_#4ecdc4,_#45b7d1)]"></div>
          <div className="size-18 rounded-full bg-[linear-gradient(135deg,_#667eea,_#764ba2)]"></div>
        </div>
      </div>

      {/* Conic Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Conic Gradients</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-conic-gradient from-red-500 via-yellow-500  to-purple-500"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_0deg,_#ff006e,_#fb5607,_#ffbe0b,_#8338ec,_#3a86ff)]"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_45deg,_#667eea,_#764ba2,_#667eea)]"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_90deg_at_25%_25%,_#ff9a9e,_#fecfef,_#fecfef)]"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_180deg_at_75%_75%,_#a8edea,_#fed6e3)]"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_270deg,_#fa709a,_#fee140)]"></div>
        </div>
      </div>

      {/* Advanced Radial Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Advanced Radial Gradients</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-radial-[circle_at_top] from-amber-200 to-orange-600"></div>
          <div className="size-18 rounded-full bg-radial-[circle_at_bottom_left] from-green-300 to-green-800"></div>
          <div className="size-18 rounded-full bg-radial-[ellipse_at_center] from-purple-300 via-blue-400 to-indigo-800"></div>
          <div className="size-18 rounded-full bg-radial-[circle_at_top_right] from-pink-300 to-rose-700"></div>
          <div className="size-18 rounded-full bg-[radial-gradient(circle_at_80%_20%,_#667eea,_#764ba2)]"></div>
          <div className="size-18 rounded-full bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,_#ff9a9e,_#fecfef)]"></div>
        </div>
      </div>

      {/* Repeating Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Repeating Gradients</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-[repeating-linear-gradient(45deg,_#ff6b6b,_#ff6b6b_10px,_#4ecdc4_10px,_#4ecdc4_20px)]"></div>
          <div className="size-18 rounded-full bg-[repeating-linear-gradient(90deg,_#667eea,_#667eea_5px,_#764ba2_5px,_#764ba2_10px)]"></div>
          <div className="size-18 rounded-full bg-[repeating-radial-gradient(circle,_#ff9a9e,_#ff9a9e_10px,_#fecfef_10px,_#fecfef_20px)]"></div>
          <div className="size-18 rounded-full bg-[repeating-conic-gradient(from_0deg,_#fa709a_0deg,_#fa709a_30deg,_#fee140_30deg,_#fee140_60deg)]"></div>
        </div>
      </div>

      {/* Multi-Stop Complex Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Multi-Stop Complex Gradients</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="size-18 rounded-full bg-[linear-gradient(90deg,_#ff0000_0%,_#ff8000_16.66%,_#ffff00_33.33%,_#00ff00_50%,_#0000ff_66.66%,_#8000ff_83.33%,_#ff00ff_100%)]"></div>
          <div className="size-18 rounded-full bg-radial from-white via-yellow-200 via-orange-300 via-red-400 to-purple-800"></div>
          <div className="size-18 rounded-full bg-[radial-gradient(circle,_#ffffff_0%,_#fef7cd_25%,_#fed7aa_50%,_#f093fb_75%,_#4c1d95_100%)]"></div>
        </div>
      </div>

      {/* Mesh/Glass Effect Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Mesh/Glass Effect Gradients</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.8)_0%,_rgba(255,255,255,0.2)_50%,_rgba(0,0,0,0.8)_100%)]"></div>
          <div className="size-18 rounded-full bg-[linear-gradient(135deg,_rgba(255,255,255,0.1),_rgba(255,255,255,0)),_linear-gradient(225deg,_rgba(0,255,255,0.3),_rgba(0,0,255,0.8))]"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_0deg,_rgba(255,0,150,0.8),_rgba(0,255,255,0.3),_rgba(255,255,0,0.8))]"></div>
          <div className="size-18 rounded-full bg-[radial-gradient(ellipse_at_top_left,_rgba(120,119,198,0.3),_transparent_50%),_radial-gradient(ellipse_at_bottom_right,_rgba(255,94,77,0.3),_transparent_50%)]"></div>
        </div>
      </div>

      {/* Animated Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Interactive Gradients</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 hover:from-pink-400 hover:to-purple-400 transition-all duration-1000"></div>
          <div className="size-18 rounded-full bg-radial from-blue-400 to-purple-600 hover:from-green-400 hover:to-blue-600 transition-all duration-700"></div>
          <div className="size-18 rounded-full bg-conic-gradient from-red-500 to-yellow-500 hover:animate-spin"></div>
          <div className="size-18 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 hover:scale-110 transition-transform duration-300"></div>
        </div>
      </div>

      {/* Custom Complex Gradients */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Custom Complex Patterns</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-[radial-gradient(circle_at_25%_25%,_#667eea_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_#764ba2_0%,_transparent_50%),_linear-gradient(45deg,_#f093fb,_#f5576c)]"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,_#ff006e_0deg,_#fb5607_60deg,_#ffbe0b_120deg,_#8338ec_180deg,_#3a86ff_240deg,_#06ffa5_300deg,_#ff006e_360deg)]"></div>
          <div className="size-18 rounded-full bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_25%,_rgba(255,255,255,0.1)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.1)_75%),_radial-gradient(circle,_#667eea,_#764ba2)]"></div>
          <div className="size-18 rounded-full bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,_rgba(120,119,198,0.8),_transparent),_linear-gradient(to_top_right,_#fa709a,_#fee140)]"></div>
        </div>
      </div>

      {/* Gradient Stops with Percentages */}
      <div className="mb-12">
        <h2 className="text-white text-xl mb-4">Precise Color Stops</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="size-18 rounded-full bg-[linear-gradient(90deg,_#ff0000_0%,_#ff0000_20%,_#ffff00_20%,_#ffff00_40%,_#00ff00_40%,_#00ff00_60%,_#0000ff_60%,_#0000ff_80%,_#800080_80%,_#800080_100%)]"></div>
          <div className="size-18 rounded-full bg-[radial-gradient(circle,_#ffffff_10%,_#ff6b6b_30%,_#4ecdc4_60%,_#45b7d1_90%)]"></div>
          <div className="size-18 rounded-full bg-[conic-gradient(from_0deg,_#667eea_0%,_#667eea_25%,_#764ba2_25%,_#764ba2_50%,_#f093fb_50%,_#f093fb_75%,_#f5576c_75%,_#f5576c_100%)]"></div>
        </div>
      </div>

    
    </div>
  );
}