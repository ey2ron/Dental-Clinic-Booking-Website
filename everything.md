# Areli Dental Clinic · Complete Architecture, Tech Stack & Setup Guide

This document is the single source of truth for **Areli Dental Clinic**, detailing the end-to-end system architecture, technology stack, directory layout, integration pipelines, and a step-by-step setup guide required to run and deploy the project seamlessly.

---

## 1. System Overview & Product Vision

**Areli Dental Clinic** is a human-centered, calming dental healthcare web platform located in Bacoor, Cavite ("Gentle Hands, Happy Smiles"). Built with a focus on patients experiencing dental anxiety, the application delivers transparent pricing, clear treatment explanations, an interactive before-and-after smile comparison module, doctor profile dialogs, and a guided 5-step interactive appointment booking engine.

### Key Capabilities
- **Brand-Faithful Design System**: Earthy, calming tones (Forest Green, Dark Spruce, Sage, Warm Ivory, Gold) with serif typography (`Lora`) paired with `Inter` for legibility.
- **5-Step Interactive Booking Engine**: Service selection with dynamic pricing calculation, calendar date and time picker, optional preventive care add-ons, patient information capture, and a comprehensive booking summary review.
- **Automated ICS Calendar Generation**: On-the-fly RFC 5545 `.ics` file creation with pre-configured alarm reminders (2 hours prior) for Apple Calendar, Google Calendar, and Outlook.
- **Dual-Channel Confirmation & Communication**: Automated email receipts and staff alerts via Resend, integrated with direct telephone deep-linking.
- **Automated Clinic Logging**: Real-time synchronization of confirmed appointments into Google Sheets via a Google Cloud Service Account.
- **Abuse Prevention**: In-memory sliding-window IP rate limiting across booking and contact API endpoints.

---

## 2. Complete Architecture

### 2.1 High-Level Architecture Diagram

```mermaid
flowchart TD
    subgraph ClientLayer["Client Layer (Browser)"]
        User["Patient / Visitor"]
        UI_Home["Home View (/)"]
        UI_About["About View (/about)"]
        UI_Services["Services Catalog (/services)"]
        UI_Team["Team & Doctor Modals (/team)"]
        UI_Contact["Contact & Transit (/contact)"]
        UI_Booking["5-Step Booking Engine (/book)"]
    end

    subgraph AppRouter["Next.js 15 App Router Server / Edge Runtime"]
        Layout["Root Layout (Navbar, EmergencyBar, Footer)"]
        RouteBook["POST /api/book"]
        RouteContact["POST /api/contact"]
        
        subgraph SecurityValidation["Security & Validation Layer"]
            RateLimiter["In-Memory Sliding-Window Rate Limiter\n(lib/rate-limit.ts)"]
            ZodValidator["Zod Schema Validation\n(lib/validations.ts)"]
        end

        subgraph CoreServices["Application Services (lib/)"]
        CalendarEngine["iCalendar .ics Generator\n(lib/calendar.ts)"]
        EmailService["Resend Email Dispatcher\n(lib/email.ts)"]
        SheetsSync["Google Sheets V4 Connector\n(lib/sheets.ts)"]
        end
    end

    subgraph ExternalServices["External Infrastructure & Services"]
        ResendAPI["Resend Email API\n(Patient Receipt + Clinic Alert)"]
        GoogleSheetsAPI["Google Sheets API v4\n(Clinic Appointment Ledger)"]
        TelService["Telephony Carrier\n(Direct Call Link)"]
    end

    User --> Layout
    Layout --> UI_Home
    Layout --> UI_About
    Layout --> UI_Services
    Layout --> UI_Team
    Layout --> UI_Contact
    Layout --> UI_Booking

    UI_Booking -->|JSON Payload| RouteBook
    UI_Contact -->|JSON Payload| RouteContact

    RouteBook --> RateLimiter
    RouteContact --> RateLimiter
    RateLimiter --> ZodValidator

    ZodValidator --> CalendarEngine
    ZodValidator --> EmailService
    ZodValidator --> SheetsSync

    CalendarEngine -->|Returns .ics Buffer| UI_Booking
    EmailService -->|HTTPS POST| ResendAPI
    SheetsSync -->|Service Account JWT| GoogleSheetsAPI
    Layout -.->|Urgent Hotline| TelService
```

