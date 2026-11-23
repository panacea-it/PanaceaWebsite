"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE, type Award } from "./data";
import styles from "./Awards.module.css";

function BadgeRing({ id }: { id: number }) {
  const goldId = `awardGold-${id}`;
  const coreId = `awardCore-${id}`;
  return (
    <svg viewBox="0 0 120 120" className={styles.badgeRing} aria-hidden>
      <defs>
        <linearGradient id={goldId} x1="16" y1="6" x2="108" y2="114">
          <stop offset="0%" stopColor="#f7ecd0" />
          <stop offset="40%" stopColor="#e8c878" />
          <stop offset="72%" stopColor="#c9a44a" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
        <radialGradient id={coreId} cx="38%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill={`url(#${goldId})`} />
      <circle cx="60" cy="60" r="49" fill="none" stroke="#e8eef8" strokeWidth="1.4" opacity="0.7" />
      <circle cx="60" cy="60" r="44" fill={`url(#${coreId})`} />
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
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
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
        <span className={styles.cardGlow} aria-hidden />
        <span className={styles.cardShine} aria-hidden />

        <div className={styles.cardInner}>
          <div className={`${styles.badgeWrap} ${reduceMotion ? styles.badgeStatic : ""}`}>
            <div className={styles.badgeGlow} aria-hidden />
            <div className={styles.badgeFace}>
              <BadgeRing id={award.id} />
              <Image
                src={award.image}
                alt={`${award.title} medal`}
                fill
                sizes="112px"
                className={styles.badgeImage}
              />
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
