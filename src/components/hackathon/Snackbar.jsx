import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const SnackbarContext = createContext(null);

let idSeq = 0;

export function SnackbarProvider({ children }) {
  const [items, setItems] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const show = useCallback(
    (message, { variant = 'info', duration = 5000 } = {}) => {
      const id = ++idSeq;
      setItems((prev) => [...prev, { id, message, variant }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <div className="hk-snackbar-stack" role="status" aria-live="polite">
        <style>{`
          .hk-snackbar-stack {
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: min(92vw, 420px);
          }
          .hk-snackbar {
            padding: 14px 18px;
            border-radius: 14px;
            font-size: 13.5px;
            font-weight: 500;
            color: #fff;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.14);
            box-shadow: 0 12px 32px rgba(0,0,0,0.35);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .hk-snackbar.info { background: rgba(7, 42, 48, 0.94); }
          .hk-snackbar.error { background: linear-gradient(135deg, rgba(127,29,29,0.92), rgba(7,42,48,0.92)); }
          .hk-snackbar.success { background: linear-gradient(135deg, rgba(6,78,59,0.92), rgba(0,151,167,0.85)); }
          .hk-snackbar-close {
            background: rgba(255,255,255,0.12);
            border: none;
            color: #fff;
            width: 22px; height: 22px;
            border-radius: 50%;
            font-size: 13px;
            line-height: 1;
            cursor: pointer;
            flex-shrink: 0;
          }
        `}</style>
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`hk-snackbar ${item.variant}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.22 }}
            >
              <span>{item.message}</span>
              <button
                type="button"
                className="hk-snackbar-close"
                aria-label="Dismiss notification"
                onClick={() => dismiss(item.id)}
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used within a SnackbarProvider');
  return ctx;
}
