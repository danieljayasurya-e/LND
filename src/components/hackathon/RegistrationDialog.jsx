import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { AnimatePresence, motion } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';

import { EMAIL_REGEX, INDIAN_MOBILE_REGEX, PINCODE_REGEX, toDateKey, isMarketingLocked } from '../../../shared/hackathonValidation';
import { useBookedDates } from '../../hooks/useBookedDates';
import { useAvailableSaturdays } from '../../hooks/useAvailableSaturdays';
import { useHackathonRegistration } from '../../hooks/useHackathonRegistration';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useSnackbar } from './Snackbar';
import { SkeletonDatePicker } from './SkeletonDatePicker';
import { CloseIcon, CalendarIcon, SpinnerIcon } from './icons';

const DEFAULT_VALUES = {
  college_name: '',
  college_email: '',
  professor_name: '',
  professor_phone: '',
  pincode: '',
  hackathon_date: '',
};

export function RegistrationDialog({ open, onClose }) {
  const { show } = useSnackbar();
  const { bookedDates, loading: datesLoading, refetch: refetchBookedDates } = useBookedDates({ enabled: open });
  const openKeys = useAvailableSaturdays(bookedDates); // next few genuinely open Saturdays, for defaults/hint text only
  const bookedSet = new Set(bookedDates);

  const registration = useHackathonRegistration({ onBooked: refetchBookedDates });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_VALUES, mode: 'onBlur' });

  useEffect(() => {
    if (!open) {
      reset(DEFAULT_VALUES);
      registration.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (registration.status === 'error' && registration.errorMessage && !registration.fieldErrors) {
      show(registration.errorMessage, { variant: 'error' });
    }
  }, [registration.status, registration.errorMessage, registration.fieldErrors, show]);

  const close = () => {
    onClose();
  };

  const containerRef = useFocusTrap(open, close);

  const onSubmit = (data) => {
    registration.submit({
      ...data,
      professor_phone: data.professor_phone.replace(/\D/g, ''),
    });
  };

  // The calendar is browsable to any month/date. The next 4 upcoming
  // Saturdays are always shown as already booked (marketing hold), whether
  // or not they're really booked in the database. From the 5th Saturday
  // onward, any Saturday is bookable unless it's genuinely booked — and a
  // genuinely booked date is marked identically to a locked one, so the
  // two are indistinguishable to the visitor.
  const isBlocked = (key) => bookedSet.has(key) || isMarketingLocked(key);

  const filterDate = (date) => {
    if (date.getDay() !== 6) return false;
    return !isBlocked(toDateKey(date));
  };

  const dayClassName = (date) => {
    if (date.getDay() !== 6) return undefined;
    return isBlocked(toDateKey(date)) ? 'hk-day-booked' : 'hk-day-available';
  };

  const renderDayContents = (dayOfMonth, date) => {
    if (date.getDay() !== 6) return <span>{dayOfMonth}</span>;
    if (isBlocked(toDateKey(date))) {
      return <span title="Hackathon already booked">{dayOfMonth}</span>;
    }
    return <span>{dayOfMonth}</span>;
  };

  const isSubmitting = registration.status === 'submitting';
  const showForm = registration.status === 'idle' || registration.status === 'submitting' || registration.status === 'error';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="hk-dialog-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={close}
        >
          <style>{`
            .hk-dialog-backdrop {
              position: fixed; inset: 0;
              background: rgba(2, 15, 20, 0.8);
              backdrop-filter: blur(8px);
              -webkit-backdrop-filter: blur(8px);
              z-index: 9999;
              display: flex; align-items: center; justify-content: center;
              padding: 20px;
              overflow-y: auto;
            }
            .hk-dialog-panel {
              position: relative;
              width: min(620px, 100%);
              max-height: 92vh;
              overflow-y: auto;
              border-radius: 26px;
              padding: 40px 36px;
              background: linear-gradient(165deg, rgba(7,42,48,0.92), rgba(4,25,29,0.96));
              border: 1px solid rgba(0,229,255,0.28);
              box-shadow: 0 30px 90px rgba(0,151,167,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
              color: #e3f8fb;
            }
            .hk-dialog-close {
              position: absolute; top: 18px; right: 18px;
              width: 34px; height: 34px;
              display: flex; align-items: center; justify-content: center;
              border-radius: 50%;
              background: rgba(255,255,255,0.08);
              border: 1px solid rgba(255,255,255,0.14);
              color: #cbd5e1;
              transition: all 0.2s ease;
              z-index: 2;
            }
            .hk-dialog-close:hover { background: rgba(255,255,255,0.16); color: #fff; }
            .hk-dialog-title {
              font-family: var(--font-display);
              font-size: 24px;
              font-weight: 800;
              margin-bottom: 6px;
              background: linear-gradient(90deg, #fff, #80f0ff);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .hk-dialog-subtitle { font-size: 13.5px; color: #8fb9bf; margin-bottom: 28px; }

            .hk-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
            .hk-form-group { margin-bottom: 18px; }
            .hk-form-label {
              display: block; font-size: 12px; font-weight: 600;
              color: #9fc9cf; text-transform: uppercase; letter-spacing: 0.5px;
              margin-bottom: 7px;
            }
            .hk-input {
              width: 100%;
              padding: 12px 15px;
              border-radius: 11px;
              border: 1.5px solid rgba(255,255,255,0.12);
              background: rgba(255,255,255,0.05);
              color: #eafbfd;
              font-size: 14px;
              font-family: var(--font-body);
              outline: none;
              transition: border-color 0.2s ease, background 0.2s ease;
            }
            .hk-input::placeholder { color: #6b8f94; }
            .hk-input:focus {
              border-color: #00e5ff;
              background: rgba(0,188,212,0.08);
              box-shadow: 0 0 0 3px rgba(0,229,255,0.18);
            }
            .hk-input.hk-input-error { border-color: #f87171; }
            .hk-field-error { font-size: 11.5px; color: #fca5a5; margin-top: 5px; }
            .hk-field-hint { font-size: 11.5px; color: #7fa8ad; margin: -3px 0 8px; line-height: 1.5; }

            .hk-submit-btn {
              width: 100%;
              margin-top: 8px;
              background: linear-gradient(135deg, #00bcd4, #00e5ff);
              color: #042025;
              padding: 15px;
              border-radius: 13px;
              font-family: var(--font-display);
              font-size: 15.5px; font-weight: 700;
              display: flex; align-items: center; justify-content: center; gap: 10px;
              box-shadow: 0 12px 32px rgba(0,188,212,0.4);
              transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease;
            }
            .hk-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 18px 44px rgba(0,229,255,0.5); }
            .hk-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
            @keyframes hk-spin { to { transform: rotate(360deg); } }
            .hk-spin { animation: hk-spin 0.9s linear infinite; display: inline-flex; }

            .hk-step-msg {
              font-size: 12.5px; color: #80f0ff; text-align: center; margin-top: 12px;
              display: flex; align-items: center; justify-content: center; gap: 8px;
            }

            /* Success / conflict screens */
            .hk-result { text-align: center; padding: 30px 6px 10px; }
            .hk-result-emoji { font-size: 52px; margin-bottom: 18px; line-height: 1; }
            .hk-result-title { font-family: var(--font-display); font-size: 23px; font-weight: 800; margin-bottom: 12px; }
            .hk-result-sub { font-size: 14.5px; color: #a8d4d9; line-height: 1.7; margin-bottom: 26px; }
            .hk-result-warning {
              font-size: 12.5px; color: #fbbf24; line-height: 1.6;
              background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3);
              border-radius: 10px; padding: 10px 14px; margin: -12px 0 26px;
            }
            .hk-result-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
            .hk-secondary-btn {
              padding: 12px 24px;
              border-radius: 12px;
              border: 1.5px solid rgba(255,255,255,0.16);
              color: #e5e3f5;
              font-weight: 600;
              font-size: 14px;
              background: rgba(255,255,255,0.05);
              transition: all 0.2s ease;
            }
            .hk-secondary-btn:hover { background: rgba(255,255,255,0.1); }

            /* react-datepicker dark theme overrides */
            .hk-dialog-panel .react-datepicker-wrapper { width: 100%; }
            .hk-dialog-panel .react-datepicker {
              background: #0b353d;
              border: 1px solid rgba(0,229,255,0.3);
              border-radius: 14px;
              font-family: var(--font-body);
              color: #e3f8fb;
              overflow: hidden;
            }
            .hk-dialog-panel .react-datepicker__header {
              background: #072a30;
              border-bottom: 1px solid rgba(0,229,255,0.25);
            }
            .hk-dialog-panel .react-datepicker__current-month,
            .hk-dialog-panel .react-datepicker__day-name,
            .hk-dialog-panel .react-datepicker-time__header {
              color: #e3f8fb;
            }
            .hk-dialog-panel .react-datepicker__navigation-icon::before { border-color: #80f0ff; }
            .hk-dialog-panel .react-datepicker__day { color: #cfe8ec; border-radius: 8px; }
            .hk-dialog-panel .react-datepicker__day--disabled { color: #45696d; }
            .hk-dialog-panel .react-datepicker__day.hk-day-available {
              background: rgba(0,188,212,0.18);
              color: #e0f7fa;
              font-weight: 700;
            }
            .hk-dialog-panel .react-datepicker__day.hk-day-available:hover {
              background: linear-gradient(135deg, #00bcd4, #00e5ff);
              color: #042025;
            }
            .hk-dialog-panel .react-datepicker__day.hk-day-booked {
              background: rgba(248, 113, 113, 0.18) !important;
              color: #fca5a5 !important;
              font-weight: 700;
              cursor: not-allowed !important;
              text-decoration: line-through;
            }
            .hk-dialog-panel .react-datepicker__day--keyboard-selected,
            .hk-dialog-panel .react-datepicker__day--selected {
              background: linear-gradient(135deg, #00bcd4, #00e5ff) !important;
              color: #042025 !important;
            }

            @media (max-width: 560px) {
              .hk-dialog-panel { padding: 30px 22px; }
              .hk-form-row { grid-template-columns: 1fr; }
            }
          `}</style>

          <motion.div
            ref={containerRef}
            className="hk-dialog-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hk-dialog-title"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="hk-dialog-close" aria-label="Close registration dialog" onClick={close}>
              <CloseIcon />
            </button>

            {showForm && (
              <>
                <h2 id="hk-dialog-title" className="hk-dialog-title">College Hackathon Registration</h2>
                <p className="hk-dialog-subtitle">Reserve a free 24-hour hackathon Saturday for your college.</p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="hk-form-group">
                    <label className="hk-form-label" htmlFor="college_name">College Name *</label>
                    <input
                      id="college_name"
                      className={`hk-input${errors.college_name ? ' hk-input-error' : ''}`}
                      placeholder="e.g. ABC College of Engineering"
                      aria-invalid={!!errors.college_name}
                      {...register('college_name', {
                        required: 'College name is required',
                        minLength: { value: 3, message: 'College name looks too short' },
                      })}
                    />
                    {errors.college_name && <div className="hk-field-error" role="alert">{errors.college_name.message}</div>}
                  </div>

                  <div className="hk-form-group">
                    <label className="hk-form-label" htmlFor="college_email">College Email *</label>
                    <input
                      id="college_email"
                      type="email"
                      className={`hk-input${errors.college_email ? ' hk-input-error' : ''}`}
                      placeholder="office@college.edu.in"
                      aria-invalid={!!errors.college_email}
                      {...register('college_email', {
                        required: 'College email is required',
                        pattern: { value: EMAIL_REGEX, message: 'Enter a valid email address' },
                      })}
                    />
                    {errors.college_email && <div className="hk-field-error" role="alert">{errors.college_email.message}</div>}
                  </div>

                  <div className="hk-form-row">
                    <div className="hk-form-group">
                      <label className="hk-form-label" htmlFor="professor_name">Professor Name *</label>
                      <input
                        id="professor_name"
                        className={`hk-input${errors.professor_name ? ' hk-input-error' : ''}`}
                        placeholder="Dr. Jane Doe"
                        aria-invalid={!!errors.professor_name}
                        {...register('professor_name', {
                          required: 'Professor name is required',
                          pattern: { value: /^[A-Za-z.\s]+$/, message: 'Only letters allowed' },
                        })}
                      />
                      {errors.professor_name && <div className="hk-field-error" role="alert">{errors.professor_name.message}</div>}
                    </div>

                    <div className="hk-form-group">
                      <label className="hk-form-label" htmlFor="professor_phone">Professor Contact Number *</label>
                      <input
                        id="professor_phone"
                        className={`hk-input${errors.professor_phone ? ' hk-input-error' : ''}`}
                        placeholder="10-digit mobile number"
                        inputMode="numeric"
                        maxLength={10}
                        aria-invalid={!!errors.professor_phone}
                        {...register('professor_phone', {
                          required: 'Contact number is required',
                          pattern: { value: INDIAN_MOBILE_REGEX, message: 'Enter a valid 10-digit Indian mobile number' },
                        })}
                      />
                      {errors.professor_phone && <div className="hk-field-error" role="alert">{errors.professor_phone.message}</div>}
                    </div>
                  </div>

                  <div className="hk-form-group">
                    <label className="hk-form-label" htmlFor="pincode">Pincode *</label>
                    <input
                      id="pincode"
                      className={`hk-input${errors.pincode ? ' hk-input-error' : ''}`}
                      placeholder="6-digit pincode"
                      inputMode="numeric"
                      maxLength={6}
                      aria-invalid={!!errors.pincode}
                      {...register('pincode', {
                        required: 'Pincode is required',
                        pattern: { value: PINCODE_REGEX, message: 'Enter a valid 6-digit pincode' },
                      })}
                    />
                    {errors.pincode && <div className="hk-field-error" role="alert">{errors.pincode.message}</div>}
                  </div>

                  <div className="hk-form-group">
                    <label className="hk-form-label" htmlFor="hackathon_date">Preferred Hackathon Date (Saturdays only) *</label>
                    <p className="hk-field-hint">
                      Browse any Saturday — dates already booked (including the next few weeks) are shown in <span style={{ color:'red'}}>red</span>, open dates are <span style={{ color:'rgba(0, 229, 255, 0.79)'}}>highlighted</span>.
                    </p>
                    {datesLoading ? (
                      <SkeletonDatePicker />
                    ) : (
                      <Controller
                        control={control}
                        name="hackathon_date"
                        rules={{ required: 'Please select a hackathon date' }}
                        render={({ field }) => (
                          <DatePicker
                            id="hackathon_date"
                            selected={field.value ? new Date(`${field.value}T00:00:00`) : null}
                            onChange={(date) => field.onChange(date ? toDateKey(date) : '')}
                            filterDate={filterDate}
                            dayClassName={dayClassName}
                            renderDayContents={renderDayContents}
                            minDate={new Date()}
                            openToDate={openKeys[0] ? new Date(`${openKeys[0]}T00:00:00`) : undefined}
                            placeholderText="Select a Saturday"
                            dateFormat="EEEE, MMMM d, yyyy"
                            className={`hk-input${errors.hackathon_date ? ' hk-input-error' : ''}`}
                            autoComplete="off"
                            aria-invalid={!!errors.hackathon_date}
                          />
                        )}
                      />
                    )}
                    {errors.hackathon_date && <div className="hk-field-error" role="alert">{errors.hackathon_date.message}</div>}
                  </div>

                  <button type="submit" className="hk-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="hk-spin"><SpinnerIcon /></span>
                        Submitting…
                      </>
                    ) : (
                      <>
                        <CalendarIcon width={18} height={18} />
                        Submit Registration
                      </>
                    )}
                  </button>

                  {registration.step && <div className="hk-step-msg"><span className="hk-spin"><SpinnerIcon width={13} height={13} /></span>{registration.step}</div>}
                </form>
              </>
            )}

            {registration.status === 'success' && (
              <div className="hk-result">
                <div className="hk-result-title">Thank You!</div>
                <p className="hk-result-sub">
                  Your college has successfully registered for the LnD Hackathon.<br />
                  Our team will contact you shortly.
                </p>
                {registration.emailWarning && (
                  <p className="hk-result-warning" role="alert">{registration.emailWarning}</p>
                )}
                <div className="hk-result-actions">
                  <button type="button" className="hk-secondary-btn" onClick={close}>Done</button>
                </div>
              </div>
            )}

            {registration.status === 'conflict' && (
              <div className="hk-result">
                <div className="hk-result-emoji">😔</div>
                <div className="hk-result-title">Sorry!</div>
                <p className="hk-result-sub">
                  This hackathon slot has already been booked.<br />
                  Please choose another Saturday.
                </p>
                <div className="hk-result-actions">
                  <button type="button" className="hk-secondary-btn" onClick={registration.reset}>Choose Another Date</button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
