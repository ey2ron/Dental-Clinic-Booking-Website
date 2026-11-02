"use client";

import * as React from "react";
import Link from "next/link";
import {
  HeartHandshake,
  Phone,
  Download,
  CheckCircle2,
  Calendar as CalendarIcon,
  Home,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface StepConfirmationProps {
  formData: {
    serviceTitle: string;
    date: string;
    timeSlot: string;
    doctorName: string;
    fullName: string;
    phone: string;
    email: string;
    patientType: string;
    notes?: string;
    addOnsList: string[];
    totalPrice: number;
  };
  isSubmitted: boolean;
  onEditStep: (stepNumber: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  icsDownloadUrl?: string;
}

export function StepConfirmation({
  formData,
  isSubmitted,
  onEditStep,
  onSubmit,
  isSubmitting,
  icsDownloadUrl,
}: StepConfirmationProps) {
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#dde2d8] shadow-sm flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-200">
        <div className="size-16 rounded-full bg-[#e9eee5] flex items-center justify-center text-[#526b50]">
          <CheckCircle2 className="size-10" />
        </div>

        <div className="flex flex-col gap-2 max-w-lg">
          <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            ✅ Booking Request Sent!
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-[#273c2b] font-normal leading-tight">
            Thank you, {formData.fullName}.
          </h2>
          <p className="text-[15px] text-[#687167] leading-relaxed">
            Your appointment request for <strong>{formData.serviceTitle}</strong> on{" "}
            <strong>{formData.date} at {formData.timeSlot}</strong> has been received.
          </p>
        </div>

        {/* Notice */}
        <div className="p-4 bg-[#f7f4ee] border border-[#d4b688] rounded-xl text-left max-w-lg w-full text-[13.5px] text-[#273c2b] leading-relaxed">
          <p>
            <strong>What happens next:</strong> Our team will confirm your schedule via SMS/call at <strong>{formData.phone}</strong> and email at <strong>{formData.email}</strong> within 1–2 hours during clinic hours (9:00 AM – 6:00 PM daily).
          </p>
        </div>

        {/* Summary Card back to the patient */}
        <div className="w-full max-w-lg bg-[#f7f4ee] rounded-xl p-5 border border-[#dde2d8] text-left text-[13px] flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-[#687167]">Service:</span>
            <span className="font-semibold text-[#273c2b]">{formData.serviceTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#687167]">Preferred Date &amp; Time:</span>
            <span className="font-semibold text-[#273c2b]">{formData.date} · {formData.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#687167]">Doctor Preference:</span>
            <span className="font-semibold text-[#273c2b]">{formData.doctorName}</span>
          </div>
          {formData.addOnsList.length > 0 && (
            <div className="flex justify-between">
              <span className="text-[#687167]">Add-Ons:</span>
              <span className="font-semibold text-[#273c2b]">{formData.addOnsList.join(", ")}</span>
            </div>
          )}
          <div className="flex justify-between pt-2 border-t border-[#dde2d8]">
            <span className="text-[#687167]">Location:</span>
            <span className="font-medium text-[#273c2b]">{CLINIC_INFO.addressShort}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={`tel:${CLINIC_INFO.phoneRaw}`}
            className="inline-flex"
          >
            <Button variant="outline" className="gap-2">
              <Phone className="size-4" />
              Call Clinic ({CLINIC_INFO.phone})
            </Button>
          </a>

          {icsDownloadUrl && (
            <a
              href={icsDownloadUrl}
              download="areli-dental-appointment.ics"
              className="inline-flex"
            >
              <Button variant="outline" className="gap-2">
                <Download className="size-4" />
                Save to Calendar (.ics)
              </Button>
            </a>
          )}

          <Link href="/">
            <Button variant="ghost" className="gap-2 text-[#526b50]">
              <Home className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-md pt-4 text-[12px] text-[#687167]">
          <p>Need urgent changes? Call us directly at {CLINIC_INFO.phone}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
          Step 5: Review &amp; confirm
        </span>
        <h2 className="font-serif text-[28px] sm:text-[34px] text-[#273c2b] font-normal">
          Review your appointment request
        </h2>
        <p className="text-[14px] text-[#687167]">
          Please review your details. Payment is confirmed at the clinic during your visit.
        </p>
      </div>

      {/* Reassurance Banner */}
      <div className="bg-[#e9eee5] rounded-2xl p-6 border border-[#6f8b6d]/60 flex items-start gap-4">
        <div className="size-10 rounded-full bg-white flex items-center justify-center text-[#526b50] shrink-0 shadow-xs">
          <HeartHandshake className="size-5" />
        </div>
        <div>
          <h3 className="font-serif text-[20px] text-[#273c2b] font-normal leading-tight">
            A calmer kind of dental visit
          </h3>
          <p className="text-[13px] text-[#687167] mt-1 leading-relaxed">
            Take a breath. You are in good hands. We take things at your pace and explain every option before starting.
          </p>
        </div>
      </div>

      {/* Review Details Table */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#dde2d8] shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#dde2d8]">
          <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Summary of Care
          </span>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-[12px] font-medium text-[#526b50] hover:underline"
          >
            Edit Service
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px]">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#687167] block">
              Treatment
            </span>
            <span className="font-medium text-[#273c2b]">{formData.serviceTitle}</span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#687167] block">
              Scheduled Date &amp; Time
            </span>
            <span className="font-medium text-[#273c2b]">
              {formData.date || "Not selected"} · {formData.timeSlot || "Not selected"}
            </span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#687167] block">
              Doctor Preference
            </span>
            <span className="font-medium text-[#273c2b]">{formData.doctorName}</span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#687167] block">
              Patient Contact
            </span>
            <span className="font-medium text-[#273c2b]">{formData.fullName} ({formData.phone})</span>
            <span className="text-[12px] text-[#687167] block">{formData.email}</span>
          </div>
        </div>

        {formData.addOnsList.length > 0 && (
          <div className="pt-2 border-t border-[#dde2d8] text-[13px]">
            <span className="text-[11px] uppercase tracking-wider text-[#687167] block">
              Selected Add-Ons
            </span>
            <span className="text-[#273c2b]">{formData.addOnsList.join(", ")}</span>
          </div>
        )}

        {formData.notes && (
          <div className="pt-2 border-t border-[#dde2d8] text-[13px]">
            <span className="text-[11px] uppercase tracking-wider text-[#687167] block">
              Notes for the Dentist
            </span>
            <span className="text-[#273c2b] italic">“{formData.notes}”</span>
          </div>
        )}
      </div>

      {/* Confirmation Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-[12px] text-[#687167]">
          By confirming, you agree to our gentle care and scheduling terms.
        </p>
        <Button
          type="button"
          variant="primary"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 h-[50px] text-[15px]"
        >
          {isSubmitting ? "Submitting Request..." : "Confirm & Request Appointment"}
        </Button>
      </div>
    </div>
  );
}
