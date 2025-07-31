type GradientType = "linear" | "radial";

interface ConvertToTailwindOptions {
  type: GradientType;
  from: string;
  to: string;
  via?: string;
  direction?: string;
  fromPercentage?: number;
  toPercentage?: number;
  viaPercentage?: number;
}

const convertToTailwind = ({
  type,
  from,
  to,
  via,
  direction = "r",
  fromPercentage = 0,
  toPercentage = 100,
  viaPercentage = 50
}: ConvertToTailwindOptions): string => {
  const buildColorStops = () => {
    const stops = [
      fromPercentage !== 0 ? `${from}_${fromPercentage}%` : from,
      ...(via && via !== "" ? [viaPercentage !== 50 ? `${via}_${viaPercentage}%` : via] : []),
      toPercentage !== 100 ? `${to}_${toPercentage}%` : to
    ];
    return stops.join(',');
  };

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
      
      const angle = directionMap[direction] || '90deg';
      return `bg-[linear-gradient(${angle},${buildColorStops()})]`;
    }
    case "radial": {
      return `bg-[radial-gradient(circle,${buildColorStops()})]`;
    }
    default:
      return "";
  }
};

export default convertToTailwind;