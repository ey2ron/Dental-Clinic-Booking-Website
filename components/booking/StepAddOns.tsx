"use client";

import * as React from "react";
import { ShieldCheck, Wind, HeartPulse, Sparkles, Check } from "lucide-react";
import { ADD_ONS, AddOnItem } from "@/lib/constants";

interface StepAddOnsProps {
  selectedServiceId: string;
  selectedAddOns: string[];
  onToggleAddOn: (id: string) => void;
  onClearAddOns: () => void;
  onSkip?: () => void;
}

export function StepAddOns({
  selectedServiceId,
  selectedAddOns,
  onToggleAddOn,
  onClearAddOns,
  onSkip,
}: StepAddOnsProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "ShieldCheck":
        return <ShieldCheck className="size-6 text-[#526b50]" />;
      case "Wind":
        return <Wind className="size-6 text-[#526b50]" />;
      case "HeartPulse":
        return <HeartPulse className="size-6 text-[#526b50]" />;
      default:
        return <Sparkles className="size-6 text-[#526b50]" />;
    }
  };

  // Filter contextual add-ons based on Step 1 selection per plan.md Section 3.6 Step 3
  const availableAddOns = React.useMemo(() => {
    return ADD_ONS.filter((item) => {
      if (item.applicableServices.includes("all")) return true;
      return item.applicableServices.includes(selectedServiceId);
    });
  }, [selectedServiceId]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Step 3: Enhance your visit
          </span>
          {onSkip && (
            <button
              type="button"
              onClick={onSkip}
              className="text-[13px] font-medium text-[#526b50] hover:underline"
            >
              Skip add-ons →
            </button>
          )}
        </div>
        <h2 className="font-serif text-[28px] sm:text-[34px] text-[#273c2b] font-normal">
          Optional care add-ons
        </h2>
        <p className="text-[14px] text-[#687167]">
          Enhance your treatment with these gentle additions tailored to your selected service.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        {availableAddOns.map((addOn: AddOnItem) => {
          const isSelected = selectedAddOns.includes(addOn.id);
          return (
            <div
              key={addOn.id}
              onClick={() => onToggleAddOn(addOn.id)}
              className={`rounded-2xl p-5 sm:p-6 border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected
                  ? "bg-[#e9eee5] border-[#6f8b6d] shadow-sm ring-1 ring-[#6f8b6d]"
                  : "bg-white border-[#dde2d8] hover:border-[#6f8b6d]/60 hover:bg-[#f7f4ee]/40"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="size-11 rounded-xl bg-white flex items-center justify-center shrink-0 border border-[#dde2d8]/60 shadow-xs">
                  {getIcon(addOn.iconName)}
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-[18px] text-[#273c2b] font-normal">
                      {addOn.title}
                    </h4>
                    <span className="text-[12px] font-semibold text-[#526b50] bg-white px-2 py-0.5 rounded-full border border-[#dde2d8]">
                      {addOn.feeDisplay}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#687167] max-w-lg leading-relaxed">
                    {addOn.description}
                  </p>
                </div>
              </div>

              {/* Custom Styled Checkbox per plan.md */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <div
                  className={`size-6 rounded-md border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#526b50] border-[#526b50] text-white"
                      : "border-[#687167]/40 bg-white"
                  }`}
                >
                  {isSelected && <Check className="size-4" />}
                </div>
                <span className="text-[12px] text-[#273c2b] sm:hidden font-medium">
                  {isSelected ? "Selected" : "Add to visit"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onClearAddOns}
          className="text-[12px] text-[#687167] hover:underline"
        >
          Clear all add-ons
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-[13px] font-medium text-[#526b50] hover:underline"
          >
            Skip add-ons →
          </button>
        )}
      </div>
    </div>
  );
}
