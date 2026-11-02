import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { GentleCarePromise } from "@/components/home/GentleCarePromise";
import { BeforeAfterSlider } from "@/components/home/BeforeAfterSlider";
import { SmilePackages } from "@/components/home/SmilePackages";
import { Testimonials } from "@/components/home/Testimonials";
import { MapStrip } from "@/components/home/MapStrip";

export const metadata: Metadata = {
  title: "ARELI Dental Clinic | Gentle Dentist in Bacoor, Cavite",
  description:
    "Compassionate, anxiety-free dental care in Bacoor, Cavite. Open 7 days. Cleaning, fillings, extractions, dentures & whitening. Book now!",
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <TrustBadges />
      <FeaturedServices />
      <GentleCarePromise />
      <BeforeAfterSlider />
      <SmilePackages />
      <Testimonials />
      <MapStrip />
    </div>
  );
}
