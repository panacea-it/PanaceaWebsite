"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "./productData";
import ProductCard from "./ProductCard";
import AmbientParticles from "@/components/fx/AmbientParticles";
import styles from "./productShowcase.module.css";

const HoloScene = dynamic(() => import("@/components/fx/HoloScene"), {
  ssr: false,
});

const EASE = [0.22, 0.9, 0.32, 1] as const;
const DURATION = 0.8;
const AUTO_SCROLL_MS = 3000;

function useAutoScroll(length: number, paused: boolean) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (length === 0) return;
      setIndex(((next % length) + length) % length);
    },
    [length]
  );

  useEffect(() => {
    if (paused || length < 2) return undefined;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % length);
    }, AUTO_SCROLL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, length]);

  return { index, goTo };
}

type Breakpoint = "mobile" | "tablet" | "desktop";

function wrappedOffset(index: number, active: number, total: number) {
  if (total <= 0) return 0;
  let diff = index - active;
  const half = total / 2;
  if (diff > half) diff -= total;
  if (diff < -half) diff += total;
  return diff;
}

function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(min-width: 1100px)").matches) return "desktop";
  if (window.matchMedia("(min-width: 768px)").matches) return "tablet";
  return "mobile";
}

function getPose(
  offset: number,
  sceneW: number,
  bp: Breakpoint,
  reduce: boolean
) {
  const abs = Math.abs(offset);
  const hidden = abs > 1;

  if (reduce) {
    return {
      x: 0,
      z: 0,
      rotateY: 0,
      scale: offset === 0 ? 1 : 0.98,
      opacity: offset === 0 ? 1 : 0,
      zIndex: offset === 0 ? 12 : 1,
      hidden: offset !== 0,
    };
  }

  const angleStep = bp === "tablet" ? 26 : 30;
  const radius =
    bp === "tablet" ? Math.max(sceneW * 0.5, 240) : Math.max(sceneW * 0.48, 320);
  const travel = bp === "tablet" ? sceneW * 0.5 : sceneW * 0.58;
  const angle = offset * angleStep;
  const rad = (angle * Math.PI) / 180;
  const perspective = bp === "tablet" ? 1100 : 1320;

  if (hidden) {
    return {
      x: Math.sign(offset) * travel * 1.18,
      z: -260,
      rotateY: -angle * 0.75,
      scale: 0.56,
      opacity: 0,
      zIndex: 0,
      hidden: true,
      perspective,
    };
  }

  const x = offset === 0 ? 0 : Math.sign(offset) * travel;
  const z =
    offset === 0 ? 80 : (Math.cos(rad) - 1) * radius - abs * 64;
  const rotateY = -angle * 0.72;
  const scale = offset === 0 ? 1 : abs === 1 ? 0.72 : 0.58;
  const opacity = offset === 0 ? 1 : abs === 1 ? 0.5 : 0;

  return {
    x,
    z,
    rotateY,
    scale,
    opacity,
    zIndex: 24 - abs * 6,
    hidden: false,
    perspective,
  };
}

