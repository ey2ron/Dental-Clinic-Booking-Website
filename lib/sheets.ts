import crypto from "crypto";
import { BookingInput } from "./validations";

interface SheetAppendResult {
  success: boolean;
  rowId?: string;
  error?: string;
}

/**
 * Exchanges Google Service Account JWT for an OAuth2 Access Token
 */
async function getGoogleAccessToken(clientEmail: string, rawPrivateKey: string): Promise<string> {
  // Normalize private key (handles both escaped \n and raw newlines)
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (obj: object) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(claim)}`;

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  sign.end();
  const signature = sign
    .sign(privateKey)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${unsignedToken}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Google Auth Failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

/**
 * Appends booking information as a row in Google Sheets ledger
 * Conforms to 12 Columns (A to L)
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
  });

  const rowValues = [
    submissionTimestamp,                               // Col A: Submitted
    booking.fullName,                                  // Col B: Patient Name
    booking.phone,                                     // Col C: Phone (Philippine mobile)
    booking.email,                                     // Col D: Email
    booking.serviceTitle,                              // Col E: Service
    booking.addOns.length > 0 ? booking.addOns.join(", ") : "None", // Col F: Add-Ons
    booking.date,                                      // Col G: Preferred Date
    booking.timeSlot,                                  // Col H: Preferred Time
    booking.doctorName || "Any",                       // Col I: Doctor Preference
    booking.notes || "None",                           // Col J: Patient Notes
    "🟡 Pending",                                      // Col K: Status
    "",                                                // Col L: Staff Notes (manual)
  ];

  if (!spreadsheetId || !clientEmail || !privateKey) {
    console.info(
      "[Google Sheets: Mock Mode] Google Sheets credentials not configured. Mocking row append (12 columns):",
      JSON.stringify(rowValues)
    );
    return {
      success: true,
      rowId: `mock_row_${Date.now()}`,
    };
  }

  try {
    const accessToken = await getGoogleAccessToken(clientEmail, privateKey);

    const appendRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      }
    );

    if (!appendRes.ok) {
      const errorText = await appendRes.text();
      console.error("[Google Sheets API Error]:", errorText);
      return { success: false, error: errorText };
    }

    const result = await appendRes.json();
    return {
      success: true,
      rowId: result.updates?.updatedRange || `row_${Date.now()}`,
    };
  } catch (error) {
    console.error("Google Sheets Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error appending to sheet",
    };
  }
}
