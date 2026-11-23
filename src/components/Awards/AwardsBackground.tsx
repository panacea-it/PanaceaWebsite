"use client";

import { useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PARTICLES } from "./data";
import styles from "./Awards.module.css";

gsap.registerPlugin(useGSAP);

function GlassTrophy({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M20 8h24v7.2c0 8.6-5.8 14.8-12 15.6V36h6.2a1.4 1.4 0 0 1 0 2.8H25.8a1.4 1.4 0 0 1 0-2.8H32v-5.2C25.8 29.9 20 23.8 20 15.2V8Z" />
        <path d="M20 12.5h-7.2c0 7.4 3.6 11.6 7.2 13.4V12.5Zm24 0h7.2c0 7.4-3.6 11.6-7.2 13.4V12.5Z" />
        <path d="M24.5 47h15l-1.6-6.2H26.1L24.5 47Zm-2.2 2.4h19.4c.9 0 1.6.7 1.4 1.6l-1.2 5.2H22.9l-1.2-5.2c-.2-.9.5-1.6 1.4-1.6Z" />
      </svg>
    </div>
  );
}

function GlassMedal({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden>
      <svg viewBox="0 0 64 64" fill="currentColor">
        <path d="M18 6h8.4L32 22 37.6 6H46L36.2 26.5 32 22l-4.2 4.5L18 6Z" />
        <circle cx="32" cy="42" r="14" fill="none" stroke="currentColor" strokeWidth="3.2" />
        <circle cx="32" cy="42" r="7.5" />
      </svg>
    </div>
  );
}

export default function AwardsBackground({
  reduceMotion,
  active,
}: {
  reduceMotion: boolean;
  active: boolean;
}) {
  const pause = reduceMotion ? styles.animOff : "";
  const waveRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (reduceMotion || !waveRef.current) return;
      gsap.to(waveRef.current.querySelectorAll("path"), {
        x: (index) => (index % 2 === 0 ? -48 : 36),
        duration: (index) => 10 + index * 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.35,
      });
    },
    { dependencies: [reduceMotion] }
  );

  return (
    <div className={`${styles.bgCanvas} ${active ? styles.bgActive : ""}`} aria-hidden>
      <div className={styles.bgBase} />
      <div className={`${styles.bgWaves} ${pause}`}>
        <svg ref={waveRef} viewBox="0 0 1440 420" preserveAspectRatio="none">
          <path
            d="M0,260 C240,190 360,330 560,250 C760,170 900,310 1100,230 C1240,176 1360,210 1440,188 L1440,420 L0,420 Z"
            fill="rgba(139,92,246,0.18)"
          />
          <path
            d="M0,300 C220,240 400,360 620,290 C840,220 980,340 1180,270 C1300,228 1380,250 1440,240 L1440,420 L0,420 Z"
            fill="rgba(201,164,74,0.16)"
          />
          <path
            d="M0,340 C260,300 420,380 680,330 C940,280 1080,370 1280,320 C1360,300 1410,310 1440,308 L1440,420 L0,420 Z"
            fill="rgba(37,99,235,0.16)"
          />
        </svg>
      </div>

      <div className={styles.titleSpot} />
      <div className={styles.titleSpotGold} />
      <div className={`${styles.spotBeam} ${styles.spotBeamA} ${pause}`} />
      <div className={`${styles.spotBeam} ${styles.spotBeamB} ${pause}`} />

      <GlassTrophy className={`${styles.glassIcon} ${styles.glassTrophyA} ${pause}`} />
      <GlassMedal className={`${styles.glassIcon} ${styles.glassMedalA} ${pause}`} />
      <GlassTrophy className={`${styles.glassIcon} ${styles.glassTrophyB} ${pause}`} />
      <GlassMedal className={`${styles.glassIcon} ${styles.glassMedalB} ${pause}`} />

      {!reduceMotion && (
        <div className={styles.bgParticles}>
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={`${styles.particle} ${
                p.tone === "gold"
                  ? styles.toneGold
                  : p.tone === "silver"
                    ? styles.toneSilver
                    : styles.toneWhite
              }`}
              style={
                {
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  "--dur": `${p.dur}s`,
                  "--delay": `${p.delay}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
