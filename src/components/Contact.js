import React, { useState } from 'react';

const courses = ['Java', 'Python', 'C Programming', 'C++', 'AI & ML', 'App Development', 'MERN Stack', 'SQL'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', course: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setSubmitted(true);
  };

  const handleChange = (field, val) => {
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  };

  const waMsg = encodeURIComponent("Hi LnT! I'm interested in enrolling. Please share more details.");
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
        .contact-left {}
        .contact-tagline {
          font-size: 16px;
          color: var(--color-text-muted);
          margin-bottom: 40px;
          line-height: 1.7;
        }
        .contact-info-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .contact-info-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
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
          font-size: 22px;
          flex-shrink: 0;
        }
        .contact-info-text {}
        .contact-info-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-text-light);
          font-weight: 600;
        }
        .contact-info-val {
          font-size: 14px;
          font-weight: 500;
          color: var(--color-text-main);
          margin-top: 2px;
        }
        .wa-btn {
          display: flex;
          align-items: center;
          gap: 12px;
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
        .contact-right {}
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
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-family: var(--font-body);
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
        .form-error {
          font-size: 11px;
          color: #ef4444;
          margin-top: 4px;
        }
        .form-textarea { resize: vertical; min-height: 90px; }
        .submit-btn {
          width: 100%;
          background: var(--color-primary);
          color: white;
          padding: 16px;
          border-radius: var(--radius-md);
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
          border: none;
          box-shadow: 0 4px 20px rgba(0,188,212,0.3);
        }
        .submit-btn:hover {
          background: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,188,212,0.4);
        }
        .success-card {
          text-align: center;
          padding: 56px 40px;
        }
        .success-icon {
          font-size: 56px;
          margin-bottom: 20px;
          display: block;
        }
        .success-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          color: var(--color-dark);
          margin-bottom: 12px;
        }
        .success-sub {
          font-size: 15px;
          color: var(--color-text-muted);
        }
        @media (max-width: 960px) {
          .contact-inner { grid-template-columns: 1fr; gap: 48px; }
          .form-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .contact-form { padding: 28px 20px; }
        }
      `}</style>

      <section className="contact" id="contact">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Start Your <span className="accent">Learning Journey</span></h2>
          </div>

          <div className="contact-inner">
            <div className="contact-left">
              <p className="contact-tagline">
                Ready to transform your career? Reach out and we'll help you pick the right course and batch timing.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <span className="contact-info-icon">📞</span>
                  <div className="contact-info-text">
                    <div className="contact-info-label">Phone</div>
                    <div className="contact-info-val">+91 99999 99999</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">📧</span>
                  <div className="contact-info-text">
                    <div className="contact-info-label">Email</div>
                    <div className="contact-info-val">info@lndtraining.in</div>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">📍</span>
                  <div className="contact-info-text">
                    <div className="contact-info-label">Location</div>
                    <div className="contact-info-val">Coimbatore, Tamil Nadu</div>
                  </div>
                </div>
              </div>

              <a href={waLink} target="_blank" rel="noreferrer" className="wa-btn">
                <span style={{ fontSize: '20px' }}>💬</span>
                Chat on WhatsApp
              </a>
            </div>

            <div className="contact-right">
              <div className="contact-form">
                {submitted ? (
                  <div className="success-card">
                    <span className="success-icon">🎉</span>
                    <div className="success-title">We'll be in touch soon!</div>
                    <p className="success-sub">Thank you for reaching out. Our team will contact you within 24 hours.</p>
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
                        <option value="">Select a course...</option>
                        {courses.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.course && <div className="form-error">{errors.course}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message (Optional)</label>
                      <textarea
                        className="form-textarea"
                        placeholder="Any questions or preferences..."
                        value={form.message}
                        onChange={e => handleChange('message', e.target.value)}
                      />
                    </div>

                    <button className="submit-btn" onClick={handleSubmit}>
                      Submit Enquiry →
                    </button>
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
