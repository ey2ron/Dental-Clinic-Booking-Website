import * as React from "react";
import Link from "next/link";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function MapStrip() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "251 Molino Road, San Nicolas II, Bacoor, 4102 Cavite, Philippines"
  )}`;

  return (
    <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: Embedded Google Maps iframe per plan.md Section 3.1 & 11 */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative h-[340px] sm:h-[400px] w-full rounded-2xl overflow-hidden border border-[#dde2d8] shadow-sm bg-[#f7f4ee]">
            <iframe
              title="Areli Dental Clinic Location Map"
              src="https://maps.google.com/maps?q=251%20Molino%20Road,%20San%20Nicolas%20II,%20Bacoor,%20Cavite,%20Philippines&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right: Address, Phone, Hours, and Action Buttons (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5 order-1 lg:order-2">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Your neighborhood dental home
          </p>

          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            Close to home. <br />
            Easy to find.
          </h2>

          <address className="not-italic text-[15px] leading-[1.7] text-[#687167] font-sans flex flex-col gap-1.5">
            <p className="font-medium text-[#273c2b] flex items-start gap-2">
              <MapPin className="size-4 text-[#526b50] shrink-0 mt-1" />
              <span>{CLINIC_INFO.address}</span>
            </p>
            <p className="text-[14px]">{CLINIC_INFO.hours}</p>
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="hover:underline hover:text-[#526b50] transition-colors font-medium text-[#273c2b]"
            >
              Phone: {CLINIC_INFO.phone}
            </a>
          </address>

          {/* Action buttons per plan.md Section 3.1 */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" className="h-[46px] px-6 text-[13.5px] gap-2">
                <ExternalLink className="size-4" />
                Get Directions
              </Button>
            </a>
            <a href={`tel:${CLINIC_INFO.phoneRaw}`}>
              <Button variant="outline" className="h-[46px] px-6 text-[13.5px] gap-2">
                <Phone className="size-4" />
                Call Now ({CLINIC_INFO.phone})
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
