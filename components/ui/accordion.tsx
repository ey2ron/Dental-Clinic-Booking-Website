"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AccordionItemProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({
  title,
  subtitle,
  icon,
  isOpen = false,
  onToggle,
  children,
  className,
}: AccordionItemProps) {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border transition-all duration-200 overflow-hidden",
        isOpen
          ? "border-[#6f8b6d] bg-[#e9eee5]"
          : "border-[#dde2d8] bg-[#f7f4ee] hover:border-[#6f8b6d]/60",
        className
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 sm:p-7 text-left gap-4"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          {icon && <div className="shrink-0 text-[#526b50]">{icon}</div>}
          <div className="min-w-0">
            <h3 className="font-serif text-[22px] sm:text-[28px] text-[#273c2b] leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[13px] text-[#687167] mt-1 font-sans">{subtitle}</p>
            )}
          </div>
        </div>
        <div className="shrink-0 size-8 rounded-full border border-[#6f8b6d]/40 flex items-center justify-center text-[#526b50] bg-white/60">
          {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-0 border-t border-[#dde2d8]/80 animate-in fade-in-50 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

