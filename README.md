# Areli Dental Clinic · Bacoor, Cavite

A calming, human-centered front-end web application for Areli Dental Clinic in Bacoor, Cavite, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**, faithful to the official Figma design system.

## Project Directory Structure

```text
areli-dental-clinic/
├── app/
│   ├── layout.tsx                 # Root layout: fonts, Navbar, EmergencyBar, Footer
│   ├── page.tsx                   # Home page (/)
│   ├── about/
│   │   └── page.tsx               # About Clinic (/about)
│   ├── services/
│   │   └── page.tsx               # Services (/services)
│   ├── team/
│   │   └── page.tsx               # Team / Doctors (/team)
│   ├── contact/
│   │   └── page.tsx               # Contact Us (/contact)
│   ├── book/
│   │   └── page.tsx               # 5-Step Booking Flow (/book)
│   ├── api/
│   │   ├── book/
│   │   │   └── route.ts           # POST handler: booking submission
│   │   └── contact/
│   │       └── route.ts           # POST handler: inquiry form
│   ├── globals.css                # Tailwind directives + CSS custom properties
│   └── favicon.ico
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── EmergencyBar.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── TrustBadges.tsx
│   │   ├── FeaturedServices.tsx
│   │   ├── GentleCarePromise.tsx
│   │   ├── BeforeAfterSlider.tsx
│   │   ├── SmilePackages.tsx
│   │   ├── Testimonials.tsx
│   │   └── MapStrip.tsx
│   ├── booking/
│   │   ├── BookingFlow.tsx         # Parent stepper component
│   │   ├── StepService.tsx
│   │   ├── StepDateTime.tsx
│   │   ├── StepAddOns.tsx
│   │   ├── StepDetails.tsx
│   │   └── StepConfirmation.tsx
│   └── ui/                        # shadcn/ui components
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── accordion.tsx
│       ├── calendar.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── checkbox.tsx
│       ├── select.tsx
│       └── textarea.tsx
├── lib/
│   ├── constants.ts               # Clinic info, service list, doctor list, add-ons
│   ├── validations.ts             # Zod schemas (shared client + server)
│   ├── email.ts                   # Resend: send patient receipt + clinic alert
│   ├── calendar.ts                # Generate .ics file buffer
│   ├── sheets.ts                  # Google Sheets API: append booking row
│   └── rate-limit.ts              # In-memory IP rate limiter
├── public/
│   ├── images/
│   │   ├── logo.png               # Clinic logo
│   │   ├── hero.jpg               # Hero background [PLACEHOLDER]
│   │   ├── clinic/                 # Gallery photos [PLACEHOLDER]
│   │   └── doctors/               # Doctor portraits [PLACEHOLDER]
│   └── fonts/                     # Self-hosted Google Fonts (optional, for performance)
├── .env.local                     # Local environment variables (git-ignored)
├── .env.example                   # Template showing required env vars
├── tailwind.config.ts             # Brand color tokens
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Features

- **Brand Design System**: Exact palette tokens (`#526b50` Forest, `#273c2b` Dark Spruce, `#e9eee5` Sage Tint, `#f7f4ee` Warm Ivory, `#d4b688` Gold Accent), typography (`Lora` serif and `Inter` sans).
- **Navigation & Sticky Urgency Bar**: Top information strip with hours & phone, full responsive navbar, and persistent floating urgent care dock.
- **Home Experience**: Gentle care hero, trust strip, 4-card service highlights, interactive before/after smile comparison slider, value packages, testimonials, and neighborhood map.
- **5-Step Interactive Booking Engine**:
  1. *Step 1*: Service Selection with live pricing calculation
  2. *Step 2*: Date & Time slot picker
  3. *Step 3*: Care Extras & Add-ons (Fluoride, Air Polish, or skip)
  4. *Step 4*: Patient contact details, patient status (New/Returning), and doctor preference
  5. *Step 5*: Comprehensive summary review, calendar file download (.ics), and direct phone confirmation
- **Doctor Biography Modal**: Expandable doctor profile dialog showcasing background, credentials, and philosophy.
- **Backend API Routes**:
  - `/api/book`: Validated with Zod, in-memory rate limiting, .ics generation, email alerting, and Google Sheets append.
  - `/api/contact`: Direct inquiry handler with rate limiting.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

