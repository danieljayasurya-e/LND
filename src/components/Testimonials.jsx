import React, { useState, useEffect, useRef } from 'react';

// ── Storage ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'lnd_feedbacks';
const STORAGE_VERSION = 'v3';

const INITIAL_FEEDBACKS = [
  { id: 1, name: 'Vignesh', city: 'Coimbatore', rating: 5, course: 'MERN Stack', company: 'Quinbay',
    text: "The sessions were structured perfectly — theory first, then doing it ourselves right away. Within two months of completing the MERN Stack course I got a call from Quinbay, cleared the interview, and joined. The trainers taught us to think like actual developers." },
  { id: 2, name: 'Muthukumar', city: 'Erode', rating: 5, course: 'Java Full Stack', company: 'Zoho',
    text: "The Java Full Stack course gave me the structure I was missing — Spring Boot, REST APIs, real project deployment. Zoho's interviews are tough, but the training prepared me for exactly the kind of questions they ask. I'm now working there as a junior developer." },
  { id: 3, name: 'Jerin', city: 'Salem', rating: 5, course: 'Python Full Stack', company: 'Accenture',
    text: "The trainers are working professionals — they know what companies actually look for. Python Full Stack was practical from day one: real projects, mock interviews, honest feedback. When I appeared for Accenture I felt genuinely prepared and got the offer." },
  { id: 4, name: 'Veerakabilan', city: 'Salem', rating: 5, course: 'Java',
    text: "They first teach the topics and then they tell us to do it on our own computer — that was very good and effective for learning. I've never experienced a class like this before and it was very helpful for me to understand." },
  { id: 5, name: 'Thennarasu', city: 'Coimbatore', rating: 5, course: 'SQL',
    text: "The best part of the SQL training was the hands-on practice. Writing real queries like SELECT, INSERT, UPDATE, and DELETE helped me understand how databases work in a practical way." },
  { id: 6, name: 'Sri Nandhini', city: 'Namakkal', rating: 5, course: 'Python',
    text: "I really enjoyed and was engaged by this session. It is more helpful for current undergraduate students. I didn't expect this kind of experience. This session gave me much more confidence to get placed in a company, and I got a lot of ideas about placements." },
  { id: 7, name: 'Sarumathi Prabakaran', city: 'Coimbatore', rating: 5, course: 'Java',
    text: "The session is very interesting and helpful to gain knowledge needed to get placed in a product-based company." },
  { id: 8, name: 'Venkatesh', city: 'Erode', rating: 5, course: 'Python',
    text: "The trainer's explanation is really excellent. Using real-time examples made it so much easier to understand quickly and follow the flow. Keep it up!" },
  { id: 9, name: 'Dhanyalakshmi', city: 'Thanjavur', rating: 5, course: 'MERN Stack',
    text: "Very nicely handled online. I really liked the approach of combining both theory and practical sessions together, and the way questions raised in class were addressed was great. Thank you!" },
  { id: 10, name: 'Sheema', city: 'Erode', rating: 5, course: 'Python',
    text: "In my experience, their teaching is very understandable and easy to follow. The concepts are explained clearly and simply. Overall everything was good." },
  { id: 11, name: 'Vaishali Vardhini', city: 'Tuticorin', rating: 5, course: 'Java',
    text: "Thank you for the placement tips — they were very helpful for me." },
  { id: 12, name: 'Shanmugapriya', city: 'Thanjavur', rating: 5, course: 'MERN Stack',
    text: "It was really good, a new experience. I've seen other trainers who just teach and leave without caring much about students, but this was really different. All three trainers were good and interacted in a very familiar way. It was very useful for us. Thank you!" },
  { id: 13, name: 'Mathumita', city: 'Coimbatore', rating: 5, course: 'Python',
    text: "The way the trainer explained the concepts made everything very easy to understand." },
  { id: 14, name: 'Dharshini K', city: 'Namakkal', rating: 5, course: 'SQL',
    text: "Learning a language to deal with databases — even without knowing a programming language — felt achievable here. The session made SQL easy to learn and the content was very useful." },
];

function getStored() {
  try {
    const version = localStorage.getItem(STORAGE_KEY + '_version');
    if (version !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY + '_version', STORAGE_VERSION);
      return INITIAL_FEEDBACKS;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_FEEDBACKS;
}
function saveStored(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STORAGE_KEY + '_version', STORAGE_VERSION);
  } catch {}
}

// ── Stars ────────────────────────────────────────────────────────────────
const Stars = ({ count, size = 15 }) => (
  <span style={{ color: '#fbbf24', fontSize: size, letterSpacing: '1px' }}>
    {'★'.repeat(Math.max(1, Math.min(5, count)))}{'☆'.repeat(5 - Math.max(1, Math.min(5, count)))}
  </span>
);

