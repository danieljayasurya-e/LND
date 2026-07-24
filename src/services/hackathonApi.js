// ============================================================================
// API layer for the Hackathon Registration feature.
// Talks only to our own /api/hackathon/* serverless functions — the browser
// never sees DATABASE_URL or touches Postgres directly.
// ============================================================================

export class HackathonApiError extends Error {
  constructor(message, { status, code, fieldErrors } = {}) {
    super(message);
    this.name = 'HackathonApiError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors || null;
  }
}

async function parseJsonSafely(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchBookedDates() {
  const res = await fetch('/api/hackathon/booked-dates');
  const data = await parseJsonSafely(res);

  if (!res.ok) {
    throw new HackathonApiError(data?.error || 'Could not load booked dates.', { status: res.status });
  }
  return Array.isArray(data) ? data : [];
}

export async function registerHackathon(payload) {
  const res = await fetch('/api/hackathon/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await parseJsonSafely(res);

  if (!res.ok) {
    throw new HackathonApiError(data?.error || 'Registration failed. Please try again.', {
      status: res.status,
      code: data?.code,
      fieldErrors: data?.fieldErrors,
    });
  }
  return data.registration;
}
