import { NextRequest, NextResponse } from "next/server";
import { ContactSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendInquiryAlert } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting (5 requests per 15 minutes per plan.md Section 4.3)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0]?.trim() || "127.0.0.1" : "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 900000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many messages sent. Please wait a few minutes or call us at (0956) 150 5566.",
        },
        { status: 429 }
      );
    }

    // 2. Parse Body & Honeypot Spam Check
    const json = await req.json();

    if (json.website && typeof json.website === "string" && json.website.trim().length > 0) {
      console.warn("[Spam Trap] Honeypot website field triggered by bot on contact form.");
      return NextResponse.json({
        success: true,
        message: "Message sent! We typically respond within 1–2 hours during clinic hours.",
      });
    }

    // 3. Zod Validation (Philippine phone & email)
    const result = ContactSchema.safeParse(json);

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

    const inquiry = result.data;

    // 4. Send Staff Email Alert
    const emailResult = await sendInquiryAlert(inquiry);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent! We typically respond within 1–2 hours during clinic hours.",
        emailStatus: emailResult.success ? "sent" : "deferred",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred sending your inquiry. Please call us directly at (0956) 150 5566.",
      },
      { status: 500 }
    );
  }
}
