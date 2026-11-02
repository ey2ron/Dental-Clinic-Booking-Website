/**
 * Generates an iCalendar (.ics) format string for the patient appointment.
 * Location: 251 Molino Rd, San Nicolas II, Bacoor, Cavite 4102
 * Reminder: 1-hour alarm before appointment
 */
export interface CalendarEventDetails {
  serviceTitle: string;
  doctorName?: string;
  dateStr: string; // "YYYY-MM-DD" e.g. "2026-11-15"
  timeSlot: string; // "10:00 AM" or "09:30 AM"
  patientName: string;
  durationMinutes?: number;
}

export function generateIcsCalendar(details: CalendarEventDetails): string {
  const { serviceTitle, doctorName, dateStr, timeSlot, patientName, durationMinutes = 45 } = details;

  // Format start time
  const [timePart, modifier] = timeSlot.split(" ");
  const [hourStr, minuteStr] = (timePart || "09:00").split(":");
  let hour = parseInt(hourStr || "9", 10);
  const minute = parseInt(minuteStr || "0", 10);

  if (modifier === "PM" && hour < 12) hour += 12;
  if (modifier === "AM" && hour === 12) hour = 0;

  const [year, month, day] = (dateStr || "2026-11-01").split("-").map((v) => parseInt(v, 10));

  const startDate = new Date(Date.UTC(year || 2026, (month || 11) - 1, day || 1, hour, minute));
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  const formatIcsDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const startFormatted = formatIcsDate(startDate);
  const endFormatted = formatIcsDate(endDate);
  const nowFormatted = formatIcsDate(new Date());

  const eventUid = `areli-booking-${Date.now()}@arelidentalclinic.com`;
  const summary = `Dental Visit — ARELI Dental Clinic (${serviceTitle})`;
  const description = `Appointment request for ${patientName}\\nService: ${serviceTitle}\\nDoctor Preference: ${doctorName || "First Available"}\\nClinic: ARELI Dental Clinic\\nAddress: 251 Molino Rd, San Nicolas II, Bacoor, Cavite 4102\\nContact: (0956) 150 5566`;
  const location = `ARELI Dental Clinic, 251 Molino Rd, San Nicolas II, Bacoor, Cavite 4102`;

  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ARELI Dental Clinic//Appointment Scheduler//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${eventUid}`,
    `DTSTAMP:${nowFormatted}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT1H", // 1-hour reminder alarm per plan.md Section 5.1
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Upcoming visit at ARELI Dental Clinic in 1 hour",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return icsLines.join("\r\n");
}
