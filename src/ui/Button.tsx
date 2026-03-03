import type { ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  className: string;
  width?: "w-full" | "w-fit";
}

function Button({
  children,
  className,
  width = "w-full",
  ...rest
}: IButtonProps) {
  return (
    <button
      className={`${className} uppercase text-white ${width} py-2 rounded-md`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
