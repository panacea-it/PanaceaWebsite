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
  AnimatePresence,
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

const EASE = [0.22, 1, 0.36, 1] as const;
const SLIDE_DURATION = 0.65;
const AUTO_SCROLL_MS = 3000;

type SlideState = {
  index: number;
  direction: 1 | -1;
};

function useAutoScroll(length: number, paused: boolean) {
  const [{ index, direction }, setSlide] = useState<SlideState>({
    index: 0,
    direction: 1,
  });

  const goTo = useCallback(
    (next: number, dir: 1 | -1 = 1) => {
      if (length === 0) return;
      setSlide({
        index: ((next % length) + length) % length,
        direction: dir,
      });
    },
    [length]
  );

  const goNext = useCallback(() => {
    if (length === 0) return;
    setSlide((current) => ({
      index: (current.index + 1) % length,
      direction: 1,
    }));
  }, [length]);

  const goPrev = useCallback(() => {
    if (length === 0) return;
    setSlide((current) => ({
      index: (current.index - 1 + length) % length,
      direction: -1,
    }));
  }, [length]);

  useEffect(() => {
    if (paused || length < 2) return undefined;
    const timer = window.setTimeout(() => {
      setSlide((current) => ({
        index: (current.index + 1) % length,
        direction: 1,
      }));
    }, AUTO_SCROLL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, length]);

  return { index, direction, goTo, goNext, goPrev };
}

type Breakpoint = "mobile" | "tablet" | "desktop";

function getBreakpoint(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  if (window.matchMedia("(min-width: 1100px)").matches) return "desktop";
  if (window.matchMedia("(min-width: 768px)").matches) return "tablet";
  return "mobile";
}

const slideVariants = {
  enter: ({ dir, reduce }: { dir: 1 | -1; reduce: boolean }) => ({
    x: reduce ? (dir > 0 ? "18%" : "-18%") : dir > 0 ? "102%" : "-102%",
    opacity: 0.25,
    scale: reduce ? 1 : 0.96,
  }),
  center: {
    x: "0%",
    opacity: 1,
    scale: 1,
  },
  exit: ({ dir, reduce }: { dir: 1 | -1; reduce: boolean }) => ({
    x: reduce ? (dir > 0 ? "-18%" : "18%") : dir > 0 ? "-102%" : "102%",
    opacity: 0,
    scale: reduce ? 1 : 0.96,
  }),
};

export default function ProductStack() {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerX = useRef<number | null>(null);
  const [tabHidden, setTabHidden] = useState(false);
  const [bp, setBp] = useState<Breakpoint>("desktop");
  const count = products.length;
  const stackMode = bp === "mobile";
  const sectionInView = useInView(sectionRef, { amount: 0.2 });
  const paused = tabHidden || !sectionInView;
  const { index, direction, goTo, goNext, goPrev } = useAutoScroll(
    count,
    paused || stackMode
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const washY = useTransform(scrollYProgress, [0, 1], ["7%", "-11%"]);
  const holoY = useTransform(scrollYProgress, [0, 1], ["5%", "-9%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["4%", "-7%"]);

  useLayoutEffect(() => {
    const measure = () => {
      setBp(getBreakpoint());
    };
    measure();
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const onVis = () => {
      setTabHidden(document.hidden);
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
      goTo(0, -1);
    }
    if (event.key === "End") {
      event.preventDefault();
      goTo(count - 1, 1);
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
    if (dx < 0) goNext();
    else goPrev();
  };

  const activeProduct = products[index];
  const duration = reduce ? 0.4 : SLIDE_DURATION;
  const variantCustom = { dir: direction, reduce };

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
                      x: 48,
                      y: 20,
                    }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                delay: reduce ? 0 : i * 0.08,
                duration: 0.65,
                ease: EASE,
              }}
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
          >
            <p id="products-carousel-live" className={styles.srOnly} aria-live="polite" aria-atomic="true">
              {activeProduct.title}
            </p>

            <div className={styles.sceneGlow} aria-hidden />
            <div className={styles.reflection} aria-hidden />

            <AnimatePresence initial={false} custom={variantCustom} mode="popLayout">
              <motion.div
                key={activeProduct.id}
                custom={variantCustom}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration, ease: EASE },
                  opacity: { duration: duration * 0.85, ease: EASE },
                  scale: { duration, ease: EASE },
                }}
                className={styles.slot}
              >
                <div className={styles.slotCard} data-active="true" data-side="center">
                  <ProductCard
                    product={activeProduct}
                    index={index}
                    isActive
                    isNearActive
                  />
                </div>
              </motion.div>
            </AnimatePresence>
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
                    key={`${index}-${paused ? "paused" : "play"}`}
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
