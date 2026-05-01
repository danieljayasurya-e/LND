import React from 'react';

// ── Professional SVG Icons ──────────────────────────────────────────────
const LanguageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 8l6 6" /><path d="M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
);

const CodeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const GradCapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const highlights = [
  { Icon: LanguageIcon, title: 'Taught in Tamil & English', desc: 'Full instruction in regional language for better understanding and retention' },
  { Icon: BriefcaseIcon, title: 'Working Professionals', desc: 'Trainers are currently active in the IT industry with real-world experience' },
  { Icon: CodeIcon, title: 'Real-Time Projects', desc: 'Assignments based on live industry problems — not just theory' },
  { Icon: GradCapIcon, title: 'Internship Offered', desc: 'Selected students receive internship placements with project exposure' },
];

export default function About() {
  return (
    <>
      <style>{`
        .about {
          padding: var(--section-padding);
          background: var(--color-white);
        }
        .about-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .about-desc {
          font-size: 16px;
          line-height: 1.8;
          color: var(--color-text-muted);
          margin-bottom: 24px;
        }
        .about-colleges {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
          margin-top: 8px;
        }
        .about-colleges-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--color-primary-dark);
          margin-bottom: 10px;
        }
        .college-names {
          font-size: 14px;
          color: var(--color-text-muted);
          line-height: 1.7;
        }
        .college-names strong {
          color: var(--color-primary-dark);
          font-weight: 600;
        }
        .about-right {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .about-photo-wrap {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          height: 220px;
          box-shadow: 0 8px 40px rgba(0,188,212,0.18);
        }
        .about-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .about-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(4,32,37,0.55) 0%, rgba(0,188,212,0.15) 100%);
          display: flex;
          align-items: flex-end;
          padding: 20px 24px;
        }
        .about-photo-badge {
          background: rgba(255,255,255,0.96);
          border-radius: 10px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .about-photo-badge-num {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 800;
          color: var(--color-primary-dark);
          line-height: 1;
        }
        .about-photo-badge-label {
          font-size: 12px;
          color: var(--color-text-muted);
          font-weight: 500;
          line-height: 1.3;
        }
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .highlight-card {
          background: var(--color-white);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 22px 20px;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        .highlight-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          transform: scaleX(0);
          transform-origin: left;
          transition: var(--transition);
        }
        .highlight-card:hover {
          border-color: var(--color-primary-light);
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-3px);
        }
        .highlight-card:hover::before { transform: scaleX(1); }
        .highlight-icon-wrap {
          width: 44px; height: 44px;
          background: var(--color-primary-xlight);
          border: 1px solid var(--color-primary-light);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          color: var(--color-primary-dark);
          transition: var(--transition);
        }
        .highlight-card:hover .highlight-icon-wrap {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: #fff;
        }
        .highlight-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          color: var(--color-dark);
          margin-bottom: 6px;
        }
        .highlight-desc {
          font-size: 12px;
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        @media (max-width: 900px) {
          .about-inner { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 520px) {
          .highlights-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="about" id="about">
        <div className="container">
          <div className="about-inner">
            <div className="about-left">
              <span className="section-tag">About LnD</span>
              <h2 className="section-title">
                Where Industry Meets <span className="accent">Learning</span>
              </h2>
              <p className="about-desc">
                We are a team of passionate IT professionals committed to bridging the skills gap in today's rapidly evolving tech industry. Our sessions are conducted in Tamil, making technical concepts easier to understand and apply.
              </p>
              <p className="about-desc" style={{ marginTop: '-8px' }}>
                What sets LnD apart is our team of highly skilled trainers who are <strong style={{ color: 'var(--color-primary-dark)' }}>active IT industry professionals</strong> — bringing real-world challenges directly into the classroom and ensuring learners stay aligned with current technologies, tools, and best practices.
              </p>
              <div className="about-colleges">
                <div className="about-colleges-label">
                  <span style={{ display:'inline-flex', background:'var(--color-primary)', borderRadius:'50%', width:20, height:20, alignItems:'center', justifyContent:'center', color:'#fff', flexShrink:0 }}>
                    <CheckIcon />
                  </span>
                  Successfully trained at
                </div>
                <div className="college-names">
                  <strong>Sona College of Technology, Paavai Engineering College, Kings College Of Engineering </strong> &amp; <strong>Dr. Sivanthi Aditanar College of Engineering</strong> — with outstanding feedback from students and faculty.
                </div>
              </div>
            </div>

            <div className="about-right">
              <div className="about-photo-wrap">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&h=400&q=80"
                  alt="Professional IT training session"
                  className="about-photo"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&h=400&q=80'; }}
                />
                <div className="about-photo-overlay">
                  <div className="about-photo-badge">
                    <div className="about-photo-badge-num">500+</div>
                    <div className="about-photo-badge-label">Students<br />Trained</div>
                  </div>
                </div>
              </div>

              <div className="highlights-grid">
                {highlights.map((h, i) => (
                  <div className="highlight-card" key={i}>
                    <div className="highlight-icon-wrap">
                      <h.Icon />
                    </div>
                    <div className="highlight-title">{h.title}</div>
                    <div className="highlight-desc">{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
