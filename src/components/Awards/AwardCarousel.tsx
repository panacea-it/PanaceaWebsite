"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import AwardCard from "./AwardCard";
import { AUTO_MS, AWARDS, EASE } from "./data";
import styles from "./Awards.module.css";

const ButterflyAnimation = dynamic(() => import("./ButterflyAnimation"), {
  ssr: false,
});

function wrap(index: number, length: number) {
  return (index + length) % length;
}

const SPARKS = [
  { x: -42, delay: 0, rot: 18, tone: "gold" },
  { x: -18, delay: 0.04, rot: -24, tone: "violet" },
  { x: 8, delay: 0.02, rot: 32, tone: "gold" },
  { x: 28, delay: 0.07, rot: -12, tone: "silver" },
  { x: 48, delay: 0.01, rot: 8, tone: "violet" },
  { x: -56, delay: 0.09, rot: -30, tone: "gold" },
  { x: 62, delay: 0.05, rot: 22, tone: "silver" },
  { x: -8, delay: 0.11, rot: 14, tone: "gold" },
  { x: 16, delay: 0.08, rot: -18, tone: "violet" },
  { x: 0, delay: 0.03, rot: 40, tone: "gold" },
] as const;

export default function AwardCarousel({
  reduceMotion,
  inView,
}: {
  reduceMotion: boolean;
  inView: boolean;
}) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [lit, setLit] = useState<number | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const pointerX = useRef(0);
  const labelId = useId();
  const count = AWARDS.length;

  const go = useCallback((next: number) => {
    setActive(wrap(next, count));
    setLit(null);
  }, [count]);

  useEffect(() => {
    if (reduceMotion || hovered || !inView) return;
    const id = window.setInterval(() => go(active + 1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [active, go, hovered, inView, reduceMotion]);

  const onLand = useCallback((index: number) => {
    queueMicrotask(() => {
      setLit(index);
      setBurstKey((key) => key + 1);
    });
  }, []);

  const offsetOf = (index: number) => {
    let offset = index - active;
    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;
    return offset;
  };

  const playing = inView && !reduceMotion;
  const fromLeft = active % 2 === 0;
  const variant = active % 2 === 0 ? "gold" : "violet";
  const pieces = useMemo(() => SPARKS, []);

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={(event) => {
        pointerX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        const delta = event.clientX - pointerX.current;
        if (delta > 48) go(active - 1);
        if (delta < -48) go(active + 1);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(active - 1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(active + 1);
        }
      }}
      tabIndex={0}
    >
      <p id={labelId} className={styles.srOnly}>
        Awards from 2021 to 2024. Currently showing {AWARDS[active].title}.
      </p>

      <div className={styles.stage} aria-live="polite">
        {AWARDS.map((award, index) => {
          const offset = offsetOf(index);
          const visible = Math.abs(offset) <= 1;
          return (
            <motion.div
              key={award.id}
              className={styles.slide}
              style={{
                zIndex: visible ? 4 - Math.abs(offset) : 0,
                pointerEvents: visible ? "auto" : "none",
                cursor: offset === 0 ? "default" : "pointer",
              }}
              animate={{
                x: `${-50 + offset * 108}%`,
                y: "-50%",
                scale: offset === 0 ? 1 : 0.86,
                opacity: visible ? (offset === 0 ? 1 : 0.62) : 0,
                filter: offset === 0 ? "blur(0px)" : "blur(0.4px)",
              }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.55,
                ease: EASE,
              }}
              aria-hidden={!visible}
              onClick={() => {
                if (offset !== 0) go(index);
              }}
            >
              <AwardCard
                award={award}
                index={index}
                featured={offset === 0}
                reduceMotion={reduceMotion}
                lit={lit === index || (reduceMotion && offset === 0)}
              />
            </motion.div>
          );
        })}

        <ButterflyAnimation
          className={styles.fxLayer}
          cycle={active}
          fromLeft={fromLeft}
          playing={playing}
          reduceMotion={reduceMotion}
          variant={variant}
          onLand={onLand}
        />

        <AnimatePresence>
          {burstKey > 0 && (
            <motion.div
              key={burstKey}
              className={styles.confetti}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden
            >
              {pieces.map((piece, i) => (
                <span
                  key={i}
                  className={`${styles.confettiBit} ${
                    piece.tone === "gold"
                      ? styles.toneGold
                      : piece.tone === "violet"
                        ? styles.toneViolet
                        : styles.toneSilver
                  }`}
                  style={{
                    ["--x" as string]: `${piece.x}px`,
                    ["--delay" as string]: `${piece.delay}s`,
                    ["--rot" as string]: `${piece.rot}deg`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Previous award"
          onClick={() => go(active - 1)}
        >
          ‹
        </button>

        <div className={styles.dots} role="tablist" aria-label="Select award year">
          {AWARDS.map((award, index) => (
            <button
              key={award.id}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`${award.year}: ${award.title}`}
              className={`${styles.dot} ${index === active ? styles.dotActive : ""}`}
              onClick={() => go(index)}
            >
              <span className={styles.dotYear}>{award.year}</span>
              {index === active && !reduceMotion && !hovered && inView && (
                <span className={styles.dotProgress} />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          aria-label="Next award"
          onClick={() => go(active + 1)}
        >
          ›
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={AWARDS[active].id}
          className={styles.liveCaption}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          {AWARDS[active].year} · {AWARDS[active].title}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
