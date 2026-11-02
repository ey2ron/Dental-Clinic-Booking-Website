"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { DOCTORS, DoctorProfile } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";

export default function TeamPage() {
  const [activeDoctor, setActiveDoctor] = React.useState<DoctorProfile | null>(null);

  const careCommitments = [
    "An approach that respects dental anxiety and pacing",
    "Clear treatment options explained in everyday language",
    "A personalized care plan shaped around your comfort and budget",
  ];

  return (
    <div className="flex flex-col w-full">
      {/* React 19 / Next.js Head Hoisting per plan.md Section 9.2 */}
      <title>Our Dentists | Areli Dental Clinic Bacoor</title>
      <meta
        name="description"
        content="Meet the licensed dentists at Areli Dental Clinic. Gentle, skilled professionals committed to your comfort."
      />

      {/* 1. Team Hero Header per plan.md Section 3.4 */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="flex flex-col gap-5 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Real connection. Thoughtful care.
          </p>
          <h1 className="font-serif text-[44px] sm:text-[60px] lg:text-[68px] text-[#273c2b] tracking-[-1.5px] leading-[1.12] font-normal">
            Meet Your Dental Team
          </h1>
          <p className="font-serif text-[20px] text-[#526b50] italic">
            Skilled, compassionate, and committed to your comfort.
          </p>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Your comfort starts with the person beside the chair. Meet licensed dentists who listen first, explain clearly, and make space for how you feel.
          </p>
          <p className="text-[11.5px] text-[#687167] leading-[1.6] italic">
            [PLACEHOLDER — Doctor profiles and portraits are illustrative placeholders; clinic owner to confirm licensed credentials and biographical data per plan.md Part 12].
          </p>
        </div>

        {/* Doctor Profiles Responsive Grid per plan.md Section 3.4 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          {DOCTORS.map((doc: DoctorProfile) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-[#dde2d8] overflow-hidden shadow-xs flex flex-col justify-between hover:border-[#6f8b6d] transition-all group"
            >
              {/* Doctor Portrait Header */}
              <div className="relative h-[340px] w-full bg-[#e9eee5] overflow-hidden">
                <img
                  src={doc.imageUrl}
                  alt={doc.name}
                  className="size-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                />
              </div>

              {/* Information body */}
              <div className="p-7 flex flex-col gap-4 flex-1 justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-[26px] text-[#273c2b] font-normal leading-tight">
                    {doc.name}
                  </h3>
                  <p className="text-[12px] font-semibold text-[#526b50]">
                    {doc.credentials}
                  </p>
                  <p className="text-[13px] text-[#687167]">
                    {doc.focus}
                  </p>
                  <blockquote className="font-serif text-[16px] text-[#273c2b] italic pt-2 leading-relaxed">
                    {doc.quote}
                  </blockquote>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-[#dde2d8]">
                  <button
                    type="button"
                    onClick={() => setActiveDoctor(doc)}
                    className="text-[13px] font-semibold text-[#526b50] hover:underline text-left inline-flex items-center gap-1"
                  >
                    View Profile →
                  </button>

                  <Link href={`/book?doctor=${doc.id}`}>
                    <Button variant="primary" className="w-full h-[44px] text-[13.5px]">
                      Book with {doc.name.split(" ")[1] || "Doctor"} →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. The Way We Care Commitment */}
      <section className="w-full bg-[#e9eee5] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden shadow-soft bg-white border border-[#dde2d8]">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80"
                alt="Supportive medical team meeting and reviewing patient treatment plan [PLACEHOLDER]"
                className="size-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
              The way we care
            </p>
            <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
              Your questions are always welcome.
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
              We want you to understand your care, not just agree to it. You can ask us to explain, slow down, or take a pause at any point during your visit.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              {careCommitments.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-[#526b50] text-white flex items-center justify-center shrink-0">
                    <Check className="size-3.5 stroke-[3]" />
                  </div>
                  <span className="text-[14px] text-[#273c2b] font-medium font-sans">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Booking Callout Banner */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Your next chapter starts here
          </p>
          <h2 className="font-serif text-[32px] sm:text-[40px] text-[#273c2b] font-normal mt-1">
            A gentler visit. A happier you.
          </h2>
          <p className="text-[14px] text-[#687167] mt-1">
            Tell us what you need. We’ll help you take the first step, at your pace.
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-start sm:items-end gap-2">
          <Link href="/book">
            <Button variant="primary" className="h-[48px] px-7 text-[14px]">
              Book a Gentle Visit 
            </Button>
          </Link>
          <span className="text-[12px] text-[#687167]">
            Open every day · Mon–Sun 9:00 AM – 6:00 PM
          </span>
        </div>
      </section>

      {/* 4. Doctor Biography Modal Dialog per plan.md Section 3.4 */}
      <Dialog
        open={Boolean(activeDoctor)}
        onOpenChange={(open) => {
          if (!open) setActiveDoctor(null);
        }}
      >
        {activeDoctor && (
          <div>
            <DialogHeader onClose={() => setActiveDoctor(null)}>
              DOCTOR BIOGRAPHY · ARELI CLINIC
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden">
              {/* Doctor Portrait Left (5 cols) */}
              <div className="md:col-span-5 h-[320px] md:h-auto bg-[#e9eee5] relative overflow-hidden">
                <img
                  src={activeDoctor.imageUrl}
                  alt={activeDoctor.name}
                  className="size-full object-cover"
                />
              </div>

              {/* Doctor Bio Details (7 cols) */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col gap-5 justify-between">
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
                    Care Provider Profile
                  </span>
                  <h3 className="font-serif text-[30px] text-[#273c2b] font-normal">
                    {activeDoctor.name}
                  </h3>
                  <p className="text-[13px] font-semibold text-[#526b50]">
                    {activeDoctor.credentials}
                  </p>
                  <p className="text-[14px] leading-relaxed text-[#687167]">
                    {activeDoctor.biography}
                  </p>

                  <div className="bg-[#e9eee5] rounded-xl p-4 border border-[#6f8b6d]/40 mt-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#526b50] block mb-1">
                      Personal Philosophy
                    </span>
                    <p className="font-serif text-[15px] text-[#273c2b] italic">
                      {activeDoctor.personalPhilosophy}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#687167] block mb-2">
                      Specializations &amp; Focus
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeDoctor.interests.map((interest, i) => (
                        <span
                          key={i}
                          className="bg-white px-3 py-1 rounded-md text-[12px] text-[#526b50] border border-[#dde2d8]"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#dde2d8]">
                  <Link href={`/book?doctor=${activeDoctor.id}`}>
                    <Button variant="primary" className="w-full sm:w-auto h-[46px] px-6 text-[13.5px]">
                      Book with {activeDoctor.name} →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
