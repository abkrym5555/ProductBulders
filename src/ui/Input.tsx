import type { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

function Input({ ...rest }: IInputProps) {
  return (
    <input
      className="border border-gray-300 shadow-md p-3 text-md focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-lg"
      {...rest}
    />
  );
}

export default Input;
