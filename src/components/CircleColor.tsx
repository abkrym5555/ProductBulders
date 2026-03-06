interface ICircleColorProps {
  bgColor: string;
}

function CircleColor({ bgColor }: ICircleColorProps) {
  return (
    <span
      className={`w-5 h-5 rounded-full cursor-pointer`}
      style={{ backgroundColor: bgColor }}
    ></span>
  );
}

export default CircleColor;
