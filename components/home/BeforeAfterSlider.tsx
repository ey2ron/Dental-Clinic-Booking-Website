"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const handleMove = React.useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSliderPosition(percent);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  React.useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMove]);

  return (
    <section className="w-full bg-[#e9eee5] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Story Column (5 cols) per plan.md Section 3.1 */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Transformations
          </p>

          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            Real Smiles, Real Results
          </h2>

          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Every smile is personal. From routine cleanings and stain removal to gentle whitening and restorative fillings, we design a clear plan tailored to you.
          </p>

          <div>
            <Link href="/book">
              <Button variant="primary" className="h-[46px] px-6 text-[13.5px]">
                Start Your Smile Transformation →
              </Button>
            </Link>
          </div>

          <p className="text-[11px] text-[#687167] leading-[1.6] pt-1 italic">
            [PLACEHOLDER — Illustrative slider for demonstration. Real patient before &amp; after photos will be published upon patient written consent per plan.md Part 12].
          </p>
        </div>

        {/* Right Slider Comparison (7 cols) */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchMove={handleTouchMove}
            className="relative h-[320px] sm:h-[380px] w-full rounded-2xl overflow-hidden shadow-soft select-none cursor-ew-resize border border-[#dde2d8]"
          >
            {/* After Image (Full background) */}
            <img
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
              alt="Brightened, aligned confident smile"
              className="absolute inset-0 size-full object-cover pointer-events-none"
            />

            {/* Before Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
                alt="Natural smile before treatment"
                className="absolute inset-0 h-full max-w-none object-cover brightness-95 sepia-[0.25]"
                style={{ width: containerRef.current?.clientWidth || "100%" }}
              />
              <div className="absolute inset-0 bg-[#c3b29a]/25" />
            </div>

            {/* Before Label (Top-Left) */}
            <div className="absolute top-4 left-4 bg-[#f7f4ee]/90 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-[#dde2d8] shadow-xs pointer-events-none">
              <span className="text-[10px] font-semibold text-[#526b50] tracking-wider uppercase">
                BEFORE · [PLACEHOLDER]
              </span>
            </div>

            {/* After Label (Bottom-Right) */}
            <div className="absolute bottom-4 right-4 bg-[#f7f4ee]/90 backdrop-blur-xs px-2.5 py-1.5 rounded-lg border border-[#dde2d8] shadow-xs pointer-events-none">
              <span className="text-[10px] font-semibold text-[#526b50] tracking-wider uppercase">
                AFTER · [PLACEHOLDER]
              </span>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none shadow-sm"
              style={{ left: `${sliderPosition}%` }}
            />

            {/* Draggable Center Handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-11 rounded-full bg-[#f7f4ee] border border-[#6f8b6d] text-[#526b50] shadow-float flex items-center justify-center font-bold text-[18px] cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              ‹ ›
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
