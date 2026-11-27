"use client";

import { motion } from "framer-motion";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

type StoryContentProps = {
  visible: boolean;
  reduced: boolean;
};

export default function StoryContent({ visible, reduced }: StoryContentProps) {
  const reveal = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 10 },
    animate: visible || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
    transition: { duration: 0.45, delay: reduced ? 0 : delay, ease },
  });

  return (
    <div className={styles.content}>
      <motion.p className={styles.copy} {...reveal(0.2)}>
        Panacea IT Services Pvt Ltd is a research-driven technology company
        founded by industry experts with deep expertise in mobile, web, and
        enterprise software for modern businesses worldwide.
      </motion.p>

      <motion.p className={styles.copy} {...reveal(0.3)}>
        Driven by product excellence and a client-first vision, we help startups
        and global brands turn ambitious ideas into reliable digital products —
        combining thoughtful design, modern engineering, and measurable outcomes.
      </motion.p>

      <motion.p className={styles.copy} {...reveal(0.4)}>
        For over a decade, Panacea has stood as a trusted partner from Hyderabad
        to the USA, delivering ISO-certified quality across custom software, SaaS
        platforms, cloud, and digital growth services.
      </motion.p>
    </div>
  );
}
