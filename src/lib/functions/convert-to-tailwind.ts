type GradientType = "linear" | "radial";
interface ConvertToTailwindOptions {
  type: GradientType;
  from: string;
  to: string;
  via?: string;
  direction?: string; 
}

const convertToTailwind = ({
  type,
  from,
  to,
  via,
  direction = "r",
}: ConvertToTailwindOptions): string => {
  switch (type) {
    case "linear": {
      const classes = [`bg-gradient-to-${direction}`, `from-[${from}]`];
      if (via && via !== "") classes.push(`via-[${via}]`);
      classes.push(`to-[${to}]`);
      return classes.join(" ");
    }
    case "radial": {
      const classes = ["bg-radial", `from-[${from}]`];
      if (via && via !== "") classes.push(`via-[${via}]`);
      classes.push(`to-[${to}]`);
      return classes.join(" ");
    }
    default:
      return "";
  }
};

export default convertToTailwind;