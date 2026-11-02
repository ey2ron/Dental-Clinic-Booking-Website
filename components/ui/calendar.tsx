"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CalendarProps {
  selectedDate?: string; // YYYY-MM-DD
  onSelectDate?: (dateStr: string) => void;
  className?: string;
  minDate?: Date;
}

export function Calendar({
  selectedDate,
  onSelectDate,
  className,
  minDate = new Date(),
}: CalendarProps) {
  // Current viewing month
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    if (selectedDate) {
      const [y, m, d] = selectedDate.split("-").map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date();
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const weekdayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // First day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDay = new Date(year, month, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startingCol = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const padZero = (n: number) => n.toString().padStart(2, "0");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Generate calendar grid cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < startingCol; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-[#dde2d8] bg-white p-5 sm:p-6 shadow-sm select-none",
        className
      )}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-5 border-b border-[#dde2d8]">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="size-8 rounded-full border border-[#dde2d8] flex items-center justify-center text-[#526b50] hover:bg-[#e9eee5] transition-colors"
          aria-label="Previous Month"
        >
          <ChevronLeft className="size-4" />
        </button>
        <span className="font-serif text-[18px] sm:text-[20px] text-[#273c2b] font-medium tracking-wide">
          {monthNames[month]} {year}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="size-8 rounded-full border border-[#dde2d8] flex items-center justify-center text-[#526b50] hover:bg-[#e9eee5] transition-colors"
          aria-label="Next Month"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 pt-4 text-center">
        {weekdayNames.map((w) => (
          <div
            key={w}
            className="text-[10px] font-semibold text-[#687167] tracking-wider py-1"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Day Cells */}
      <div className="grid grid-cols-7 gap-1 pt-2">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="h-9 w-full" />;
          }

          const cellDate = new Date(year, month, day);
          cellDate.setHours(0, 0, 0, 0);
          const isPast = cellDate < today;
          const dateStr = `${year}-${padZero(month + 1)}-${padZero(day)}`;
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate?.(dateStr)}
              className={cn(
                "h-9 sm:h-10 w-full rounded-xl text-[13px] font-medium transition-all flex items-center justify-center",
                isSelected
                  ? "bg-[#526b50] text-white font-semibold shadow-sm"
                  : isPast
                  ? "text-[#687167]/30 cursor-not-allowed"
                  : "text-[#273c2b] hover:bg-[#e9eee5] hover:text-[#526b50]"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

