import React, { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    course: 'Java',
    tagline: 'Build powerful backend systems',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    color: '#e65c00',
    bg: 'linear-gradient(135deg, #042025 60%, #073a45 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', label: 'Java' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg', label: 'Spring' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg', label: 'Maven' },
    ],
  },
  {
    course: 'Python',
    tagline: 'From basics to data science',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3ec6a0',
    bg: 'linear-gradient(135deg, #042025 60%, #063328 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', label: 'Python' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', label: 'NumPy' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', label: 'Pandas' },
    ],
  },
  {
    course: 'C Programming',
    tagline: 'Master the foundation of programming',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    color: '#7986cb',
    bg: 'linear-gradient(135deg, #042025 60%, #1a1a3e 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', label: 'C' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', label: 'Linux' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gcc/gcc-original.svg', label: 'GCC' },
    ],
  },
  {
    course: 'C++',
    tagline: 'Object-oriented power in your hands',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    color: '#29b6f6',
    bg: 'linear-gradient(135deg, #042025 60%, #003a50 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', label: 'C++' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg', label: 'CMake' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', label: 'Linux' },
    ],
  },
  {
    course: 'AI & ML',
    tagline: 'Step into the future of intelligence',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    color: '#ab47bc',
    bg: 'linear-gradient(135deg, #042025 60%, #2a0a30 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', label: 'TensorFlow' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', label: 'PyTorch' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', label: 'Python' },
    ],
  },
  {
    course: 'App Development',
    tagline: 'Create apps for Android & iOS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
    color: '#26c6da',
    bg: 'linear-gradient(135deg, #042025 60%, #003f45 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', label: 'Flutter' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React Native' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg', label: 'Dart' },
    ],
  },
  {
    course: 'MERN Stack',
    tagline: 'Full-stack web development, end to end',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#66bb6a',
    bg: 'linear-gradient(135deg, #042025 60%, #0d2d10 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', label: 'MongoDB' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', label: 'Express' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', label: 'React' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', label: 'Node.js' },
    ],
  },
  {
    course: 'SQL',
    tagline: 'Manage and query data like a pro',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    color: '#ffa726',
    bg: 'linear-gradient(135deg, #042025 60%, #2d1a00 100%)',
    stackLogos: [
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', label: 'MySQL' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', label: 'PostgreSQL' },
      { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', label: 'SQLite' },
    ],
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = slides[current];

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          transition: background 0.6s ease;
        }
        .hero-bg-pattern {
          position: absolute; inset: 0; z-index: 0;
          background-image:
            radial-gradient(circle at 20% 50%, rgba(0,229,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0,188,212,0.06) 0%, transparent 50%);
        }
        .hero-grid {
          position: absolute; inset: 0; z-index: 0; opacity: 0.04;
          background-image:
            linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-content {
          position: relative; z-index: 1;
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 120px 24px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
        }
        /* ---- Company branding above course name ---- */
        .hero-company {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }
        .hero-company-logo {
          width: 38px; height: 38px;
          background: var(--color-primary);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,188,212,0.4);
        }
        .hero-company-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.5px;
        }
        .hero-company-name span { color: var(--color-accent); }
        .hero-company-divider {
          width: 1px; height: 18px;
          background: rgba(255,255,255,0.2);
          margin: 0 2px;
        }
        .hero-company-tagline {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-weight: 400;
          letter-spacing: 0.3px;
        }
        /* ---- Badge ---- */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,229,255,0.1);
          border: 1px solid rgba(0,229,255,0.2);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-accent);
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }
        .hero-badge::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--color-accent);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        .hero-course-name {
          font-family: var(--font-display);
          font-size: clamp(44px, 6.5vw, 76px);
          font-weight: 800;
          line-height: 1.05;
          color: var(--color-white);
          margin-bottom: 16px;
          opacity: 1;
          transition: opacity 0.3s ease;
        }
        .hero-course-name.fade { opacity: 0; }
        .hero-course-name .accent { color: var(--color-accent); }
        .hero-tagline {
          font-size: 17px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 36px;
          font-weight: 400;
          opacity: 1;
          transition: opacity 0.3s ease;
          line-height: 1.6;
        }
        .hero-tagline.fade { opacity: 0; }
        .hero-cta-row {
          display: flex;
          gap: 14px;
          align-items: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: var(--color-primary);
          color: var(--color-white);
          padding: 14px 30px;
          border-radius: var(--radius-md);
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.2px;
          transition: var(--transition);
          box-shadow: 0 6px 30px rgba(0,188,212,0.35);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary:hover {
          background: var(--color-primary-dark);
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(0,188,212,0.5);
        }
        .btn-outline {
          border: 1.5px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.8);
          padding: 14px 26px;
          border-radius: var(--radius-md);
          font-size: 15px;
          font-weight: 500;
          transition: var(--transition);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-outline:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background: rgba(0,229,255,0.05);
        }
        .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 48px;
          padding-top: 36px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 800;
          color: var(--color-accent);
        }
        .hero-stat-label {
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-top: 2px;
          font-weight: 500;
        }
        /* ---- Right: slide visual ---- */
        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .slide-visual {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: var(--radius-xl);
          padding: 44px 40px 36px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: opacity 0.3s ease;
        }
        .slide-visual.fade { opacity: 0; }
        .slide-visual::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(0,229,255,0.07) 0%, transparent 70%);
        }
        /* Main course logo */
        .slide-logo {
          width: 96px; height: 96px;
          object-fit: contain;
          margin: 0 auto 20px;
          display: block;
          position: relative; z-index: 1;
          filter: drop-shadow(0 8px 24px rgba(0,0,0,0.4));
          transition: transform 0.3s ease;
        }
        .slide-visual:hover .slide-logo { transform: scale(1.06); }
        .slide-course-label {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--color-white);
          margin-bottom: 6px;
          position: relative; z-index: 1;
        }
        .slide-course-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.42);
          position: relative; z-index: 1;
          margin-bottom: 24px;
        }
        /* Tech stack row */
        .slide-stack {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative; z-index: 1;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .stack-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .stack-logo {
          width: 32px; height: 32px;
          object-fit: contain;
          background: rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 5px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: var(--transition);
        }
        .stack-logo:hover {
          background: rgba(0,229,255,0.1);
          border-color: rgba(0,229,255,0.2);
        }
        .stack-label {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }
        /* Dots + arrows */
        .slide-indicators {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 12px;
        }
        .dot {
          width: 8px; height: 8px;
          border-radius: 4px;
          background: rgba(255,255,255,0.18);
          border: none;
          cursor: pointer;
          transition: var(--transition);
          padding: 0;
        }
        .dot.active {
          width: 24px;
          background: var(--color-primary);
        }
        .slide-arrows {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .arrow-btn {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.7);
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          cursor: pointer;
        }
        .arrow-btn:hover {
          background: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
        @media (max-width: 900px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 100px 24px 60px;
          }
          .hero-right { order: -1; }
          .slide-visual { padding: 32px 24px 28px; }
          .hero-stats { gap: 24px; }
        }
      `}</style>

      <section
        className="hero"
        style={{ background: slide.bg }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="hero-bg-pattern" />
        <div className="hero-grid" />

        <div className="hero-content">
          {/* ---- LEFT ---- */}
          <div className="hero-left">
            {/* Always-visible company branding */}
            <div className="hero-company">
              <div className="hero-company-logo">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 7l4 4-4 4M11 15h6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="19" cy="12" r="2" fill="#fff"/>
                </svg>
              </div>
              <span className="hero-company-name">L<span>n</span>T</span>
              <div className="hero-company-divider" />
              <span className="hero-company-tagline">Learn from Professionals</span>
            </div>

            <div className="hero-badge">8 Industry Courses</div>

            <h1 className={`hero-course-name${animating ? ' fade' : ''}`}>
              Learn <span className="accent">{slide.course}</span>
            </h1>
            <p className={`hero-tagline${animating ? ' fade' : ''}`}>{slide.tagline}</p>

            <div className="hero-cta-row">
              <a href="#contact" className="btn-primary" onClick={scrollToContact}>
                Enroll Now →
              </a>
              <a
                href="#programs"
                className="btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View All Courses
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">500+</div>
                <div className="hero-stat-label">Students Trained</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">8+</div>
                <div className="hero-stat-label">Courses</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">100%</div>
                <div className="hero-stat-label">Placement Support</div>
              </div>
            </div>
          </div>

          {/* ---- RIGHT ---- */}
          <div className="hero-right">
            <div className={`slide-visual${animating ? ' fade' : ''}`}>
              <img
                src={slide.logo}
                alt={slide.course}
                className="slide-logo"
              />
              <div className="slide-course-label">{slide.course}</div>
              <div className="slide-course-sub">{slide.tagline}</div>

              {/* Tech stack row */}
              <div className="slide-stack">
                {slide.stackLogos.map((item, i) => (
                  <div className="stack-item" key={i}>
                    <img src={item.src} alt={item.label} className="stack-logo" />
                    <span className="stack-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="slide-indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === current ? ' active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="slide-arrows">
              <button className="arrow-btn" onClick={prev} aria-label="Previous">←</button>
              <button className="arrow-btn" onClick={next} aria-label="Next">→</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
