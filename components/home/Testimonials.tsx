"use client";

import * as React from "react";
import { TESTIMONIALS, CLINIC_INFO } from "@/lib/constants";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotating carousel per plan.md Section 3.1
  React.useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS[currentIndex] ?? TESTIMONIALS[0];

  return (
    <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column (5 cols) per plan.md Section 3.1 */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Patient Experiences
          </p>

          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            What Our Patients Say
          </h2>

          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Hear from families in Bacoor who experienced gentle, calm, and reassuring dental care at Areli.
          </p>

          {/* CTA: Leave a Review on Facebook per plan.md Section 3.1 */}
          <div>
            <a
              href={CLINIC_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#526b50] hover:underline"
            >
              <span>Leave a Review on Facebook →</span>
            </a>
          </div>

          {/* Carousel Arrow Controls & Dots */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={prev}
              className="size-11 rounded-full border border-[#6f8b6d] text-[#526b50] flex items-center justify-center hover:bg-[#e9eee5] transition-colors"
              aria-label="Previous Testimonial"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="size-11 rounded-full border border-[#6f8b6d] text-[#526b50] flex items-center justify-center hover:bg-[#e9eee5] transition-colors"
              aria-label="Next Testimonial"
            >
              →
            </button>
            <div className="flex items-center gap-1.5 ml-3">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`size-2 rounded-full transition-all ${
                    idx === currentIndex ? "w-6 bg-[#526b50]" : "bg-[#dde2d8]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#687167] leading-[1.6] pt-1 italic">
            [PLACEHOLDER — Minimum 3 reviews with patient first name and star rating to be confirmed by clinic owner per plan.md Part 12].
          </p>
        </div>

        {/* Right Carousel Card (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#dde2d8] shadow-sm flex flex-col gap-6 justify-between min-h-[300px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1 text-[#d4b688]">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <span key={i} className="text-[20px]">★</span>
                ))}
              </div>
              <p className="font-serif text-[24px] sm:text-[28px] text-[#273c2b] font-normal leading-[1.35]">
                {current.quote}
              </p>
            </div>

            <div className="pt-4 border-t border-[#dde2d8]/60 flex items-center justify-between">
              <span className="text-[14px] font-sans font-medium text-[#526b50]">
                {current.author}
              </span>
              <span className="text-[11px] text-[#687167]">Verified Patient Feedback</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
