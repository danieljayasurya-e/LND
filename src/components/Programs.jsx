import React from 'react';

const courses = [
  {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    mode: 'Online & Offline',
    desc: 'Build powerful backend systems with Java — OOP, collections, multithreading, and real-world enterprise projects.',
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    mode: 'Online & Offline',
    desc: 'Learn Python from scratch — variables, loops, functions, file handling, and mini-projects guided by industry professionals.',
  },
  {
    name: 'C Programming',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    mode: 'Offline',
    desc: 'Master the foundation of all programming. Pointers, memory management, and problem-solving with C.',
  },
  {
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    mode: 'Offline',
    desc: 'Object-oriented programming, STL, data structures, and real-world system design with C++.',
  },
  {
    name: 'AI & ML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    mode: 'Offline',
    desc: 'Step into the future — machine learning algorithms, neural networks, Python-based ML projects, and industry case studies.',
  },
  {
    name: 'App Development',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    mode: 'Offline',
    desc: 'Create apps for Android & iOS. React Native or Flutter, APIs, UI/UX fundamentals, and app store deployment.',
  },
  {
    name: 'MERN Stack',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    mode: 'Online & Offline',
    desc: 'Full-stack web development end to end — MongoDB, Express, React, Node.js with real production-level projects.',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', label: 'M' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', label: 'E' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'R' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', label: 'N' },
    ],
  },
  {
    name: 'SQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    duration: '4 Weeks',
    mode: 'Online & Offline',
    desc: 'Manage and query data like a pro. SQL queries, joins, stored procedures, indexing, and database design.',
  },
  {
    name: 'Java Full Stack',
    mode: 'Online & Offline',
    desc: 'End-to-end Java development — Spring Boot REST APIs on the backend, React on the frontend, MySQL database, and deployment to the cloud.',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', label: 'Java' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', label: 'Spring' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', label: 'MySQL' },
    ],
  },
  {
    name: 'Python Full Stack',
    mode: 'Online & Offline',
    desc: 'Full-stack development with Python — Django/Flask backend, React frontend, PostgreSQL database, REST APIs, and real-world project deployment.',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', label: 'Python' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', label: 'Django' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', label: 'PostgreSQL' },
    ],
  },
];

