import * as React from "react";
import { BadgeCheck, WalletCards, CalendarDays, HeartHandshake, MapPin } from "lucide-react";

export function TrustBadges() {
  const trustItems = [
    {
      icon: BadgeCheck,
      label: "Licensed Dentists",
    },
    {
      icon: WalletCards,
      label: "GCash / Maya / BDO",
    },
    {
      icon: CalendarDays,
      label: "Open 7 Days, 9AM–6PM",
    },
    {
      icon: HeartHandshake,
      label: "Gentle, Pain-Free Care",
    },
    {
      icon: MapPin,
      label: "Molino Rd, Easy Access",
    },
  ];

  return (
    <section
      aria-label="Why Trust Areli"
      className="w-full bg-[#e9eee5] px-6 sm:px-12 md:px-24 py-6 border-y border-[#dde2d8]/60 overflow-x-auto"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center min-w-[600px] sm:min-w-0">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-white flex items-center justify-center text-[#526b50] shrink-0 shadow-xs border border-[#dde2d8]/50">
                <Icon className="size-4" />
              </div>
              <span className="text-[12.5px] sm:text-[13px] font-sans text-[#526b50] font-medium leading-snug">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
