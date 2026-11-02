import * as React from "react";
import Link from "next/link";
import { Sparkles, ShieldPlus, Sun, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FeaturedServices() {
  const cards = [
    {
      id: "cleaning",
      icon: Sparkles,
      title: "Cleaning",
      description: "A fresh start for healthier teeth and gums.",
      price: "From ₱1,200",
      link: "/services",
    },
    {
      id: "restorations",
      icon: ShieldPlus,
      title: "Restorations",
      description: "Bring comfort and confidence back to your bite.",
      price: "From ₱1,500",
      link: "/services",
    },
    {
      id: "whitening",
      icon: Sun,
      title: "Whitening",
      description: "Explore a brighter smile, thoughtfully.",
      price: "From ₱6,000",
      link: "/services",
    },
    {
      id: "dentures",
      icon: Smile,
      title: "Dentures",
      description: "Made for your smile. Designed for your life.",
      price: "From ₱8,000",
      link: "/services",
    },
  ];

  return (
    <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
        <div className="flex flex-col gap-3 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Care for every chapter
          </p>
          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            Good care. Without the worry.
          </h2>
        </div>

        <div className="flex flex-col gap-4 max-w-md">
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            From your regular clean to the smile you’ve been dreaming of, we’ll find the right next step together.
          </p>
          <div>
            <Link href="/services">
              <Button variant="outline">Explore all services ↗</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#f7f4ee] rounded-2xl p-7 border border-[#dde2d8] flex flex-col justify-between min-h-[290px] hover:border-[#6f8b6d] transition-all group"
            >
              <div className="flex flex-col gap-4">
                <div className="size-11 rounded-xl bg-white flex items-center justify-center text-[#526b50] shadow-xs group-hover:scale-105 transition-transform">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-serif text-[26px] text-[#273c2b] font-normal">
                  {card.title}
                </h3>
                <p className="text-[13px] leading-[1.65] text-[#687167]">
                  {card.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-6 border-t border-[#dde2d8]/60">
                <span className="text-[12px] text-[#526b50] font-medium">
                  {card.price}
                </span>
                <Link
                  href={card.link}
                  className="text-[12px] font-semibold text-[#526b50] group-hover:underline flex items-center gap-1"
                >
                  Learn More ↗
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-[#687167] pt-8 leading-[1.6]">
        Illustrative starting prices. Final fees depend on your assessment; your dentist will explain before treatment.
      </p>
    </section>
  );
}

