// ============================================================================
// EmailJS integration for the Hackathon Registration feature.
//
// Uses the official @emailjs/browser SDK (not a raw fetch() call) — EmailJS
// flags plain REST calls without the SDK's browser fingerprint as
// "non-browser" traffic and rejects them with a 403, even from inside an
// actual browser tab. The SDK avoids that entirely.
//
// Reuses the SAME two EmailJS templates already configured for the Contact
// form (VITE_EMAILJS_CUSTOMER_TMPL / VITE_EMAILJS_ADMIN_TMPL). The full
// email body is composed here in code (same pattern as Contact.jsx's
// getDefaultBody/getInternshipBody), and dropped into the templates'
// existing generic {{email_body}} / {{inquiry_message}} placeholders.
//
// IMPORTANT: the template IDs below must actually exist in your EmailJS
// dashboard (https://dashboard.emailjs.com/admin/templates) and their body
// must reference the placeholders used in `sendHackathonEmails` below
// ({{to_email}}, {{email_body}}, etc.) — this file supplies the *content*,
// not the template itself; EmailJS has no API to create a template from
// code, only to send against one that already exists.
// ============================================================================
import emailjs from '@emailjs/browser';
import { format, parseISO } from 'date-fns';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CUSTOMER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CUSTOMER_TMPL;
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TMPL;
const ADMIN_EMAIL = 'ld.programinfo@gmail.com';

export function isEmailjsConfigured() {
  return Boolean(EMAILJS_SERVICE_ID && EMAILJS_PUBLIC_KEY && CUSTOMER_TEMPLATE_ID && ADMIN_TEMPLATE_ID);
}

async function sendViaEmailJS(templateId, params) {
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, templateId, params, { publicKey: EMAILJS_PUBLIC_KEY });
  } catch (err) {
    // The SDK rejects with { status, text } rather than an Error.
    const status = err?.status ?? 'unknown';
    const text = err?.text ?? err?.message ?? 'unknown error';
    throw new Error(`EmailJS ${status}: ${text}`);
  }
}

export function formatHackathonDate(dateKey) {
  return format(parseISO(dateKey), 'EEEE, MMMM d, yyyy');
}

function getCollegeConfirmationBody(registration, prettyDate) {
  return `Dear ${registration.professor_name},

Thank you for registering ${registration.college_name} for the LnD Hackathon!

College: ${registration.college_name}
Date: ${prettyDate}
Professor: ${registration.professor_name}

We will contact you shortly with further details on mentors, problem statements, and logistics.

Warm regards,
LnD Training Team
ld.programinfo@gmail.com`;
}

function getAdminNotificationBody(registration, prettyDate) {
  return `A new college has registered for the LnD Hackathon.

Professor: ${registration.professor_name}
Phone: ${registration.professor_phone}
Email: ${registration.college_email}
Pincode: ${registration.pincode}
Date: ${prettyDate}`;
}

/**
 * Sends the two post-registration emails. Runs sequentially so a failure in
 * the second doesn't silently hide whether the first (the one the college
 * actually sees) went out. Throws with a descriptive message on failure —
 * callers decide whether/how to surface that.
 */
export async function sendHackathonEmails(registration) {
  if (!isEmailjsConfigured()) {
    throw new Error(
      'EmailJS is not configured — check VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_PUBLIC_KEY / ' +
      'VITE_EMAILJS_CUSTOMER_TMPL / VITE_EMAILJS_ADMIN_TMPL in .env'
    );
  }

  const prettyDate = formatHackathonDate(registration.hackathon_date);

  // Maps onto the Contact form's existing generic template variables.
  await sendViaEmailJS(CUSTOMER_TEMPLATE_ID, {
    to_name: registration.professor_name,
    to_email: registration.college_email,
    course_name: 'LnD Hackathon Registration Confirmation',
    email_body: getCollegeConfirmationBody(registration, prettyDate),
  });

  await sendViaEmailJS(ADMIN_TEMPLATE_ID, {
    from_name: registration.professor_name,
    from_email: registration.college_email,
    from_phone: registration.professor_phone,
    course_name: 'New College Registration',
    inquiry_message: getAdminNotificationBody(registration, prettyDate),
    admin_email: ADMIN_EMAIL,
  });
}
