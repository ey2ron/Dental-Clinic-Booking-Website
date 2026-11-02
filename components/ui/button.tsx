import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "secondary" | "subtle";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      primary:
        "bg-[#526b50] text-white hover:bg-[#435741] border border-[#526b50] shadow-sm rounded-full",
      outline:
        "bg-transparent border border-[#6f8b6d] text-[#526b50] hover:bg-[#e9eee5] rounded-full",
      secondary:
        "bg-[#e9eee5] text-[#273c2b] hover:bg-[#dde2d8] border border-[#dde2d8] rounded-full",
      ghost:
        "hover:bg-[#e9eee5]/60 text-[#273c2b] rounded-lg",
      subtle:
        "bg-white text-[#526b50] border border-[#dde2d8] hover:border-[#6f8b6d] rounded-full",
    };

    const sizes = {
      default: "h-[52px] px-6 text-[14px]",
      sm: "h-[42px] px-4 text-[12px]",
      lg: "h-[56px] px-8 text-[15px]",
      icon: "size-[42px] rounded-full p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

