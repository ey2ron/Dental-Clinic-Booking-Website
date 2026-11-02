import * as React from "react";
import Link from "next/link";
import { SMILE_PACKAGES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function SmilePackages() {
  return (
    <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
      {/* Header */}
      <div className="flex flex-col gap-3 max-w-2xl pb-12">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
          A little more value
        </p>
        <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
          Smile Packages
        </h2>
        <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
          Thoughtful bundles designed for preventive care and everyday value. Transparent and zero pressure.
        </p>
      </div>

      {/* 3-Column Packages Grid per plan.md Section 3.1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {SMILE_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl p-7 flex flex-col justify-between border transition-all ${
              pkg.isPopular
                ? "bg-[#e9eee5] border-[#D4B688] shadow-md ring-2 ring-[#D4B688] relative scale-102"
                : "bg-[#f7f4ee] border-[#dde2d8] hover:border-[#6f8b6d]"
            }`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[1.5px] px-2.5 py-1 rounded-full ${
                    pkg.isPopular
                      ? "bg-[#D4B688] text-[#273c2b]"
                      : "bg-white text-[#526b50] border border-[#dde2d8]"
                  }`}
                >
                  {pkg.badge}
                </span>
              </div>

              <h3 className="font-serif text-[26px] text-[#273c2b] font-normal">
                {pkg.name}
              </h3>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[38px] text-[#526b50] leading-none">
                  {pkg.price}
                </span>
                <span className="text-[12px] text-[#687167]">[PLACEHOLDER]</span>
              </div>

              <div className="flex flex-col gap-2 pt-2 text-[13.5px] text-[#687167] font-sans">
                {pkg.features.map((feature, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#6f8b6d]" />
                    {feature}
                  </p>
                ))}
              </div>

              <p className="text-[12px] text-[#687167]/80 pt-1 italic">
                {pkg.note}
              </p>
            </div>

            {/* CTA per card linking to /book?package=[id] */}
            <div className="pt-6">
              <Link href={`/book?package=${pkg.id}`} className="w-full block">
                <Button
                  variant={pkg.isPopular ? "primary" : "outline"}
                  className="w-full h-[46px] text-[13.5px]"
                >
                  Book Package Now 
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mandatory Disclaimer per plan.md Section 3.1 & 1.2 */}
      <div className="mt-8 pt-4 border-t border-[#dde2d8]/60 text-center text-[12px] text-[#687167]">
        <p>
          * Prices are starting estimates. Final treatment plan confirmed during consultation with your dentist.
        </p>
      </div>
    </section>
  );
}
