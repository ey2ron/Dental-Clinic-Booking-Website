import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GentleCarePromise() {
  const points = [
    {
      title: "Topical numbing gel before any procedure",
      desc: "We ensure you are completely comfortable and relaxed before any treatment begins.",
    },
    {
      title: "Calm ambience & anxiety-free care",
      desc: "Settle into a soothing environment with pauses whenever you need to breathe.",
    },
    {
      title: "Zero-judgment consultations",
      desc: "Haven’t visited a dentist in years? No lectures, no guilt. Just gentle, personalized steps forward.",
    },
    {
      title: "Kid-friendly, patient team",
      desc: "Gentle techniques and extra reassurance for children, teens, and first-time dental visitors.",
    },
  ];

  return (
    <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Editorial Photo (5 cols) per plan.md Section 3.1 */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[530px] rounded-2xl overflow-hidden shadow-soft bg-[#e9eee5]">
            <img
              src="/images/clinic/gentlepromise.jpg"
              alt="Compassionate dentist speaking softly with patient in Bacoor clinic [PLACEHOLDER]"
              className="size-full object-cover"
            />
          </div>
        </div>

        {/* Right Gentle Care Content (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            The ARELI Promise
          </p>

          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            Why Patients Choose ARELI
          </h2>

          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Nervous? Haven’t been to a dentist in years? You are in good hands. We slow things down, explain each step, and prioritize your comfort every minute.
          </p>

          {/* 4 Feature Bullet Points with Gold Checkmarks per plan.md Section 3.1 */}
          <div className="flex flex-col gap-4 pt-2">
            {points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <div className="size-6 rounded-full bg-[#D4B688] flex items-center justify-center text-[#273c2b] shrink-0 mt-0.5 shadow-xs">
                  <Check className="size-3.5 stroke-[3]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-semibold text-[#273c2b]">
                    {pt.title}
                  </h4>
                  <p className="text-[13px] text-[#687167] leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Link href="/team">
              <Button variant="outline" className="h-[46px] px-6 text-[13.5px]">
                Meet Our Team →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
