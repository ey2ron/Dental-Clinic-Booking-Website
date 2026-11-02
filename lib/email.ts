import { BookingInput, ContactInput } from "./validations";
import { generateIcsCalendar } from "./calendar";

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends transactional emails via Resend API
 * 1. Confirmation receipt to patient's email with attached .ics calendar file
 * 2. New booking alert to clinic staff email with 1-tap phone and email actions
 */
export async function sendBookingEmails(booking: BookingInput): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const clinicEmail =
    process.env.CLINIC_EMAIL || process.env.CLINIC_ALERT_EMAIL || "arelidentalclinic@gmail.com";
  const fromEmail = process.env.EMAIL_FROM || "Areli Dental Clinic <onboarding@resend.dev>";

  // Generate .ics calendar buffer
  const icsString = generateIcsCalendar({
    serviceTitle: booking.serviceTitle,
    doctorName: booking.doctorName,
    dateStr: booking.date,
    timeSlot: booking.timeSlot,
    patientName: booking.fullName,
    durationMinutes: 45,
  });
  const icsBase64 = Buffer.from(icsString, "utf-8").toString("base64");

  if (!apiKey) {
    console.info("[Email Service: Dev / Staging Mode] RESEND_API_KEY not configured. Simulating dispatch:");
    console.info(`-> To Patient (${booking.email}): "Your Appointment Request  — Areli Dental Clinic"`);
    console.info(`-> To Clinic (${clinicEmail}): "🔔 NEW BOOKING: ${booking.fullName} — ${booking.date} at ${booking.timeSlot} (${booking.serviceTitle})"`);
    return { success: true, messageId: `mock_${Date.now()}` };
  }

  try {
    // 1. Patient Confirmation Email
    const patientHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #273c2b; max-width: 600px; margin: 0 auto; padding: 28px; border: 1px solid #dde2d8; border-radius: 16px; background-color: #f7f4ee;">
        <div style="margin-bottom: 24px; text-align: center;">
          <h2 style="color: #526b50; font-family: Georgia, serif; font-size: 26px; margin: 0 0 6px 0;">Areli Dental Clinic</h2>
          <p style="color: #d4b688; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0;">Gentle hands, Happy smiles </p>
        </div>

        <p style="font-size: 16px; line-height: 1.5;">Dear <strong>${booking.fullName}</strong>,</p>
        <p style="font-size: 15px; color: #687167; line-height: 1.6;">
          Thank you for requesting an appointment with us. We have recorded your requested visit and will confirm your slot shortly.
        </p>

        <div style="background-color: #ffffff; border: 1px solid #dde2d8; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <h4 style="margin: 0 0 14px 0; color: #526b50; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Visit Summary</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; color: #687167; width: 40%;">Service:</td><td style="font-weight: 600; color: #273c2b;">${booking.serviceTitle}</td></tr>
            <tr><td style="padding: 6px 0; color: #687167;">Preferred Date:</td><td style="font-weight: 600; color: #273c2b;">${booking.date}</td></tr>
            <tr><td style="padding: 6px 0; color: #687167;">Preferred Time:</td><td style="font-weight: 600; color: #273c2b;">${booking.timeSlot}</td></tr>
            <tr><td style="padding: 6px 0; color: #687167;">Doctor Preference:</td><td style="font-weight: 600; color: #273c2b;">${booking.doctorName || "First Available Doctor"}</td></tr>
            ${booking.addOns.length > 0 ? `<tr><td style="padding: 6px 0; color: #687167;">Selected Add-Ons:</td><td style="font-weight: 600; color: #273c2b;">${booking.addOns.join(", ")}</td></tr>` : ""}
            <tr><td style="padding: 6px 0; color: #687167;">Clinic Address:</td><td style="font-weight: 600; color: #273c2b;">251 Molino Rd, San Nicolas II, Bacoor, Cavite 4102</td></tr>
          </table>
        </div>

        <div style="background-color: #e9eee5; border-radius: 10px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-weight: 600; color: #526b50; font-size: 14px;">What happens next?</p>
          <p style="margin: 0; font-size: 13.5px; color: #405040; line-height: 1.5;">
            Our team will confirm your schedule via SMS or phone call at <strong>${booking.phone}</strong> within 1–2 hours during clinic hours (9:00 AM – 6:00 PM daily).
          </p>
        </div>

        <div style="text-align: center; margin: 24px 0;">
          <a href="tel:+639561505566" style="display: inline-block; background-color: #6f8b6d; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 9999px;">
            Call Clinic: (0956) 150 5566
          </a>
        </div>

        <hr style="border: none; border-top: 1px solid #dde2d8; margin: 24px 0;" />
        <p style="font-size: 12px; color: #8a9686; text-align: center; margin: 0;">
          Areli Dental Clinic · 251 Molino Road, San Nicolas II, Bacoor, 4102 Cavite<br/>
          Direct Phone: (0956) 150 5566
        </p>
      </div>
    `;

    // 2. Clinic Staff Alert Email
    const clinicHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #273c2b; max-width: 600px; padding: 24px; border: 2px solid #6f8b6d; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #526b50; margin-top: 0;">🔔 New Booking Request</h2>
        <p style="font-size: 15px;">A new appointment has been scheduled from the website:</p>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b; width: 35%;">Patient Name:</td><td style="padding: 8px 0; font-weight: bold;">${booking.fullName}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Philippine Mobile:</td><td style="padding: 8px 0; font-weight: bold;">${booking.phone}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0; font-weight: bold;">${booking.email}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Service:</td><td style="padding: 8px 0; font-weight: bold; color: #526b50;">${booking.serviceTitle}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Requested Date:</td><td style="padding: 8px 0; font-weight: bold;">${booking.date}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Requested Time:</td><td style="padding: 8px 0; font-weight: bold;">${booking.timeSlot}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Doctor Preference:</td><td style="padding: 8px 0;">${booking.doctorName || "None"}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Add-Ons:</td><td style="padding: 8px 0;">${booking.addOns.join(", ") || "None"}</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px 0; color: #64748b;">Patient Notes:</td><td style="padding: 8px 0;">${booking.notes || "None"}</td></tr>
        </table>

        <div style="margin-top: 24px; padding: 16px; background: #f7f4ee; border-radius: 8px;">
          <p style="font-weight: 600; margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; color: #526b50;">Quick Staff Actions:</p>
          <div style="display: flex; gap: 10px;">
            <a href="tel:${booking.phone}" style="display: inline-block; background: #526b50; color: white; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">📞 Call Patient</a>
            <a href="mailto:${booking.email}" style="display: inline-block; background: #e2e8f0; color: #1e293b; padding: 10px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">✉️ Email Patient</a>
          </div>
        </div>
      </div>
    `;

    // Send patient confirmation via Resend
    const patientRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [booking.email],
        subject: "Your Appointment Request — Areli Dental Clinic",
        html: patientHtml,
        attachments: [
          {
            filename: "areli-dental-appointment.ics",
            content: icsBase64,
          },
        ],
      }),
    });

    if (!patientRes.ok) {
      const err = await patientRes.text();
      console.warn("[Resend Notice - Patient Email]:", err);
    }

    // Send clinic alert via Resend
    const clinicRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [clinicEmail],
        subject: `🔔 NEW BOOKING: ${booking.fullName} — ${booking.date} at ${booking.timeSlot} (${booking.serviceTitle})`,
        html: clinicHtml,
      }),
    });

    if (!clinicRes.ok) {
      const err = await clinicRes.text();
      return { success: false, error: err };
    }

    const data = await clinicRes.json();
    return { success: true, messageId: data.id };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error sending email",
    };
  }
}

