import React from 'react';

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Feedbacks', href: '#testimonials' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Footer() {
  const waMsg = encodeURIComponent("Hi LnT! I'm interested in enrolling. Please share more details.");

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .footer {
          background: #020e10;
          color: rgba(255,255,255,0.6);
          padding: 72px 0 0;
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,188,212,0.4), transparent);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1.5fr;
          gap: 56px;
          margin-bottom: 56px;
        }
        .footer-brand {}
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .footer-logo-icon {
          width: 42px; height: 42px;
          background: var(--color-primary);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-logo-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: white;
          letter-spacing: -0.5px;
        }
        .footer-logo-name span { color: var(--color-accent); }
        .footer-tagline {
          font-style: italic;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 12px;
        }
        .footer-desc {
          font-size: 13px;
          line-height: 1.7;
          color: rgba(255,255,255,0.4);
          max-width: 320px;
        }
        .footer-col-title {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-links a {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          transition: var(--transition);
        }
        .footer-links a:hover { color: var(--color-accent); }
        .footer-contact-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
        }
        .footer-contact-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
        .footer-wa {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(37,211,102,0.1);
          border: 1px solid rgba(37,211,102,0.2);
          color: #25d366;
          padding: 10px 18px;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          transition: var(--transition);
          margin-top: 16px;
          width: fit-content;
        }
        .footer-wa:hover {
          background: rgba(37,211,102,0.2);
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 24px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .footer-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
        }
        .footer-copy strong { color: var(--color-accent); }
        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }
        .footer-bottom-links a {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          transition: var(--transition);
        }
        .footer-bottom-links a:hover { color: rgba(255,255,255,0.6); }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { justify-content: center; text-align: center; }
        }
      `}</style>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M4 7l4 4-4 4M11 15h6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="19" cy="12" r="2" fill="#fff"/>
                  </svg>
                </div>
                <div className="footer-logo-name">L<span>n</span>T</div>
              </div>
              <div className="footer-tagline">"Learn from Professionals. Build for the Real World."</div>
              <p className="footer-desc">
                Bridging the IT skills gap through industry-aligned, Tamil-medium training by active IT professionals.
              </p>
            </div>

            <div>
              <div className="footer-col-title">Quick Links</div>
              <div className="footer-links">
                {quickLinks.map(l => (
                  <a key={l.href} href={l.href} onClick={(e) => scrollTo(e, l.href)}>{l.label}</a>
                ))}
              </div>
            </div>

            <div>
              <div className="footer-col-title">Contact Details</div>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📞</span>
                  <span>+91 99999 99999</span>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📧</span>
                  <span>info@lndtraining.in</span>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📍</span>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
              <a
                href={`https://wa.me/919999999999?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                className="footer-wa"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © 2026 <strong>LnT</strong>. All Rights Reserved. Built with ❤️ in Tamil Nadu.
            </div>
            <div className="footer-bottom-links">
              <a href="#about" onClick={(e) => scrollTo(e, '#about')}>Privacy Policy</a>
              <a href="#about" onClick={(e) => scrollTo(e, '#about')}>Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
