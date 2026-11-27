"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import OfferingCard from "./OfferingCard";
import { offerings } from "./offeringData";
import styles from "./Offering.module.css";

const HEADING_LINES = [
  { text: "Boost And Lead", accent: false },
  { text: "With", accent: false },
  { text: "Technology", accent: true },
  { text: "Trends", accent: true },
] as const;

const PILLARS = [
  { value: "08+", label: "Core Capabilities" },
  { value: "99.9%", label: "Uptime Architecture" },
  { value: "24/7", label: "Enterprise Delivery" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Offering() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "-80px" });
  const reduced = useReducedMotion() === true;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !inView || hoveredIndex !== null) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % offerings.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reduced, inView, hoveredIndex]);

  const highlightedIndex = hoveredIndex ?? activeIndex;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="offering-heading"
    >
      {/* Architectural dark-navy studio backdrop with subtle motion */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.meshGlowPrimary} />
        <div className={styles.meshGlowSecondary} />
        <div className={styles.gridOverlay} />
        <span className={`${styles.scanLineH} ${styles.scanLineH1}`} />
        <span className={`${styles.scanLineH} ${styles.scanLineH2}`} />
        <span className={styles.scanLineV} />
        <div className={styles.topBeam} />
        <div className={styles.bottomBeam} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.div
            className={styles.eyebrow}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span className={styles.eyebrowDotWrap} aria-hidden="true">
              <span className={styles.eyebrowPing} />
              <span className={styles.eyebrowDot} />
            </span>
            <span>Our Offering</span>
          </motion.div>

          <h2 id="offering-heading" className={styles.heading}>
            {HEADING_LINES.map((line, idx) => (
              <motion.span
                key={line.text}
                className={
                  line.accent
                    ? `${styles.headingLine} ${styles.headingAccent}`
                    : styles.headingLine
                }
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: reduced ? 0 : 0.06 + idx * 0.08,
                  ease: EASE,
                }}
              >
                {line.text}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className={styles.subhead}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: reduced ? 0 : 0.3, ease: EASE }}
          >
            Empowering your digital journey with state-of-the-art engineering and
            design solutions tailored to scale your business in the modern technical era.
          </motion.p>

          <div className={styles.pillarsWrap}>
            <motion.span
              className={styles.pillarsRule}
              aria-hidden="true"
              initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.85, delay: reduced ? 0 : 0.34, ease: EASE }}
            />
            <div className={styles.pillars}>
              {PILLARS.map((pillar, idx) => (
                <motion.div
                  key={pillar.label}
                  className={styles.pillar}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    delay: reduced ? 0 : 0.38 + idx * 0.08,
                    ease: EASE,
                  }}
                >
                  <span className={styles.pillarValue}>{pillar.value}</span>
                  <span className={styles.pillarLabel}>{pillar.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.stage}>
          {/* Precision architectural orbital rings behind the capability matrix */}
          <div className={styles.orbitBackdrop} aria-hidden="true">
            <svg
              className={styles.orbitSvg}
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="offeringArcA" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.85" />
                  <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="offeringArcB" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.75" />
                  <stop offset="55%" stopColor="#2563eb" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="offeringArcC" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.65" />
                  <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>

              <circle
                cx="300"
                cy="300"
                r="272"
                stroke="rgba(148, 197, 255, 0.14)"
                strokeWidth="1"
                strokeDasharray="3 9"
              />
              <circle
                cx="300"
                cy="300"
                r="214"
                stroke="rgba(148, 197, 255, 0.16)"
                strokeWidth="1"
              />
              <circle
                cx="300"
                cy="300"
                r="148"
                stroke="rgba(56, 189, 248, 0.15)"
                strokeWidth="1"
                strokeDasharray="2 7"
              />

              <g className={styles.orbitSpinSlow}>
                <circle
                  cx="300"
                  cy="300"
                  r="272"
                  stroke="url(#offeringArcA)"
                  strokeWidth="2"
                  strokeDasharray="240 1500"
                  strokeLinecap="round"
                />
                <circle cx="300" cy="28" r="4" fill="#bae6fd" />
                <circle cx="300" cy="28" r="11" fill="#38bdf8" opacity="0.22" />
                <circle cx="300" cy="572" r="3" fill="#60a5fa" opacity="0.85" />
              </g>

              <g className={styles.orbitSpinReverse}>
                <circle
                  cx="300"
                  cy="300"
                  r="214"
                  stroke="url(#offeringArcB)"
                  strokeWidth="1.8"
                  strokeDasharray="190 1200"
                  strokeLinecap="round"
                />
                <circle cx="514" cy="300" r="3.5" fill="#7dd3fc" />
                <circle cx="514" cy="300" r="9.5" fill="#38bdf8" opacity="0.2" />
              </g>

              <g className={styles.orbitSpinInner}>
                <circle
                  cx="300"
                  cy="300"
                  r="148"
                  stroke="url(#offeringArcC)"
                  strokeWidth="1.5"
                  strokeDasharray="120 900"
                  strokeLinecap="round"
                />
                <circle cx="152" cy="300" r="2.8" fill="#bae6fd" opacity="0.9" />
              </g>
            </svg>
          </div>

          <div className={styles.grid}>
            {offerings.map((item, index) => (
              <OfferingCard
                key={item.id}
                item={item}
                index={index}
                isActive={!reduced && highlightedIndex === index}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
