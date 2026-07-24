// ============================================================================
// Shared validation & date logic for the LnD Hackathon Registration System.
//
// Imported by BOTH:
//   - api/hackathon/*.js   (serverless functions, Node ESM)
//   - src/**                (React frontend, bundled by Vite)
//
// Keeping this pure/dependency-free (no `pg`, no React) is what lets it be
// imported safely from both runtimes without pulling either one's deps
// into the other's bundle.
//
// Date model (deliberate marketing/scarcity strategy):
//   - The next MARKETING_LOCKED_SATURDAYS Saturdays from today are ALWAYS
//     shown and treated as already booked, regardless of what's actually
//     in the database. This is intentional — it's never meant to be
//     bookable, and looks identical to a real booked date.
//   - Starting from the Saturday right after that locked run, booking is
//     open indefinitely into the future — any Saturday, any month — except
//     for Saturdays that are genuinely booked in the database, which are
//     also shown/marked as booked (with the same message).
// ============================================================================

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
export const PINCODE_REGEX = /^[1-9]\d{5}$/;
export const DATE_KEY_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** How many upcoming Saturdays are always shown as "already booked" (marketing hold). */
export const MARKETING_LOCKED_SATURDAYS = 4;

/** YYYY-MM-DD in local time (never toISOString — that shifts by timezone). */
export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function atMidnight(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function dateKeyToDate(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function firstSaturdayOnOrAfter(date) {
  const start = atMidnight(date);
  const daysUntilSaturday = (6 - start.getDay() + 7) % 7;
  const d = new Date(start);
  d.setDate(d.getDate() + daysUntilSaturday);
  return d;
}

export function isSaturdayDateKey(dateKey) {
  if (typeof dateKey !== 'string' || !DATE_KEY_REGEX.test(dateKey)) return false;
  return dateKeyToDate(dateKey).getDay() === 6;
}

export function isPastDateKey(dateKey, fromDate = new Date()) {
  if (typeof dateKey !== 'string' || !DATE_KEY_REGEX.test(dateKey)) return true;
  return dateKeyToDate(dateKey) < atMidnight(fromDate);
}

/**
 * 0-based index of this Saturday counting from the first Saturday on/after
 * `fromDate` (that first Saturday is index 0). Returns -1 if `dateKey`
 * isn't a Saturday on/after that starting point.
 */
export function getSaturdayIndex(dateKey, fromDate = new Date()) {
  if (!isSaturdayDateKey(dateKey)) return -1;
  const first = firstSaturdayOnOrAfter(fromDate);
  const target = dateKeyToDate(dateKey);
  if (target < first) return -1;
  return Math.round((target - first) / (1000 * 60 * 60 * 24 * 7));
}

/** True if this Saturday falls within the always-shown-as-booked marketing window. */
export function isMarketingLocked(dateKey, fromDate = new Date(), lockedCount = MARKETING_LOCKED_SATURDAYS) {
  const idx = getSaturdayIndex(dateKey, fromDate);
  return idx >= 0 && idx < lockedCount;
}

/**
 * True if `dateKey` can actually be booked: a Saturday, not in the past,
 * past the marketing-locked window, and not already genuinely booked.
 */
export function isSelectableHackathonDate(dateKey, bookedKeys = [], fromDate = new Date(), lockedCount = MARKETING_LOCKED_SATURDAYS) {
  if (!isSaturdayDateKey(dateKey) || isPastDateKey(dateKey, fromDate)) return false;
  if (isMarketingLocked(dateKey, fromDate, lockedCount)) return false;
  return !bookedKeys.includes(dateKey);
}

/**
 * The next `count` genuinely open Saturdays (past the locked window, and
 * not already booked) — used for the date picker's default open-to-date
 * and helper text, not as a hard cap on what can be chosen.
 */
export function getNextOpenSaturdayKeys(bookedKeys = [], fromDate = new Date(), count = MARKETING_LOCKED_SATURDAYS, lockedCount = MARKETING_LOCKED_SATURDAYS) {
  const bookedSet = new Set(bookedKeys);
  const cursor = firstSaturdayOnOrAfter(fromDate);
  cursor.setDate(cursor.getDate() + lockedCount * 7);

  const open = [];
  let guard = 0;
  const MAX_ITERATIONS = 520; // ~10 years of Saturdays — a safety cap, never expected to hit
  while (open.length < count && guard < MAX_ITERATIONS) {
    const key = toDateKey(cursor);
    if (!bookedSet.has(key)) open.push(key);
    cursor.setDate(cursor.getDate() + 7);
    guard++;
  }
  return open;
}

/**
 * Field-format validation that doesn't need to know about booked dates —
 * required-ness, regexes, and "is this even a future Saturday" shape checks.
 */
function validateStaticFields(p) {
  const errors = {};

  if (!p.college_name || !String(p.college_name).trim()) {
    errors.college_name = 'College name is required';
  } else if (String(p.college_name).trim().length < 3) {
    errors.college_name = 'College name looks too short';
  }

  if (!p.college_email || !String(p.college_email).trim()) {
    errors.college_email = 'College email is required';
  } else if (!EMAIL_REGEX.test(String(p.college_email).trim())) {
    errors.college_email = 'Enter a valid email address';
  }

  if (!p.professor_name || !String(p.professor_name).trim()) {
    errors.professor_name = 'Professor name is required';
  } else if (!/^[A-Za-z.\s]+$/.test(String(p.professor_name).trim())) {
    errors.professor_name = 'Name should contain only letters';
  }

  if (!p.professor_phone || !String(p.professor_phone).trim()) {
    errors.professor_phone = 'Professor contact number is required';
  } else if (!INDIAN_MOBILE_REGEX.test(String(p.professor_phone).replace(/\s/g, ''))) {
    errors.professor_phone = 'Enter a valid 10-digit Indian mobile number';
  }

  if (!p.pincode || !String(p.pincode).trim()) {
    errors.pincode = 'Pincode is required';
  } else if (!PINCODE_REGEX.test(String(p.pincode).trim())) {
    errors.pincode = 'Enter a valid 6-digit pincode';
  }

  const dateKey = p.hackathon_date ? String(p.hackathon_date).trim() : '';
  if (!dateKey) {
    errors.hackathon_date = 'Please select a hackathon date';
  } else if (!DATE_KEY_REGEX.test(dateKey) || !isSaturdayDateKey(dateKey)) {
    errors.hackathon_date = 'Hackathon date must be a Saturday';
  } else if (isPastDateKey(dateKey)) {
    errors.hackathon_date = 'Please choose a date in the future';
  }

  return errors;
}

/**
 * Full validation, including the booked/locked-aware "is this Saturday
 * actually bookable" check. `bookedKeys` should be every currently
 * genuinely-booked date — pass an up-to-date list from the database on
 * the server; the client passes whatever it last fetched for instant
 * feedback. Note: callers that want the special "already booked" 409
 * treatment for marketing-locked or genuinely-booked dates should check
 * those cases themselves before falling back to this for generic 422s.
 */
export function validateRegistrationPayload(payload, { now = new Date(), bookedKeys = [] } = {}) {
  const p = payload || {};
  const errors = validateStaticFields(p);

  if (!errors.hackathon_date) {
    const dateKey = String(p.hackathon_date).trim();
    if (!isSelectableHackathonDate(dateKey, bookedKeys, now)) {
      errors.hackathon_date = 'That date is not currently open for booking. Please choose another Saturday.';
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
