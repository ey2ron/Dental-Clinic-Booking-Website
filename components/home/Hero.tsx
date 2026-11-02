import * as React from "react";
import Link from "next/link";
import { CLINIC_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 pt-12 md:pt-16 pb-12 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Hero Story (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            {CLINIC_INFO.heroEyebrow}
          </p>

          <h1 className="font-serif text-[48px] sm:text-[64px] lg:text-[76px] leading-[1.08] text-[#273c2b] tracking-[-1.8px] font-normal">
            Gentle Hands, <br className="hidden sm:inline" />
            Happy Smiles
          </h1>

          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167] font-sans max-w-lg">
            {CLINIC_INFO.heroDescription}
          </p>

          {/* Hero CTAs per plan.md Section 3.1 */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link href="/book">
              <Button variant="primary" className="h-[48px] px-7 text-[14px]">
                Book Your Visit 
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="h-[48px] px-6 text-[14px]">
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Micro Trust Strip per plan.md Section 3.1 */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-[12.5px] font-medium text-[#526b50]">
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#dde2d8] shadow-xs">
              ⭐ 4.9 Rating 
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#dde2d8] shadow-xs">
              🕐 Open 7 Days, 9AM–6PM
            </span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-[#dde2d8] shadow-xs">
              📍 Molino Rd, Bacoor
            </span>
          </div>
        </div>

        {/* Right Hero Photograph Composition (7 cols) */}
        <div className="lg:col-span-7 relative">
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden shadow-soft bg-[#e9eee5]">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
              alt="Bright, serene modern dental clinic consultation room with natural lighting [PLACEHOLDER]"
              className="size-full object-cover"
            />

            
          </div>
        </div>
      </div>
    </section>
  );
}