---

### 2.2 Frontend Architecture

The frontend is built on **Next.js 15 (App Router)** and **React 19**, leveraging Server Components for static, SEO-critical content and Client Components (`"use client"`) for rich interactive features.

#### Page Routing Breakdown

| Route | Type | Primary Purpose | Components Utilized |
| :--- | :--- | :--- | :--- |
| `/` | Server Component | High-conversion landing page | `Hero`, `TrustBadges`, `FeaturedServices`, `GentleCarePromise`, `BeforeAfterSlider`, `SmilePackages`, `Testimonials`, `MapStrip` |
| `/about` | Server Component | Clinic story, care philosophy, 4-step listening protocol | Protocol cards, clinic promise badges, team call-to-action |
| `/services` | Client Component | Transparent treatment list, accordion categories, full price table | Service category accordions, full pricing table, dynamic consultation CTA |
| `/team` | Client Component | Doctor roster with biography modal popups | `Dialog`, `DialogHeader`, Doctor profile cards, clinical credentials, care philosophy |
| `/contact` | Client Component | Interactive inquiry form, hours, location, transit routes | Contact form, `Input`, `Textarea`, `Checkbox`, transit breakdown (Car, Jeepney, Landmark) |
| `/book` | Client Component | 5-step guided appointment booking flow | `BookingFlow`, `StepService`, `StepDateTime`, `StepAddOns`, `StepDetails`, `StepConfirmation` |

#### Layout & Persistent Architecture
- **Navbar (`components/layout/Navbar.tsx`)**:
  - Sticky header with an announcement banner displaying clinic operating hours (`Mon–Sun 9AM–6PM`) and telephone number (`(0956) 150 5566`).
  - Brand header with custom vector SVG tooth identity and mobile navigation drawer.
- **Emergency Bar (`components/layout/EmergencyBar.tsx`)**:
  - Persistent urgency element designed for acute dental distress ("Severe Toothache? Urgent Care").
  - Instant action button directing users to immediate telephone dialing.
- **Footer (`components/layout/Footer.tsx`)**:
  - Clinic operational hours, location address (`251 Molino Rd, Bacoor, Cavite`), emergency advisory, and navigation links.

---

### 2.3 Interactive 5-Step Booking Engine

The booking system (`components/booking/BookingFlow.tsx`) manages complex multi-step client state wrapped in a single parent orchestrator:

```mermaid
sequenceDiagram
    autonumber
    actor Patient as Patient (Browser)
    participant Stepper as BookingFlow (State Machine)
    participant API as /api/book (Route Handler)
    participant Resend as Resend Mail Gateway
    participant Sheets as Google Sheets Ledger

    Patient->>Stepper: Step 1: Select Dental Service (e.g. Routine Cleaning)
    Note over Stepper: Calculates baseline fee (₱1,200)
    Patient->>Stepper: Step 2: Choose Appointment Date & Time Slot
    Patient->>Stepper: Step 3: Add Extras (Fluoride: +₱350, Air Polish: +₱500)
    Note over Stepper: Computes real-time dynamic total
    Patient->>Stepper: Step 4: Fill Details (Name, Phone, Email, Doctor Preference)
    Note over Stepper: Client-side validation (Required fields, email syntax, terms)
    Patient->>Stepper: Step 5: Review Summary & Click "Confirm Request"
    Stepper->>API: POST /api/book {bookingData}
    
    activate API
    API->>API: 1. Verify Rate Limit (max 5 req/min)
    API->>API: 2. Validate against Zod BookingSchema
    API->>API: 3. Generate RFC 5545 .ics Calendar File
    API->>Resend: 4. Dispatch Patient Receipt & Clinic Alert
    API->>Sheets: 5. Append Row to Google Sheets Ledger
    API-->>Stepper: 200 OK {success: true, icsContent, bookingId}
    deactivate API

    Stepper->>Patient: Render Confirmation Screen with .ics Download & Call Link
```

