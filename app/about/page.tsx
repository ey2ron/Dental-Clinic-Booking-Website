import type { Metadata } from "next";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About Us | Areli Dental Clinic — Bacoor, Cavite",
  description:
    "Learn about Areli Dental Clinic's gentle approach to dentistry. Located at 251 Molino Rd, Bacoor, Cavite. Open Mon–Sun 9AM–6PM.",
};

export default function AboutPage() {
  const protocol = [
    {
      step: "01",
      title: "Warm Welcome & Chat",
      desc: "Tell us your concerns, past experiences, and what helps you feel completely comfortable.",
    },
    {
      step: "02",
      title: "Topical Numbing Before Any Needle",
      desc: "We apply soothing numbing gel before any procedure so you feel practically nothing.",
    },
    {
      step: "03",
      title: "Calm Ambience & Soothing Music",
      desc: "A relaxed room with natural light and unhurried pacing. We pause whenever you need.",
    },
    {
      step: "04",
      title: "Gentle Treatment With Care",
      desc: "Clear explanations every minute, honest advice, and personalized aftercare instructions.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* 1. Internal Hero Section per plan.md Section 3.2 */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
              Our clinic, your comfort
            </p>
            <h1 className="font-serif text-[44px] sm:text-[60px] lg:text-[68px] text-[#273c2b] tracking-[-1.5px] leading-[1.12] font-normal">
              Your Neighborhood Dental Home in Bacoor
            </h1>
            <p className="font-serif text-[20px] text-[#526b50] italic">
              Where gentle hands meet happy smiles.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
              We believe a healthy smile begins with feeling safe. At Areli Dental Clinic, gentle hands and honest conversations are at the heart of every visit.
            </p>
            <div>
              <Link href="/team">
                <Button variant="outline" className="h-[46px] px-6 text-[13.5px]">
                  Meet Your Care Team →
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden shadow-soft bg-[#e9eee5] border border-[#dde2d8]">
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1200&q=80"
                alt="Welcoming, warm clinic lounge area with soft lighting [PLACEHOLDER]"
                className="size-full object-cover"
              />
            </div>
            <p className="text-[11px] text-[#687167] mt-3 italic">
              [PLACEHOLDER — Clinic interior &amp; exterior photography provided by clinic owner per plan.md Part 12].
            </p>
          </div>
        </div>
      </section>

      {/* 2. Our Story & Mission per plan.md Section 3.2 */}
      <section className="w-full bg-[#e9eee5] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
              Our story &amp; mission
            </p>
            <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-[#526b50] shadow-xs border border-[#dde2d8]">
              <HeartHandshake className="size-8" />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-4">
            <h2 className="font-serif text-[32px] sm:text-[40px] text-[#273c2b] tracking-[-0.8px] leading-[1.2] font-normal">
              Make gentle oral health feel accessible, personal, and anxiety-free.
            </h2>
            <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
              [PLACEHOLDER — 2–3 paragraphs about why Areli Dental Clinic was founded on Molino Road, their mission for Bacoor families, and their patient-centered values].
            </p>
            <p className="text-[14px] leading-[1.65] text-[#687167]">
              Whether it’s a routine dental cleaning or custom dentures, we explain each treatment in plain language and respect your comfort and budget.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Gentle Touch Protocol (4 Steps per plan.md Section 3.2) */}
      <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="flex flex-col gap-3 max-w-2xl pb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            The Gentle Touch Protocol
          </p>
          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            Four Steps to a Calmer Dental Visit
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Designed to take the apprehension out of dental appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocol.map((item) => (
            <div
              key={item.step}
              className="bg-[#f7f4ee] rounded-2xl p-7 border border-[#dde2d8] flex flex-col gap-4 hover:border-[#6f8b6d] transition-all"
            >
              <div className="size-11 rounded-full bg-[#526b50] text-[#f7f4ee] flex items-center justify-center font-serif text-[18px]">
                {item.step}
              </div>
              <h3 className="font-serif text-[20px] text-[#273c2b] font-normal">
                {item.title}
              </h3>
              <p className="text-[13px] leading-[1.65] text-[#687167]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Clinic Gallery (3x2 Grid per plan.md Section 3.2) */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="flex flex-col gap-3 pb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Clinic gallery
          </p>
          <h2 className="font-serif text-[36px] sm:text-[44px] text-[#273c2b] tracking-[-0.8px] leading-[1.15] font-normal">
            A Clean, Serene Environment
          </h2>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167] max-w-2xl">
            Take a look inside our reception, consultation lounge, treatment rooms, and sterilization setup.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { title: "Reception & Check-in", img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=800&q=80" },
            { title: "Treatment Room 1", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80" },
            { title: "Sterilization Suite", img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80" },
            { title: "Consultation Lounge", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80" },
            { title: "Diagnostic Equipment", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80" },
            { title: "Building Exterior (Molino Rd)", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <div className="h-[240px] rounded-2xl overflow-hidden bg-[#e9eee5] border border-[#dde2d8]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="size-full object-cover hover:scale-103 transition-transform duration-300"
                />
              </div>
              <span className="text-[12.5px] font-medium text-[#273c2b]">{item.title} [PLACEHOLDER]</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Stats Strip (4 Counters per plan.md Section 3.2) */}
      <section className="w-full bg-[#e9eee5] px-6 sm:px-12 md:px-24 py-16 sm:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-[44px] sm:text-[52px] text-[#526b50] leading-none">
              1,000+
            </span>
            <span className="text-[13.5px] text-[#687167] font-medium">
              Patients Treated [PLACEHOLDER]
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-serif text-[44px] sm:text-[52px] text-[#526b50] leading-none">
              4.9 / 5
            </span>
            <span className="text-[13.5px] text-[#687167] font-medium">
              Patient Rating
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-serif text-[44px] sm:text-[52px] text-[#526b50] leading-none">
              7 Days
            </span>
            <span className="text-[13.5px] text-[#687167] font-medium">
              Open Daily (9AM–6PM)
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-serif text-[44px] sm:text-[52px] text-[#526b50] leading-none">
              Licensed
            </span>
            <span className="text-[13.5px] text-[#687167] font-medium">
              Dentists in Bacoor
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
