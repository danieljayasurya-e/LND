import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { RocketIcon, CloseIcon } from './icons';

const SESSION_KEY = 'lnd_hackathon_popup_seen';
const SHOW_DELAY_MS = 700;

/**
 * Auto-shown, once-per-browser-session welcome popup introducing LnD and
 * funnelling straight into the registration dialog.
 */
export function WelcomePopup({ onRegisterClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, '1');
  };

  const handleRegister = () => {
    close();
    onRegisterClick();
  };

  const containerRef = useFocusTrap(visible, close);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hk-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
        >
          <style>{`
            .hk-popup-backdrop {
              position: fixed; inset: 0;
              background: radial-gradient(circle at 30% 20%, rgba(0,188,212,0.4), rgba(2,15,20,0.9) 60%);
              backdrop-filter: blur(6px);
              -webkit-backdrop-filter: blur(6px);
              z-index: 9998;
              display: flex; align-items: center; justify-content: center;
              padding: 20px;
            }
            .hk-popup-panel {
              position: relative;
              width: min(560px, 100%);
              max-height: 90vh;
              overflow-y: auto;
              border-radius: 28px;
              padding: 44px 40px 36px;
              background: linear-gradient(160deg, rgba(7, 42, 48, 0.8), rgba(4, 32, 37, 0.9));
              border: 1px solid rgba(0, 229, 255, 0.3);
              box-shadow: 0 30px 90px rgba(0, 151, 167, 0.35), inset 0 1px 0 rgba(255,255,255,0.06);
              color: #e3f8fb;
            }
            .hk-popup-glow {
              position: absolute; top: -80px; right: -60px;
              width: 220px; height: 220px; border-radius: 50%;
              background: radial-gradient(circle, rgba(0,229,255,0.45), transparent 70%);
              pointer-events: none;
              filter: blur(10px);
            }
            .hk-popup-close {
              position: absolute; top: 18px; right: 18px;
              width: 34px; height: 34px;
              display: flex; align-items: center; justify-content: center;
              border-radius: 50%;
              background: rgba(255,255,255,0.08);
              border: 1px solid rgba(255,255,255,0.14);
              color: #cbd5e1;
              transition: all 0.2s ease;
            }
            .hk-popup-close:hover { background: rgba(255,255,255,0.16); color: #fff; }
            .hk-popup-icon-wrap {
              width: 60px; height: 60px;
              border-radius: 18px;
              background: linear-gradient(135deg, #0097a7, #00e5ff);
              display: flex; align-items: center; justify-content: center;
              color: #042025;
              margin-bottom: 22px;
              box-shadow: 0 10px 30px rgba(0,188,212,0.4);
            }
            .hk-popup-title {
              font-family: var(--font-display);
              font-size: clamp(22px, 3vw, 27px);
              font-weight: 800;
              line-height: 1.25;
              margin-bottom: 18px;
              background: linear-gradient(90deg, #fff, #80f0ff);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .hk-popup-body p {
              font-size: 14.5px;
              line-height: 1.75;
              color: #cbd5e1;
              margin-bottom: 14px;
            }
            .hk-popup-actions {
              display: flex;
              align-items: center;
              gap: 18px;
              margin-top: 28px;
              flex-wrap: wrap;
            }
            .hk-popup-cta {
              flex: 1 1 auto;
              background: linear-gradient(135deg, #0097a7, #00e5ff);
              color: #042025;
              font-family: var(--font-display);
              font-weight: 700;
              font-size: 15px;
              padding: 15px 26px;
              border-radius: 14px;
              text-align: center;
              box-shadow: 0 10px 30px rgba(0,188,212,0.35);
              transition: transform 0.25s ease, box-shadow 0.25s ease;
            }
            .hk-popup-cta:hover {
              transform: translateY(-2px);
              box-shadow: 0 16px 40px rgba(0,229,255,0.5);
            }
            .hk-popup-later {
              font-size: 13px;
              color: #7fb8c2;
              text-decoration: underline;
              text-underline-offset: 3px;
              flex-shrink: 0;
            }
            .hk-popup-later:hover { color: #80f0ff; }
            @media (max-width: 520px) {
              .hk-popup-panel { padding: 34px 24px 28px; border-radius: 22px; }
              .hk-popup-actions { flex-direction: column; align-items: stretch; }
            }
          `}</style>

          <motion.div
            ref={containerRef}
            className="hk-popup-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hk-popup-title"
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hk-popup-glow" />

            {/* <button type="button" className="hk-popup-close" aria-label="Close popup" onClick={close}>
              <CloseIcon />
            </button> */}

            {/* <div className="hk-popup-icon-wrap">
              <RocketIcon />
            </div> */}

            <h2 id="hk-popup-title" className="hk-popup-title">
              Bring Industry Experience to Your Campus - <span style={{ color:'rgba(0, 229, 255, 0.3)', fontWeight:'bold' }}>FREE 24 Hours Hackathon</span>
            </h2>

            <div className="hk-popup-body space-y-5 text-slate-300 leading-relaxed">
              <p>
                Give your students the opportunity to solve real-world industry problems,
                collaborate in teams, and receive mentorship from experienced IT
                professionals — all through a{" "}
                <span className="font-semibold text-white">FREE 24-hour offline hackathon</span> conducted
                at your college.
              </p>

              {/* What You'll Get */}
              <div>
                <h4 className="font-semibold text-white mb-2">What You'll Get</h4>
                <ul className="space-y-2">
                  {[
                    "Real-world problem statements",
                    "Mentorship from IT professionals",
                    "Industry-standard project evaluation",
                    "End-to-end hackathon management by LnD",
                    "Conducted at your college campus",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ listStyleType: 'disc', marginLeft: '1.2em' }}>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Schedule + Participation */}
              <div className="grid grid-cols-2">
                <div className="rounded-lg bg-white/5 border border-white/10">
                  <p className="text-[10px] uppercase tracking-wide text-slate-400">Schedule Any Saturday (as per college convenience)</p>
                </div>
                <div style={{ display:'flex', gap:4}}>
                  <p className="text-[10px] uppercase tracking-wide text-teal-400" style={{ fontWeight: 'bold' }}>Participation :</p>
                  <p className="text-sm font-medium text-teal-300 mt-0.5">Completely FREE</p>
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="font-semibold text-teal-400 mb-1" style={{ fontWeight: 'bold' }}>Ready to Host?</p>
                <p className="text-sm text-slate-300">
                  Click the <span className="font-bold text-white" style={{ fontWeight:'bold'}}>"Register Your College"</span> button
                  below to book your preferred slot.
                </p>
                <p className="text-xs text-slate-400 mt-2 italic" style={{ fontWeight: 'bold', color:'orange' }}>Limited slots available!</p>
              </div>
            </div>

            <div className="hk-popup-actions">
              <button type="button" className="hk-popup-cta" onClick={handleRegister}>
                Register Your College
              </button>
              <button type="button" className="hk-popup-later" onClick={close}>
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
