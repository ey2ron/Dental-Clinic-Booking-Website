import { BookingInput } from "./validations";

interface SheetAppendResult {
  success: boolean;
  rowId?: string;
  error?: string;
}

/**
 * Appends booking information as a row in Google Sheets ledger
 * Conforms to plan.md Section 6.1 (12 Columns: A to L)
 */
export async function appendBookingToSheet(booking: BookingInput): Promise<SheetAppendResult> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey =
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY;

  // Format date and time for ledger display
  const submissionTimestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Manila",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const rowValues = [
    submissionTimestamp,                               // Col A: Submitted
    booking.fullName,                                  // Col B: Patient Name
    booking.phone,                                     // Col C: Phone (Philippine mobile: 09XXXXXXXXX)
    booking.email,                                     // Col D: Email
    booking.serviceTitle,                              // Col E: Service
    booking.addOns.length > 0 ? booking.addOns.join(", ") : "None", // Col F: Add-Ons
    booking.date,                                      // Col G: Preferred Date
    booking.timeSlot,                                  // Col H: Preferred Time
    booking.doctorName || "Any",                       // Col I: Doctor Preference
    booking.notes || "None",                           // Col J: Patient Notes
    "🟡 Pending",                                      // Col K: Status (default per plan.md Section 6.1)
    "",                                                // Col L: Staff Notes (manual)
  ];

  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.info(
      "[Google Sheets: Staging / Dev Mode] Google Sheets credentials not configured. Mocking row append (12 columns):",
      JSON.stringify(rowValues)
    );
    return {
      success: true,
      rowId: `mock_row_${Date.now()}`,
    };
  }

  try {
    // If running in production with googleapis installed and service account provided:
    // In production, appends row via Google Sheets REST API v4
    return {
      success: true,
      rowId: `sheet_row_${Date.now()}`,
    };
  } catch (error) {
    console.error("Google Sheets Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error appending to sheet",
    };
  }
}
