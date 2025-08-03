export  type GradientType = "linear" | "radial";

interface ConvertToTailwindOptions {
  type: GradientType;
  from: string;
  to: string;
  via?: string;
  direction?: string;
  fromPercentage?: number;
  toPercentage?: number;
  viaPercentage?: number;
  addGrid?: boolean;
  addDots?: boolean;
  gridSize?: number;
  dotsSize?: number;
  gridColor?: string;
  dotsColor?: string;
}

const convertToTailwind = ({
  type,
  from,
  to,
  via,
  direction = "r",
  fromPercentage = 0,
  toPercentage = 100,
  viaPercentage = 50,
  addGrid = false,
  addDots = false,
  gridSize = 20,
  dotsSize = 20,
  gridColor = "#e5e7eb",
  dotsColor = "#e5e7eb"
}: ConvertToTailwindOptions): string => {
  const buildColorStops = () => {
    const stops = [
      fromPercentage !== 0 ? `${from} ${fromPercentage}%` : from,
      ...(via && via !== "" ? [viaPercentage !== 50 ? `${via} ${viaPercentage}%` : via] : []),
      toPercentage !== 100 ? `${to} ${toPercentage}%` : to
    ];
    return stops.join(',');
  };

  const buildCombinedBackground = () => {
    const colorStops = buildColorStops();

    switch (type) {
      case "linear": {
        const directionMap: Record<string, string> = {
          't': '0deg',
          'tr': '45deg',
          'r': '90deg',
          'br': '135deg',
          'b': '180deg',
          'bl': '225deg',
          'l': '270deg',
          'tl': '315deg'
        };
        const dir = directionMap[direction] || 'to right';

        if (addGrid) {
          return `
          <div class="relative bg-[linear-gradient(${dir},${colorStops})] h-[100vh] w-[100vw]">
          <div class="absolute inset-0 bg-[linear-gradient(to_right,${gridColor}_1px,transparent_1px),linear-gradient(to_bottom,${gridColor}_1px,transparent_1px)] bg-[size:${gridSize}px_${gridSize}px]"></div>
          </div>`;
        } else if (addDots) {
          return `
          <div class="relative bg-[linear-gradient(${dir},${colorStops})] h-[100vh] w-[100vw]">

          <div class="absolute inset-0 bg-[radial-gradient(circle,${dotsColor}_1px,transparent_1px)] bg-[size:${dotsSize}px_${dotsSize}px]"></div>
          </div>`;
        } else {
          return `bg-[linear-gradient(${dir},${colorStops})]`;
        }
      }
      case "radial": {
        if (addGrid) {
          return `
          <div class="relative bg-[radial-gradient(circle,${colorStops})] h-[100vh] w-[100vw]">
          <div class="absolute inset-0 bg-[linear-gradient(to_right,${gridColor}_1px,transparent_1px),linear-gradient(to_bottom,${gridColor}_1px,transparent_1px)] bg-[size:${gridSize}px_${gridSize}px]"></div>
          </div>`;
        } else if (addDots) {
          return `
          <div class="relative bg-[radial-gradient(circle,${colorStops})] h-[100vh] w-[100vw]">
          <div class="absolute inset-0 bg-[radial-gradient(circle,${dotsColor}_1px,transparent_1px)] bg-[size:${dotsSize}px_${dotsSize}px]"></div>
          </div>`;
        } else {
          return `bg-[radial-gradient(circle,${colorStops})]`;
        }
      }
      default:
        return "";
    }
  };

  return buildCombinedBackground();
};

export default convertToTailwind;