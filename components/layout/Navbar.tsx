"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/team", label: "Team" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Clinic Info Strip */}
      <div className="bg-[#526b50] text-[#f7f4ee] text-[10px] sm:text-[11px] tracking-wide px-4 sm:px-8 md:px-24 h-[32px] flex items-center justify-between select-none">
        <p className="font-sans uppercase font-normal truncate">
          YOUR NEIGHBORHOOD DENTAL HOME · BACOOR, CAVITE
        </p>
        <div className="hidden sm:flex items-center gap-2 font-sans font-normal shrink-0">
          <span>{CLINIC_INFO.hours}</span>
          <span>·</span>
          <a
            href={`tel:${CLINIC_INFO.phoneRaw}`}
            className="hover:underline hover:text-white transition-colors"
          >
            {CLINIC_INFO.phone}
          </a>
        </div>
      </div>

      {/* Main Navbar with Scroll Blur / Glassmorphism */}
      <nav
        className={`px-4 sm:px-8 md:px-24 h-[76px] sm:h-[90px] flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#dde2d8]"
            : "bg-[#f7f4ee] border-b border-[#dde2d8]/70"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative size-[44px] shrink-0 flex items-center justify-center">
            <Image
              src="/arelilogo.png"
              alt="ARELI Dental Clinic Logo"
              width={44}
              height={44}
              className="size-full object-contain rounded-full transition-transform group-hover:scale-105"
              priority
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-serif text-[23px] sm:text-[25px] font-normal text-[#273c2b] tracking-wider">
              ARELI
            </span>
            <span className="font-sans text-[7.5px] sm:text-[8px] tracking-[2.2px] text-[#526b50] font-medium uppercase -mt-0.5">
              DENTAL CLINIC
            </span>
          </div>
        </Link>

        {/* Desktop Page Navigation Links */}
        <div className="hidden md:flex items-center gap-7 lg:gap-9">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <div key={link.href} className="relative py-2 flex flex-col items-center">
                <Link
                  href={link.href}
                  className={`text-[13.5px] transition-colors ${
                    isActive
                      ? "font-semibold text-[#526b50]"
                      : "font-normal text-[#2d3748] hover:text-[#526b50]"
                  }`}
                >
                  {link.label}
                </Link>
                {isActive && (
                  <div className="absolute bottom-0 w-5 h-[2px] bg-[#6f8b6d] rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link href="/book">
            <Button
              variant="primary"
              className="h-[44px] sm:h-[50px] px-5 sm:px-6 text-[13px] sm:text-[14px]"
            >
              Book Now 
            </Button>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#273c2b] hover:bg-[#e9eee5] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#dde2d8] bg-white/98 backdrop-blur-md px-6 py-5 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 text-[15px] border-b border-[#dde2d8]/60 ${
                    isActive
                      ? "font-semibold text-[#526b50]"
                      : "text-[#2d3748] hover:text-[#526b50]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2 text-[12px] text-[#687167]">
              <p>Mon–Sun 9:00 AM – 6:00 PM</p>
              <p>Phone: (0956) 150 5566</p>
              <p>251 Molino Rd, Bacoor, Cavite</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
