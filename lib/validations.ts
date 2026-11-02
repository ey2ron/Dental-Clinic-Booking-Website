import { z } from "zod";

/**
 * Normalizes Philippine mobile numbers by stripping spaces, dashes, parentheses,
 * and converting "+639" into "09".
 */
export function normalizePhilippinePhone(val: string): string {
  if (!val) return "";
  let cleaned = val.replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+63")) {
    cleaned = "0" + cleaned.slice(3);
  } else if (cleaned.startsWith("63") && cleaned.length === 12) {
    cleaned = "0" + cleaned.slice(2);
  }
  return cleaned;
}

/**
 * Philippine mobile phone validation regex: 11 digits starting with "09"
 */
export const PH_PHONE_REGEX = /^09\d{9}$/;

export const BookingSchema = z.object({
  serviceId: z.string().min(1, "Please choose a service to schedule."),
  serviceTitle: z.string().min(1, "Service title is required."),
  servicePrice: z.number().nonnegative(),
  date: z
    .string()
    .min(1, "Please select an appointment date.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Appointment date must be in YYYY-MM-DD format."),
  timeSlot: z.string().min(1, "Please select a preferred time slot."),
  addOns: z.array(z.string()).default([]),
  addOnsTotal: z.number().nonnegative().default(0),
  totalPrice: z.number().nonnegative("Total price cannot be negative."),
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters."),
  phone: z
    .string()
    .trim()
    .transform((val) => normalizePhilippinePhone(val))
    .refine((val) => PH_PHONE_REGEX.test(val), {
      message: "Please enter a valid 11-digit Philippine mobile number starting with 09 (e.g. 0956 150 5566).",
    }),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .toLowerCase(),
  patientType: z.enum(["new", "returning"]).default("new"),
  doctorId: z.string().default("any"),
  doctorName: z.string().default("First Available Doctor"),
  notes: z.string().max(500, "Notes cannot exceed 500 characters.").optional().default(""),
  agreeConsent: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to be contacted via email and SMS/phone call for appointment confirmation.",
    }),
  }),
  // Honeypot spam trap: must be left empty by legitimate users
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof BookingSchema>;

export const ContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters."),
  phone: z
    .string()
    .trim()
    .transform((val) => normalizePhilippinePhone(val))
    .refine((val) => PH_PHONE_REGEX.test(val), {
      message: "Please enter a valid 11-digit Philippine mobile number starting with 09 (e.g. 0956 150 5566).",
    }),
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .toLowerCase(),
  subject: z.string().default("general"),
  message: z
    .string()
    .trim()
    .min(5, "Message must be at least 5 characters.")
    .max(1500, "Message cannot exceed 1,500 characters."),
  agreeConsent: z.literal(true, {
    errorMap: () => ({
      message: "You must agree to be contacted regarding your inquiry.",
    }),
  }),
  // Honeypot spam trap
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof ContactSchema>;
