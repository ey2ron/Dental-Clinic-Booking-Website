"use client";

import * as React from "react";
import { CheckCircle2, User, Phone, Mail, FileText, Stethoscope } from "lucide-react";
import { DOCTORS, DoctorProfile } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StepDetailsProps {
  fullName: string;
  phone: string;
  email: string;
  patientType: "new" | "returning";
  selectedDoctorId: string;
  notes: string;
  agreeConsent: boolean;
  websiteHoneypot?: string;
  errors: Record<string, string>;
  onChangeField: (field: string, value: any) => void;
}

export function StepDetails({
  fullName,
  phone,
  email,
  patientType,
  selectedDoctorId,
  notes,
  agreeConsent,
  websiteHoneypot = "",
  errors,
  onChangeField,
}: StepDetailsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
          Step 4: Your details
        </span>
        <h2 className="font-serif text-[28px] sm:text-[34px] text-[#273c2b] font-normal">
          Who is this appointment for?
        </h2>
        <p className="text-[14px] text-[#687167]">
          We keep your details strictly confidential. We will confirm your schedule via Philippine mobile and email.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#dde2d8] shadow-sm flex flex-col gap-6">
        {/* Hidden Honeypot Spam Trap per plan.md Section 4.2 */}
        <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
          <label htmlFor="website-trap">Website (Leave empty)</label>
          <input
            id="website-trap"
            type="text"
            name="website"
            value={websiteHoneypot}
            onChange={(e) => onChangeField("website", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Patient Status: New vs Returning */}
        <div className="flex flex-col gap-2">
          <Label className="text-[12px] font-semibold uppercase tracking-wider text-[#526b50]">
            Patient Status
          </Label>
          <div className="grid grid-cols-2 gap-3 max-w-sm">
            <button
              type="button"
              onClick={() => onChangeField("patientType", "new")}
              className={`py-2.5 px-4 rounded-xl text-[13px] font-medium border text-center transition-all ${
                patientType === "new"
                  ? "bg-[#526b50] text-[#f7f4ee] border-[#526b50]"
                  : "bg-[#f7f4ee] border-[#dde2d8] text-[#273c2b] hover:bg-white"
              }`}
            >
              New Patient
            </button>
            <button
              type="button"
              onClick={() => onChangeField("patientType", "returning")}
              className={`py-2.5 px-4 rounded-xl text-[13px] font-medium border text-center transition-all ${
                patientType === "returning"
                  ? "bg-[#526b50] text-[#f7f4ee] border-[#526b50]"
                  : "bg-[#f7f4ee] border-[#dde2d8] text-[#273c2b] hover:bg-white"
              }`}
            >
              Returning Patient
            </button>
          </div>
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName" className="text-[13px] font-medium text-[#273c2b]">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="fullName"
              placeholder="e.g. Maria Santos"
              value={fullName}
              onChange={(e) => onChangeField("fullName", e.target.value)}
              className={errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}
            />
          </div>
          {errors.fullName && (
            <p className="text-[12px] text-red-600 font-sans">{errors.fullName}</p>
          )}
        </div>

        {/* Primary Contact: Philippine Mobile & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Philippine Mobile Number */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone" className="text-[13px] font-medium text-[#273c2b]">
              Philippine Mobile Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="0956 123 4567"
                value={phone}
                onChange={(e) => onChangeField("phone", e.target.value)}
                className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
            </div>
            <p className="text-[11px] text-[#687167]">
              11-digit Philippine mobile number starting with 09
            </p>
            {errors.phone && (
              <p className="text-[12px] text-red-600 font-sans">{errors.phone}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-[13px] font-medium text-[#273c2b]">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="maria.santos@email.com"
                value={email}
                onChange={(e) => onChangeField("email", e.target.value)}
                className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
            </div>
            <p className="text-[11px] text-[#687167]">
              Where we will send your appointment summary &amp; .ics calendar
            </p>
            {errors.email && (
              <p className="text-[12px] text-red-600 font-sans">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Doctor Preference Radio Options per plan.md Section 3.6 Step 4 */}
        <div className="flex flex-col gap-3 pt-2">
          <Label className="text-[13px] font-medium text-[#273c2b] flex items-center gap-1.5">
            <Stethoscope className="size-4 text-[#526b50]" />
            <span>Preferred Doctor</span>
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label
              className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                selectedDoctorId === "any"
                  ? "bg-[#e9eee5] border-[#526b50]"
                  : "bg-[#f7f4ee] border-[#dde2d8] hover:bg-white"
              }`}
            >
              <input
                type="radio"
                name="doctorPreference"
                value="any"
                checked={selectedDoctorId === "any"}
                onChange={() => onChangeField("selectedDoctorId", "any")}
                className="accent-[#526b50]"
              />
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-[#273c2b]">No Preference</span>
                <span className="text-[11px] text-[#687167]">First available licensed dentist</span>
              </div>
            </label>

            {DOCTORS.map((doc: DoctorProfile) => (
              <label
                key={doc.id}
                className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  selectedDoctorId === doc.id
                    ? "bg-[#e9eee5] border-[#526b50]"
                    : "bg-[#f7f4ee] border-[#dde2d8] hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="doctorPreference"
                  value={doc.id}
                  checked={selectedDoctorId === doc.id}
                  onChange={() => onChangeField("selectedDoctorId", doc.id)}
                  className="accent-[#526b50]"
                />
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-[#273c2b]">{doc.name}</span>
                  <span className="text-[11px] text-[#687167]">{doc.specialty}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Notes for the Dentist */}
        <div className="flex flex-col gap-2 pt-2">
          <Label htmlFor="notes" className="text-[13px] font-medium text-[#273c2b]">
            Notes for the Dentist (Optional)
          </Label>
          <Textarea
            id="notes"
            rows={3}
            placeholder="e.g. Mild sensitivity, nervous about needles, haven't visited in 3 years..."
            value={notes}
            onChange={(e) => onChangeField("notes", e.target.value)}
            maxLength={500}
          />
          <span className="text-[11px] text-right text-[#687167]">Max 500 characters</span>
        </div>

        {/* Consent Checkbox per plan.md Section 3.6 Step 4 */}
        <div className="pt-2 border-t border-[#dde2d8]">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeConsent}
              onChange={(e) => onChangeField("agreeConsent", e.target.checked)}
              className="mt-1 size-4 rounded accent-[#526b50] shrink-0"
            />
            <span className="text-[12.5px] text-[#273c2b] leading-relaxed">
              I agree to be contacted via email and SMS/phone call for appointment confirmation and clinic reminders.
            </span>
          </label>
          {errors.agreeConsent && (
            <p className="text-[12px] text-red-600 font-sans mt-1.5">{errors.agreeConsent}</p>
          )}
        </div>
      </div>
    </div>
  );
}
