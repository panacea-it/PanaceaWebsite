"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef, type PointerEvent } from "react";
import type { OfferingItem } from "./offeringData";
import styles from "./Offering.module.css";

type Props = {
  item: OfferingItem;
  index: number;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function OfferingCard({
  item,
  index,
  isActive,
  onHoverStart,
  onHoverEnd,
}: Props) {
  const reduced = useReducedMotion() === true;
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = item.Icon;

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (reduced || event.pointerType !== "mouse") return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    },
    [reduced],
  );

  return (
    <motion.div
      className={styles.cardWrap}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.58,
        delay: reduced ? 0 : 0.08 + index * 0.06,
        ease: EASE,
      }}
    >
      <motion.div
        ref={cardRef}
        className={isActive ? `${styles.card} ${styles.cardActive}` : styles.card}
        onPointerMove={handlePointerMove}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        tabIndex={0}
        role="article"
        aria-label={`${item.title} — ${item.subtitle}`}
      >
        <span className={styles.cardSpotlight} aria-hidden="true" />
        <span className={styles.cardSheen} aria-hidden="true" />
        <span className={styles.cardTopAccent} aria-hidden="true" />

        <div className={styles.cardHeader}>
          <span className={styles.cardDotWrap} aria-hidden="true">
            <span className={styles.cardDotPing} />
            <span className={styles.cardDot} />
          </span>
        </div>

        <div className={styles.iconStage} aria-hidden="true">
          <Icon size={24} className={styles.iconGlyph} />
        </div>

        <div className={styles.cardText}>
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <span className={styles.cardSubtitle}>{item.subtitle}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
