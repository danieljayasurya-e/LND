import React, { useState } from 'react';

// ╔══════════════════════════════════════════════════════════════════╗
// ║  EMAIL CONFIGURATION — fill these in before going live          ║
// ║                                                                  ║
// ║  1. EMAILJS SETUP (free: https://www.emailjs.com)               ║
// ║     a) Create account → Add Email Service (Gmail/SMTP)          ║
// ║     b) Create 2 templates:                                       ║
// ║        - CUSTOMER template: variables →                          ║
// ║            {{to_name}}, {{to_email}}, {{course_name}},           ║
// ║            {{email_body}}                                        ║
// ║        - ADMIN template: variables →                             ║
// ║            {{from_name}}, {{from_email}}, {{from_phone}},        ║
// ║            {{course_name}}, {{inquiry_message}}                  ║
// ║     c) Copy Service ID, Template IDs, Public Key below          ║
// ║                                                                  ║
// ║  2. HUGGING FACE SETUP (free: https://huggingface.co)           ║
// ║     a) Create account → Settings → Access Tokens                ║
// ║     b) Create a READ token and paste below                       ║
// ║     c) Without token: API still works at a lower rate limit      ║
// ╚══════════════════════════════════════════════════════════════════╝
const EMAILJS_SERVICE_ID       = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_CUSTOMER_TMPL    = 'YOUR_CUSTOMER_TEMPLATE_ID';
const EMAILJS_ADMIN_TMPL       = 'YOUR_ADMIN_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY       = 'YOUR_EMAILJS_PUBLIC_KEY';
const HF_API_TOKEN             = '';          // Optional — leave empty for free-tier calls
const ADMIN_EMAIL              = 'info@lndtraining.in';
// ─────────────────────────────────────────────────────────────────────────────

const courses = ['Java', 'Python', 'C Programming', 'C++', 'AI & ML', 'App Development', 'MERN Stack', 'SQL'];

// ── SVG Icons ────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.4 11.3a19.79 19.79 0 01-3.07-8.67A2 2 0 012.51 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-.85a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const getDefaultBody = (name, course) => `Dear ${name},

Thank you for your interest in the ${course} course at LnD Training. We are thrilled to hear from you!

Our expert team of active IT professionals will reach out to you within 24 hours to discuss batch timings, course fee details, and enrollment. All our sessions are conducted in Tamil, making every concept clear and practical.

We look forward to being part of your success story.

