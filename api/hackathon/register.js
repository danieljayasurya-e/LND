// POST /api/hackathon/register
// Body: { college_name, college_email, professor_name, professor_phone, pincode, hackathon_date }
import { query } from '../_lib/db.js';
import { validateRegistrationPayload, isMarketingLocked } from '../../shared/hackathonValidation.js';

const UNIQUE_VIOLATION = '23505';

const ALREADY_BOOKED_MESSAGE =
  'Sorry! This hackathon slot has already been booked. Please choose another Saturday.';

function sanitize(payload) {
  return {
    college_name: String(payload.college_name || '').trim(),
    college_email: String(payload.college_email || '').trim().toLowerCase(),
    professor_name: String(payload.professor_name || '').trim(),
    professor_phone: String(payload.professor_phone || '').replace(/\D/g, ''),
    pincode: String(payload.pincode || '').trim(),
    hackathon_date: String(payload.hackathon_date || '').trim(),
  };
}

async function fetchBookedKeys() {
  const { rows } = await query(
    `SELECT to_char(hackathon_date, 'YYYY-MM-DD') AS date_key
       FROM hackathon_registrations
      WHERE status = 'confirmed'
        AND hackathon_date >= CURRENT_DATE`
  );
  return rows.map((row) => row.date_key);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }

  const data = sanitize(body || {});

  try {
    // Any Saturday that's already booked — near or far in the future — OR
    // falls inside the marketing-locked window (always shown/treated as
    // booked, regardless of real DB state) is rejected with the same
    // friendly "already booked" message. The two are indistinguishable to
    // the caller by design.
    const bookedKeys = await fetchBookedKeys();
    if (bookedKeys.includes(data.hackathon_date) || isMarketingLocked(data.hackathon_date)) {
      return res.status(409).json({ error: ALREADY_BOOKED_MESSAGE, code: 'DATE_ALREADY_BOOKED' });
    }

    // Server-side is the source of truth — never trust client-side validation alone.
    const { valid, errors } = validateRegistrationPayload(data, { bookedKeys });
    if (!valid) {
      return res.status(422).json({ error: 'Validation failed', fieldErrors: errors });
    }

    const inserted = await query(
      `INSERT INTO hackathon_registrations
         (college_name, college_email, professor_name, professor_phone, pincode, hackathon_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, college_name, college_email, professor_name, professor_phone,
                 pincode, to_char(hackathon_date, 'YYYY-MM-DD') AS hackathon_date,
                 status, created_at`,
      [
        data.college_name,
        data.college_email,
        data.professor_name,
        data.professor_phone,
        data.pincode,
        data.hackathon_date,
      ]
    );

    return res.status(201).json({ registration: inserted.rows[0] });
  } catch (err) {
    if (err.code === UNIQUE_VIOLATION) {
      // Race condition: two requests slipped past the SELECT check at once.
      return res.status(409).json({ error: ALREADY_BOOKED_MESSAGE, code: 'DATE_ALREADY_BOOKED' });
    }
    console.error('[register] error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
