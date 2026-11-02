export interface ClinicInfo {
  name: string;
  tagline: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  address: string;
  addressShort: string;
  hours: string;
  phone: string;
  phoneRaw: string;
  socials: {
    facebook: string;
    instagram: string;
  };
}

export const CLINIC_INFO: ClinicInfo = {
  name: "Areli Dental Clinic",
  tagline: "Gentle hands, Happy smiles ",
  heroEyebrow: "A CALMER KIND OF DENTAL CARE · BACOOR",
  heroTitle: "Gentle Hands, Happy Smiles",
  heroDescription:
    "Compassionate, anxiety-free dental care for the whole family — right here in Bacoor, Cavite.",
  address: "251 Molino Road, San Nicolas II, Bacoor, 4102 Cavite, Philippines",
  addressShort: "251 Molino Rd, San Nicolas II, Bacoor, Cavite 4102",
  hours: "Monday – Sunday, 9:00 AM – 6:00 PM",
  phone: "(0956) 150 5566",
  phoneRaw: "+639561505566",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61581405039131",
    instagram: "https://www.instagram.com/areli_dentalclinic/",
  },
};

export interface ServiceItem {
  id: string;
  title: string;
  category: "preventive" | "restorative" | "cosmetic" | "dentures" | "surgical" | "pediatric" | "package";
  shortDescription: string;
  fullDescription: string;
  price: number;
  priceDisplay: string;
  durationMinutes: number;
  durationDisplay: string;
  badge?: string;
  iconName: string;
  whatToExpect?: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: "cleaning",
    title: "Dental Cleaning & Checkup",
    category: "preventive",
    shortDescription: "A fresh start for healthier teeth and gums.",
    fullDescription:
      "Routine visits help keep teeth and gums healthy. A gentle professional clean removes plaque and tartar that brushing alone can leave behind.",
    price: 1200,
    priceDisplay: "From ₱1,200 [PLACEHOLDER]",
    durationMinutes: 45,
    durationDisplay: "About 45–60 mins",
    badge: "Most Popular",
    iconName: "Sparkles",
    whatToExpect: [
      "A friendly check-in and visual examination of your oral health",
      "Gentle ultrasonic scaling and polishing, pausing whenever needed",
      "Personalized preventive advice and home-care recommendations",
    ],
  },
  {
    id: "extraction",
    title: "Tooth Pain / Extraction",
    category: "surgical",
    shortDescription: "Prompt, gentle relief for severe discomfort or damaged teeth.",
    fullDescription:
      "When a tooth cannot be preserved, our gentle extraction protocol prioritizes patient comfort, gentle technique, and stress-free recovery.",
    price: 1500,
    priceDisplay: "From ₱1,500 [PLACEHOLDER]",
    durationMinutes: 45,
    durationDisplay: "About 45 mins",
    badge: "Urgent Relief",
    iconName: "HeartPulse",
    whatToExpect: [
      "Application of topical numbing gel before local anesthesia",
      "Calm, minimally invasive extraction technique with zero rush",
      "Detailed written homecare instructions and sterile gauze packet",
    ],
  },
  {
    id: "filling",
    title: "Filling / Tooth Restoration",
    category: "restorative",
    shortDescription: "Bring comfort, strength, and confidence back to your bite.",
    fullDescription:
      "Natural-looking composite fillings to repair cavities, chipped edges, or minor tooth wear while matching your natural tooth shade.",
    price: 1500,
    priceDisplay: "From ₱1,500 / tooth [PLACEHOLDER]",
    durationMinutes: 45,
    durationDisplay: "About 45 mins",
    iconName: "ShieldPlus",
    whatToExpect: [
      "Numbing gel applied prior to gentle local numbing",
      "Conservative decay removal to preserve healthy tooth structure",
      "Precise shade matching and smooth composite polishing",
    ],
  },
  {
    id: "dentures",
    title: "Dentures & Prosthetics",
    category: "dentures",
    shortDescription: "Custom-made for your smile. Engineered for daily comfort.",
    fullDescription:
      "Partial and full dentures engineered for secure chewing comfort, natural appearance, and everyday stability.",
    price: 8000,
    priceDisplay: "From ₱8,000 [PLACEHOLDER]",
    durationMinutes: 45,
    durationDisplay: "Multiple visits",
    iconName: "Smile",
    whatToExpect: [
      "Precise anatomical impressions of your gum ridges",
      "Wax try-in to verify bite height, speech, and facial aesthetics",
      "Fine-tuned delivery with complimentary follow-up adjustments",
    ],
  },
  {
    id: "cosmetic",
    title: "Cosmetic / Teeth Whitening",
    category: "cosmetic",
    shortDescription: "Explore a noticeably brighter smile, thoughtfully and safely.",
    fullDescription:
      "Safe, clinically tested in-office whitening designed to brighten enamel while guarding against sensitive zings.",
    price: 6000,
    priceDisplay: "From ₱6,000 [PLACEHOLDER]",
    durationMinutes: 60,
    durationDisplay: "About 60 mins",
    iconName: "Sun",
    whatToExpect: [
      "Gingival barrier applied to protect delicate gums",
      "Targeted whitening gel with controlled light activation",
      "Post-treatment remineralizing rinse and aftercare shade guide",
    ],
  },
  {
    id: "consultation",
    title: "Consultation & Exam",
    category: "preventive",
    shortDescription: "Assessment & personalized care plan without pressure.",
    fullDescription:
      "Meet your dentist, share your health history, and receive an honest, step-by-step assessment of your smile without pressure.",
    price: 500,
    priceDisplay: "From ₱500 [PLACEHOLDER]",
    durationMinutes: 30,
    durationDisplay: "About 30 mins",
    iconName: "MessagesSquare",
    whatToExpect: [
      "Open discussion about your comfort level and dental history",
      "Visual and diagnostic dental check",
      "Clear explanation of options, timelines, and costs before anything begins",
    ],
  },
];