#### Step Breakdown
1. **Step 1: Service Selection (`StepService.tsx`)**:
   - Filterable categories: Preventive, Restorative, Cosmetic, Dentures, Surgical, Pediatric.
   - Live badge indicators (e.g., "Most Popular").
2. **Step 2: Date & Time Slot Picker (`StepDateTime.tsx`)**:
   - Interactive calendar component selecting future available dates.
   - Slot selection with morning (9:00 AM – 11:00 AM) and afternoon (1:00 PM – 5:00 PM) intervals.
3. **Step 3: Care Extras & Add-ons (`StepAddOns.tsx`)**:
   - Optional post-care additions (Fluoride Treatment `+₱350`, Air Polish Stain Removal `+₱500`).
   - Clear toggle mechanics with dynamic fee tally.
4. **Step 4: Patient Details (`StepDetails.tsx`)**:
   - Full name, mobile number, email address.
   - Patient status toggle (`New Patient` vs `Returning Patient`).
   - Doctor preference dropdown (`First Available Doctor`, `Dr. Ana Reyes`, `Dr. Miguel Santos`, `Dr. Lea Cruz`).
   - Special accommodations/notes field and privacy agreement checkbox.
5. **Step 5: Review & Confirmation (`StepConfirmation.tsx`)**:
   - Comprehensive invoice breakdown showing selected service, add-ons, and total estimated fee.
   - One-click `.ics` calendar download to sync directly with Apple Calendar, Google Calendar, or Outlook.
   - Direct telephone call action to contact clinic coordinators with appointment reference numbers.

---

### 2.4 Backend & Route Handler Architecture

The backend operates via Next.js Route Handlers located under `app/api/`:

#### 1. `POST /api/book` (`app/api/book/route.ts`)
- **Rate Limiting**: Sliding window rate limiter enforcing a maximum of **5 requests per minute per IP address**. Exceeding returns `HTTP 429 Too Many Requests`.
- **Schema Validation**: Strongly typed validation via `BookingSchema` (`lib/validations.ts`). Invalid payloads immediately reject with `HTTP 400 Bad Request` and detailed field errors.
- **Calendar Dispatch**: Generates an RFC 5545 `.ics` buffer with start and end timestamps, formatted descriptions, clinic coordinates, and an embedded alarm (`VALARM`) scheduled for 2 hours before the appointment.
- **Email Delivery**: Invokes `sendBookingEmails()` via Resend to dispatch HTML receipts to the patient and an administrative notification to clinic reception. Operates in graceful mock mode if API keys are unconfigured.
- **Spreadsheet Synchronization**: Invokes `appendBookingToSheet()` to append the reservation into the clinic Google Sheet ledger.

#### 2. `POST /api/contact` (`app/api/contact/route.ts`)
- **Rate Limiting**: Enforces a maximum of **5 inquiries per minute per IP address**.
- **Schema Validation**: Validates name, phone, email, message length, and privacy consent using `ContactSchema`.
- **Inquiry Notification**: Dispatches an email summary directly to `CLINIC_ALERT_EMAIL`.

---

### 2.5 Security, Resilience & Fallback Handling

1. **Graceful Degradation (Mock Mode)**:
   - When external API credentials (`RESEND_API_KEY` or Google Sheets credentials) are missing or in local development mode, the system does not crash or throw unhandled exceptions. Instead, it logs the simulated transaction to stdout and returns a successful response to the frontend client.
2. **In-Memory Rate Limiting**:
   - `lib/rate-limit.ts` maintains an in-memory map of client IP addresses with automatic pruning when size exceeds 10,000 entries to prevent memory leaks.
3. **Environment Isolation**:
   - Client-accessible variables are strictly isolated under the `NEXT_PUBLIC_` namespace.
   - Private keys (Resend API Key, Google Cloud Service Account Private Key) remain exclusively server-side.

---

## 3. Comprehensive Tech Stack

### 3.1 Technology Matrix

