// GET /api/hackathon/booked-dates
// Returns: ["2026-08-01", "2026-08-08", ...] — confirmed, upcoming dates only.
import { query } from '../_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // to_char avoids node-postgres converting DATE -> JS Date, which can
    // shift by a day depending on the server's timezone offset from UTC.
    const { rows } = await query(
      `SELECT to_char(hackathon_date, 'YYYY-MM-DD') AS date_key
         FROM hackathon_registrations
        WHERE status = 'confirmed'
          AND hackathon_date >= CURRENT_DATE
        ORDER BY hackathon_date ASC`
    );

    const bookedDates = rows.map((row) => row.date_key);
    return res.status(200).json(bookedDates);
  } catch (err) {
    console.error('[booked-dates] error:', err);
    return res.status(500).json({ error: 'Could not load booked dates. Please try again.' });
  }
}
