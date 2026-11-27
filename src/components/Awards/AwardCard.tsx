"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, type Award } from "./data";
import styles from "./Awards.module.css";

function BadgeRing({ id, silver }: { id: number; silver: boolean }) {
  const rimId = `awardRim-${id}-${silver ? "s" : "g"}`;
  const coreId = `awardCore-${id}`;
  return (
    <svg viewBox="0 0 120 120" className={styles.badgeRing} aria-hidden>
      <defs>
        {silver ? (
          <linearGradient id={rimId} x1="12" y1="8" x2="108" y2="112">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#cbd5e1" />
            <stop offset="68%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        ) : (
          <linearGradient id={rimId} x1="12" y1="8" x2="108" y2="112">
            <stop offset="0%" stopColor="#fcf0c8" />
            <stop offset="40%" stopColor="#e5be67" />
            <stop offset="72%" stopColor="#b8862b" />
            <stop offset="100%" stopColor="#f3da96" />
          </linearGradient>
        )}
        <radialGradient id={coreId} cx="42%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="52%" stopColor="#12307a" />
          <stop offset="100%" stopColor="#08163b" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="57" fill={`url(#${rimId})`} />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.45" />
      <circle cx="60" cy="60" r="46" fill={`url(#${coreId})`} />
    </svg>
  );
}

export default function AwardCard({
  award,
  index,
  featured,
  reduceMotion,
  lit,
}: {
  award: Award;
  index: number;
  featured: boolean;
  reduceMotion: boolean;
  lit: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.01 : 0.55,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: EASE,
      }}
    >
      <article
        className={`${styles.card} ${featured ? styles.cardFeatured : ""} ${
          lit ? styles.cardLit : ""
        }`}
      >
        <span className={styles.cardTopGlow} aria-hidden />
        <span className={styles.cardShine} aria-hidden />

        <div className={styles.cardInner}>
          <div className={`${styles.badgeWrap} ${reduceMotion ? styles.badgeStatic : ""}`}>
            <div className={styles.badgeGlow} aria-hidden />
            <div className={styles.badgeFace}>
              <BadgeRing id={award.id} silver={featured} />
              <div className={styles.badgeInner}>
                <Image
                  src={award.image}
                  alt={`${award.title} medal`}
                  fill
                  sizes="96px"
                  className={styles.badgeImage}
                />
              </div>
            </div>
          </div>

          <div className={styles.cardContent}>
            <p className={styles.year}>{award.year}</p>
            <span className={styles.categoryChip}>{award.category}</span>
            <h3 className={styles.cardTitle}>{award.title}</h3>
            <p className={styles.cardHighlight}>{award.highlight}</p>
            <p className={styles.cardDesc}>{award.description}</p>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