const StarPicker = ({ value, onChange }) => (
  <div style={{ display: 'flex', gap: 4 }}>
    {[1,2,3,4,5].map(n => (
      <button key={n} type="button" onClick={() => onChange(n)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
          fontSize: 22, color: n <= value ? '#fbbf24' : 'rgba(255,255,255,0.2)', transition: '0.15s' }}>★</button>
    ))}
  </div>
);

// ── Admin Panel ──────────────────────────────────────────────────────────
const EMPTY_FORM = { name: '', city: '', rating: 5, course: '', text: '' };

function AdminPanel({ feedbacks, onClose, onSave }) {
  const [list, setList] = useState(feedbacks);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const startAdd = () => { setForm(EMPTY_FORM); setEditing('new'); };
  const startEdit = (fb) => { setForm({ name: fb.name, city: fb.city, rating: fb.rating, course: fb.course || '', text: fb.text }); setEditing(fb.id); };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY_FORM); };

  const saveEdit = () => {
    if (!form.name.trim() || !form.text.trim()) return;
    let updated;
    if (editing === 'new') updated = [{ ...form, id: Date.now() }, ...list];
    else updated = list.map(fb => fb.id === editing ? { ...fb, ...form } : fb);
    setList(updated); onSave(updated); cancelEdit();
  };

  const doDelete = () => {
    const updated = list.filter(fb => fb.id !== deleteConfirm);
    setList(updated); onSave(updated); setDeleteConfirm(null);
  };

  return (
    <>
      <style>{`
        .adm-overlay { position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.65);backdrop-filter:blur(4px);display:flex;justify-content:flex-end; }
        .adm-panel { width:420px;max-width:100vw;height:100vh;background:#17212b;display:flex;flex-direction:column;box-shadow:-8px 0 48px rgba(0,0,0,0.5);font-family:var(--font-body); }
        .adm-header { background:#242f3d;padding:0 16px;height:60px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,0.06); }
        .adm-header-left { display:flex;align-items:center;gap:12px; }
        .adm-avatar { width:38px;height:38px;background:linear-gradient(135deg,#00bcd4,#00e5ff);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#042025; }
        .adm-title { font-weight:700;font-size:15px;color:#fff;line-height:1.2; }
        .adm-subtitle { font-size:12px;color:rgba(255,255,255,0.4); }
        .adm-close-btn { background:none;border:none;cursor:pointer;color:rgba(255,255,255,0.5);padding:8px;border-radius:50%;transition:0.2s;display:flex;align-items:center;justify-content:center; }
        .adm-close-btn:hover { background:rgba(255,255,255,0.08);color:#fff; }
        .adm-messages { flex:1;overflow-y:auto;padding:16px 12px;display:flex;flex-direction:column;gap:10px; }
        .adm-messages::-webkit-scrollbar { width:4px; }
        .adm-messages::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1);border-radius:2px; }
        .adm-msg-bubble { background:#2b5278;border-radius:12px 12px 4px 12px;padding:12px 14px;position:relative;transition:0.2s; }
        .adm-msg-bubble:hover { background:#2e5a82; }
        .adm-msg-name { font-size:13px;font-weight:700;color:#6ac7e0;margin-bottom:2px;display:flex;align-items:center;gap:8px; }
        .adm-msg-course { font-size:11px;background:rgba(0,188,212,0.18);color:#00bcd4;padding:1px 7px;border-radius:10px;font-weight:600; }
        .adm-msg-text { font-size:13px;color:rgba(255,255,255,0.82);line-height:1.6;margin:6px 0 8px; }
        .adm-msg-footer { display:flex;align-items:center;justify-content:space-between; }
        .adm-msg-meta { font-size:11px;color:rgba(255,255,255,0.35); }
        .adm-msg-actions { display:flex;gap:6px; }
        .adm-action-btn { background:none;border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.5);border-radius:6px;padding:3px 9px;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:4px;transition:0.15s;font-family:var(--font-body); }
        .adm-action-btn:hover { background:rgba(255,255,255,0.08);color:#fff;border-color:rgba(255,255,255,0.25); }
        .adm-action-btn.del:hover { background:rgba(239,68,68,0.15);color:#f87171;border-color:rgba(239,68,68,0.3); }
        .adm-compose { background:#1c2a3a;border-top:1px solid rgba(255,255,255,0.06);padding:16px;flex-shrink:0; }
        .adm-compose-title { font-size:12px;font-weight:700;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px; }
        .adm-field-row { display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px; }
        .adm-field { margin-bottom:10px; }
        .adm-label { font-size:11px;color:rgba(255,255,255,0.4);margin-bottom:5px;display:block; }
        .adm-input,.adm-textarea { width:100%;background:#242f3d;border:1px solid rgba(255,255,255,0.1);border-radius:8px;color:#fff;padding:9px 12px;font-size:13px;font-family:var(--font-body);outline:none;transition:0.15s;box-sizing:border-box; }
        .adm-input:focus,.adm-textarea:focus { border-color:var(--color-primary);box-shadow:0 0 0 2px rgba(0,188,212,0.15); }
        .adm-textarea { resize:vertical;min-height:80px; }
        .adm-compose-actions { display:flex;gap:8px;justify-content:flex-end;margin-top:12px; }
        .adm-btn { padding:8px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:var(--font-body);transition:0.15s; }
        .adm-btn-primary { background:var(--color-primary);color:#042025; }
        .adm-btn-primary:hover { background:var(--color-accent); }
        .adm-btn-ghost { background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.6);border:1px solid rgba(255,255,255,0.1); }
        .adm-btn-ghost:hover { background:rgba(255,255,255,0.1); }
        .adm-add-row { padding:12px;flex-shrink:0;border-top:1px solid rgba(255,255,255,0.06); }
        .adm-add-btn { width:100%;background:rgba(0,188,212,0.12);border:1.5px dashed rgba(0,188,212,0.3);color:var(--color-primary);border-radius:10px;padding:11px;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:0.15s;font-family:var(--font-body); }
        .adm-add-btn:hover { background:rgba(0,188,212,0.2);border-color:var(--color-primary); }
        .adm-confirm { position:absolute;inset:0;background:rgba(23,33,43,0.95);display:flex;align-items:center;justify-content:center;border-radius:12px;flex-direction:column;gap:12px;padding:20px;z-index:2; }
        .adm-confirm-text { color:#fff;font-size:14px;font-weight:600;text-align:center; }
        .adm-confirm-sub { color:rgba(255,255,255,0.5);font-size:12px;text-align:center; }
        .adm-confirm-btns { display:flex;gap:10px;margin-top:4px; }
        .adm-btn-danger { background:#ef4444;color:#fff; }
        .adm-btn-danger:hover { background:#dc2626; }
        .adm-empty { text-align:center;padding:40px 20px;color:rgba(255,255,255,0.3);font-size:14px; }
      `}</style>
      <div className="adm-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="adm-panel">
          <div className="adm-header">
            <div className="adm-header-left">
              <div className="adm-avatar">LnD</div>
              <div>
                <div className="adm-title">Feedback Manager</div>
                <div className="adm-subtitle">{list.length} feedback{list.length !== 1 ? 's' : ''}</div>
              </div>
            </div>
            <button className="adm-close-btn" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="adm-messages">
            {list.length === 0 && <div className="adm-empty">No feedbacks yet.</div>}
            {list.map(fb => (
              <div className="adm-msg-bubble" key={fb.id} style={{ position: 'relative' }}>
                <div className="adm-msg-name">{fb.name}{fb.course && <span className="adm-msg-course">{fb.course}</span>}</div>
                <div className="adm-msg-text">{fb.text}</div>
                <div className="adm-msg-footer">
                  <div className="adm-msg-meta"><Stars count={fb.rating} size={13} /> &nbsp;{fb.city}</div>
                  <div className="adm-msg-actions">
                    <button className="adm-action-btn" onClick={() => startEdit(fb)}>Edit</button>
                    <button className="adm-action-btn del" onClick={() => setDeleteConfirm(fb.id)}>Delete</button>
                  </div>
                </div>
                {deleteConfirm === fb.id && (
                  <div className="adm-confirm">
                    <div className="adm-confirm-text">Delete this feedback?</div>
                    <div className="adm-confirm-sub">"{fb.name}" — cannot be undone.</div>
                    <div className="adm-confirm-btns">
                      <button className="adm-btn adm-btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                      <button className="adm-btn adm-btn-danger" onClick={doDelete}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {editing !== null ? (
            <div className="adm-compose">
              <div className="adm-compose-title">{editing === 'new' ? 'Add Feedback' : 'Edit Feedback'}</div>
              <div className="adm-field-row">
                <div className="adm-field"><label className="adm-label">Name *</label><input className="adm-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div className="adm-field"><label className="adm-label">City</label><input className="adm-input" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} /></div>
              </div>
              <div className="adm-field-row">
                <div className="adm-field"><label className="adm-label">Course</label><input className="adm-input" value={form.course} onChange={e => setForm(f => ({ ...f, course: e.target.value }))} /></div>
                <div className="adm-field"><label className="adm-label">Rating</label><StarPicker value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} /></div>
              </div>
              <div className="adm-field"><label className="adm-label">Feedback *</label><textarea className="adm-textarea" value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} /></div>
              <div className="adm-compose-actions">
                <button className="adm-btn adm-btn-ghost" onClick={cancelEdit}>Cancel</button>
                <button className="adm-btn adm-btn-primary" onClick={saveEdit} disabled={!form.name.trim() || !form.text.trim()} style={{ opacity: (!form.name.trim() || !form.text.trim()) ? 0.5 : 1 }}>
                  {editing === 'new' ? 'Add' : 'Save'}
                </button>
              </div>
            </div>
          ) : (
            <div className="adm-add-row">
              <button className="adm-add-btn" onClick={startAdd}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add New Feedback
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Testimonial Card ─────────────────────────────────────────────────────
function TCard({ t }) {
  return (
    <div className="t-card">
      <div className="t-quote">"</div>
      {(t.course || t.company) && (
        <div className="t-tags-row">
          {t.course && <span className="t-course-tag">{t.course}</span>}
          {t.company && (
            <span className="t-placed-tag">
              <span className="t-placed-dot" />Placed at {t.company}
            </span>
          )}
        </div>
      )}
      <p className="t-text">{t.text}</p>
      <div className="t-footer">
        <div className="t-avatar">{t.name[0]}</div>
        <div>
          <div className="t-name">{t.name}</div>
          <div className="t-city-row">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {t.city}
          </div>
          <div style={{ marginTop: 3 }}><Stars count={t.rating} /></div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────
export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(getStored);
  const [paused, setPaused] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const handler = () => setShowAdmin(true);
    window.addEventListener('lnd-open-admin', handler);
    return () => window.removeEventListener('lnd-open-admin', handler);
  }, []);

  const handleSave = (updated) => {
    setTestimonials(updated);
    saveStored(updated);
  };

  // Duplicate cards so the marquee loops seamlessly
  const items = [...testimonials, ...testimonials];

  return (
    <>
      <style>{`
        .testimonials {
          padding: var(--section-padding);
          background: var(--color-dark);
          position: relative;
          overflow: hidden;
        }
        .testimonials::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent);
        }
        .testimonials-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% 100%, rgba(0,188,212,0.05) 0%, transparent 60%);
        }
        .testimonials-header {
          text-align: center;
          margin-bottom: 56px;
          position: relative;
          z-index: 1;
        }
        .testimonials-header .section-title { color: var(--color-white); }
        .testimonials-header .section-tag {
          background: rgba(0,229,255,0.08);
          border-color: rgba(0,229,255,0.2);
          color: var(--color-accent);
        }

        /* Marquee track */
        .t-marquee-outer {
          position: relative;
          overflow: hidden;
          /* fade edges */
          mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
        }
        .t-marquee-track {
          display: flex;
          gap: 24px;
          width: max-content;
          animation: marquee-scroll 60s linear infinite;
        }
        .t-marquee-track.paused {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Card */
        .t-card {
          background: var(--color-dark-card);
          border: 1.5px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          width: 320px;
          flex-shrink: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .t-card:hover {
          border-color: rgba(0,188,212,0.3);
          box-shadow: 0 12px 36px rgba(0,0,0,0.4);
        }
        .t-quote {
          font-size: 52px;
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.25;
          font-family: serif;
          position: absolute;
          top: 10px; right: 20px;
        }
        .t-tags-row {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          margin-bottom: 12px;
        }
        .t-course-tag {
          font-size: 10px; font-weight: 700;
          background: rgba(0,188,212,0.1);
          border: 1px solid rgba(0,188,212,0.2);
          color: var(--color-accent);
          padding: 3px 10px; border-radius: 999px;
          text-transform: uppercase; letter-spacing: 0.4px;
        }
        .t-placed-tag {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 10px; font-weight: 700;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          color: #4ade80;
          padding: 3px 10px; border-radius: 999px;
        }
        .t-placed-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #4ade80; flex-shrink: 0;
        }
        .t-text {
          font-size: 13px;
          color: rgba(255,255,255,0.62);
          line-height: 1.8;
          margin-bottom: 20px;
          font-style: italic;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .t-footer {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .t-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 700;
          color: var(--color-dark);
          flex-shrink: 0;
        }
        .t-name { font-weight: 600; color: var(--color-white); font-size: 14px; }
        .t-city-row {
          display: flex; align-items: center; gap: 5px;
          font-size: 12px; color: rgba(255,255,255,0.35); margin-top: 2px;
        }
      `}</style>

      <section className="testimonials" id="testimonials">
        <div className="testimonials-bg" />
        <div className="container">
          <div className="testimonials-header">
            <span className="section-tag">Student Feedbacks</span>
            <h2 className="section-title">Words from Our <span className="accent">Learners</span></h2>
          </div>
        </div>

        {/* Full-width marquee (outside container so it bleeds edge-to-edge) */}
        <div
          className="t-marquee-outer"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={`t-marquee-track${paused ? ' paused' : ''}`}>
            {items.map((t, i) => (
              <TCard key={`${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </section>

      {showAdmin && (
        <AdminPanel
          feedbacks={testimonials}
          onClose={() => setShowAdmin(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}
