"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Award, Layers, MapPin, ShieldCheck } from "lucide-react";
import StoryIdentity from "./StoryIdentity";
import StoryContent from "./StoryContent";
import StoryMetricCard, { type StoryMetric } from "./StoryMetricCard";
import StoryJourney, { type JourneyMetricId } from "./StoryJourney";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS: StoryMetric[] = [
  {
    id: "projects",
    icon: Layers,
    value: 1500,
    suffix: "+",
    label: "Projects delivered",
    accent: "violet",
  },
  {
    id: "years",
    icon: Award,
    value: 14,
    suffix: "+",
    label: "Years of excellence",
    accent: "blue",
  },
  {
    id: "iso",
    icon: ShieldCheck,
    display: "ISO",
    label: "Certified IT company",
    accent: "pink",
  },
  {
    id: "offices",
    icon: MapPin,
    value: 2,
    label: "Offices · Hyderabad & USA",
    accent: "teal",
  },
];

const PARTICLES = [
  { top: "16%", left: "10%", size: 4, delay: "0s", dur: "8s", color: "rgba(56,189,248,0.5)" },
  { top: "24%", left: "88%", size: 3, delay: "1.2s", dur: "9s", color: "rgba(129,140,248,0.45)" },
  { top: "68%", left: "7%", size: 3, delay: "0.6s", dur: "7s", color: "rgba(34,211,238,0.4)" },
  { top: "74%", left: "90%", size: 5, delay: "1.8s", dur: "10s", color: "rgba(251,113,133,0.35)" },
  { top: "42%", left: "18%", size: 3, delay: "0.9s", dur: "8s", color: "rgba(56,189,248,0.35)" },
] as const;

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2, margin: "-36px 0px" });
  const reduced = useReducedMotion() === true;
  const visible = inView || reduced;
  const [activeMetric, setActiveMetric] = useState<JourneyMetricId | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 90, damping: 18, mass: 0.4 });
  const my = useSpring(rawY, { stiffness: 90, damping: 18, mass: 0.4 });
  const rotateY = useTransform(mx, [-0.5, 0.5], reduced ? [0, 0] : [-3.2, 3.2]);
  const rotateX = useTransform(my, [-0.5, 0.5], reduced ? [0, 0] : [2.4, -2.4]);
  const glowX = useTransform(mx, [-0.5, 0.5], ["15%", "85%"]);
  const glowY = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);

  const onPointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - rect.left) / rect.width - 0.5);
    rawY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="our-story-heading"
    >
      <div className={styles.bg} aria-hidden>
        <span className={`${styles.blob} ${styles.blobBlue}`} />
        <span className={`${styles.blob} ${styles.blobViolet}`} />
        <span className={`${styles.blob} ${styles.blobPink}`} />
        <span className={`${styles.blob} ${styles.blobCyan}`} />
        <span className={styles.grid} />
        <svg className={styles.arcs} viewBox="0 0 1200 420" fill="none">
          <path d="M80 300C240 120 420 80 620 180C820 280 980 90 1140 140" stroke="url(#storyArcGrad)" strokeWidth="1" opacity="0.45" />
          <path d="M40 180C220 260 480 300 740 160C960 50 1100 220 1180 260" stroke="url(#storyArcGrad)" strokeWidth="1" opacity="0.28" />
          <circle cx="620" cy="180" r="3" fill="#818cf8" opacity="0.55" />
          <circle cx="240" cy="168" r="2.2" fill="#38bdf8" opacity="0.5" />
          <circle cx="980" cy="118" r="2.2" fill="#c084fc" opacity="0.5" />
          <defs>
            <linearGradient id="storyArcGrad" x1="80" y1="300" x2="1140" y2="140">
              <stop stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="0.5" stopColor="#818cf8" stopOpacity="0.7" />
              <stop offset="1" stopColor="#fb7185" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className={styles.particle}
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              ["--delay" as string]: p.delay,
              ["--dur" as string]: p.dur,
              ["--p" as string]: p.color,
            }}
          />
        ))}
      </div>

      <div className={styles.wrap}>
        <motion.header
          className={styles.headingBlock}
          initial={reduced ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={
            visible
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(8px)" }
          }
          transition={{ duration: 0.55, ease }}
        >
          <h2 id="our-story-heading" className={styles.heading}>
            <span className={styles.headingText}>Our Story</span>
          </h2>
          <div className={styles.headingAccent} aria-hidden>
            <motion.span
              className={styles.headingRail}
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.45, delay: reduced ? 0 : 0.16, ease }}
            />
            <motion.span
              className={styles.headingDot}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.35, delay: reduced ? 0 : 0.28, ease }}
            />
            <motion.span
              className={styles.headingRail}
              initial={reduced ? false : { scaleX: 0, opacity: 0 }}
              animate={visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.45, delay: reduced ? 0 : 0.16, ease }}
            />
          </div>
        </motion.header>

        <motion.div
          className={styles.surface}
          initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
          animate={
            visible
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 16, scale: 0.97 }
          }
          style={{ rotateX, rotateY, transformPerspective: 1100 }}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.08, ease }}
          onMouseMove={onPointerMove}
          onMouseLeave={onPointerLeave}
        >
          <motion.span
            className={styles.cursorGlow}
            style={{ left: glowX, top: glowY }}
            aria-hidden
          />

          <div className={styles.layout}>
            <StoryIdentity visible={visible} reduced={reduced} />

            <div className={styles.storyCol}>
              <motion.p
                className={styles.eyebrow}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.4, delay: reduced ? 0 : 0.18, ease }}
              >
                <span className={styles.eyebrowLine} aria-hidden />
                Who we are
              </motion.p>
              <StoryContent visible={visible} reduced={reduced} />
            </div>

            <div className={styles.metricsWrap}>
              <div className={styles.metricsStage}>
                <svg className={styles.net} viewBox="0 0 100 100" aria-hidden>
                  <defs>
                    <linearGradient id="storyNetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#818cf8" stopOpacity="0.45" />
                    </linearGradient>
                  </defs>
                  <line className={styles.netLine} x1="28" y1="28" x2="72" y2="28" />
                  <line className={styles.netLine} x1="28" y1="28" x2="28" y2="72" />
                  <line className={styles.netLine} x1="72" y1="28" x2="72" y2="72" />
                  <line className={styles.netLine} x1="28" y1="72" x2="72" y2="72" />
                  <circle className={styles.netNode} cx="28" cy="28" r="1.6" />
                  <circle className={styles.netNode} cx="72" cy="28" r="1.6" />
                  <circle className={styles.netNode} cx="28" cy="72" r="1.6" />
                  <circle className={styles.netNode} cx="72" cy="72" r="1.6" />
                </svg>
                <ul className={styles.metrics}>
                  {STATS.map((metric, index) => (
                    <StoryMetricCard
                      key={metric.id}
                      metric={metric}
                      index={index}
                      visible={visible}
                      reduced={reduced}
                      active={activeMetric === metric.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <StoryJourney
            visible={visible}
            reduced={reduced}
            activeMetric={activeMetric}
            onHighlight={setActiveMetric}
          />
        </motion.div>
      </div>
    </section>
  );
}
