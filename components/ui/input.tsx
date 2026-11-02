import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-[52px] w-full rounded-xl border border-[#dde2d8] bg-white px-4 py-2 text-[14px] text-[#273c2b] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#687167]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526b50]/30 focus-visible:border-[#526b50] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

