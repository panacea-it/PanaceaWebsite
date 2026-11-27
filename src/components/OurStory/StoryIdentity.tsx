"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./OurStory.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

type StoryIdentityProps = {
  visible: boolean;
  reduced: boolean;
};

export default function StoryIdentity({ visible, reduced }: StoryIdentityProps) {
  return (
    <motion.div
      className={styles.identity}
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={visible || reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.55, delay: reduced ? 0 : 0.14, ease }}
    >
      <div className={styles.orb}>
        <Image
          src="/logo.png"
          alt="Panacea IT Services"
          fill
          className="object-cover scale-[1.03]"
          sizes="(max-width: 767px) 220px, 260px"
        />
      </div>
    </motion.div>
  );
}