| Layer | Technology | Version | Purpose & Architectural Justification |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `15.1.7` | Modern React framework providing server-side rendering (SSR), static site generation (SSG), optimized image pipelines, and built-in API route handlers. |
| **UI Library** | React | `19.0.0` | Latest React version utilizing modern hook patterns, concurrent features, and Server/Client component separation. |
| **Language** | TypeScript | `5.7.3` | End-to-end static type safety across shared client schemas, API handlers, and UI props. |
| **Styling** | Tailwind CSS | `3.4.17` | Utility-first CSS framework configured with custom brand design tokens, shadows, and responsive breakpoints. |
| **CSS Preprocessor** | PostCSS + Autoprefixer | `8.5.2` / `10.4.20` | Vendor prefixing and CSS transformation. |
| **Class Utilities** | `clsx` + `tailwind-merge` | `2.1.1` / `3.0.1` | Efficient dynamic class condition handling and conflict resolution for UI components. |
| **Schema Validation** | Zod | `3.24.2` | Declarative schema validation shared between client-side forms and server-side route handlers. |
| **Iconography** | Lucide React | `0.475.0` | Clean, accessible SVG icons customized for healthcare and dental contexts. |
| **Fonts & Typography** | `next/font/google` | Built-in | Zero-layout-shift Google Font delivery (`Lora` for editorial serif headers, `Inter` for clean sans-serif body). |
| **Email Gateway** | Resend REST API | Native Fetch | Transactional email delivery for patient receipts and clinic staff alerts. |
| **Spreadsheet Sync** | Google Sheets API v4 | Service Account | Automated cloud backup and patient appointment tracking. |
| **Calendar Standard** | iCalendar (RFC 5545) | Pure TypeScript | Native `.ics` file generation without external heavyweight dependencies. |

---

### 3.2 Design System Tokens & Brand Colors

The design tokens are declared in `tailwind.config.ts` and `app/globals.css`:

```typescript
colors: {
  brand: {
    primary: "#526b50",  // Deep Forest Green (Buttons, Active Elements, Accents)
    dark:    "#273c2b",  // Dark Spruce (Headings, Primary Text, Hero Titles)
    accent:  "#6f8b6d",  // Muted Leaf Green (Borders, Secondary Accents)
    sage:    "#e9eee5",  // Sage Tint (Card Backgrounds, Icon Badges)
    cream:   "#f7f4ee",  // Warm Ivory (Primary Canvas Background)
    border:  "#dde2d8",  // Subtle Divider Grey-Green
    muted:   "#687167",  // Slate Olive (Body Text, Secondary Descriptions)
    charcoal:"#2d3748",  // High-contrast text elements
    gold:    "#d4b688",  // Gold Accent (Star Ratings, Trust Badges, Highlights)
  }
}
```

---

## 4. Complete Project Directory Structure

