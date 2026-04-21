import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Feedbacks', href: '#testimonials' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ['about', 'programs', 'why-us', 'testimonials', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = `#${id}`;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          transition: var(--transition);
          padding: 0 0;
        }
        .header.scrolled {
          background: rgba(255,255,255,0.97);
          box-shadow: 0 2px 24px rgba(0,188,212,0.12);
          backdrop-filter: blur(12px);
        }
        .header-inner {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-icon {
          width: 44px; height: 44px;
          background: var(--color-primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .logo-icon::before {
          content: '';
          position: absolute;
          top: -10px; right: -10px;
          width: 30px; height: 30px;
          background: var(--color-accent);
          border-radius: 50%;
          opacity: 0.4;
        }
        /* Default (over dark hero): white text */
        .logo-text {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.5px;
          transition: color 0.28s ease;
        }
        .logo-text .logo-accent { color: var(--color-accent); }
        /* Scrolled: dark text */
        .header.scrolled .logo-text { color: var(--color-dark); }
        .header.scrolled .logo-text .logo-accent { color: var(--color-primary); }

        .nav { display: flex; align-items: center; gap: 4px; }

        /* Default: white nav links on dark hero */
        .nav a {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          padding: 8px 16px;
          border-radius: 8px;
          transition: var(--transition);
          position: relative;
        }
        .nav a:hover {
          color: var(--color-accent);
          background: rgba(255,255,255,0.08);
        }
        .nav a.active {
          color: var(--color-accent);
          background: rgba(255,255,255,0.08);
        }
        .nav a.active::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 50%; transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--color-accent);
        }

        /* Scrolled: muted nav links */
        .header.scrolled .nav a {
          color: var(--color-text-muted);
        }
        .header.scrolled .nav a:hover,
        .header.scrolled .nav a.active {
          color: var(--color-primary-dark);
          background: var(--color-primary-xlight);
        }
        .header.scrolled .nav a.active::after {
          background: var(--color-primary);
        }

        .cta-btn {
          background: var(--color-primary);
          color: var(--color-white) !important;
          padding: 10px 22px !important;
          border-radius: 10px !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          box-shadow: 0 4px 16px rgba(0,188,212,0.35);
          transition: var(--transition);
        }
        .cta-btn:hover {
          background: var(--color-primary-dark) !important;
          background-color: var(--color-primary-dark) !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(0,188,212,0.5) !important;
        }

        /* Hamburger: white by default, dark when scrolled */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          cursor: pointer;
        }
        .hamburger span {
          display: block;
          width: 22px; height: 2px;
          background: rgba(255,255,255,0.9);
          border-radius: 2px;
          transition: var(--transition);
        }
        .header.scrolled .hamburger span { background: var(--color-text-main); }

        .mobile-nav {
          display: none;
          position: fixed;
          top: 72px; left: 0; right: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(16px);
          padding: 16px 24px 24px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.08);
          flex-direction: column;
          gap: 4px;
          z-index: 999;
        }
        .mobile-nav.open { display: flex; }
        .mobile-nav a {
          font-size: 15px;
          font-weight: 500;
          color: var(--color-text-muted);
          padding: 12px 16px;
          border-radius: 10px;
          transition: var(--transition);
        }
        .mobile-nav a:hover, .mobile-nav a.active {
          background: var(--color-primary-xlight);
          color: var(--color-primary-dark);
        }
        @media (max-width: 768px) {
          .nav { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 7l4 4-4 4M11 15h6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="19" cy="12" r="2" fill="#fff"/>
              </svg>
            </div>
            <div className="logo-text">L<span className="logo-accent">n</span>T</div>
          </div>

          <nav className="nav">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.href ? 'active' : ''}
                onClick={(e) => handleNav(e, link.href)}
              >{link.label}</a>
            ))}
            <a href="#contact" className="cta-btn" onClick={(e) => handleNav(e, '#contact')}>
              Enroll Now
            </a>
          </nav>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className={active === link.href ? 'active' : ''}
            onClick={(e) => handleNav(e, link.href)}
          >{link.label}</a>
        ))}
        <a href="#contact" className="cta-btn" style={{textAlign:'center',marginTop:'8px'}} onClick={(e) => handleNav(e, '#contact')}>
          Enroll Now
        </a>
      </nav>
    </>
  );
}
