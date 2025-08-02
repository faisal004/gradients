"use client";

import { useGradientStore } from "../store/gradient-store";
import GradientCopyButton from "./gradient-copy-button";
import { useGridDotsStore } from "../store/grid-dots-store";

const GradientScreen = () => {
  const { from,to,via,direction,fromPercentage,toPercentage,viaPercentage} = useGradientStore();
  const {addGrid,addDots} = useGridDotsStore();

  const buildGradient = () => {
    const colorStops = [
      `${from} ${fromPercentage}%`,
      ...(via ? [`${via} ${viaPercentage}%`] : []),
      `${to} ${toPercentage}%`
    ];

    return `linear-gradient(to ${direction}, ${colorStops.join(', ')})`;
  };

  const buildGrid = () => {
    if (!addGrid && !addDots) return '';

    if (addDots) {
      return `
        radial-gradient(circle, #e5e7eb 1px, transparent 1px),
        radial-gradient(circle, #e5e7eb 1px, transparent 1px)
      `.replace(/\s+/g, ' ').trim();
    }

    if (addGrid) {
      return `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `.replace(/\s+/g, ' ').trim();
    }

    return '';
  };

  const getBackgroundStyles = () => {
    const gridPattern = buildGrid();
    const gradient = buildGradient();

    if (!gridPattern) {
      return {
        backgroundImage: gradient,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      };
    }

    const backgroundImages = [gridPattern, gradient].filter(Boolean);

    return {
      backgroundImage: backgroundImages.join(', '),
      backgroundSize: addDots
        ? '20px 20px, 20px 20px, cover'
        : '60px 60px, 60px 60px, cover',
      backgroundRepeat: addDots
        ? 'repeat, repeat, no-repeat'
        : 'repeat, repeat, no-repeat',
      backgroundPosition: 'center, center, center'
    };
  };

  return (
    <div className="h-full flex flex-col gap-2 md:gap-5 mt-6 md:mt-0 items-center justify-center">
      <div
        className="aspect-[16/9] w-full max-w-[500px] max-h-[500px] border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-lg p-4 flex items-center justify-center relative"
        style={getBackgroundStyles()}
        role="img"
        aria-label={`Gradient preview with colors from ${from} to ${to}${via ? ` via ${via}` : ''}`}
      >
          Keep building.
      </div>

      <div className="flex items-center justify-center">
        <GradientCopyButton />
      </div>
    </div>
  );
};

export default GradientScreen;