```text
Areli/
├── everything.md                            # Complete architecture, tech stack & setup documentation
└── areli-dental-clinic/
    ├── package.json                         # Scripts & dependency definitions
    ├── tsconfig.json                        # TypeScript configuration with @/* path aliases
    ├── next.config.ts                       # Next.js config (remote image patterns, strict mode)
    ├── tailwind.config.ts                   # Custom brand colors, fonts, box shadows
    ├── postcss.config.mjs                   # PostCSS plugins (Tailwind, Autoprefixer)
    ├── .env.example                         # Environment variable template
    ├── .env.local                           # Local environment configuration
    ├── .gitignore                           # Git ignore rules (.next, node_modules, envs)
    ├── README.md                            # Quickstart project overview
    │
    ├── app/                                 # Next.js App Router Root
    │   ├── layout.tsx                       # Root HTML shell, fonts (Inter, Lora), Navbar, Footer
    │   ├── globals.css                      # Tailwind base directives and root CSS rules
    │   ├── favicon.ico                      # Browser favicon
    │   ├── page.tsx                         # Landing Home Page (/)
    │   ├── about/
    │   │   └── page.tsx                     # About Clinic Page (/about)
    │   ├── services/
    │   │   └── page.tsx                     # Services Catalog & Pricing Table (/services)
    │   ├── team/
    │   │   └── page.tsx                     # Doctor Team & Biography Modals (/team)
    │   ├── contact/
    │   │   └── page.tsx                     # Inquiries & Transit Guidance (/contact)
    │   ├── book/
    │   │   └── page.tsx                     # 5-Step Guided Booking Engine (/book)
    │   └── api/                             # Serverless Route Handlers
    │       ├── book/
    │       │   └── route.ts                 # POST /api/book handler
    │       └── contact/
    │           └── route.ts                 # POST /api/contact handler
    │
    ├── components/                          # Modular React Components
    │   ├── layout/                          # Global Layout Shell
    │   │   ├── Navbar.tsx                   # Top hours bar, logo, responsive nav menu
    │   │   ├── Footer.tsx                   # Navigation links, contact info, disclaimer
    │   │   └── EmergencyBar.tsx             # Floating / static urgent dental care dock
    │   ├── home/                            # Home Page Sections
    │   │   ├── Hero.tsx                     # Main value proposition & CTA
    │   │   ├── TrustBadges.tsx              # Trust metrics (4.9 Stars, Gentle Care, etc.)
    │   │   ├── FeaturedServices.tsx         # 4-card service highlights
    │   │   ├── GentleCarePromise.tsx        # Comfort-first patient philosophy
    │   │   ├── BeforeAfterSlider.tsx        # Interactive touch/drag before-after smile slider
    │   │   ├── SmilePackages.tsx            # Transparent care bundles (Fresh Smile, Total Reset)
    │   │   ├── Testimonials.tsx             # Patient reviews and stories
    │   │   └── MapStrip.tsx                 # Bacoor neighborhood map and transit info
    │   ├── booking/                         # 5-Step Booking Components
    │   │   ├── BookingFlow.tsx              # Main stepper orchestrator and state machine
    │   │   ├── StepService.tsx              # Step 1: Service category and item selection
    │   │   ├── StepDateTime.tsx             # Step 2: Date calendar and time slots
    │   │   ├── StepAddOns.tsx               # Step 3: Optional preventive care add-ons
    │   │   ├── StepDetails.tsx              # Step 4: Patient details, doctor choice & consent
    │   │   └── StepConfirmation.tsx         # Step 5: Summary review, .ics download, call action
    │   └── ui/                              # Accessible UI Primitives
    │       ├── accordion.tsx                # Collapsible accordion container & items
    │       ├── button.tsx                   # Primary, secondary, outline, ghost button variants
    │       ├── calendar.tsx                 # Date selection grid with month navigation
    │       ├── checkbox.tsx                 # Controlled accessible checkbox
    │       ├── dialog.tsx                   # Accessible modal dialog window
    │       ├── input.tsx                    # Form text/email/phone input field
    │       ├── label.tsx                    # Form field label
    │       ├── select.tsx                   # Custom dropdown select component
    │       └── textarea.tsx                 # Form multiline text area
    │
    ├── lib/                                 # Shared Business Logic, Data & Utilities
    │   ├── constants.ts                     # Clinic info, services, doctors, add-ons, slots
    │   ├── validations.ts                   # Zod schemas for Booking and Contact forms
    │   ├── calendar.ts                      # RFC 5545 .ics calendar generator with VALARM
    │   ├── email.ts                         # Resend API integration (patient receipt + alert)
    │   ├── sheets.ts                        # Google Sheets API v4 booking row append
    │   └── rate-limit.ts                    # Sliding-window in-memory IP rate limiter
    │
    └── public/                              # Static Assets
        ├── images/
        │   ├── logo.png                     # Official clinic logo
        │   ├── hero.jpg                     # Hero banner photograph
        │   ├── clinic/                      # Clinic facility and treatment room images
        │   └── doctors/                     # Doctor portrait photography
        └── fonts/                           # Self-hosted typography assets (optional fallback)
```

---

## 5. Needed Setup for Seamless Operation

Follow this step-by-step setup guide to take Areli Dental Clinic from a local development environment to full production with live email delivery and Google Sheets sync.

---

### Step 1: System Prerequisites

