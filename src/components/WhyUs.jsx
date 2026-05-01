import React from 'react';

// ── Professional SVG Icons ──────────────────────────────────────────────
const SpeechIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const UserCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);
const ToolsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);
const TargetIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const TagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const reasons = [
  { Icon: SpeechIcon,    title: 'Regional Language',  desc: 'All sessions conducted in Tamil & English for better comprehension and deeper understanding.' },
  { Icon: UserCheckIcon, title: 'Industry Trainers',  desc: 'Trainers are currently employed IT professionals with real-time, hands-on experience.' },
  { Icon: ToolsIcon,     title: 'Real-Time Projects', desc: 'Assignments and tasks based on live industry scenarios — not textbook problems.' },
  { Icon: TargetIcon,    title: 'Internship Support', desc: 'Hands-on internship offered to eligible students with actual project work.' },
  { Icon: CalendarIcon,  title: 'Flexible Batches',   desc: 'Weekday and weekend batch options available to fit your schedule.' },
  { Icon: TagIcon,       title: 'Affordable Fees',    desc: 'Competitive pricing with no hidden charges — quality education within reach.' },
];

export default function WhyUs() {
  return (
    <>
      <style>{`
        .why-us {
          padding: var(--section-padding);
          background: var(--color-surface);
          position: relative;
          overflow: hidden;
        }
        .why-us::after {
          content: '';
          position: absolute;
          bottom: -80px; right: -80px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0,188,212,0.06) 0%, transparent 70%);
        }
        .why-header { text-align: center; margin-bottom: 64px; }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .why-card {
          background: var(--color-white);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 36px 28px;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        .why-card:hover {
          border-color: var(--color-primary-light);
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-4px);
        }
        .why-icon-wrap {
          width: 56px; height: 56px;
          background: var(--color-primary-xlight);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid var(--color-primary-light);
          color: var(--color-primary-dark);
          transition: var(--transition);
        }
        .why-card:hover .why-icon-wrap {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
        }
        .why-card-title {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          color: var(--color-dark);
          margin-bottom: 10px;
        }
        .why-card-desc {
          font-size: 14px;
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        .vision-block {
          margin-top: 60px;
          background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-surface) 100%);
          border-radius: var(--radius-xl);
          padding: 56px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          position: relative;
          overflow: hidden;
        }
        .vision-block::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent), transparent);
        }
        .vision-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--color-accent);
          margin-bottom: 12px;
        }
        .vision-text {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--color-white);
          line-height: 1.5;
        }
        .vision-text .highlight { color: var(--color-accent); }
        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .vision-block { grid-template-columns: 1fr; padding: 36px 28px; }
        }
        @media (max-width: 560px) {
          .why-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="why-us" id="why-us">
        <div className="container">
          <div className="why-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Built Different. <span className="accent">Built for You.</span></h2>
          </div>

          <div className="why-grid">
            {reasons.map((r, i) => (
              <div className="why-card" key={i}>
                <div className="why-icon-wrap"><r.Icon /></div>
                <div className="why-card-title">{r.title}</div>
                <p className="why-card-desc">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="vision-block">
            <div className="vision-item">
              <div className="vision-label">Our Vision</div>
              <div className="vision-text">
                <span className="highlight">"Growth Without Limits"</span> — Empowering individuals to unlock their full potential and lead the future of IT.
              </div>
            </div>
            <div className="vision-item">
              <div className="vision-label">Our Mission</div>
              <div className="vision-text">
                Provide industry-aligned training and mentorship that equips learners with the skills needed to excel in <span className="highlight">high-demand IT careers.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
