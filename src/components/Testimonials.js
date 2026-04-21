import React, { useState, useEffect, useCallback } from 'react';

const testimonials = [
  { name: 'Priya S.', city: 'Chennai', rating: 5, text: 'Learning Python in Tamil made a huge difference. Real project exposure was invaluable. I secured a job within 3 months of completing the course.' },
  { name: 'Arun K.', city: 'Coimbatore', rating: 5, text: 'The MERN Stack course was detailed and practical. The trainer shared real production scenarios. Got placed within 2 months after completion.' },
  { name: 'Divya R.', city: 'Madurai', rating: 5, text: 'Best decision I ever made. Trainers are genuine IT professionals. Tamil medium made it stress-free and I understood everything deeply.' },
  { name: 'Karthik M.', city: 'Salem', rating: 5, text: 'The AI & ML course content was excellent. The trainer shared real industry case studies that I couldn\'t find anywhere else. Highly recommended!' },
  { name: 'Suresh P.', city: 'Trichy', rating: 5, text: 'Java training here is top-notch. Complex concepts were broken down beautifully in Tamil. I cracked my first interview with confidence.' },
  { name: 'Anitha L.', city: 'Tirunelveli', rating: 5, text: 'The SQL and database training was amazing. Hands-on queries with real data. My confidence with databases went from zero to interview-ready.' },
];

const Stars = ({ count }) => (
  <span style={{ color: '#fbbf24', fontSize: '15px', letterSpacing: '1px' }}>
    {'★'.repeat(count)}
  </span>
);

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 3 >= testimonials.length ? 0 : c + 1)), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4000);
    return () => clearInterval(t);
  }, [paused, next]);

  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <>
      <style>{`
        .testimonials {
          padding: var(--section-padding);
          background: var(--color-dark);
          position: relative;
          overflow: hidden;
        }
        .testimonials::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent);
        }
        .testimonials-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 100%, rgba(0,188,212,0.05) 0%, transparent 60%);
        }
        .testimonials-header {
          text-align: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }
        .testimonials-header .section-title { color: var(--color-white); }
        .testimonials-header .section-tag { background: rgba(0,229,255,0.08); border-color: rgba(0,229,255,0.2); color: var(--color-accent); }
        .t-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          position: relative;
          z-index: 1;
        }
        .t-card {
          background: var(--color-dark-card);
          border: 1.5px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          padding: 32px 28px;
          position: relative;
          transition: var(--transition);
        }
        .t-card:hover {
          border-color: rgba(0,188,212,0.25);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }
        .t-quote {
          font-size: 56px;
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.3;
          font-family: serif;
          position: absolute;
          top: 12px; right: 24px;
        }
        .t-text {
          font-size: 14px;
          color: rgba(255,255,255,0.65);
          line-height: 1.8;
          margin-bottom: 24px;
          font-style: italic;
        }
        .t-footer {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .t-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--color-dark);
          flex-shrink: 0;
        }
        .t-info {}
        .t-name {
          font-weight: 600;
          color: var(--color-white);
          font-size: 14px;
        }
        .t-city {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin-top: 2px;
        }
        .t-stars { margin-top: 4px; }
        .t-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: 48px;
          position: relative;
          z-index: 1;
        }
        .t-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: none;
          cursor: pointer;
          transition: var(--transition);
          padding: 0;
        }
        .t-dot.active {
          background: var(--color-primary);
          width: 24px;
          border-radius: 4px;
        }
        @media (max-width: 900px) {
          .t-grid { grid-template-columns: 1fr; }
          .t-grid .t-card:nth-child(2), .t-grid .t-card:nth-child(3) { display: none; }
        }
        @media (max-width: 600px) {
          .t-grid .t-card:nth-child(2), .t-grid .t-card:nth-child(3) { display: none; }
        }
      `}</style>

      <section
        className="testimonials"
        id="testimonials"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="testimonials-bg" />
        <div className="container">
          <div className="testimonials-header">
            <span className="section-tag">Student Feedbacks</span>
            <h2 className="section-title">Words from Our <span className="accent">Learners</span></h2>
          </div>

          <div className="t-grid">
            {visible.map((t, i) => (
              <div className="t-card" key={`${current}-${i}`}>
                <div className="t-quote">"</div>
                <p className="t-text">{t.text}</p>
                <div className="t-footer">
                  <div className="t-avatar">{t.name[0]}</div>
                  <div className="t-info">
                    <div className="t-name">{t.name}</div>
                    <div className="t-city">📍 {t.city}</div>
                    <div className="t-stars"><Stars count={t.rating} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="t-nav">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`t-dot${i === current ? ' active' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Go to ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