Ensure your host environment meets the following specifications:
- **Node.js**: `v18.18.0` or higher (Recommended: `v20.x` LTS or `v22.x`)
- **Package Manager**: `npm` (v9+), `pnpm` (v8+), or `yarn` (v1.22+)
- **Operating System**: Windows 10/11, macOS, or Linux

Verify your environment by running:
```bash
node -v
npm -v
```

---

### Step 2: Clone & Install Dependencies

Navigate into the application folder and install dependencies:

```bash
cd "areli-dental-clinic"
npm install
```

---

### Step 3: Environment Variables Configuration

Copy `.env.example` to create `.env.local`:

```bash
cp .env.example .env.local
```

#### Complete Environment Variable Reference

| Variable Name | Required | Default / Example | Purpose |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes | `http://localhost:3000` | The canonical base URL used for OpenGraph tags, canonical links, and redirect destinations. |
| `NEXT_PUBLIC_CLINIC_PHONE` | Yes | `"(0956) 150 5566"` | Display phone number shown across top navbar, emergency bar, and footer. |
| `NEXT_PUBLIC_CLINIC_ADDRESS`| Yes | `"251 Molino Rd, Bacoor, Cavite"` | Clinic street address displayed on map cards and contact panels. |
| `RESEND_API_KEY` | Optional | `re_123456789...` | API key from Resend. If left blank, email service runs in console mock mode without throwing errors. |
| `CLINIC_ALERT_EMAIL` | Optional | `appointments@arelidental.com` | Clinic staff inbox where real-time booking alerts and website inquiries are delivered. |
| `EMAIL_FROM` | Optional | `"Areli Dental Clinic <no-reply@arelidental.com>"` | Sender address verified in your Resend account. |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Optional | `areli-sync@project.iam.gserviceaccount.com` | Google Cloud Service Account email with Editor access to the target Google Sheet. |
| `GOOGLE_PRIVATE_KEY` | Optional | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"` | Service Account RSA private key (with escaped newlines). |
| `GOOGLE_SHEETS_SPREADSHEET_ID`| Optional | `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms` | Google Sheets ID extracted from the spreadsheet URL. |

---

### Step 4: Setting Up Resend Email Delivery (Optional for Local, Mandatory for Production)

To enable live email dispatch for patient confirmation receipts and clinic staff alerts:

