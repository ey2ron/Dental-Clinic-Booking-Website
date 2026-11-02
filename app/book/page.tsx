import * as React from "react";
import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata: Metadata = {
  title: "Book an Appointment | Areli Dental Clinic Bacoor",
  description:
    "Schedule your dental visit online. Choose your service, pick a date, and we'll confirm your schedule promptly. Areli Dental Clinic, Bacoor, Cavite.",
};

export default function BookPage() {
  return (
    <div className="w-full min-h-[calc(100vh-160px)] bg-[#f7f4ee]">
      <React.Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px] text-[14px] text-[#687167]">
            Loading booking workspace...
          </div>
        }
      >
        <BookingFlow />
      </React.Suspense>
    </div>
  );
}
