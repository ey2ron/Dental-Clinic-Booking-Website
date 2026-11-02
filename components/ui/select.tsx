import * as React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-[52px] w-full appearance-none rounded-xl border border-[#dde2d8] bg-white px-4 py-2 pr-10 text-[14px] text-[#273c2b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526b50]/30 focus-visible:border-[#526b50] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#687167]" />
      </div>
    );
  }
);
Select.displayName = "Select";

