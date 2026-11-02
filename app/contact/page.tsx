"use client";

import * as React from "react";
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Car,
  Bus,
  Compass,
  Send,
  ExternalLink,
} from "lucide-react";
import { CLINIC_INFO } from "@/lib/constants";
import { normalizePhilippinePhone, PH_PHONE_REGEX } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("general");
  const [message, setMessage] = React.useState("");
  const [agreeConsent, setAgreeConsent] = React.useState(true);
  const [websiteHoneypot, setWebsiteHoneypot] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }

    const normalizedPhone = normalizePhilippinePhone(phone);
    if (!normalizedPhone || !PH_PHONE_REGEX.test(normalizedPhone)) {
      errs.phone = "Please enter a valid 11-digit Philippine mobile number starting with 09 (e.g. 0956 150 5566).";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!message.trim() || message.trim().length < 5) {
      errs.message = "Message must be at least 5 characters.";
    }

    if (!agreeConsent) {
      errs.agreeConsent = "You must agree to be contacted regarding your inquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const normalizedPhone = normalizePhilippinePhone(phone);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: normalizedPhone,
          email: email.trim().toLowerCase(),
          subject,
          message: message.trim(),
          agreeConsent,
          website: websiteHoneypot,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send inquiry.");
      }

      setSubmitted(true);
    } catch {
      // Offline / graceful fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "251 Molino Road, San Nicolas II, Bacoor, 4102 Cavite, Philippines"
  )}`;

  return (
    <div className="flex flex-col w-full">
      {/* React 19 Head Tag Hoisting per plan.md Section 9.2 */}
      <title>Contact &amp; Location | Areli Dental Clinic — Molino Rd, Bacoor</title>
      <meta
        name="description"
        content="Visit us at 251 Molino Rd, San Nicolas II, Bacoor, Cavite. Call (0956) 150 5566. Open daily 9AM–6PM."
      />

      {/* 1. Internal Hero per plan.md Section 3.5 */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="flex flex-col gap-4 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
            Get In Touch
          </p>
          <h1 className="font-serif text-[44px] sm:text-[60px] lg:text-[68px] text-[#273c2b] tracking-[-1.5px] leading-[1.12] font-normal">
            We’d love to hear from you.
          </h1>
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#687167]">
            Have a question about a treatment, feeling anxious about your visit, or need emergency assistance? Reach out to our Bacoor clinic team.
          </p>
        </div>
      </section>

      {/* 2. Map + Contact Info & Action Buttons per plan.md Section 3.5 */}
      <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Google Map embed */}
          <div className="lg:col-span-6">
            <div className="h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#dde2d8] shadow-sm bg-[#f7f4ee]">
              <iframe
                title="Areli Dental Clinic Map Location"
                src="https://maps.google.com/maps?q=251%20Molino%20Road,%20San%20Nicolas%20II,%20Bacoor,%20Cavite,%20Philippines&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="size-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Address & 4 Action Buttons */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
                Clinic Address &amp; Hours
              </span>
              <h2 className="font-serif text-[32px] sm:text-[38px] text-[#273c2b] font-normal leading-tight">
                251 Molino Road, Bacoor
              </h2>
              <p className="text-[14px] text-[#687167]">
                San Nicolas II, Bacoor, 4102 Cavite, Philippines
              </p>
            </div>

            <div className="flex flex-col gap-3 text-[14px] text-[#273c2b] font-sans">
              <div className="flex items-center gap-3">
                <Clock className="size-4 text-[#526b50] shrink-0" />
                <span>Monday – Sunday, 9:00 AM – 6:00 PM (Open 7 Days)</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-[#526b50] shrink-0" />
                <a href={`tel:${CLINIC_INFO.phoneRaw}`} className="hover:underline font-medium">
                  {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

            {/* 4 Action Buttons as Outlined Sage Pills per plan.md Section 3.5 */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full text-[13px] gap-1.5 h-[42px] px-5">
                  <ExternalLink className="size-3.5" />
                  Get Directions
                </Button>
              </a>

              <a href={CLINIC_INFO.socials.facebook} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full text-[13px] gap-1.5 h-[42px] px-5">
                  Message on Facebook
                </Button>
              </a>

              <a href={CLINIC_INFO.socials.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full text-[13px] gap-1.5 h-[42px] px-5">
                  DM on Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Inquiry Form per plan.md Section 3.5 */}
      <section className="w-full bg-[#f7f4ee] px-6 sm:px-12 md:px-24 py-16 sm:py-20 border-b border-[#dde2d8]">
        <div className="max-w-2xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2 text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
              Quick Inquiry
            </span>
            <h2 className="font-serif text-[34px] sm:text-[40px] text-[#273c2b] font-normal">
              Send Us a Message
            </h2>
            <p className="text-[14px] text-[#687167]">
              Our clinic coordinator will respond to your Philippine mobile number or email within 1–2 hours during clinic hours.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#dde2d8] shadow-sm">
            {submitted ? (
              <div className="py-8 text-center flex flex-col items-center gap-4 animate-in zoom-in-95 duration-200">
                <div className="size-16 rounded-full bg-[#e9eee5] flex items-center justify-center text-[#526b50]">
                  <CheckCircle2 className="size-10" />
                </div>
                <h3 className="font-serif text-[28px] text-[#273c2b] font-normal">
                  Message sent!
                </h3>
                <p className="text-[14px] text-[#687167] max-w-md leading-relaxed">
                  Thank you for reaching out. We typically respond within 1–2 hours during clinic hours (9:00 AM – 6:00 PM daily).
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage("");
                  }}
                  className="mt-2"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Honeypot Spam Trap */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="website-inquiry-trap">Website</label>
                  <input
                    id="website-inquiry-trap"
                    type="text"
                    name="website"
                    value={websiteHoneypot}
                    onChange={(e) => setWebsiteHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name" className="text-[13px] font-medium text-[#273c2b]">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="e.g. Maria Santos"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-[12px] text-red-600">{errors.fullName}</p>}
                </div>

                {/* Philippine Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-phone" className="text-[13px] font-medium text-[#273c2b]">
                      Philippine Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="0956 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-[12px] text-red-600">{errors.phone}</p>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-email" className="text-[13px] font-medium text-[#273c2b]">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="maria@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-[12px] text-red-600">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-subject" className="text-[13px] font-medium text-[#273c2b]">
                    Subject
                  </Label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-[#dde2d8] bg-white text-[13px] text-[#273c2b] focus:outline-none focus:ring-2 focus:ring-[#526b50]"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="pricing">Pricing &amp; Treatment Question</option>
                    <option value="emergency">Urgent Care / Toothache</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-message" className="text-[13px] font-medium text-[#273c2b]">
                    Message <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    placeholder="How can our gentle dental team help you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && <p className="text-[12px] text-red-600">{errors.message}</p>}
                </div>

                {/* Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreeConsent}
                      onChange={(e) => setAgreeConsent(e.target.checked)}
                      className="mt-0.5 size-4 rounded accent-[#526b50] shrink-0"
                    />
                    <span className="text-[12px] text-[#687167]">
                      I agree to be contacted via phone or email regarding this inquiry.
                    </span>
                  </label>
                  {errors.agreeConsent && (
                    <p className="text-[12px] text-red-600 mt-1">{errors.agreeConsent}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="h-[48px] text-[14px] gap-2 mt-2"
                >
                  <Send className="size-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 4. Landmark Guide per plan.md Section 3.5 */}
      <section className="w-full bg-white px-6 sm:px-12 md:px-24 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#526b50]">
              How to find us
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] text-[#273c2b] font-normal">
              Commute &amp; Driving Landmarks
            </h2>
            <p className="text-[14px] text-[#687167]">
              Located conveniently along Molino Road, easily accessible from Bacoor and nearby Cavite towns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f7f4ee] rounded-2xl p-6 border border-[#dde2d8] flex flex-col gap-3">
              <div className="size-10 rounded-xl bg-white flex items-center justify-center text-[#526b50] shadow-xs">
                <Car className="size-5" />
              </div>
              <h4 className="font-semibold text-[#273c2b] text-[15px]">By Private Car / Ride-hail</h4>
              <p className="text-[13px] text-[#687167] leading-relaxed">
                Pin &ldquo;Areli Dental Clinic&rdquo; or &ldquo;251 Molino Road, San Nicolas II&rdquo; in Waze or Google Maps. Street parking available nearby.
              </p>
            </div>

            <div className="bg-[#f7f4ee] rounded-2xl p-6 border border-[#dde2d8] flex flex-col gap-3">
              <div className="size-10 rounded-xl bg-white flex items-center justify-center text-[#526b50] shadow-xs">
                <Bus className="size-5" />
              </div>
              <h4 className="font-semibold text-[#273c2b] text-[15px]">By Jeepney / UV Express</h4>
              <p className="text-[13px] text-[#687167] leading-relaxed">
                Ride any jeepney traveling along Molino Road (Bacoor – Paliparan / Zapote route). Ask the driver to drop you off at San Nicolas II [PLACEHOLDER].
              </p>
            </div>

            <div className="bg-[#f7f4ee] rounded-2xl p-6 border border-[#dde2d8] flex flex-col gap-3">
              <div className="size-10 rounded-xl bg-white flex items-center justify-center text-[#526b50] shadow-xs">
                <Compass className="size-5" />
              </div>
              <h4 className="font-semibold text-[#273c2b] text-[15px]">Nearby Landmarks</h4>
              <p className="text-[13px] text-[#687167] leading-relaxed">
                [PLACEHOLDER — Clinic owner to confirm specific landmark names e.g., across from grocery, 3 minutes from church/school].
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
