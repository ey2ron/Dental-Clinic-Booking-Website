"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, id, disabled = false, className }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "size-5 shrink-0 rounded-md border transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#526b50]/40 disabled:cursor-not-allowed disabled:opacity-50",
          checked
            ? "bg-[#526b50] border-[#526b50] text-white"
            : "border-[#6f8b6d] bg-white hover:border-[#526b50]",
          className
        )}
      >
        {checked && <Check className="size-3.5 stroke-[3]" />}
      </button>
    );
  }
);
Checkbox.displayName = "Checkbox";

