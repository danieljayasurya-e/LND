import React from 'react';

const courses = [
  {
    name: 'Java',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    duration: '8 Weeks',
    mode: 'Online & Offline',
    desc: 'Build powerful backend systems with Java — OOP, collections, multithreading, and real-world enterprise projects.',
  },
  {
    name: 'Python',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    duration: '6 Weeks',
    mode: 'Online & Offline',
    desc: 'Learn Python from scratch — variables, loops, functions, file handling, and mini-projects guided by industry professionals.',
  },
  {
    name: 'C Programming',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    duration: '4 Weeks',
    mode: 'Offline',
    desc: 'Master the foundation of all programming. Pointers, memory management, and problem-solving with C.',
  },
  {
    name: 'C++',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    duration: '6 Weeks',
    mode: 'Online & Offline',
    desc: 'Object-oriented programming, STL, data structures, and real-world system design with C++.',
  },
  {
    name: 'AI & ML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    duration: '10 Weeks',
    mode: 'Online & Offline',
    desc: 'Step into the future — machine learning algorithms, neural networks, Python-based ML projects, and industry case studies.',
  },
  {
    name: 'App Development',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    duration: '10 Weeks',
    mode: 'Online & Offline',
    desc: 'Create apps for Android & iOS. React Native or Flutter, APIs, UI/UX fundamentals, and app store deployment.',
  },
  {
    name: 'MERN Stack',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    duration: '12 Weeks',
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
          margin-bottom: 56px;
          position: relative;
        }
        .programs-header .section-title { color: var(--color-white); }
        .programs-subtitle {
          font-size: 16px;
          color: rgba(255,255,255,0.48);
          margin-top: 12px;
        }
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
        .internship-banner {
          margin-top: 40px;
          background: linear-gradient(135deg, rgba(0,188,212,0.12), rgba(0,229,255,0.06));
          border: 1.5px solid rgba(0,229,255,0.2);
          border-radius: var(--radius-lg);
          padding: 28px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          position: relative;
          z-index: 1;
        }
        .internship-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--color-white);
          margin-bottom: 6px;
        }
        .internship-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.48);
        }
        .internship-btn {
          background: var(--color-primary);
          color: white;
          padding: 12px 28px;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          font-family: var(--font-body);
        }
        .internship-btn:hover {
          background: var(--color-primary-dark);
          transform: translateY(-1px);
        }
        @media (max-width: 1100px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .courses-grid { grid-template-columns: 1fr; }
          .internship-banner { flex-direction: column; text-align: center; }
        }
      `}</style>

      <section className="programs" id="programs">
        <div className="programs-bg" />
        <div className="container">
          <div className="programs-header">
            <span className="section-tag">Our Programs</span>
            <h2 className="section-title">8 Industry-Aligned <span className="accent">Courses</span></h2>
            <p className="programs-subtitle">Designed by working IT professionals. Taught in Tamil for maximum clarity.</p>
          </div>

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
                  <span className="course-tag tag-duration">⏱ {c.duration}</span>
                  <span className="course-tag tag-mode">{c.mode}</span>
                </div>
                <p className="course-desc">{c.desc}</p>
                <button className="enroll-btn" onClick={scrollToContact}>
                  Enroll Now →
                </button>
              </div>
            ))}
          </div>

          <div className="internship-banner">
            <div>
              <div className="internship-title">🚀 Internship Opportunity</div>
              <div className="internship-sub">Selected students will be offered internship placements with real project exposure in the IT industry.</div>
            </div>
            <button className="internship-btn" onClick={scrollToContact}>
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
