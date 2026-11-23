"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useCallback, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import type { OfferingItem } from "./offeringData";
import styles from "./Offering.module.css";

type Ripple = { id: number; x: number; y: number };

type Props = {
  item: OfferingItem;
  index: number;
};

export default function OfferingCard({ item, index }: Props) {
  const reduced = useReducedMotion() === true;
  const cardRef = useRef<HTMLButtonElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 240, damping: 22, mass: 0.5 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 240, damping: 22, mass: 0.5 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const Icon = item.Icon;

  const resetTilt = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -16);
    rotateY.set(px * 18);
  };

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next: Ripple = {
      id: event.timeStamp,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    setRipples((prev) => [...prev.slice(-3), next]);
  };

  return (
    <motion.div
      className={styles.cardEntrance}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        delay: reduced ? 0 : 0.12 + index * 0.06,
        duration: reduced ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className={styles.cardFloat}
        style={{
          animationDelay: reduced ? undefined : `calc(${item.floatDelay} + 0.7s)`,
        }}
      >
        <motion.button
          ref={cardRef}
          type="button"
          className={styles.card}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 900,
          }}
          onPointerMove={onPointerMove}
          onPointerLeave={resetTilt}
          onPointerCancel={resetTilt}
          onClick={onClick}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          aria-label={`${item.title} service`}
        >
          <span className={styles.cardGlow} aria-hidden />
          <span className={styles.iconStage} aria-hidden>
            <span className={styles.iconShadow}>
              <Icon size={26} />
            </span>
            <span className={styles.iconGlyph}>
              <Icon size={26} />
            </span>
          </span>
          <span className={styles.cardTitle}>{item.title}</span>
          <span className={styles.rippleLayer} aria-hidden>
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className={styles.ripple}
                style={{ left: ripple.x, top: ripple.y }}
                onAnimationEnd={() =>
                  setRipples((prev) => prev.filter((itemRipple) => itemRipple.id !== ripple.id))
                }
              />
            ))}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
