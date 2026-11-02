"use client";

import * as React from "react";
import {
  Sparkles,
  HeartPulse,
  ShieldPlus,
  Smile,
  Sun,
  MessagesSquare,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { SERVICES, ServiceItem, CLINIC_INFO } from "@/lib/constants";

interface StepServiceProps {
  selectedServiceId: string;
  onSelectService: (service: ServiceItem) => void;
}

export function StepService({ selectedServiceId, onSelectService }: StepServiceProps) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="size-6 text-[#526b50]" />;
      case "HeartPulse":
        return <HeartPulse className="size-6 text-[#526b50]" />;
      case "ShieldPlus":
        return <ShieldPlus className="size-6 text-[#526b50]" />;
      case "Smile":
        return <Smile className="size-6 text-[#526b50]" />;
      case "Sun":
        return <Sun className="size-6 text-[#526b50]" />;
      default:
        return <MessagesSquare className="size-6 text-[#526b50]" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
          Step 1: Choose care
        </span>
        <h2 className="font-serif text-[28px] sm:text-[34px] text-[#273c2b] font-normal">
          What can we care for today?
        </h2>
        <p className="text-[14px] text-[#687167]">
          Select the treatment you would like to schedule. We will tailor every step to your comfort.
        </p>
      </div>

      {/* 6 Primary Service Tiles per plan.md Section 3.6 Step 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SERVICES.map((service) => {
          const isSelected = selectedServiceId === service.id;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectService(service)}
              className={`rounded-2xl p-5 text-left border transition-all flex flex-col justify-between gap-4 group relative ${
                isSelected
                  ? "bg-[#e9eee5] border-[#6f8b6d] shadow-sm ring-2 ring-[#6f8b6d]"
                  : "bg-white border-[#dde2d8] hover:border-[#6f8b6d]/60 hover:bg-[#f7f4ee]/50"
              }`}
            >
              <div className="flex items-start justify-between w-full">
                <div className="size-11 rounded-xl bg-white flex items-center justify-center shadow-xs border border-[#dde2d8]/60 shrink-0">
                  {getIcon(service.iconName)}
                </div>
                {isSelected ? (
                  <CheckCircle2 className="size-5 text-[#526b50] shrink-0" />
                ) : service.badge ? (
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#f7f4ee] text-[#526b50] border border-[#dde2d8]">
                    {service.badge}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-[18px] sm:text-[20px] text-[#273c2b] font-normal leading-snug">
                  {service.title}
                </h3>
                <p className="text-[12.5px] text-[#687167] leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#dde2d8]/50 text-[12px] font-sans">
                <span className="font-medium text-[#526b50]">{service.priceDisplay}</span>
                <span className="text-[#687167]">{service.durationDisplay}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Emergency Link at Bottom per plan.md Section 3.6 Step 1 */}
      <div className="mt-2 p-4 bg-[#f7f4ee] border border-[#d4b688] rounded-xl flex items-center justify-between gap-3 text-[13px]">
        <div className="flex items-center gap-2 text-[#273c2b]">
          <span className="text-base">⚡</span>
          <span>In severe pain or have a dental emergency right now?</span>
        </div>
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          className="inline-flex items-center gap-1.5 font-semibold text-[#526b50] hover:underline shrink-0"
        >
          <Phone className="size-3.5" />
          <span>Call Us Now ({CLINIC_INFO.phone}) →</span>
        </a>
      </div>
    </div>
  );
}
