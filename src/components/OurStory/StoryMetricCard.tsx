"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export type MetricAccent = "pink" | "blue" | "teal" | "amber";
export type MetricId = "years" | "projects" | "iso" | "offices";

export type StoryMetric = {
  id: MetricId;
  icon: LucideIcon;
  value?: number;
  suffix?: string;
  display?: string;
  label: string;
  accent: MetricAccent;
};

const accentClass: Record<MetricAccent, string> = {
  pink: styles.metricPink,
  blue: styles.metricBlue,
  teal: styles.metricTeal,
  amber: styles.metricAmber,
};

function CountValue({
  value,
  suffix,
  display,
  visible,
  reduced,
}: {
  value?: number;
  suffix?: string;
  display?: string;
  visible: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: value && value > 200 ? 52 : 70,
    damping: 22,
    mass: 0.6,
  });

  useEffect(() => {
    if (display != null || value == null) return;
    const formatted = (n: number) =>
      `${Math.round(n).toLocaleString("en-US")}${suffix ?? ""}`;

    if (reduced) {
      motionValue.set(value);
      if (ref.current) ref.current.textContent = formatted(value);
      return;
    }
    if (visible) motionValue.set(value);
  }, [display, motionValue, reduced, suffix, value, visible]);

  useEffect(() => {
    if (display != null || value == null) return;
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString("en-US")}${suffix ?? ""}`;
      }
    });
  }, [display, springValue, suffix, value]);

  if (display) return <span className={styles.metricValue}>{display}</span>;

  const finalLabel = `${value?.toLocaleString("en-US") ?? 0}${suffix ?? ""}`;

  return (
    <span className={styles.metricValue} aria-label={finalLabel}>
      <span ref={ref} aria-hidden>
        {reduced ? finalLabel : `0${suffix ?? ""}`}
      </span>
    </span>
  );
}

type StoryMetricCardProps = {
  metric: StoryMetric;
  index: number;
  visible: boolean;
  reduced: boolean;
  active: boolean;
};

export default function StoryMetricCard({
  metric,
  index,
  visible,
  reduced,
  active,
}: StoryMetricCardProps) {
  const Icon = metric.icon;

  return (
    <motion.li
      className={`${styles.metric} ${accentClass[metric.accent]} ${active ? styles.metricActive : ""}`}
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      animate={
        visible || reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
      }
      transition={{
        duration: 0.42,
        delay: reduced ? 0 : 0.24 + index * 0.08,
        ease,
      }}
      tabIndex={0}
    >
      <div className={styles.metricInner}>
        <span className={styles.metricIcon} aria-hidden>
          <Icon size={15} strokeWidth={1.9} />
        </span>
        <CountValue
          value={metric.value}
          suffix={metric.suffix}
          display={metric.display}
          visible={visible}
          reduced={reduced}
        />
        <span className={styles.metricLabel}>{metric.label}</span>
      </div>
    </motion.li>
  );
}
