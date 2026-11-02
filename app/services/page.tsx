import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ShieldPlus,
  HeartPulse,
  Smile,
  Sun,
  Baby,
  CreditCard,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Dental Services & Prices | Areli Dental Clinic Bacoor",
  description:
    "Dental cleaning, fillings, extractions, dentures, whitening & more. Transparent pricing. Book your visit at Areli Dental Clinic, Bacoor.",
};

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "preventive",
      title: "Preventive & General",
      icon: Sparkles,
      subservices: ["Consultation & Diagnostic Check", "Oral Prophylaxis (Cleaning)", "Fluoride Therapy", "Dental X-Ray"],
      description: "Routine visits to maintain optimal oral health, eliminate plaque, and detect concerns before they become painful.",
      whatToExpect: "Gentle visual examination, ultrasonic scaling, polish, and custom home-care advice.",
      idealFor: "Everyone every 6 months, and first-time dental visitors.",
      startingPrice: "From ₱500 – ₱1,200 [PLACEHOLDER]",
      bookServiceId: "cleaning",
    },
    {
      id: "restorative",
      title: "Restorative Dentistry",
      icon: ShieldPlus,
      subservices: ["Composite Fillings", "Pit & Fissure Sealants", "Tooth Repair"],
      description: "Bring strength, comfort, and natural aesthetics back to chipped, cracked, or cavity-affected teeth.",
      whatToExpect: "Numbing gel applied prior to treatment, gentle decay removal, shade matching, and light-cured composite bonding.",
      idealFor: "Patients with cavities, tooth sensitivity, or minor chips.",
      startingPrice: "From ₱1,500 / tooth [PLACEHOLDER]",
      bookServiceId: "filling",
    },
    {
      id: "surgery",
      title: "Oral Surgery & Tooth Relief",
      icon: HeartPulse,
      subservices: ["Simple Extraction", "Surgical Extraction", "Wisdom Tooth Removal"],
      description: "When a tooth cannot be saved or causes persistent pain, our gentle extraction protocol prioritizes patient comfort.",
      whatToExpect: "Complete local numbing with continuous reassurance, minimally invasive technique, and take-home care packet.",
      idealFor: "Severe toothaches, non-restorable decay, or impacted wisdom teeth.",
      startingPrice: "From ₱1,500 [PLACEHOLDER]",
      bookServiceId: "extraction",
    },
    {
      id: "dentures",
      title: "Dentures & Prosthetics",
      icon: Smile,
      subservices: ["Full Dentures", "Partial Dentures", "Flexible / Valplast Dentures", "Crowns & Bridges"],
      description: "Custom-crafted replacements engineered for natural appearance, stable chewing power, and confident speech.",
      whatToExpect: "Anatomical impressions, wax try-in to ensure comfortable bite height, and complimentary follow-up adjustments.",
      idealFor: "Patients missing one, multiple, or all natural teeth.",
      startingPrice: "From ₱8,000 [PLACEHOLDER]",
      bookServiceId: "dentures",
    },
    {
      id: "cosmetic",
      title: "Cosmetic & Orthodontics",
      icon: Sun,
      subservices: ["In-Office Teeth Whitening", "Braces Consultation", "Smile Makeover Assessment"],
      description: "Safe, clinically tested brightening and alignment consultations to help you smile with newfound pride.",
      whatToExpect: "Gingival barrier gum protection, controlled light activation, and shade comparison guide.",
      idealFor: "Coffee, tea, or smoking discoloration, or patients considering braces.",
      startingPrice: "From ₱6,000 [PLACEHOLDER]",
      bookServiceId: "cosmetic",
    },
    {
      id: "pediatric",
      title: "Pediatric Dentistry",
      icon: Baby,
      subservices: ["Kid Cleanings", "Fluoride Varnish", "Dental Sealants", "Gentle First Visits"],
      description: "Warm, cheerful dental care crafted specifically for little smiles, building fear-free lifelong habits.",
      whatToExpect: "Child-friendly explanations, show-and-tell tools, gentle pacing, and praise after every step.",
      idealFor: "Toddlers, children, and teens.",
      startingPrice: "From ₱500 [PLACEHOLDER]",
      bookServiceId: "cleaning",
    },
  ];

  const priceTable = [
    { treatment: "Consultation & Clinical Exam", desc: "Assessment & personalized care plan", price: "₱500 [PLACEHOLDER]" },
    { treatment: "Routine Dental Cleaning (Prophylaxis)", desc: "Gentle ultrasonic scaling & polishing", price: "₱1,200 [PLACEHOLDER]" },
    { treatment: "Tooth-Colored Composite Filling", desc: "Per surface / tooth depending on extent", price: "₱1,500 [PLACEHOLDER]" },
    { treatment: "Simple Tooth Extraction", desc: "Includes topical and local numbing", price: "₱1,500 [PLACEHOLDER]" },
    { treatment: "Surgical / Wisdom Tooth Extraction", desc: "Clinical diagnostic evaluation required", price: "₱4,500+ [PLACEHOLDER]" },
    { treatment: "Custom Dentures (Partial / Full)", desc: "Engineered for anatomical chewing comfort", price: "₱8,000 [PLACEHOLDER]" },
    { treatment: "Gentle In-Office Whitening", desc: "Multi-shade brightening with gum barrier", price: "₱6,000 [PLACEHOLDER]" },
    { treatment: "Braces / Orthodontic Consultation", desc: "Diagnostic smile assessment", price: "₱500 [PLACEHOLDER]" },
    { treatment: "Pediatric Dental Cleaning & Checkup", desc: "Tailored for toddlers & children", price: "₱800 [PLACEHOLDER]" },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Services Hero per plan.md Section 3.3 */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
              Transparent, Gentle Care
            </p>
            <h1 className="font-serif text-[44px] sm:text-[60px] lg:text-[68px] text-[#273c2b] tracking-[-1.5px] leading-[1.12] font-normal">
              Our Dental Services
            </h1>
            <p className="font-serif text-[20px] text-[#526b50] italic">
              Comprehensive care from routine cleanings to smile makeovers.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
              Whatever brings you in, we’ll help you understand your choices and feel comfortable before we begin.
            </p>
            <div>
              <Link href="/book">
                <Button variant="primary" className="h-[48px] px-7 text-[14px]">
                  Book an Appointment 
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden shadow-soft bg-[#e9eee5] border border-[#dde2d8]">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
                alt="Modern dental diagnostic and cleaning suite [PLACEHOLDER]"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Category Grid (6 Cards per plan.md Section 3.3) */}
      <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="flex flex-col gap-3 pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Service Categories
          </p>
          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            Care for Every Need &amp; Age
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167] max-w-2xl">
            Choose from our specialized departments. Click any service to book your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-[#f7f4ee] rounded-2xl p-7 border border-[#dde2d8] flex flex-col justify-between hover:border-[#6f8b6d] transition-all group"
              >
                <div className="flex flex-col gap-4">
                  <div className="size-12 rounded-xl bg-white flex items-center justify-center text-[#526b50] shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="font-serif text-[24px] text-[#273c2b] font-normal">
                    {cat.title}
                  </h3>
                  <p className="text-[13px] text-[#687167] leading-relaxed">
                    {cat.description}
                  </p>
                  <ul className="text-[12.5px] text-[#526b50] flex flex-col gap-1 pt-1 font-medium">
                    {cat.subservices.map((sub, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="size-1 rounded-full bg-[#526b50]" />
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-4 border-t border-[#dde2d8]/60 flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#526b50]">
                    {cat.startingPrice}
                  </span>
                  <Link href={`/book?service=${cat.bookServiceId}`}>
                    <Button variant="outline" size="sm" className="text-[12px]">
                      Book Service →
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Service Detail Accordion per plan.md Section 3.3 */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="flex flex-col gap-3 max-w-2xl pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Detailed Treatment Guide
          </p>
          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            What to Expect During Your Visit
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Expand any treatment below to see duration, preparation, and what happens at the clinic.
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-4xl">
          {serviceCategories.map((cat, idx) => (
            <details
              key={cat.id}
              className="group bg-white rounded-2xl border border-[#dde2d8] p-5 sm:p-6 transition-all open:shadow-sm open:border-[#6f8b6d]"
              open={idx === 0}
            >
              <summary className="flex items-center justify-between cursor-pointer font-serif text-[20px] sm:text-[22px] text-[#273c2b] list-none select-none">
                <span className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-[#526b50]" />
                  <span>{cat.title}</span>
                </span>
                <span className="text-[20px] text-[#526b50] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="pt-5 mt-4 border-t border-[#dde2d8]/60 grid grid-cols-1 md:grid-cols-2 gap-6 text-[14px]">
                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-[#526b50] text-[12px] uppercase tracking-wider">
                    What to Expect
                  </h4>
                  <p className="text-[#687167] leading-relaxed">{cat.whatToExpect}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-[#526b50] text-[12px] uppercase tracking-wider">
                    Ideal For
                  </h4>
                  <p className="text-[#687167] leading-relaxed">{cat.idealFor}</p>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[13px] font-medium text-[#273c2b]">
                      Estimated fee: {cat.startingPrice}
                    </span>
                    <Link href={`/book?service=${cat.bookServiceId}`}>
                      <Button variant="primary" size="sm" className="text-[12px]">
                        Book This Service →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 4. Price Guide Table per plan.md Section 3.3 */}
      <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="flex flex-col gap-3 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Price Transparency
          </p>
          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            Service Price Guide
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Estimated starting fees for our most requested treatments.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-[#dde2d8] shadow-xs">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#f7f4ee] border-b border-[#dde2d8] text-[12px] uppercase tracking-wider text-[#526b50]">
              <tr>
                <th className="py-4 px-6 font-semibold">Treatment</th>
                <th className="py-4 px-6 font-semibold">Description</th>
                <th className="py-4 px-6 font-semibold text-right">Starting Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde2d8]/60">
              {priceTable.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f7f4ee]/40"}>
                  <td className="py-3.5 px-6 font-medium text-[#273c2b]">{row.treatment}</td>
                  <td className="py-3.5 px-6 text-[#687167]">{row.desc}</td>
                  <td className="py-3.5 px-6 text-right font-medium text-[#526b50] whitespace-nowrap">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[12px] text-[#687167] pt-4 italic">
          * Final price confirmed during your consultation. Fees vary according to tooth condition and materials selected.
        </p>
      </section>

      {/* 5. Accepted Payment Methods per plan.md Section 3.3 */}
      <section className="w-full bg-[#e9eee5] px-6 sm:px-12 md:px-24 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
              Flexible Payment
            </span>
            <h3 className="font-serif text-[22px] text-[#273c2b] font-normal">
              Convenient Options for Every Patient
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {["Cash", "GCash", "Maya", "Credit/Debit Card"].map(
              (method, i) => (
                <span
                  key={i}
                  className="bg-white px-4 py-2 rounded-xl text-[12.5px] font-medium text-[#273c2b] border border-[#dde2d8] shadow-2xs"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
