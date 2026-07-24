import React from 'react';

/** Placeholder shown while booked dates are being fetched, before the real Saturday grid renders. */
export function SkeletonDatePicker() {
  return (
    <div className="hk-skeleton-grid" aria-hidden="true">
      <style>{`
        .hk-skeleton-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .hk-skeleton-pill {
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(
            100deg,
            rgba(255,255,255,0.05) 30%,
            rgba(255,255,255,0.12) 50%,
            rgba(255,255,255,0.05) 70%
          );
          background-size: 200% 100%;
          animation: hk-shimmer 1.4s ease-in-out infinite;
        }
        @keyframes hk-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="hk-skeleton-pill" />
      ))}
    </div>
  );
}
