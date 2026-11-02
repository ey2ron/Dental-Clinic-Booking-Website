"use client";

import * as React from "react";
import { X, Phone } from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";

export function EmergencyBar() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isDismissed, setIsDismissed] = React.useState(true); // default true until client checks sessionStorage

  React.useEffect(() => {
    // Check if dismissed in this session
    try {
      const dismissed = sessionStorage.getItem("emergency_bar_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
        return;
      }
    } catch {
      // Ignore storage errors if disabled in browser
    }
    setIsDismissed(false);

    // Show after 5-second delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Or show on first scroll event
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    try {
      sessionStorage.setItem("emergency_bar_dismissed", "true");
    } catch {
      // Ignore storage errors
    }
  };

  if (isDismissed || !isVisible) {
    return null;
  }

  return (
    <aside
      aria-label="Urgent Dental Assistance"
      className="fixed top-0 inset-x-0 z-50 bg-[#D4B688] text-[#273c2b] shadow-md border-b border-[#c2a272] transition-transform duration-300 animate-in slide-in-from-top-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2.5 flex items-center justify-between gap-3 text-[13px] sm:text-[14px]">
        {/* Left: Message */}
        <div className="flex items-center gap-2 font-medium">
          <span className="text-[17px] shrink-0" role="img" aria-label="Tooth">
            🦷
          </span>
          <span className="leading-tight">
            <strong>Severe toothache?</strong> We’re here to help today.
          </span>
        </div>

        {/* Right: Actions & Close button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={`tel:${CLINIC_INFO.phoneRaw}`}
            className="inline-flex items-center gap-1.5 bg-[#273c2b] text-[#f7f4ee] hover:bg-[#344e39] font-medium px-4 py-1.5 rounded-full text-[12.5px] shadow-xs transition-colors"
          >
            <Phone className="size-3.5" />
            <span>Call Now ({CLINIC_INFO.phone})</span>
          </a>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss emergency banner"
            className="p-1 rounded-md text-[#273c2b]/80 hover:text-[#273c2b] hover:bg-black/10 transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
