import React from 'react';

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Feedbacks', href: '#testimonials' },
  { label: 'Contact Us', href: '#contact' },
];

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.4 11.3a19.79 19.79 0 01-3.07-8.67A2 2 0 012.51 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l1.27-.85a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Footer() {
  const waMsg = encodeURIComponent("Hi LnD! I'm interested in enrolling. Please share more details.");

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAdmin = () => {
    window.dispatchEvent(new CustomEvent('lnd-open-admin'));
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
        .footer-contact-icon {
          width: 28px; height: 28px;
          background: rgba(0,188,212,0.1);
          border: 1px solid rgba(0,188,212,0.15);
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          flex-shrink: 0;
        }
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
          text-decoration: none;
        }
        .footer-wa:hover { background: rgba(37,211,102,0.2); }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 20px 0;
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
        .footer-admin-btn {
          font-size: 11px;
          color: rgba(255,255,255,0.18);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 6px;
          transition: var(--transition);
          font-family: var(--font-body);
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .footer-admin-btn:hover {
          color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.05);
        }
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
                <div className="footer-logo-name">L<span>n</span>D</div>
              </div>
              <div>"Grow Without Limit"</div>
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
                  <div className="footer-contact-icon"><MailIcon /></div>
                  <span>info@lndtraining.in</span>
                </div>
                <div className="footer-contact-item">
                  <div className="footer-contact-icon"><MapPinIcon /></div>
                  <span>Coimbatore, Tamil Nadu, India</span>
                </div>
              </div>
              {/* <a
                href={`https://wa.me/919999999999?text=${waMsg}`}
                target="_blank"
                rel="noreferrer"
                className="footer-wa"
              >
                <WhatsAppIcon />
                WhatsApp Us
              </a> */}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copy">
              © 2026 <strong>LnD</strong>. All Rights Reserved
            </div>
            {/* <button className="footer-admin-btn" onClick={openAdmin} title="Manage student feedbacks">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
              </svg>
              Manage Feedbacks
            </button> */}
          </div>
        </div>
      </footer>
    </>
  );
}
