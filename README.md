# LnD Website — Hackathon Registration System

A production-ready "College Hackathon Registration" feature bolted onto the
existing LnD marketing site: an auto-shown welcome popup, a Why-Choose-LnD /
Free-Hackathon promo section, and a full registration flow backed by
PostgreSQL (Neon) through Vercel Serverless Functions — no Express server,
no database credentials ever shipped to the browser.

## Stack

- **React 18 + Vite** — existing site shell
- **react-hook-form** — registration form state & validation
- **react-datepicker** + **date-fns** — Saturday-only date picker
- **framer-motion** — popup / dialog / card animations
- **PostgreSQL (Neon)** via `pg` — accessed only from `/api`
- **Vercel Serverless Functions** — `/api/hackathon/*`, plain `export default handler(req, res)`, no framework
- **EmailJS** (REST API, no SDK) — confirmation + admin notification emails

## Folder structure (feature-relevant files)

```
sql/
  schema.sql                         Run once against Neon

shared/
  hackathonValidation.js             Pure validation + Saturday-date logic
                                      (imported by BOTH api/ and src/ — the
                                      single source of truth so client and
                                      server can never disagree)

api/
  _lib/db.js                         pg Pool singleton (DATABASE_URL — server only)
  hackathon/
    booked-dates.js                  GET  /api/hackathon/booked-dates
    register.js                      POST /api/hackathon/register

src/
  services/
    hackathonApi.js                  fetch() wrappers for the two endpoints
    emailjsHackathon.js               EmailJS REST calls for the 2 templates
  hooks/
    useBookedDates.js                 loads booked dates + refetch()
    useAvailableSaturdays.js           rolling next-4-open-Saturdays window
    useHackathonRegistration.js       submit orchestration (API → email → status)
    useFocusTrap.js                    modal a11y: tab-trap, Escape, focus restore
  components/hackathon/
    HackathonFeature.jsx              mounts everything, provides error boundary + snackbar
    WelcomePopup.jsx                  auto popup (About LnD)
    HackathonPromo.jsx                Why Choose LnD cards + Free Hackathon + CTA
    RegistrationDialog.jsx            the registration form dialog
    ErrorBoundary.jsx
    Snackbar.jsx                      toast provider + useSnackbar()
    SkeletonDatePicker.jsx
    icons.jsx
```

`App.jsx` mounts the whole thing with one line: `<HackathonFeature />`.

## Installation

```bash
npm install
cp .env.example .env      # then fill in the values described below
```

### 1. Database (Neon Postgres)

```bash
psql "$DATABASE_URL" -f sql/schema.sql
```

This creates `hackathon_registrations` with:

| column            | notes                                              |
|-------------------|-----------------------------------------------------|
| id                | SERIAL PRIMARY KEY                                  |
| college_name      | text                                                 |
| college_email     | text, checked against an email regex                |
| professor_name    | text                                                 |
| professor_phone   | text, checked as a 10-digit Indian mobile number     |
| pincode           | text, checked as a 6-digit pincode                   |
| hackathon_date    | `DATE UNIQUE` — one hackathon per Saturday           |
| status            | `confirmed` \| `cancelled` \| `completed`            |
| created_at / updated_at | timestamps, `updated_at` auto-maintained via trigger |

`DATABASE_URL` goes in `.env` for local dev and in your **Vercel Project →
Settings → Environment Variables** for deployment. It is read only inside
`api/_lib/db.js`; nothing under `src/` ever imports it, and Vite only
exposes variables prefixed `VITE_` to the client bundle anyway — a second
layer of protection against ever leaking it.

### 2. EmailJS setup

