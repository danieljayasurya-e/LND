import { useCallback, useState } from 'react';
import { registerHackathon, HackathonApiError } from '../services/hackathonApi';
import { sendHackathonEmails } from '../services/emailjsHackathon';

/**
 * Orchestrates the full registration flow:
 *   1. POST to /api/hackathon/register (source of truth for conflicts)
 *   2. Send confirmation + admin emails via EmailJS
 *   3. Expose granular status so the dialog can render the right screen
 */
export function useHackathonRegistration({ onBooked } = {}) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | conflict | error
  const [step, setStep] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [emailWarning, setEmailWarning] = useState('');

  const reset = useCallback(() => {
    setStatus('idle');
    setStep('');
    setErrorMessage('');
    setFieldErrors(null);
    setRegistration(null);
    setEmailWarning('');
  }, []);

  const submit = useCallback(
    async (payload) => {
      setStatus('submitting');
      setErrorMessage('');
      setFieldErrors(null);
      setEmailWarning('');

      try {
        setStep('Reserving your hackathon slot…');
        const created = await registerHackathon(payload);
        setRegistration(created);

        try {
          setStep('Sending confirmation email…');
          await sendHackathonEmails(created);
        } catch (emailErr) {
          // Registration itself succeeded — don't fail the whole flow over
          // an email hiccup, but DO surface it (both in the console with
          // full detail, and to the caller so the UI can show a warning)
          // instead of silently pretending the email went out.
          console.error('[hackathon] email send failed:', emailErr);
          setEmailWarning(
            'Your registration is confirmed, but the confirmation email could not be sent. ' +
            'Please contact ld.programinfo@gmail.com to confirm your slot.'
          );
        }

        setStatus('success');
      } catch (err) {
        if (err instanceof HackathonApiError && err.status === 409) {
          setStatus('conflict');
          setErrorMessage(err.message);
          onBooked?.(); // let the caller refresh booked dates
        } else if (err instanceof HackathonApiError && err.status === 422) {
          setStatus('error');
          setFieldErrors(err.fieldErrors);
          setErrorMessage(err.message);
        } else {
          setStatus('error');
          setErrorMessage(err.message || 'Something went wrong. Please try again.');
        }
      } finally {
        setStep('');
      }
    },
    [onBooked]
  );

  return { status, step, errorMessage, fieldErrors, registration, emailWarning, submit, reset };
}
