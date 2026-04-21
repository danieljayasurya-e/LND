import React from 'react';

const reasons = [
  { icon: '🗣️', title: 'Regional Language', desc: 'All sessions conducted in Tamil for better comprehension and deeper understanding.' },
  { icon: '👨‍💻', title: 'Industry Trainers', desc: 'Trainers are currently employed IT professionals with real-time, hands-on experience.' },
  { icon: '🛠️', title: 'Real-Time Projects', desc: 'Assignments and tasks based on live industry scenarios — not textbook problems.' },
  { icon: '🎯', title: 'Internship Support', desc: 'Hands-on internship offered to eligible students with actual project work.' },
  { icon: '📅', title: 'Flexible Batches', desc: 'Weekday and weekend batch options available to fit your schedule.' },
  { icon: '💰', title: 'Affordable Fees', desc: 'Competitive pricing with no hidden charges — quality education within reach.' },
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
        .why-header {
          text-align: center;
          margin-bottom: 64px;
        }
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
          width: 60px; height: 60px;
          background: var(--color-primary-xlight);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 20px;
          border: 1px solid var(--color-primary-light);
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
        .why-cta {
          text-align: center;
          margin-top: 56px;
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
        .vision-item {}
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
                <div className="why-icon-wrap">{r.icon}</div>
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
