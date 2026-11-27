"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Award, Layers, MapPin, ShieldCheck } from "lucide-react";
import StoryIdentity from "./StoryIdentity";
import StoryContent from "./StoryContent";
import StoryMetricCard, { type StoryMetric } from "./StoryMetricCard";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const STATS: StoryMetric[] = [
  {
    id: "projects",
    icon: Layers,
    value: 1500,
    suffix: "+",
    label: "Projects delivered",
    accent: "pink",
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
    accent: "teal",
  },
  {
    id: "offices",
    icon: MapPin,
    value: 2,
    label: "Offices · Hyderabad & USA",
    accent: "amber",
  },
];

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2, margin: "-36px 0px" });
  const reduced = useReducedMotion() === true;
  const visible = inView || reduced;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="our-story-heading"
    >
      <div className={styles.wrap}>
        <motion.header
          className={styles.headingBlock}
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease }}
        >
          <h2 id="our-story-heading" className={styles.heading}>
            <span className={styles.headingText}>OUR STORY</span>
          </h2>
        </motion.header>

        <motion.div
          className={styles.surface}
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, delay: reduced ? 0 : 0.08, ease }}
        >
          {/* Soft light-blue organic wave backdrop */}
          <svg
            className={styles.waveBg}
            viewBox="0 0 1200 500"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="ourStoryWaveFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d6ecfa" stopOpacity="0.95" />
                <stop offset="52%" stopColor="#e3f2fc" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#edf6fd" stopOpacity="0.92" />
              </linearGradient>
            </defs>
            <path
              d="M0 0 H315 C425 110 565 135 715 72 C855 14 1035 12 1200 135 V420 C1060 470 915 478 790 438 C660 398 515 402 390 476 C280 538 140 520 55 430 C25 398 0 365 0 330 Z"
              fill="url(#ourStoryWaveFill)"
            />
          </svg>

          <div className={styles.layout}>
            <StoryIdentity visible={visible} reduced={reduced} />
            <StoryContent visible={visible} reduced={reduced} />

            <div className={styles.metricsWrap}>
              <ul className={styles.metrics}>
                {STATS.map((metric, index) => (
                  <StoryMetricCard
                    key={metric.id}
                    metric={metric}
                    index={index}
                    visible={visible}
                    reduced={reduced}
                    active={false}
                  />
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