Warm regards,
LnD Training Team
Coimbatore, Tamil Nadu
ld.programinfo@gmail.com`;

async function generateEmailWithAI(formData) {
  const prompt = `Write a short, warm professional confirmation email body (3 paragraphs, no subject line) for ${formData.name} who has just enquired about the ${formData.course} course at LnD Training, an IT training institute in Coimbatore, Tamil Nadu, India that teaches in Tamil. Tell them the team will contact them within 24 hours. End with team sign-off. Be concise and encouraging.`;
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (HF_API_TOKEN) headers['Authorization'] = `Bearer ${HF_API_TOKEN}`;
    const res = await fetch(
      'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-1.5B-Instruct',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          inputs: prompt,
          parameters: { max_new_tokens: 280, temperature: 0.72, return_full_text: false },
        }),
      }
    );
    if (!res.ok) throw new Error('HF API error');
    const data = await res.json();
    const text = (data[0]?.generated_text || '').trim();
    return text.length > 60 ? text : getDefaultBody(formData.name, formData.course);
  } catch {
    return getDefaultBody(formData.name, formData.course);
  }
}

// ── EmailJS REST API — no npm package required ────────────────────────────────
async function sendViaEmailJS(templateId, params) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error(`EmailJS error: ${res.status}`);
}

// ── Component ─────────────────────────────────────────────────────────────────
const EMPTY_FORM = { name: '', phone: '', email: '', course: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [sendStep, setSendStep] = useState('');   // shows AI / email step to user

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit phone number';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.course) e.course = 'Please select a course';
    return e;
  };

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
    if (sendError) setSendError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    // Check if EmailJS is configured
    const isConfigured = (
      EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID' &&
      EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY'
    );

    setSending(true);
    setSendError('');

    try {
      if (isConfigured) {
        // Step 1 — Generate personalized email body with HF Qwen
        setSendStep('Personalising your message with AI…');
        const emailBody = await generateEmailWithAI(form);

        // Step 2 — Send confirmation to student
        setSendStep('Sending confirmation to your email…');
        await sendViaEmailJS(EMAILJS_CUSTOMER_TMPL, {
          to_name:     form.name,
          to_email:    form.email,
          course_name: form.course,
          email_body:  emailBody,
        });

        // Step 3 — Notify admin
        setSendStep('Notifying our team…');
        await sendViaEmailJS(EMAILJS_ADMIN_TMPL, {
          from_name:       form.name,
          from_email:      form.email,
          from_phone:      form.phone,
          course_name:     form.course,
          inquiry_message: form.message || '—',
          admin_email:     ADMIN_EMAIL,
        });
      }
      // Even when not configured, show success so UI works in dev
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSendError('Could not send at the moment. Please WhatsApp or call us directly.');
    } finally {
      setSending(false);
      setSendStep('');
    }
  };

  const waMsg = encodeURIComponent("Hi LnD! I'm interested in enrolling. Please share more details.");
  const waLink = `https://wa.me/919999999999?text=${waMsg}`;

  return (
    <>
      <style>{`
        .contact {
          padding: var(--section-padding);
          background: var(--color-white);
          position: relative;
          overflow: hidden;
        }
        .contact::before {
          content: '';
          position: absolute;
          top: -100px; left: -100px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--color-primary-xlight) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-inner {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 72px;
          align-items: start;
          position: relative;
          z-index: 1;
        }
        .contact-tagline {
          font-size: 16px;
          color: var(--color-text-muted);
          margin-bottom: 40px;
          line-height: 1.7;
        }
        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 32px;
        }
        .contact-info-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: var(--color-surface);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          transition: var(--transition);
        }
        .contact-info-item:hover {
          border-color: var(--color-primary-light);
          background: var(--color-primary-xlight);
        }
        .contact-info-icon {
          width: 40px; height: 40px;
          background: var(--color-white);
          border: 1.5px solid var(--color-border);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary-dark);
          flex-shrink: 0;
          transition: var(--transition);
        }
        .contact-info-item:hover .contact-info-icon {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
        }
        .contact-info-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-light);
          font-weight: 700;
        }
        .contact-info-val {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-main);
          margin-top: 1px;
        }
        .wa-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #25d366;
          color: white;
          padding: 14px 24px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 15px;
          transition: var(--transition);
          text-decoration: none;
          justify-content: center;
        }
        .wa-btn:hover {
          background: #1ebe5b;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,211,102,0.35);
        }
        /* Form */
        .contact-form {
          background: var(--color-white);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-xl);
          padding: 40px 36px;
          box-shadow: var(--shadow-card);
        }
        .form-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--color-dark);
          margin-bottom: 28px;
        }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block;
          font-size: 12px; font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase; letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-size: 14px; font-family: var(--font-body);
          color: var(--color-text-main);
          background: var(--color-white);
          transition: var(--transition);
          outline: none;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(0,188,212,0.1);
        }
        .form-input.error, .form-select.error { border-color: #ef4444; }
        .form-error { font-size: 11px; color: #ef4444; margin-top: 4px; }
        .form-textarea { resize: vertical; min-height: 90px; }
        .submit-btn {
          width: 100%;
          background: var(--color-primary);
          color: white;
          padding: 16px;
          border-radius: var(--radius-md);
          font-family: var(--font-display);
          font-size: 16px; font-weight: 700;
          cursor: pointer; transition: var(--transition);
          border: none;
          box-shadow: 0 4px 20px rgba(0,188,212,0.3);
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .submit-btn:hover:not(:disabled) {
          background: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,188,212,0.4);
        }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .send-step-msg {
          font-size: 12px; color: var(--color-primary-dark);
          text-align: center; margin-top: 10px;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.9s linear infinite; display: inline-block; }
        .send-error {
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: var(--radius-sm);
          color: #dc2626; font-size: 13px;
          padding: 12px 16px; margin-top: 12px;
          text-align: center;
        }
        /* Success */
        .success-card {
          text-align: center; padding: 56px 40px;
        }
        .success-icon-wrap {
          width: 80px; height: 80px;
          background: var(--color-primary-xlight);
          border: 2px solid var(--color-primary-light);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
          color: var(--color-primary);
        }
        .success-title {
          font-family: var(--font-display);
          font-size: 24px; font-weight: 700;
          color: var(--color-dark); margin-bottom: 12px;
        }
        .success-sub { font-size: 15px; color: var(--color-text-muted); line-height: 1.6; }
        @media (max-width: 960px) {
          .contact-inner { grid-template-columns: 1fr; gap: 48px; }
          .form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) { .contact-form { padding: 28px 20px; } }
      `}</style>

      <section className="contact" id="contact">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Start Your <span className="accent">Learning Journey</span></h2>
          </div>

          <div className="contact-inner">
            {/* Left info column */}
            <div>
              <p className="contact-tagline">
                Ready to transform your career? Reach out and we'll help you pick the right course and batch timing.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon"><MailIcon /></div>
                  <div>
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-val">info@lndtraining.in</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-info-icon"><MapPinIcon /></div>
                  <div>
                    <div className="contact-info-label">Location</div>
                    <div className="contact-info-val">Coimbatore, Tamil Nadu</div>
                  </div>
                </div>
              </div>

              {/* <a href={waLink} target="_blank" rel="noreferrer" className="wa-btn">
                <WhatsAppIcon />
                Chat on WhatsApp
              </a> */}
            </div>

            {/* Right form column */}
            <div>
              <div className="contact-form">
                {submitted ? (
                  <div className="success-card">
                    <div className="success-icon-wrap">
                      <CheckCircleIcon />
                    </div>
                    <div className="success-title">We'll be in touch soon!</div>
                    <p className="success-sub">
                      Thank you for reaching out, <strong>{form.name}</strong>.<br />
                      A confirmation email has been sent to <strong>{form.email}</strong>.<br />
                      Our team will contact you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="form-title">Enroll or Enquire</div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          className={`form-input${errors.name ? ' error' : ''}`}
                          placeholder="Your name"
                          value={form.name}
                          onChange={e => handleChange('name', e.target.value)}
                        />
                        {errors.name && <div className="form-error">{errors.name}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Phone Number *</label>
                        <input
                          className={`form-input${errors.phone ? ' error' : ''}`}
                          placeholder="10-digit number"
                          value={form.phone}
                          onChange={e => handleChange('phone', e.target.value)}
                        />
                        {errors.phone && <div className="form-error">{errors.phone}</div>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input
                        className={`form-input${errors.email ? ' error' : ''}`}
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => handleChange('email', e.target.value)}
                      />
                      {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Course Interested In *</label>
                      <select
                        className={`form-select${errors.course ? ' error' : ''}`}
                        value={form.course}
                        onChange={e => handleChange('course', e.target.value)}
                      >
                        <option value="">Select a course…</option>
                        {courses.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.course && <div className="form-error">{errors.course}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message (Optional)</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Any questions or preferences…"
                        value={form.message}
                        onChange={e => handleChange('message', e.target.value)}
                      />
                    </div>

                    <button
                      className="submit-btn"
                      onClick={handleSubmit}
                      disabled={sending}
                    >
                      {sending ? (
                        <>
                          <span className="spin">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M21 12a9 9 0 11-6.219-8.56" />
                            </svg>
                          </span>
                          Sending…
                        </>
                      ) : (
                        <>
                          <SendIcon />
                          Submit Enquiry
                        </>
                      )}
                    </button>

                    {sendStep && (
                      <div className="send-step-msg">
                        <span className="spin">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M21 12a9 9 0 11-6.219-8.56" />
                          </svg>
                        </span>
                        {sendStep}
                      </div>
                    )}
                    {sendError && <div className="send-error">{sendError}</div>}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
