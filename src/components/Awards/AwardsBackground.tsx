"use client";

import styles from "./Awards.module.css";

function TrophyEmblem({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M21 12h22v7c0 8-5.4 13.8-11 14.6V40h6a1.5 1.5 0 0 1 0 3H26a1.5 1.5 0 0 1 0-3h6v-6.4C26.4 32.8 21 27 21 19v-7Z" />
        <path d="M21 16h-6.5c0 6.8 3.2 10.6 6.5 12.2V16Zm22 0h6.5c0 6.8-3.2 10.6-6.5 12.2V16Z" />
        <path d="M24 46h16l1.2 4.5c.2.8-.4 1.5-1.2 1.5H24c-.8 0-1.4-.7-1.2-1.5L24 46Z" />
      </svg>
    </div>
  );
}

function MedalEmblem({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10l11 18 11-18" />
        <path d="M27 10l5 9 5-9" />
        <circle cx="32" cy="41" r="12" />
        <circle cx="32" cy="41" r="5" fill="currentColor" stroke="none" />
      </svg>
    </div>
  );
}

export default function AwardsBackground({
  active,
}: {
  reduceMotion: boolean;
  active: boolean;
}) {
  return (
    <div className={`${styles.bgCanvas} ${active ? styles.bgActive : ""}`} aria-hidden>
      <div className={styles.bgBase} />
      <div className={styles.bgStardust} />

      {/* Delicate sweeping golden light ribbons on left and right edges */}
      <svg
        className={styles.bgRibbons}
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldRibbonLeft" x1="0%" y1="20%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#f5d98a" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#d4a441" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#d4a441" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="goldRibbonRight" x1="100%" y1="30%" x2="0%" y2="85%">
            <stop offset="0%" stopColor="#f5d98a" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#d4a441" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#d4a441" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-40 190 C120 350 280 430 560 470"
          fill="none"
          stroke="url(#goldRibbonLeft)"
          strokeWidth="1.8"
        />
        <path
          d="M-40 225 C140 385 310 465 620 505"
          fill="none"
          stroke="url(#goldRibbonLeft)"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M1480 230 C1310 380 1120 470 840 530"
          fill="none"
          stroke="url(#goldRibbonRight)"
          strokeWidth="1.6"
        />
        <path
          d="M1480 280 C1300 420 1100 505 790 570"
          fill="none"
          stroke="url(#goldRibbonRight)"
          strokeWidth="1"
          opacity="0.55"
        />
      </svg>

      <TrophyEmblem className={`${styles.sideEmblem} ${styles.sideEmblemLeft}`} />
      <MedalEmblem className={`${styles.sideEmblem} ${styles.sideEmblemRight}`} />

      <div className={styles.bgTopRule} />
      <div className={styles.bgBottomRule} />
    </div>
  );
}
