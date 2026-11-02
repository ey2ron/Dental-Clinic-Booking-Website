import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CLINIC_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="w-full bg-[#273c2b] text-[#f7f4ee] pt-14 pb-8 px-6 sm:px-12 md:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
        {/* Col 1: Clinic Identity (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div className="relative size-[44px] shrink-0 flex items-center justify-center">
              <Image
                src="/arelilogo.png"
                alt="ARELI Dental Clinic Logo"
                width={44}
                height={44}
                className="size-full object-contain rounded-full transition-transform group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="font-serif text-[25px] font-normal tracking-wider text-[#f7f4ee]">
                ARELI
              </span>
              <span className="font-sans text-[8px] tracking-[2.2px] text-[#f7f4ee]/80 font-medium uppercase -mt-0.5">
                DENTAL CLINIC
              </span>
            </div>
          </Link>

          <h3 className="font-serif text-[22px] text-[#f7f4ee] font-normal leading-tight mt-1">
            {CLINIC_INFO.tagline}
          </h3>
          <p className="font-sans text-[13.5px] leading-[1.65] text-[#f7f4ee]/80 max-w-sm">
            Compassionate, anxiety-free dental care for the whole family — right here in Bacoor, Cavite.
          </p>
        </div>

        {/* Col 2: Come As You Are (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#d4b688]">
            Come as you are
          </p>
          <address className="not-italic text-[14.5px] leading-[1.7] text-[#f7f4ee]/90 flex flex-col gap-1 font-sans">
            <a
              href={CLINIC_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white transition-colors"
            >
              {CLINIC_INFO.address}
            </a>
            <p>{CLINIC_INFO.hours}</p>
            <a
              href={`tel:${CLINIC_INFO.phoneRaw}`}
              className="hover:underline hover:text-white transition-colors"
            >
              Phone: {CLINIC_INFO.phone}
            </a>
          </address>
        </div>

        {/* Col 3: Quick Links (2 cols per plan.md Section 3.0) */}
        <div className="lg:col-span-2 flex flex-col gap-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#d4b688]">
            Quick Links
          </p>
          <ul className="flex flex-col gap-2 text-[14px] text-[#f7f4ee]/85 font-sans">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-white transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link href="/book" className="hover:text-white font-medium text-[#d4b688] transition-colors">
                Book Now 
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Stay Connected (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#d4b688]">
            Stay Connected
          </p>
          <ul className="flex flex-col gap-2 text-[14px] text-[#f7f4ee]/85 font-sans">
            <li>
              <a
                href={CLINIC_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Facebook ↗
              </a>
            </li>
            <li>
              <a
                href={CLINIC_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Instagram ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/15 my-6" />

      {/* Bottom Bar per plan.md Section 3.0 */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#f7f4ee]/70 font-sans">
        <p>© 2026 ARELI Dental Clinic · 251 Molino Road, San Nicolas II, Bacoor, 4102 Cavite</p>
        <p className="hover:text-white cursor-pointer transition-colors">
          Gentle hands, Happy smiles 
        </p>
      </div>
    </footer>
  );
}
