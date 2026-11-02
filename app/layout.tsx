import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmergencyBar } from "@/components/layout/EmergencyBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arelidentalclinic.com"),
  title: "Areli Dental Clinic | Gentle Dentist in Bacoor, Cavite",
  description:
    "Compassionate, anxiety-free dental care in Bacoor, Cavite. Open 7 days. Cleaning, fillings, extractions, dentures & whitening. Book now!",
  keywords: [
    "Areli Dental Clinic",
    "dentist bacoor",
    "dentista bacoor",
    "dental clinic molino road",
    "gentle dentist cavite",
    "teeth cleaning bacoor price",
    "tooth extraction bacoor",
    "dentures bacoor cavite",
  ],
  authors: [{ name: "Areli Dental Clinic" }],
  openGraph: {
    title: "Areli Dental Clinic | Gentle Dentist in Bacoor, Cavite",
    description:
      "Compassionate, anxiety-free dental care in Bacoor, Cavite. Open 7 days. Cleaning, fillings, extractions, dentures & whitening. Book now!",
    url: "https://www.arelidentalclinic.com",
    siteName: "Areli Dental Clinic",
    locale: "en_PH",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Areli Dental Clinic",
  "url": "https://www.arelidentalclinic.com",
  "telephone": "+639561505566",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "251 Molino Rd, San Nicolas II",
    "addressLocality": "Bacoor",
    "addressRegion": "Cavite",
    "postalCode": "4102",
    "addressCountry": "PH",
  },
  "openingHours": "Mo-Su 09:00-18:00",
  "knowsAbout": [
    "Dental Cleaning",
    "Tooth Extraction",
    "Dental Filling",
    "Consultation",
    "Dentures",
    "Teeth Whitening",
  ],
  "slogan": "Gentle hands, Happy smiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col bg-[#f7f4ee] text-[#273c2b] antialiased"
        suppressHydrationWarning
      >
        <EmergencyBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