1. **Create an Account**: Sign up at [Resend.com](https://resend.com).
2. **Add & Verify Domain**:
   - In Resend, go to **Domains** -> **Add Domain** (`arelidental.com` or your staging domain).
   - Add the generated DNS records (`DKIM`, `SPF`, and `MX`) in your domain registrar (e.g. Cloudflare, GoDaddy, Namecheap).
   - Wait until Resend reports the domain as **Verified**.
3. **Generate API Key**:
   - Navigate to **API Keys** -> **Create API Key**.
   - Give it full sending access and copy the key (e.g., `re_abc123...`).
4. **Update `.env.local`**:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   CLINIC_ALERT_EMAIL=reception@arelidental.com
   EMAIL_FROM="Areli Dental Clinic <appointments@arelidental.com>"
   ```

*Note: In development without a verified domain, Resend allows sending test emails exclusively to the email address registered with your Resend account.*

---

### Step 5: Setting Up Google Sheets Sync (Automated Booking Ledger)

To automatically record every appointment in Google Sheets:

1. **Google Cloud Console Project**:
   - Visit [Google Cloud Console](https://console.cloud.google.com).
   - Create a project named `Areli-Dental-Clinic`.
2. **Enable Google Sheets API**:
   - In **APIs & Services** -> **Library**, search for `Google Sheets API`.
   - Click **Enable**.
3. **Create Service Account**:
   - Go to **IAM & Admin** -> **Service Accounts**.
   - Click **Create Service Account** (e.g., `areli-sheets-sync`).
   - Click **Done**.
   - Click on the newly created service account -> **Keys** tab -> **Add Key** -> **Create new key** -> Choose **JSON**.
   - A `.json` file will download to your computer.
4. **Create & Share Google Sheet**:
   - Open [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet (e.g., "Areli Clinic Appointments").
   - Click **Share** (top-right) and paste the `client_email` from your downloaded JSON key. Set permission to **Editor** and uncheck "Notify people".
   - Copy the Spreadsheet ID from the browser URL:
     `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID>`**`/edit`
5. **Configure Column Headers**:
   In row 1 of the spreadsheet, add these columns:
   | A | B | C | D | E | F | G | H | I | J | K | L | M |
   | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
   | `Timestamp` | `Full Name` | `Phone` | `Email` | `Patient Type` | `Service` | `Date` | `Time Slot` | `Provider` | `Add-ons` | `Total Fee` | `Notes` | `Status` |
6. **Populate `.env.local`**:
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL="areli-sheets-sync@project-id.iam.gserviceaccount.com"
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEETS_SPREADSHEET_ID="your_spreadsheet_id_here"
   ```

---

### Step 6: Local Development & Verification

Run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Verification Checklist
- [ ] **Home Page (`/`)**:
  - Test the interactive Before/After comparison slider (`BeforeAfterSlider.tsx`) with mouse drag and touch swipe.
  - Verify that the sticky urgent care bar (`EmergencyBar.tsx`) appears and buttons trigger phone call actions.
- [ ] **Services Page (`/services`)**:
  - Click accordion categories and confirm pricing table displays without layout shift.
  - Click "Find your care" or service action buttons to ensure query parameters carry over (e.g. `/book?service=cleaning`).
- [ ] **Team Page (`/team`)**:
  - Click "Read Dr. Ana's Story" (or any doctor) to verify the accessible Dialog modal opens with background backdrop blur and closes on escape/click-away.
- [ ] **Booking Engine (`/book`)**:
  - Step through 1 to 5.
  - On Step 5, click **Confirm Request**.
  - Check the server console log for simulated email dispatch and Google Sheets append (if keys are unset) or live dispatch (if keys are set).
  - Verify that the **Download Calendar File (.ics)** button produces a valid `.ics` download and opens cleanly in your calendar application.
- [ ] **Contact Page (`/contact`)**:
  - Submit the contact form and verify feedback banner and rate limiting (submitting more than 5 times in 60 seconds triggers `HTTP 429`).

---

### Step 7: Production Build & Deployment

#### Building for Production
Verify there are no TypeScript compilation or bundling errors:

```bash
npm run build
```

Test the optimized production build locally:

```bash
npm run start
```

#### Recommended Deployment Targets

##### Option A: Vercel (Recommended)
1. Push repository to GitHub or GitLab.
2. Import project in Vercel: set **Root Directory** to `areli-dental-clinic`.
3. Add all production environment variables in the Vercel dashboard under **Project Settings** -> **Environment Variables**.
4. Deploy. Vercel automatically configures edge caching and serverless route handlers.

##### Option B: Self-Hosted Docker / Node Server
If deploying to a VPS (Ubuntu/Debian with Nginx or Caddy):
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

---

### Step 8: Operational Best Practices & Troubleshooting

1. **Rate Limiter in Serverless / Multi-Instance Deployments**:
   - `lib/rate-limit.ts` uses an in-memory `Map`. On serverless platforms (like Vercel or AWS Lambda), each cold start or concurrent container maintains its own memory space.
   - For high-volume production deployments where strict global rate limiting is required, replace the in-memory map with **Upstash Redis** or an Edge KV store using `@upstash/ratelimit`.
2. **Private Key Formatting**:
   - In `.env.local` or hosting platforms, ensure `GOOGLE_PRIVATE_KEY` has actual newlines or escaped `\n` characters preserved properly so the RSA parser does not fail with `ERR_OSSL_PEM_BAD_BASE64_DECODE`.
3. **Image Optimization**:
   - Remote imagery is served from `images.unsplash.com` and configured in `next.config.ts`.
   - When replacing placeholders with proprietary clinic photos, place them in `public/images/` and update references in `lib/constants.ts`.

---

*Document prepared for Areli Dental Clinic · Bacoor, Cavite.*

