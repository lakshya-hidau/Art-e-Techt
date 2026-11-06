import React from 'react';

export const ArtLogo = ({ className = 'h-9 w-auto', showWordmark = true, wordmarkClass = '' }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center size-9 rounded-xl bg-void border border-container shadow-[0_6px_20px_color-mix(in srgb, var(--color-primary) 25%, transparent)] flex-shrink-0 group">
        <svg viewBox="0 0 100 100" className="w-6 h-6 transform transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="navCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-primary-hover)" />
            </linearGradient>
            <linearGradient id="navGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-secondary-hover)" />
              <stop offset="100%" stopColor="var(--color-secondary)" />
            </linearGradient>
          </defs>
          <path d="M 22 75 L 22 42 A 28 28 0 0 1 78 42 L 78 75" fill="none" stroke="url(#navGold)" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M 50 18 L 26 74 L 38 74 L 50 44 L 62 74 L 74 74 Z" fill="url(#navCrimson)" />
          <rect x="33" y="56" width="34" height="4.5" rx="2.25" fill="url(#navGold)" />
          <circle cx="50" cy="44" r="3.5" fill="var(--color-text-primary)" />
        </svg>
      </div>

      {showWordmark && (
        <span className={`font-display font-extrabold text-xl tracking-tight text-text-primary dark:text-primary-text ${wordmarkClass}`}>
          Art<span className="text-primary">-e-</span>techt
        </span>
      )}
    </div>
  );
};

export default ArtLogo;
