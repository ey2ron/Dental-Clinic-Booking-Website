import { NextRequest, NextResponse } from "next/server";
import { BookingSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateIcsCalendar } from "@/lib/calendar";
import { sendBookingEmails } from "@/lib/email";
import { appendBookingToSheet } from "@/lib/sheets";

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (5 requests per 15 minutes per plan.md Section 4.2)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0]?.trim() || "127.0.0.1" : "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 900000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please try again later or call us directly at (0956) 150 5566.",
        },
        { status: 429 }
      );
    }

    // 2. Parse Body & Honeypot Spam Check
    const json = await req.json();

    // If honeypot "website" field is filled, silently discard bot submission
    if (json.website && typeof json.website === "string" && json.website.trim().length > 0) {
      console.warn("[Spam Trap] Honeypot website field was triggered by bot. Silently discarding.");
      return NextResponse.json({
        success: true,
        message: "Your appointment request has been submitted.",
      });
    }

    // 3. Zod Validation (strictly Philippine phone & email)
    const result = BookingSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const booking = result.data;

    // 4. Generate Calendar .ics buffer
    const icsContent = generateIcsCalendar({
      serviceTitle: booking.serviceTitle,
      doctorName: booking.doctorName,
      dateStr: booking.date,
      timeSlot: booking.timeSlot,
      patientName: booking.fullName,
      durationMinutes: 45,
    });

    // 5. Send Transactional Emails (Patient confirmation + Clinic staff alert)
    const emailResult = await sendBookingEmails(booking);

    // 6. Log to Google Sheets (12 columns)
    const sheetResult = await appendBookingToSheet(booking);

    return NextResponse.json(
      {
        success: true,
        message: "Your appointment request has been submitted successfully.",
        booking: {
          service: booking.serviceTitle,
          addOns: booking.addOns,
          preferredDate: booking.date,
          preferredTime: booking.timeSlot,
          doctorPreference: booking.doctorName,
          fullName: booking.fullName,
          phone: booking.phone,
          email: booking.email,
        },
        icsContent,
        emailStatus: emailResult.success ? "sent" : "deferred",
        sheetStatus: sheetResult.success ? "recorded" : "deferred",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while processing your booking. Please call us directly at (0956) 150 5566.",
      },
      { status: 500 }
    );
  }
}