export interface AddOnItem {
  id: string;
  title: string;
  fee: number;
  feeDisplay: string;
  description: string;
  iconName: string;
  applicableServices: string[]; // service IDs or ["all"]
}

export const ADD_ONS: AddOnItem[] = [
  {
    id: "fluoride",
    title: "Fluoride Treatment",
    fee: 350,
    feeDisplay: "+₱350 [PLACEHOLDER]",
    description: "Strengthen enamel and reduce post-cleaning sensitivity with gentle mineral varnish.",
    iconName: "ShieldCheck",
    applicableServices: ["cleaning", "consultation", "all"],
  },
  {
    id: "air-polish",
    title: "Air Polishing",
    fee: 500,
    feeDisplay: "+₱500 [PLACEHOLDER]",
    description: "Delicate sodium bicarbonate air polish for gentle coffee, tea, and surface stain removal.",
    iconName: "Wind",
    applicableServices: ["cleaning", "all"],
  },
  {
    id: "desensitizing-gel",
    title: "Desensitizing Gel Application",
    fee: 400,
    feeDisplay: "+₱400 [PLACEHOLDER]",
    description: "Targeted soothing gel for immediate post-procedure gum and root tranquility.",
    iconName: "HeartPulse",
    applicableServices: ["extraction", "filling", "all"],
  },
  {
    id: "take-home-kit",
    title: "Oral Hygiene Take-Home Kit",
    fee: 450,
    feeDisplay: "+₱450 [PLACEHOLDER]",
    description: "Curated soft-bristle brush, clinical floss, and travel remineralizing paste.",
    iconName: "Sparkles",
    applicableServices: ["cleaning", "extraction", "filling", "dentures", "cosmetic", "all"],
  },
];

export interface DoctorProfile {
  id: string;
  name: string;
  credentials: string;
  specialty: string;
  focus: string;
  quote: string;
  biography: string;
  personalPhilosophy: string;
  interests: string[];
  imageUrl: string;
  isPlaceholder?: boolean;
}