export default function ProductStack() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hoverLock = useRef(false);
  const pointerX = useRef<number | null>(null);
  const swipedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [bp, setBp] = useState<Breakpoint>("desktop");
  const [sceneW, setSceneW] = useState(1200);
  const [entered, setEntered] = useState(false);
  const count = products.length;
  const stackMode = bp === "mobile";
  const { index, goTo } = useAutoScroll(count, paused || stackMode);
  const sceneInView = useInView(sceneRef, { once: true, amount: 0.18 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const washY = useTransform(scrollYProgress, [0, 1], ["7%", "-11%"]);
  const holoY = useTransform(scrollYProgress, [0, 1], ["5%", "-9%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["4%", "-7%"]);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const syncPaused = useCallback(() => {
    setPaused(hoverLock.current || document.hidden);
  }, []);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const measure = () => {
      setBp(getBreakpoint());
      if (scene) setSceneW(scene.getBoundingClientRect().width);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (scene) observer.observe(scene);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [stackMode]);

  useEffect(() => {
    if (reduce || sceneInView) setEntered(true);
  }, [reduce, sceneInView]);

  useEffect(() => {
    const onVis = () => {
      setPaused(hoverLock.current || document.hidden);
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    }
    if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest("a, button")) {
      pointerX.current = null;
      return;
    }
    pointerX.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerX.current == null) return;
    const dx = event.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(dx) < 48) return;
    swipedRef.current = true;
    if (dx < 0) goNext();
    else goPrev();
  };

  const activeProduct = products[index];
  const duration = reduce ? 0.35 : DURATION;
  const ease = reduce ? "easeOut" : EASE;

  return (
    <section
      ref={sectionRef}
      id="products"
      className={styles.section}
      aria-labelledby="products-heading"
    >
      <div className={styles.bg} aria-hidden>
        <motion.div className={styles.bgWash} style={{ y: washY }} />
        <div className={styles.grid} />
        <motion.div className={styles.holo} style={{ y: holoY }}>
          <HoloScene lite={bp !== "desktop"} />
        </motion.div>
        <AmbientParticles className={styles.particles} />
        <div className={styles.mesh} />
        <motion.div className={styles.orbLayer} style={{ y: orbY }}>
          <div className={`${styles.glow} ${styles.glowA}`} />
          <div className={`${styles.glow} ${styles.glowB}`} />
          <div className={`${styles.glow} ${styles.glowC}`} />
          <div className={`${styles.orb} ${styles.orbA}`} />
          <div className={`${styles.orb} ${styles.orbB}`} />
          <div className={`${styles.orb} ${styles.orbC}`} />
        </motion.div>
        <div className={`${styles.streak} ${styles.streakA}`} />
        <div className={`${styles.streak} ${styles.streakB}`} />
        <div className={`${styles.streak} ${styles.streakC}`} />
      </div>

      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.servicesLinkWrap}>
            <Link href="/services" className={styles.servicesLink}>
              Go to Services Page &gt;&gt;
            </Link>
          </div>

          <motion.p
            className={styles.eyebrow}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
          >
            Our Offerings
          </motion.p>
          <motion.h2
            id="products-heading"
            className={styles.heading}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: reduce ? 0 : 0.82, ease: EASE }}
          >
            <span className={styles.headingText}>Products That Scale</span>
            <span className={styles.headingSub}>With Your Team</span>
          </motion.h2>
          <span className={styles.rule} aria-hidden />
          <motion.p
            className={styles.lede}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.08, ease: EASE }}
          >
            Purpose-built digital products designed around real business needs — helping
            organizations simplify operations, engage users, and scale with confidence.
          </motion.p>
          <motion.p
            className={styles.grounding}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : 0.16, ease: EASE }}
          >
            Designed from real-world requirements.
          </motion.p>
        </header>
      </div>

      {stackMode ? (
        <div className={styles.stack}>
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className={styles.stackItem}
              initial={
                reduce
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      x: i % 2 === 0 ? -56 : 56,
                      y: 28,
                      rotateY: i % 2 === 0 ? 16 : -16,
                      z: -40,
                    }
              }
              whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, z: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                delay: reduce ? 0 : i * 0.08,
                duration: 0.82,
                ease: EASE,
              }}
              style={{ transformPerspective: 900 }}
            >
              <ProductCard
                product={product}
                index={i}
                isActive
                isNearActive
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={styles.stage}>
          <div
            ref={sceneRef}
            className={styles.scene}
            role="region"
            aria-roledescription="carousel"
            aria-label="Product showcase"
            aria-describedby="products-carousel-live"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              pointerX.current = null;
            }}
            onMouseEnter={() => {
              hoverLock.current = true;
              syncPaused();
            }}
            onMouseLeave={() => {
              hoverLock.current = false;
              syncPaused();
            }}
          >
            <p id="products-carousel-live" className={styles.srOnly} aria-live="polite" aria-atomic="true">
              {activeProduct.title}
            </p>

            <div className={styles.sceneGlow} aria-hidden />
            <div className={styles.reflection} aria-hidden />

            {products.map((product, i) => {
              const offset = wrappedOffset(i, index, count);
              const pose = getPose(offset, sceneW, bp, reduce);
              const isActive = offset === 0;
              const isNear = Math.abs(offset) <= 1;
              const fromLeft = i % 2 === 0;

              return (
                <div
                  key={product.id}
                  className={styles.slot}
                  style={{ zIndex: pose.zIndex }}
                >
                  <motion.div
                    className={styles.slotCard}
                    data-active={isActive ? "true" : "false"}
                    data-side={isActive ? "center" : offset < 0 ? "prev" : "next"}
                    style={{
                      transformPerspective: pose.perspective ?? 1200,
                      transformOrigin: "center center",
                      pointerEvents: pose.hidden ? "none" : "auto",
                    }}
                    initial={
                      reduce
                        ? false
                        : {
                            x: fromLeft ? -140 : 140,
                            y: 36,
                            rotateY: fromLeft ? 28 : -28,
                            z: -90,
                            opacity: 0,
                            scale: 0.86,
                          }
                    }
                    animate={{
                      x: entered || reduce ? pose.x : fromLeft ? -140 : 140,
                      y: entered || reduce ? 0 : 36,
                      z: entered || reduce ? pose.z : -90,
                      rotateY: entered || reduce ? pose.rotateY : fromLeft ? 28 : -28,
                      scale: entered || reduce ? pose.scale : 0.86,
                      opacity: entered || reduce ? pose.opacity : 0,
                    }}
                    transition={{
                      x: { duration, ease },
                      y: { duration, ease },
                      z: { duration, ease },
                      rotateY: { duration, ease },
                      scale: { duration, ease },
                      opacity: { duration: reduce ? duration : 0.55, ease },
                    }}
                    onClick={() => {
                      if (swipedRef.current) {
                        swipedRef.current = false;
                        return;
                      }
                      if (!isActive && !pose.hidden) goTo(i);
                    }}
                  >
                    <ProductCard
                      product={product}
                      index={i}
                      isActive={isActive}
                      isNearActive={isNear && !pose.hidden}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className={styles.nav}>
            <div className={styles.navMeta}>
              <span className={styles.counter} aria-live="polite">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              <div className={styles.progress} aria-hidden>
                {reduce ? (
                  <motion.div
                    className={styles.progressFill}
                    animate={{ scaleX: (index + 1) / count }}
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                ) : (
                  <div
                    key={index}
                    className={`${styles.progressFill} ${styles.progressAuto} ${
                      paused ? styles.progressPaused : ""
                    }`}
                  />
                )}
              </div>
            </div>

            <div className={styles.arrows}>
              <button
                type="button"
                className={styles.arrow}
                onClick={goPrev}
                aria-label="Previous product"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={goNext}
                aria-label="Next product"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
