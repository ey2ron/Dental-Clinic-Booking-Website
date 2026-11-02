"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { TIME_SLOTS } from "@/lib/constants";
import { Clock, Info } from "lucide-react";

interface StepDateTimeProps {
  selectedDate: string;
  selectedTimeSlot: string;
  onSelectDate: (date: string) => void;
  onSelectTimeSlot: (slot: string) => void;
}

export function StepDateTime({
  selectedDate,
  selectedTimeSlot,
  onSelectDate,
  onSelectTimeSlot,
}: StepDateTimeProps) {
  const formattedDate = React.useMemo(() => {
    if (!selectedDate) return "Select a date on the calendar";
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
          Step 2: Date & time
        </span>
        <h2 className="font-serif text-[28px] sm:text-[34px] text-[#273c2b] font-normal">
          When would you like to visit?
        </h2>
        <p className="text-[14px] text-[#687167]">
          We are open Monday through Sunday, 9:00 AM to 6:00 PM. Choose your preferred day and time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calendar Picker (7 cols) */}
        <div className="lg:col-span-7">
          <Calendar selectedDate={selectedDate} onSelectDate={onSelectDate} />
        </div>

        {/* 30-min Time Slots (5 cols) per plan.md Section 3.6 Step 2 */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#dde2d8] shadow-sm flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#526b50]">
              Available Time Slots (30 min)
            </span>
            <p className="text-[13px] text-[#687167]">
              {selectedDate ? formattedDate : "Pick a date to unlock time slots"}
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTimeSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={!selectedDate}
                  onClick={() => onSelectTimeSlot(slot)}
                  className={`py-2 px-2 rounded-xl text-[12px] font-medium border text-center transition-all ${
                    !selectedDate
                      ? "opacity-40 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400"
                      : isSelected
                      ? "bg-[#526b50] text-[#f7f4ee] border-[#526b50] shadow-xs"
                      : "bg-[#f7f4ee] border-[#dde2d8] text-[#273c2b] hover:border-[#6f8b6d] hover:bg-white"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          {/* Preference Picker Notice per plan.md Section 3.6 Step 2 & Section 11 */}
          <div className="mt-2 p-3 rounded-xl bg-[#e9eee5]/70 border border-[#dde2d8] flex items-start gap-2.5 text-[11.5px] text-[#526b50] leading-snug">
            <Info className="size-4 shrink-0 mt-0.5 text-[#526b50]" />
            <p>
              <strong>Preferred Schedule:</strong> This request reserves your preferred time. Our clinic coordinator will confirm your exact slot via SMS or phone call within 1–2 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