export const DOCTORS: DoctorProfile[] = [
  {
    id: "dr-ana-reyes",
    name: "Dr. Ana Reyes",
    credentials: "DMD · Lic. Dental Surgeon [PLACEHOLDER]",
    specialty: "General Dentistry",
    focus: "Preventive care & anxious patients",
    quote: "“We’ll take this one gentle step at a time.”",
    biography:
      "Dr. Ana graduated with dental honors and has dedicated over 9 years to community and family dentistry. Known for her calm and unhurried demeanor, she specializes in guiding patients with dental anxiety through fear-free visits.",
    personalPhilosophy:
      "Nobody should ever dread seeing the dentist. A soothing environment and honest, step-by-step conversation make all the difference.",
    interests: ["Preventive Dentistry", "Dental Phobia Care", "Oral Prophylaxis", "Aesthetic Restorations"],
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80",
    isPlaceholder: true,
  },
  {
    id: "dr-miguel-santos",
    name: "Dr. Miguel Santos",
    credentials: "DMD · Prosthodontic Fellow [PLACEHOLDER]",
    specialty: "General & Restorative Dentistry",
    focus: "Restorative care & dentures",
    quote: "“A clear plan makes room for confidence.”",
    biography:
      "Dr. Miguel completed advanced clinical training in prosthetics and restorative aesthetics. He takes time to walk each patient through diagnosis so every decision feels informed and transparent.",
    personalPhilosophy:
      "Dentistry is part engineering, part empathy. Our goal is to bring comfortable chewing and confident smiling back into your everyday life.",
    interests: ["Crowns & Bridges", "Full & Partial Dentures", "Complex Fillings", "Bite Realignment"],
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    isPlaceholder: true,
  },
  {
    id: "dr-lea-cruz",
    name: "Dr. Lea Cruz",
    credentials: "DMD · Pediatric Dental Advocate [PLACEHOLDER]",
    specialty: "Pediatric & Family Dentistry",
    focus: "Family & pediatric care",
    quote: "“Little smiles deserve a little extra patience.”",
    biography:
      "Dr. Lea has a warm, cheerful disposition that makes children and first-time dental visitors feel instantly at home. She focuses on early oral habits, cavity prevention, and gentle developmental dental guidance.",
    personalPhilosophy:
      "A positive childhood memory at the clinic builds a lifetime of oral health. We make sure every child leaves with pride and a smile.",
    interests: ["Pediatric Dentistry", "Pit & Fissure Sealants", "Fluoride Therapy", "Parental Dental Coaching"],
    imageUrl: "https://images.unsplash.com/photo-1594824813568-19e344e24ef5?auto=format&fit=crop&w=800&q=80",
    isPlaceholder: true,
  },
];

// 30-minute intervals from 9:00 AM to 5:30 PM (Section 3.6 Step 2)
export const TIME_SLOTS = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];

export interface SmilePackage {
  id: string;
  badge: string;
  name: string;
  price: string;
  priceNumber: number;
  features: string[];
  note: string;
  isPopular?: boolean;
}

export const SMILE_PACKAGES: SmilePackage[] = [
  {
    id: "fresh-smile",
    badge: "YOUR EVERYDAY RESET",
    name: "Fresh Smile Routine",
    price: "₱1,200",
    priceNumber: 1200,
    features: ["Consultation + routine cleaning", "Personalized home-care advice"],
    note: "Starting at ₱1,200 [PLACEHOLDER] · One visit",
  },
  {
    id: "total-reset",
    badge: "BEST VALUE",
    name: "Total Oral Reset",
    price: "₱1,850",
    priceNumber: 1850,
    features: ["Consultation + routine cleaning", "Fluoride Treatment + Air Polishing"],
    note: "Starting at ₱1,850 [PLACEHOLDER] · Best Value",
    isPopular: true,
  },
  {
    id: "family-pass",
    badge: "A LITTLE CARE FOR EVERYONE",
    name: "Family Smile Pass",
    price: "₱3,200",
    priceNumber: 3200,
    features: ["Routine cleaning for 3 family members", "Individual care recommendations"],
    note: "Starting at ₱3,200 [PLACEHOLDER] · 3 pax",
  },
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  rating: number;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote: "“I was nervous before my visit. Being able to ask questions and take breaks made all the difference.”",
    author: "Mika R. · Bacoor Resident [PLACEHOLDER]",
    rating: 5,
  },
  {
    id: "2",
    quote: "“Super gentle! They explained what they were doing before every step. Best dental experience in Cavite.”",
    author: "Carlos P. · Family Patient [PLACEHOLDER]",
    rating: 5,
  },
  {
    id: "3",
    quote: "“Brought my 6-year-old daughter here and the doctor was magnificent with her. No tears, just smiles!”",
    author: "Joy T. · Mother of 2 [PLACEHOLDER]",
    rating: 5,
  },
];
