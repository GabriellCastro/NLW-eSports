import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="rounded bg-zinc-900 text-sm py-2 px-4 focus:outline-none focus:border-violet-500 placeholder:text-zinc-500"
    />
  );
}
