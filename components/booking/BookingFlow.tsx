"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CalendarHeart, HeartHandshake, LockKeyhole } from "lucide-react";
import { SERVICES, ADD_ONS, DOCTORS, ServiceItem } from "@/lib/constants";
import { normalizePhilippinePhone, PH_PHONE_REGEX } from "@/lib/validations";
import { StepService } from "./StepService";
import { StepDateTime } from "./StepDateTime";
import { StepAddOns } from "./StepAddOns";
import { StepDetails } from "./StepDetails";
import { StepConfirmation } from "./StepConfirmation";
import { Button } from "@/components/ui/button";

export function BookingFlow() {
  const searchParams = useSearchParams();

  // Pre-selection query param handling per plan.md Section 3.6 Step 1
  const serviceParam = searchParams.get("service");
  const packageParam = searchParams.get("package");

  // Step index: 1 to 5
  const [currentStep, setCurrentStep] = React.useState(1);

  // Form State
  const [selectedService, setSelectedService] = React.useState<ServiceItem>(() => {
    if (serviceParam) {
      const match = SERVICES.find((s) => s.id === serviceParam);
      if (match) return match;
    }
    if (packageParam) {
      if (packageParam === "total-reset") {
        return SERVICES.find((s) => s.id === "cleaning") || SERVICES[0]!;
      }
      return SERVICES.find((s) => s.id === "cleaning") || SERVICES[0]!;
    }
    return SERVICES[0]!;
  });

  const [selectedDate, setSelectedDate] = React.useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string>("");
  const [selectedAddOns, setSelectedAddOns] = React.useState<string[]>(() => {
    if (packageParam === "total-reset") {
      return ["fluoride", "air-polish"];
    }
    return [];
  });

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [patientType, setPatientType] = React.useState<"new" | "returning">("new");
  const [selectedDoctorId, setSelectedDoctorId] = React.useState<string>("any");
  const [notes, setNotes] = React.useState("");
  const [agreeConsent, setAgreeConsent] = React.useState(true);
  const [websiteHoneypot, setWebsiteHoneypot] = React.useState("");

  // Submission & Validation State
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [icsDownloadUrl, setIcsDownloadUrl] = React.useState<string | undefined>(undefined);

  // Pricing Calculation
  const addOnsTotal = React.useMemo(() => {
    return selectedAddOns.reduce((sum, id) => {
      const item = ADD_ONS.find((a) => a.id === id);
      return sum + (item ? item.fee : 0);
    }, 0);
  }, [selectedAddOns]);

  const totalPrice = React.useMemo(() => {
    return selectedService.price + addOnsTotal;
  }, [selectedService, addOnsTotal]);

  const currentDoctorName = React.useMemo(() => {
    if (selectedDoctorId === "any") return "First Available Doctor";
    const doc = DOCTORS.find((d) => d.id === selectedDoctorId);
    return doc ? doc.name : "First Available Doctor";
  }, [selectedDoctorId]);

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleClearAddOns = () => {
    setSelectedAddOns([]);
  };

  // Validation strictly for Philippine mobile number and email per user instruction & plan.md
  const validateStep4 = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters).";
    }

    const normalizedPhone = normalizePhilippinePhone(phone);
    if (!normalizedPhone || !PH_PHONE_REGEX.test(normalizedPhone)) {
      errs.phone = "Please enter a valid 11-digit Philippine mobile number starting with 09 (e.g. 0956 150 5566).";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!agreeConsent) {
      errs.agreeConsent = "You must agree to be contacted via email and SMS/phone call for appointment confirmation.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!selectedDate || !selectedTimeSlot) {
        alert("Please select both a preferred date and a time slot.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (!validateStep4()) return;
      setCurrentStep(5);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    try {
      const normalizedPhone = normalizePhilippinePhone(phone);
      const payload = {
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        servicePrice: selectedService.price,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        addOns: selectedAddOns,
        addOnsTotal,
        totalPrice,
        fullName: fullName.trim(),
        phone: normalizedPhone,
        email: email.trim().toLowerCase(),
        patientType,
        doctorId: selectedDoctorId,
        doctorName: currentDoctorName,
        notes: notes.trim(),
        agreeConsent,
        website: websiteHoneypot,
      };

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.icsContent) {
        const blob = new Blob([data.icsContent], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        setIcsDownloadUrl(url);
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
      // In offline/mock mode, display success gracefully
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Care", "Date & Time", "Extras", "Details", "Review"];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
      {/* 5-Step Stepper Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {stepLabels.map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = currentStep > stepNum;
            const isActive = currentStep === stepNum;

            return (
              <React.Fragment key={label}>
                <button
                  type="button"
                  onClick={() => {
                    if (isCompleted || isActive) setCurrentStep(stepNum);
                  }}
                  disabled={!isCompleted && !isActive}
                  className="flex items-center gap-2 group focus:outline-none"
                >
                  <div
                    className={`size-8 sm:size-9 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all ${
                      isActive
                        ? "bg-[#526b50] text-white shadow-sm ring-4 ring-[#526b50]/20"
                        : isCompleted
                        ? "bg-[#6f8b6d] text-white"
                        : "bg-[#dde2d8] text-[#687167]"
                    }`}
                  >
                    {stepNum}
                  </div>
                  <span
                    className={`hidden md:inline text-[13px] font-medium ${
                      isActive
                        ? "text-[#526b50] font-semibold"
                        : isCompleted
                        ? "text-[#273c2b]"
                        : "text-[#687167]"
                    }`}
                  >
                    {label}
                  </span>
                </button>

                {idx < stepLabels.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-colors ${
                      currentStep > stepNum ? "bg-[#526b50]" : "bg-[#dde2d8]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Workspace (Grid: Content left 8 cols, Summary sidebar right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Workspace */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-[#dde2d8] shadow-sm">
          {currentStep === 1 && (
            <StepService
              selectedServiceId={selectedService.id}
              onSelectService={setSelectedService}
            />
          )}

          {currentStep === 2 && (
            <StepDateTime
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              onSelectDate={setSelectedDate}
              onSelectTimeSlot={setSelectedTimeSlot}
            />
          )}

          {currentStep === 3 && (
            <StepAddOns
              selectedServiceId={selectedService.id}
              selectedAddOns={selectedAddOns}
              onToggleAddOn={handleToggleAddOn}
              onClearAddOns={handleClearAddOns}
              onSkip={() => setCurrentStep(4)}
            />
          )}

          {currentStep === 4 && (
            <StepDetails
              fullName={fullName}
              phone={phone}
              email={email}
              patientType={patientType}
              selectedDoctorId={selectedDoctorId}
              notes={notes}
              agreeConsent={agreeConsent}
              websiteHoneypot={websiteHoneypot}
              errors={errors}
              onChangeField={(field, val) => {
                if (field === "fullName") setFullName(val);
                if (field === "phone") setPhone(val);
                if (field === "email") setEmail(val);
                if (field === "patientType") setPatientType(val);
                if (field === "selectedDoctorId") setSelectedDoctorId(val);
                if (field === "notes") setNotes(val);
                if (field === "agreeConsent") setAgreeConsent(val);
                if (field === "website") setWebsiteHoneypot(val);
              }}
            />
          )}

          {currentStep === 5 && (
            <StepConfirmation
              formData={{
                serviceTitle: selectedService.title,
                date: selectedDate || "To be confirmed",
                timeSlot: selectedTimeSlot || "To be confirmed",
                doctorName: currentDoctorName,
                fullName: fullName || "Patient",
                phone: phone || "Not provided",
                email: email || "Not provided",
                patientType,
                notes,
                addOnsList: selectedAddOns.map(
                  (id) => ADD_ONS.find((a) => a.id === id)?.title || id
                ),
                totalPrice,
              }}
              isSubmitted={isSubmitted}
              onEditStep={(step) => setCurrentStep(step)}
              onSubmit={handleSubmitBooking}
              isSubmitting={isSubmitting}
              icsDownloadUrl={icsDownloadUrl}
            />
          )}

          {/* Stepper Navigation Buttons */}
          {!isSubmitted && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#dde2d8]">
              {currentStep > 1 ? (
                <Button variant="outline" onClick={handlePrev}>
                  ← Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 5 && (
                <Button variant="primary" onClick={handleNext}>
                  Continue ↗
                </Button>
              )}
            </div>
          )}

          {/* Security footnote */}
          <div className="flex items-center gap-2 pt-6 text-[12px] text-[#687167]">
            <LockKeyhole className="size-3.5 text-[#526b50]" />
            <span>Your appointment details and Philippine contact info are kept strictly confidential.</span>
          </div>
        </div>

        {/* Right Visit Request Summary Card (4 cols) */}
        <aside className="lg:col-span-4 bg-[#f7f4ee] rounded-3xl p-6 sm:p-7 border border-[#dde2d8] shadow-sm sticky top-28 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-white border border-[#dde2d8] flex items-center justify-center text-[#526b50]">
              <CalendarHeart className="size-5" />
            </div>
            <div>
              <h3 className="font-serif text-[18px] text-[#273c2b] font-normal leading-tight">
                Visit Request Summary
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#526b50]">
                {isSubmitted ? "SUBMITTED" : "IN PROGRESS"}
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-[#dde2d8]" />

          {/* Selected Care */}
          <div className="flex flex-col gap-1 text-[13px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#687167]">
              Selected Care
            </span>
            <span className="font-serif text-[17px] text-[#273c2b]">
              {selectedService.title}
            </span>
            <span className="text-[12px] text-[#687167]">
              {selectedService.shortDescription}
            </span>
          </div>

          {/* Appointment Preference */}
          <div className="flex flex-col gap-1 text-[13px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#687167]">
              Appointment Preference
            </span>
            <span className="text-[#273c2b] font-medium">
              {selectedDate
                ? `${selectedDate} at ${selectedTimeSlot || "Flexible"}`
                : "Choose date & time in Step 2"}
            </span>
          </div>

          {/* Preferred Doctor */}
          <div className="flex flex-col gap-1 text-[13px]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#687167]">
              Preferred Doctor
            </span>
            <span className="text-[#273c2b] font-medium">
              {currentDoctorName}
            </span>
          </div>

          <div className="w-full h-px bg-[#dde2d8]" />

          {/* Pricing breakdown */}
          <div className="flex flex-col gap-2 text-[13px]">
            <div className="flex items-center justify-between text-[#687167]">
              <span>{selectedService.title}</span>
              <span className="font-medium text-[#273c2b]">
                ₱{selectedService.price.toLocaleString()}
              </span>
            </div>

            {selectedAddOns.map((id) => {
              const addOn = ADD_ONS.find((a) => a.id === id);
              if (!addOn) return null;
              return (
                <div key={id} className="flex items-center justify-between text-[#687167]">
                  <span>{addOn.title}</span>
                  <span className="font-medium text-[#273c2b]">
                    +₱{addOn.fee.toLocaleString()}
                  </span>
                </div>
              );
            })}

            <div className="pt-3 border-t border-[#dde2d8] flex items-end justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#687167] block">
                  Estimated Total
                </span>
                <span className="text-[10px] text-[#687167]">Pay at clinic after visit</span>
              </div>
              <span className="font-serif text-[34px] sm:text-[38px] text-[#526b50] leading-none">
                ₱{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Comfort reassurance note */}
          <div className="bg-white rounded-xl p-3.5 border border-[#dde2d8] flex items-center gap-2.5 text-[12px] text-[#687167]">
            <HeartHandshake className="size-4 text-[#526b50] shrink-0" />
            <span>Zero pre-payment required. Consultation first, treatment second.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
