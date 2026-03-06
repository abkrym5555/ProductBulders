import type { HTMLAttributes } from "react";

interface ICircleColorProps extends HTMLAttributes<HTMLSpanElement> {
  bgColor: string;
}

function CircleColor({ bgColor, ...rest }: ICircleColorProps) {
  return (
    <span
      {...rest}
      className={`w-5 h-5 rounded-full cursor-pointer`}
      style={{ backgroundColor: bgColor }}
    ></span>
  );
}

export default CircleColor;
