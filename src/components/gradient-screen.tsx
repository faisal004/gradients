"use client";

import { useGradientStore } from "../store/gradient-store";
import GradientCopyButton from "./gradient-copy-button";
import { useGridDotsStore } from "../store/grid-dots-store";
import CssGradientCopyButton from "./css-gradient-copy";

const GradientScreen = () => {
  const { from, to, via, direction, fromPercentage, toPercentage, viaPercentage, gradientType, radialShape, shapePosition } = useGradientStore();
  const { addGrid, addDots, gridSize, dotsSize, gridColor, dotsColor } = useGridDotsStore();
  const buildGradient = () => {
    const colorStops = [
      `${from} ${fromPercentage}%`,
      ...(via ? [`${via} ${viaPercentage}%`] : []),
      `${to} ${toPercentage}%`
    ];

    switch (gradientType) {
      case "linear":
        return `linear-gradient(to ${direction}, ${colorStops.join(',')})`;
      case "radial":
        return `radial-gradient(${radialShape} at ${shapePosition.x}% ${shapePosition.y}%, ${colorStops.join(',')})`;
    }
  };

  const buildGrid = () => {
    if (!addGrid && !addDots) return '';

    if (addDots) {
      return `
        radial-gradient(circle, ${dotsColor} 1px, transparent 1px),
        radial-gradient(circle, ${dotsColor} 1px, transparent 1px)
      `.replace(/\s+/g, ' ').trim();
    }

    if (addGrid) {
      return `
        linear-gradient(to right, ${gridColor} 1px, transparent 1px),
        linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)
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
        ? `${dotsSize}px ${dotsSize}px, ${dotsSize}px ${dotsSize}px, cover`
        : `${gridSize}px ${gridSize}px, ${gridSize}px ${gridSize}px, cover`,
      backgroundRepeat: addDots
        ? 'repeat, repeat, no-repeat'
        : 'repeat, repeat, no-repeat',
      backgroundPosition: 'center, center, center'
    };
  };

  return (
    <div className="h-full flex flex-col gap-2 md:gap-5 mt-6 md:mt-0  items-center justify-center">
      <div
        className="aspect-[16/9] w-full max-w-[500px] max-h-[500px] border border-zinc-800/20 dark:border-zinc-800 rounded-[10px] overflow-hidden shadow-lg p-4 flex items-center justify-center relative"
        style={getBackgroundStyles()}
        role="img"
        aria-label={`Gradient preview with colors from ${from} to ${to}${via ? ` via ${via}` : ''}`}
      >
        Keep building.
      </div>

      <div className="flex gap-2 items-center justify-center">
        <GradientCopyButton />

        <CssGradientCopyButton />
      </div>
    </div>
  );
};

export default GradientScreen;