/**
 * Sends contact inquiry alert to clinic inbox via Resend
 */
export async function sendInquiryAlert(inquiry: ContactInput): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const clinicEmail =
    process.env.CLINIC_EMAIL || process.env.CLINIC_ALERT_EMAIL || "arelidentalclinic@gmail.com";
  const fromEmail = process.env.EMAIL_FROM || "Areli Dental Clinic <onboarding@resend.dev>";

  if (!apiKey) {
    console.info("[Email Service: Dev / Staging Mode] RESEND_API_KEY not set. Simulating contact alert:");
    console.info(`-> To Clinic (${clinicEmail}): "📩 Website Inquiry: ${inquiry.subject} — ${inquiry.fullName}"`);
    return { success: true, messageId: `mock_${Date.now()}` };
  }

  try {
    const alertHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #273c2b; max-width: 600px; padding: 24px; border: 1px solid #dde2d8; border-radius: 12px; background: #ffffff;">
        <h3 style="color: #526b50; margin-top: 0;">📩 New Website Inquiry</h3>
        <p><strong>Patient Name:</strong> ${inquiry.fullName}</p>
        <p><strong>Philippine Mobile:</strong> ${inquiry.phone}</p>
        <p><strong>Email:</strong> ${inquiry.email}</p>
        <p><strong>Subject:</strong> ${inquiry.subject}</p>
        <div style="background: #f7f4ee; padding: 14px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${inquiry.message}</p>
        </div>
        <div style="margin-top: 20px;">
          <a href="tel:${inquiry.phone}" style="display: inline-block; background: #526b50; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600; margin-right: 8px;">📞 Call ${inquiry.phone}</a>
          <a href="mailto:${inquiry.email}" style="display: inline-block; background: #e2e8f0; color: #1e293b; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 600;">✉️ Email Patient</a>
        </div>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [clinicEmail],
        reply_to: inquiry.email,
        subject: `📩 Website Inquiry: ${inquiry.subject} — ${inquiry.fullName}`,
        html: alertHtml,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { success: false, error: err };
    }

    const data = await response.json();
    return { success: true, messageId: data.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error sending inquiry email",
    };
  }
}
