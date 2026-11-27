"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Code2,
  Globe,
  Smartphone,
  Cloud,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import styles from "./SoftwareServicesBento.module.css";

type ServiceItem = {
  title: string;
  desc: string;
  icon: LucideIcon;
  accent: string;
  soft: string;
  href: string;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Custom Software",
    desc: "Scalable, secure applications tailored to your business workflows.",
    icon: Code2,
    accent: "#0284c7",
    soft: "rgba(2,132,199,0.1)",
    href: "/services/custom",
  },
  {
    title: "Web Development",
    desc: "Business sites, web apps, SaaS platforms, and e‑commerce builds.",
    icon: Globe,
    accent: "#2563eb",
    soft: "rgba(37,99,235,0.1)",
    href: "/services/web",
  },
  {
    title: "Mobile Apps",
    desc: "Android, iOS, and cross-platform apps for consumer and enterprise.",
    icon: Smartphone,
    accent: "#0891b2",
    soft: "rgba(8,145,178,0.1)",
    href: "/services/mobile",
  },
  {
    title: "IT Consulting",
    desc: "Digital transformation, cloud strategy, and system integration.",
    icon: Cloud,
    accent: "#1d4ed8",
    soft: "rgba(29,78,216,0.1)",
    href: "/services/cloud-consulting",
  },
  {
    title: "AI Solutions",
    desc: "Generative AI, automation tools, and machine learning products.",
    icon: Sparkles,
    accent: "#4f46e5",
    soft: "rgba(79,70,229,0.1)",
    href: "/services/ai-consulting",
  },
  {
    title: "E‑commerce",
    desc: "Custom stores, marketplaces, and seamless payment integrations.",
    icon: ShoppingBag,
    accent: "#0f766e",
    soft: "rgba(15,118,110,0.1)",
    href: "/services",
  },
];

