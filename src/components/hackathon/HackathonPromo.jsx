import React from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  CodeIcon,
  CompassIcon,
  LayersIcon,
  TargetIcon,
  RefreshCwIcon,
  GitPullRequestIcon,
  AwardIcon,
  HeadphonesIcon,
  ZapIcon,
  CheckBadgeIcon,
  CalendarIcon,
} from './icons';

const WHY_CHOOSE = [
  { icon: UsersIcon, text: 'All sessions are conducted by Working IT Professionals' },
  { icon: LayersIcon, text: 'Industry Standard Development Practices' },
  { icon: CodeIcon, text: 'Real-world Project Building' },
  { icon: HeadphonesIcon, text: 'Live Mentorship' },
  { icon: CompassIcon, text: 'End-to-End Guidance' },
  { icon: UsersIcon, text: 'Build Team Collaboration' },
  { icon: TargetIcon, text: 'Improve Problem Solving' },
  { icon: RefreshCwIcon, text: 'Learn Agile Development Workflow' },
  { icon: GitPullRequestIcon, text: 'Industry Code Reviews' },
  { icon: ZapIcon, text: 'Hands-on Learning Experience' },
];

const HACKATHON_FEATURES = [
  'Real Industry Problem Statements',
  '24 Hours Coding Experience',
  'Team Collaboration',
  'Live Mentorship',
  'Project Evaluation',
  'Industry Feedback',
  'Career Guidance',
  'Certificate of Participation',
  'Completely FREE',
  'Conducted Every Saturday',
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: 'easeOut' },
  }),
};

export function HackathonPromo({ onRegisterClick }) {
  return (
    <section className="hk-promo" id="hackathon">
      <style>{`
        .hk-promo {
          position: relative;
          overflow: hidden;
          padding: 110px 0;
          background: radial-gradient(circle at 15% 0%, rgba(0,188,212,0.35), transparent 55%),
                      radial-gradient(circle at 85% 100%, rgba(0,229,255,0.3), transparent 55%),
                      linear-gradient(180deg, #042025 0%, #072a30 55%, #04191d 100%);
          color: #e3f8fb;
        }
        .hk-promo-inner {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }
        .hk-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #80f0ff;
          background: rgba(0, 229, 255, 0.12);
          border: 1px solid rgba(0, 229, 255, 0.3);
          padding: 7px 16px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .hk-heading {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 64px;
        }
        .hk-heading h2 {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
          background: linear-gradient(90deg, #ffffff, #80f0ff 60%, #00bcd4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hk-heading p { color: #9fc9cf; font-size: 15.5px; line-height: 1.7; }

        /* Why choose grid */
        .hk-why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 20px;
          margin-bottom: 100px;
        }
        .hk-why-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 26px 22px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .hk-why-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0, 229, 255, 0.45);
          background: rgba(0, 188, 212, 0.08);
        }
        .hk-why-icon {
          width: 46px; height: 46px;
          border-radius: 13px;
          background: linear-gradient(135deg, #0097a7, #00e5ff);
          display: flex; align-items: center; justify-content: center;
          color: #042025;
          margin-bottom: 16px;
        }
        .hk-why-text { font-size: 14.5px; font-weight: 600; line-height: 1.5; color: #e3f8fb; }

        /* Free hackathon highlight */
        .hk-free {
          position: relative;
          border-radius: 32px;
          padding: 56px 48px;
          background: linear-gradient(135deg, rgba(0,151,167,0.32), rgba(0,229,255,0.16));
          border: 1px solid rgba(0,229,255,0.3);
          box-shadow: 0 30px 80px rgba(0,151,167,0.3);
          overflow: hidden;
        }
        .hk-free::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 90% 10%, rgba(255,255,255,0.08), transparent 45%);
          pointer-events: none;
        }
        .hk-free-title {
          font-family: var(--font-display);
          font-size: clamp(24px, 3.4vw, 34px);
          font-weight: 800;
          margin-bottom: 14px;
          position: relative; z-index: 1;
        }
        .hk-free-sub {
          font-size: 15px;
          color: #cdeef2;
          max-width: 620px;
          margin-bottom: 36px;
          line-height: 1.7;
          position: relative; z-index: 1;
        }
        .hk-free-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 14px 24px;
          list-style: none;
          margin-bottom: 44px;
          position: relative; z-index: 1;
        }
        .hk-free-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14.5px;
          font-weight: 500;
          color: #e3f8fb;
        }
        .hk-free-list li svg { color: #34d399; flex-shrink: 0; }

        /* CTA */
        .hk-cta-wrap { text-align: center; position: relative; z-index: 1; }
        .hk-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #00bcd4, #00e5ff);
          color: #042025;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 17px;
          padding: 19px 42px;
          border-radius: 16px;
          box-shadow: 0 16px 44px rgba(0,188,212,0.45);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hk-cta-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 22px 60px rgba(0,229,255,0.6);
        }
        @media (max-width: 720px) {
          .hk-free { padding: 40px 26px; }
        }
      `}</style>

      <div className="hk-promo-inner">
        <div className="hk-heading">
          <span className="hk-eyebrow">Why Choose LnD</span>
          <h2>Learn It the Way Companies Actually Build It</h2>
          <p>Every session, mentor, and hackathon is run by engineers currently shipping production software.</p>
        </div>

        <div className="hk-why-grid">
          {WHY_CHOOSE.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              className="hk-why-card"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="hk-why-icon"><Icon width={22} height={22} /></div>
              <div className="hk-why-text">{text}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="hk-free"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hk-free-title">FREE 24-Hour College Hackathon</div>
          <p className="hk-free-sub">
            We organize FREE hackathons exclusively for colleges — a full 24-hour, real-world
            build sprint mentored end-to-end by working industry professionals.
          </p>

          <ul className="hk-free-list">
            {HACKATHON_FEATURES.map((feature) => (
              <li key={feature}>
                <CheckBadgeIcon width={18} height={18} />
                {feature}
              </li>
            ))}
          </ul>

          <div className="hk-cta-wrap">
            <button type="button" className="hk-cta-btn" onClick={onRegisterClick}>
              <CalendarIcon width={20} height={20} />
              Register Your College
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