export default function Programs() {
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .programs {
          padding: var(--section-padding);
          background: var(--color-dark);
          position: relative;
          overflow: hidden;
        }
        .programs::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
        }
        .programs-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(circle at 10% 80%, rgba(0,188,212,0.06) 0%, transparent 40%),
            radial-gradient(circle at 90% 20%, rgba(0,229,255,0.04) 0%, transparent 40%);
        }
        .programs-header {
          text-align: center;
          margin-bottom: 48px;
          position: relative;
        }
        .programs-header .section-title { color: var(--color-white); }
        .programs-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.48);
          margin-top: 12px;
        }

        /* Opportunity wrap sits above the course grid */
        .opportunity-wrap {
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        /* Hackathon banner */
        .hackathon-banner {
          background: linear-gradient(120deg, #0d2a2e 0%, #0a1f24 60%, #091c20 100%);
          border: 1.5px solid rgba(0,229,255,0.35);
          border-radius: var(--radius-lg);
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(0,229,255,0.08), inset 0 0 60px rgba(0,188,212,0.04);
        }
        .hackathon-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--color-accent), var(--color-primary), var(--color-accent), transparent);
        }
        .hackathon-glow {
          position: absolute;
          top: -40px; right: -40px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .hackathon-left {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          flex: 1;
          min-width: 0;
        }
        .hackathon-icon {
          width: 52px; height: 52px;
          background: linear-gradient(135deg, rgba(0,229,255,0.2), rgba(0,188,212,0.1));
          border: 1.5px solid rgba(0,229,255,0.3);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 24px;
        }
        .hackathon-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0,229,255,0.15);
          border: 1px solid rgba(0,229,255,0.3);
          color: var(--color-accent);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          padding: 4px 10px;
          border-radius: 999px;
          margin-bottom: 8px;
        }
        .hackathon-dot {
          width: 6px; height: 6px;
          background: var(--color-accent);
          border-radius: 50%;
          display: inline-block;
          animation: pulse-dot 1.4s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.65); }
        }
        .hackathon-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--color-white);
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .hackathon-title span { color: var(--color-accent); }
        .hackathon-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.52);
          line-height: 1.6;
        }
        .hackathon-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        .hackathon-pill {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.09);
        }
        .hackathon-pill.hl {
          background: rgba(0,229,255,0.1);
          color: var(--color-accent);
          border-color: rgba(0,229,255,0.28);
        }
        .hackathon-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }
        .hackathon-btn {
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          color: #021820;
          padding: 13px 30px;
          border-radius: var(--radius-sm);
          font-weight: 800;
          font-size: 14px;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          font-family: var(--font-body);
          border: none;
          box-shadow: 0 4px 20px rgba(0,229,255,0.3);
        }
        .hackathon-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,229,255,0.45);
        }
        .hackathon-note {
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          text-align: center;
        }

        /* Internship banner — enhanced */
        .internship-banner {
          background: linear-gradient(135deg, #0a2030 0%, #071820 50%, #0a1c28 100%);
          border: 1.5px solid rgba(0,229,255,0.22);
          border-radius: var(--radius-lg);
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          position: relative;
          z-index: 1;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(0,0,0,0.3);
        }
        .internship-banner::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,188,212,0.6), rgba(0,229,255,0.8), rgba(0,188,212,0.6), transparent);
        }
        .internship-glow {
          position: absolute;
          bottom: -60px; left: -40px;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(0,188,212,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .internship-left {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          flex: 1;
          min-width: 0;
        }
        .internship-icon-box {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, rgba(0,188,212,0.18), rgba(0,229,255,0.08));
          border: 1.5px solid rgba(0,188,212,0.28);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 26px;
        }
        .internship-label {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(0,188,212,0.12);
          border: 1px solid rgba(0,188,212,0.25);
          color: var(--color-primary);
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 3px 10px;
          border-radius: 999px;
          margin-bottom: 8px;
        }
        .internship-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          color: var(--color-white);
          margin-bottom: 6px;
          line-height: 1.2;
        }
        .internship-title span { color: var(--color-primary); }
        .internship-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.48);
          line-height: 1.6;
          margin-bottom: 14px;
        }
        .internship-stats {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .internship-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 12px;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
        }
        .internship-stat svg { flex-shrink: 0; }
        .internship-stat.accent-stat {
          background: rgba(0,188,212,0.1);
          border-color: rgba(0,188,212,0.25);
          color: var(--color-accent);
        }
        .internship-right {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .internship-duration-badge {
          text-align: center;
          background: rgba(0,188,212,0.1);
          border: 1.5px solid rgba(0,188,212,0.25);
          border-radius: 14px;
          padding: 14px 22px;
          min-width: 110px;
        }
        .internship-duration-num {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 900;
          color: var(--color-accent);
          line-height: 1;
        }
        .internship-duration-label {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-top: 4px;
        }
        .internship-btn {
          background: var(--color-primary);
          border: none;
          color: #021820;
          padding: 11px 26px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          font-family: var(--font-body);
          box-shadow: 0 4px 16px rgba(0,188,212,0.25);
          width: 100%;
        }
        .internship-btn:hover {
          background: var(--color-accent);
          box-shadow: 0 6px 24px rgba(0,229,255,0.35);
          transform: translateY(-1px);
        }

        /* Course grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
        }
        .course-card {
          background: var(--color-dark-card);
          border: 1.5px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          padding: 28px 22px;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .course-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
          transform: scaleX(0);
          transform-origin: left;
          transition: var(--transition);
        }
        .course-card:hover {
          border-color: rgba(0,188,212,0.3);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          transform: translateY(-6px);
        }
        .course-card:hover::after { transform: scaleX(1); }

        /* Logo wrap */
        .course-logo-wrap {
          width: 60px; height: 60px;
          background: rgba(255,255,255,0.05);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          padding: 10px;
          transition: var(--transition);
        }
        .course-card:hover .course-logo-wrap {
          background: rgba(0,188,212,0.1);
          border-color: rgba(0,229,255,0.2);
        }
        .course-logo-img {
          width: 100%; height: 100%;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3));
        }

        /* MERN mini stack inside card header */
        .mern-stack-row {
          display: flex;
          gap: 6px;
          align-items: center;
          margin-bottom: 18px;
        }
        .mern-logo {
          width: 28px; height: 28px;
          object-fit: contain;
          background: rgba(255,255,255,0.05);
          border-radius: 7px;
          padding: 4px;
          border: 1px solid rgba(255,255,255,0.07);
          filter: drop-shadow(0 1px 4px rgba(0,0,0,0.3));
        }
        .mern-plus {
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          font-weight: 600;
        }

        .course-name {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          color: var(--color-white);
          margin-bottom: 10px;
        }
        .course-meta {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }
        .course-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.3px;
        }
        .tag-duration {
          background: rgba(0,229,255,0.08);
          color: var(--color-accent);
          border: 1px solid rgba(0,229,255,0.15);
        }
        .tag-mode {
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .course-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.42);
          line-height: 1.7;
          flex: 1;
          margin-bottom: 20px;
        }
        .enroll-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: transparent;
          border: 1.5px solid rgba(0,188,212,0.28);
          color: var(--color-primary);
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          font-family: var(--font-body);
        }
        .enroll-btn:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .hackathon-banner { flex-direction: column; padding: 24px 20px; }
          .hackathon-cta { width: 100%; }
          .hackathon-btn { width: 100%; text-align: center; }
          .internship-banner { flex-direction: column; text-align: center; padding: 20px; }
          .internship-btn { width: 100%; }
        }
        @media (max-width: 600px) {
          .courses-grid { grid-template-columns: 1fr; }
          .hackathon-title { font-size: 18px; }
        }
      `}</style>

      <section className="programs" id="programs">
        <div className="programs-bg" />
        <div className="container">

          {/* Section header */}
          <div className="programs-header">
            <span className="section-tag">Our Programs</span>
            <h2 className="section-title">Industry-Aligned <span className="accent">Courses</span></h2>
            <p className="programs-subtitle">Designed by working IT professionals. Taught in Tamil & English for maximum clarity.</p>
          </div>


          {/* Course cards grid */}
          <div className="courses-grid">
            {courses.map((c, i) => (
              <div className="course-card" key={i}>
                {c.stackLogos ? (
                  <div className="mern-stack-row">
                    {c.stackLogos.map((s, j) => (
                      <React.Fragment key={j}>
                        <img src={s.src} alt={s.label} className="mern-logo" />
                        {j < c.stackLogos.length - 1 && <span className="mern-plus">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="course-logo-wrap">
                    <img src={c.logo} alt={c.name} className="course-logo-img" />
                  </div>
                )}
                <div className="course-name">{c.name}</div>
                <div className="course-meta">
                  {/* <span className="course-tag tag-duration">duration</span> */}
                  <span className="course-tag tag-mode">{c.mode}</span>
                </div>
                <p className="course-desc">{c.desc}</p>
                <button className="enroll-btn" onClick={scrollToContact}>
                  Enroll Now →
                </button>
              </div>
            ))}
          </div>
          <div className="opportunity-wrap" style={{ marginTop: '20px' }}>

            {/* Hackathon highlight */}
            <div className="hackathon-banner">
              <div className="hackathon-glow" />
              <div className="hackathon-left">
                <div className="hackathon-icon">🏆</div>
                <div>
                  <div className="hackathon-badge">
                    <span className="hackathon-dot" />
                    Live & Offline Event
                  </div>
                  <div className="hackathon-title">
                    Student <span>Hackathon</span> — Build | Compete | Win
                  </div>
                  <div className="hackathon-sub">
                    We're conducting an exclusive Hackathon for students enrolled in our Full Stack &amp; Package courses.
                    Solve real-world problems, showcase your skills, and win exciting prizes.
                  </div>
                  <div className="hackathon-pills">
                    <span className="hackathon-pill hl">Full Stack Courses</span>
                    <span className="hackathon-pill hl">Package Courses</span>
                    <span className="hackathon-pill">Individual & Team-based</span>
                    <span className="hackathon-pill">Real Projects</span>
                    <span className="hackathon-pill">Prizes &amp; Certificates</span>
                  </div>
                </div>
              </div>
              {/* <div className="hackathon-cta">
              <button className="hackathon-btn" onClick={scrollToContact}>Register Now →</button>
              <span className="hackathon-note">Open to enrolled students only</span>
            </div> */}
            </div>

            {/* Internship opportunity — enhanced */}
            <div className="internship-banner">
              <div className="internship-glow" />
              <div className="internship-left">
                <div className="internship-icon-box">💼</div>
                <div>
                  <div className="internship-label">For Top Performers</div>
                  <div className="internship-title">
                    <span>Internship</span> Opportunity
                  </div>
                  <div className="internship-sub">
                    Selected students will be offered internship placements with hands-on exposure to real IT industry projects and professional mentorship.
                  </div>
                  <div className="internship-stats">
                    <span className="internship-stat accent-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      3 – 6 Months Duration
                    </span>
                    <span className="internship-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Online
                    </span>
                    <span className="internship-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Certificate Provided
                    </span>
                    <span className="internship-stat">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                      Live Projects
                    </span>
                  </div>
                </div>
              </div>
              <div className="internship-right">
                <div className="internship-duration-badge">
                  <div className="internship-duration-num">3–6</div>
                  <div className="internship-duration-label">Months</div>
                </div>
                <button className="internship-btn" onClick={scrollToContact}>Apply Now →</button>
              </div>
            </div>

          </div>
        </div>


      </section>
    </>
  );
}