const STATS = [
  { value: 14, suffix: "+", label: "Years Experience" },
  { value: 1500, suffix: "+", label: "Projects Delivered" },
  { value: 20, suffix: "+", label: "Industries Served" },
  { value: null, display: "24/7", label: "Support" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const FLOATERS = [
  { className: styles.floaterDot, style: { top: "18%", left: "6%" }, delay: "0s" },
  { className: styles.floaterPlus, style: { top: "12%", right: "9%" }, delay: "1.2s", text: "+" },
  { className: styles.floaterBrackets, style: { bottom: "28%", left: "4%" }, delay: "0.6s", text: "{ }" },
  { className: styles.floaterOrb, style: { top: "46%", right: "3%" }, delay: "1.8s" },
  { className: styles.floaterGrid, style: { bottom: "18%", right: "8%" }, delay: "0.4s" },
  { className: styles.floaterDot, style: { bottom: "38%", left: "48%" }, delay: "2.1s" },
  { className: styles.floaterPlus, style: { top: "62%", left: "8%" }, delay: "1.4s", text: "✦" },
];

function StatValue({
  value,
  suffix,
  display,
  reduced,
}: {
  value?: number;
  suffix?: string;
  display?: string;
  reduced: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 70, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (display != null || value == null) return;
    if (reduced) {
      motionValue.set(value);
      return;
    }
    if (inView) motionValue.set(value);
  }, [display, inView, motionValue, reduced, value]);

  useEffect(() => {
    if (display != null || value == null) return;
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest).toLocaleString("en-US")}${suffix ?? ""}`;
      }
    });
  }, [display, springValue, suffix, value]);

  if (display) {
    return (
      <span ref={ref} className={styles.statValue}>
        {display}
      </span>
    );
  }

  return (
    <span ref={ref} className={styles.statValue}>
      {reduced ? `${value}${suffix ?? ""}` : `0${suffix ?? ""}`}
    </span>
  );
}

function ServiceCard({
  service,
  reduced,
}: {
  service: ServiceItem;
  reduced: boolean;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0 : 0.45, ease },
        },
      }}
      className="h-full"
    >
      <Link
        href={service.href}
        aria-label={`${service.title} — Explore service`}
        className={styles.card}
        style={
          {
            "--accent": service.accent,
            "--accent-soft": service.soft,
          } as React.CSSProperties
        }
      >
        <span className={styles.cardAccentBar} aria-hidden />

        <div className={styles.cardTop}>
          <span className={styles.iconWrap}>
            <Icon size={20} strokeWidth={1.85} aria-hidden />
          </span>
        </div>

        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.desc}>{service.desc}</p>

        <span className={styles.explore} aria-hidden>
          <span className={styles.exploreLine}>Explore service</span>
          <span className={styles.exploreArrow}>
            <ArrowRight size={14} strokeWidth={2} />
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function SoftwareServicesBento() {
  const reduced = useReducedMotion() === true;
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxOn, setParallaxOn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setParallaxOn(mq.matches && !reduced);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduced]);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 40, damping: 22, mass: 0.5 });
  const my = useSpring(rawY, { stiffness: 40, damping: 22, mass: 0.5 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollShift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-8, 12]);
  const blobY = useTransform([my, scrollShift], ([m, s]) => Number(m) + Number(s));
  const particleX = useTransform(mx, (v) => v * 1.25);
  const particleY = useTransform(blobY, (v) => v * 1.15);

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!parallaxOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    rawX.set(nx * 8);
    rawY.set(ny * 6);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <motion.p
          className={styles.iso}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease }}
        >
          <ShieldCheck size={16} color="#0ea5e9" aria-hidden />
          ISO-Certified Enterprise IT Company
        </motion.p>

        <div className={styles.shell}>
          <motion.div className={styles.blobLayer} style={{ x: mx, y: blobY }} aria-hidden>
            <span className={`${styles.blob} ${styles.blobA}`} />
            <span className={`${styles.blob} ${styles.blobB}`} />
            <span className={`${styles.blob} ${styles.blobC}`} />
            <span className={`${styles.blob} ${styles.blobD}`} />
            <span className={`${styles.blob} ${styles.blobE}`} />
          </motion.div>
          <div className={styles.grain} aria-hidden />

          <motion.div className={styles.floaters} style={{ x: particleX, y: particleY }} aria-hidden>
            {FLOATERS.map((floater, i) => (
              <span
                key={i}
                className={`${styles.floater} ${floater.className}`}
                style={{ ...floater.style, animationDelay: floater.delay }}
              >
                {floater.text}
              </span>
            ))}
          </motion.div>

          <div className={styles.inner}>
            <motion.header
              className={styles.header}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease }}
            >
              <p className={styles.eyebrow}>What we build</p>
              <h2 className={styles.heading}>
                Technology that moves your{" "}
                <span className={styles.gradText}>business forward.</span>
                <motion.span
                  className={styles.headingAccent}
                  aria-hidden
                  initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease }}
                />
              </h2>
              <p className={styles.lead}>
                From custom software to AI-powered products, we build scalable digital
                experiences designed around your business.
              </p>
            </motion.header>

            <motion.div
              className={styles.grid}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
            >
              {SERVICES.map((service) => (
                <ServiceCard key={service.title} service={service} reduced={reduced} />
              ))}
            </motion.div>

            <motion.div
              className={styles.stats}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.15, ease }}
            >
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  {"display" in stat ? (
                    <StatValue display={stat.display} reduced={reduced} />
                  ) : (
                    <StatValue value={stat.value} suffix={stat.suffix} reduced={reduced} />
                  )}
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              className={styles.cta}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, ease }}
            >
              <p className={styles.ctaKicker}>Have a project in mind?</p>
              <p className={styles.ctaTitle}>Let&apos;s build something remarkable together.</p>
              <div className={styles.ctaRow}>
                <div className={styles.primaryWrap}>
                  <span className={styles.primaryGlow} aria-hidden />
                  <Link href="/services" className={styles.primaryBtn}>
                    Explore all services
                    <span className={styles.primaryArrow} aria-hidden>
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                </div>
                <Link href="/contact" className={styles.secondaryBtn}>
                  Talk to an expert
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
