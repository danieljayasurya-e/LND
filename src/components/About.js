import React from 'react';

const highlights = [
  { icon: '🗣️', title: 'Taught in Tamil', desc: 'Full instruction in regional language for better understanding and retention' },
  { icon: '💼', title: 'Working Professionals', desc: 'Trainers are currently active in the IT industry with real-world experience' },
  { icon: '🛠️', title: 'Real-Time Projects', desc: 'Assignments based on live industry problems — not just theory' },
  { icon: '🎓', title: 'Internship Offered', desc: 'Selected students receive internship placements with project exposure' },
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
        .about-left {}
        .section-tag {
          display: inline-block;
          background: var(--color-primary-xlight);
          color: var(--color-primary-dark);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 6px 14px;
          border-radius: 999px;
          margin-bottom: 20px;
          border: 1px solid var(--color-primary-light);
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(30px, 4vw, 44px);
          font-weight: 800;
          line-height: 1.1;
          color: var(--color-dark);
          margin-bottom: 24px;
        }
        .section-title .accent { color: var(--color-primary); }
        .about-desc {
          font-size: 16px;
          line-height: 1.8;
          color: var(--color-text-muted);
          margin-bottom: 32px;
        }
        .about-colleges {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 20px 24px;
        }
        .about-colleges-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: var(--color-text-light);
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
        .about-right {}
        .highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .highlight-card {
          background: var(--color-white);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 28px 24px;
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
          transform: translateY(-4px);
        }
        .highlight-card:hover::before { transform: scaleX(1); }
        .highlight-emoji {
          font-size: 32px;
          margin-bottom: 14px;
          display: block;
        }
        .highlight-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--color-dark);
          margin-bottom: 8px;
        }
        .highlight-desc {
          font-size: 13px;
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
              <span className="section-tag">About LnT</span>
              <h2 className="section-title">
                Where Industry Meets <span className="accent">Learning</span>
              </h2>
              <p className="about-desc">
                We are a team of passionate IT professionals committed to bridging the skills gap in today's rapidly evolving tech industry. Our sessions are conducted in Tamil, making technical concepts easier to understand and apply.
              </p>
              <p className="about-desc" style={{marginTop: '-16px'}}>
                What sets LnT apart is our team of highly skilled trainers who are <strong style={{color:'var(--color-primary-dark)'}}>active IT industry professionals</strong> — bringing real-world challenges directly into the classroom and ensuring learners stay aligned with current technologies, tools, and best practices.
              </p>
              <div className="about-colleges">
                <div className="about-colleges-label">✅ Successfully trained at</div>
                <div className="college-names">
                  <strong>Sona College of Technology</strong> &amp; <strong>Dr. Sivanthi Aditanar College of Engineering</strong> — with outstanding feedback from students and faculty.
                </div>
              </div>
            </div>

            <div className="about-right">
              <div className="highlights-grid">
                {highlights.map((h, i) => (
                  <div className="highlight-card" key={i}>
                    <span className="highlight-emoji">{h.icon}</span>
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