**No new templates to create.** The hackathon feature reuses the exact
same EmailJS service and the same two templates already wired up for the
Contact form (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_PUBLIC_KEY`,
`VITE_EMAILJS_CUSTOMER_TMPL`, `VITE_EMAILJS_ADMIN_TMPL`).

The full email body (subject-equivalent line + college/professor/date
details) is composed directly in code —
`src/services/emailjsHackathon.js` (`getCollegeConfirmationBody` /
`getAdminNotificationBody`) — and dropped into the templates' existing
generic placeholders (`{{email_body}}` on the customer template,
`{{inquiry_message}}` on the admin template), the same pattern
`Contact.jsx` already uses for course enquiries. If you ever want to
change the wording, edit those two functions — no dashboard trip needed.

### 3. Run locally

```bash
npm run dev
```

The API routes are deployed as Vercel Serverless Functions in production,
but for local development `vite.config.js` includes a small dev-only
middleware (`hackathonApiDevMiddleware`) that runs those same
`api/hackathon/*.js` handlers in-process inside the Vite dev server. It
reads `.env` (via `loadEnv(mode, cwd, '')`, which — unlike the client
build — loads *all* vars, not just `VITE_`-prefixed ones) so
`DATABASE_URL` is available to them exactly like it would be on Vercel.
This means plain `npm run dev` serves the React app *and* `/api/hackathon/*`
together — no Vercel CLI needed for local dev. That middleware only runs
under `vite dev`; it has no effect on `vite build` or the deployed site,
where Vercel's own function runtime takes over.

If you'd rather test against the exact Vercel runtime locally, `vercel dev`
still works as a drop-in alternative (`npm i -g vercel && vercel dev`).

### 4. Deploy

```bash
vercel --prod
```

Set `DATABASE_URL` and all `VITE_EMAILJS_*` vars in the Vercel project's
environment variables first (Production + Preview).

## API

**GET `/api/hackathon/booked-dates`**
Returns confirmed, upcoming dates: `["2026-08-01", "2026-08-08"]`

**POST `/api/hackathon/register`**
Body:
```json
{
  "college_name": "...",
  "college_email": "...",
  "professor_name": "...",
  "professor_phone": "9876543210",
  "pincode": "641004",
  "hackathon_date": "2026-08-01"
}
```
- `422` — validation failed (`fieldErrors` map included)
- `409` — date already booked
- `201` — `{ registration: {...} }`

Every check (email/phone/pincode format, Saturday-only, currently within
the open rolling window, no duplicate date) runs server-side using
`shared/hackathonValidation.js` regardless of what the client already
validated — the client-side checks are only there for instant UX feedback.

## Date picker rules

The calendar itself is **browsable to any month/date** — nothing hides
future Saturdays. Availability follows a deliberate scarcity strategy
(`MARKETING_LOCKED_SATURDAYS` in `shared/hackathonValidation.js`):

- The **next 4 upcoming Saturdays from today are always shown and treated
  as already booked** — in red, disabled, with a "Hackathon already
  booked" tooltip — regardless of whether anyone has actually registered
  for them. This is intentional (a marketing hold), not a bug.
- From the **5th Saturday onward, any Saturday in any future month is
  bookable**, with no upper limit — except dates that are genuinely
  booked in the database, which are marked exactly the same way (red,
  disabled, same tooltip) so a visitor can't tell a real booking from the
  marketing hold.
- Weekdays and past dates are always disabled.
- If a slot gets booked by someone else between opening the dialog and
  submitting, the server rejects with `409` (the same message/status used
  for the locked weeks) and the UI shows the "Sorry! This hackathon slot
  has already been booked." screen, then refreshes the booked-dates list.

## Accessibility

- Both the popup and the registration dialog are `role="dialog"` +
  `aria-modal="true"` with `aria-labelledby` pointing at their heading.
- Focus is trapped inside the open dialog (Tab/Shift+Tab wrap), the first
  focusable element is focused on open, `Escape` closes, and focus returns
  to the triggering element on close (`useFocusTrap`).
- All form inputs have associated `<label>`s and `aria-invalid` when in an
  error state; errors are announced via `role="alert"`.

## Code quality notes

- **Validation lives once**, in `shared/hackathonValidation.js`, imported
  by both the server (authoritative) and the client (instant feedback) —
  no duplicated regex or date-window logic to drift out of sync.
- **Error boundary** (`ErrorBoundary.jsx`) isolates the whole feature so a
  rendering bug here can't take down the rest of the marketing site.
- **Skeleton loader** (`SkeletonDatePicker.jsx`) shows while booked dates
  are being fetched, instead of a layout jump.
- **Snackbar** (`Snackbar.jsx` + `useSnackbar()`) surfaces non-field
  errors (network/500s) as a toast, while field-level and conflict errors
  render inline in the dialog itself.
