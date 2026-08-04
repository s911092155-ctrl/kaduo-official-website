"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useShouldReduceMotion } from "@/components/motion/motion-provider";

type HeroParallaxProps = {
  alt: string;
  children: ReactNode;
  note: string;
  src: string;
};

const mobileQuery = "(max-width: 767px)";

function subscribeToMobileQuery(callback: () => void) {
  const mediaQuery = window.matchMedia(mobileQuery);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getMobileSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}

export function HeroParallax({ alt, children, note, src }: HeroParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    () => false,
  );
  const shouldReduceMotion = useShouldReduceMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isMobile ? -20 : -44],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isMobile ? 1.016 : 1.035],
  );
  const copyY = useTransform(scrollYProgress, [0, 0.72], [0, isMobile ? -8 : -20]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.22]);
  const lightX = useTransform(scrollYProgress, [0, 1], ["-8%", "18%"]);

  return (
    <section ref={ref} className="warm-hero">
      <motion.div
        className="warm-hero__media"
        style={{
          y: shouldReduceMotion ? 0 : imageY,
          scale: shouldReduceMotion ? 1 : imageScale,
        }}
      >
        <Image alt={alt} fill priority sizes="100vw" src={src} />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="warm-hero__light"
        style={{ x: shouldReduceMotion ? 0 : lightX }}
      />
      <div className="warm-hero__veil" />
      <motion.div
        className="warm-hero__copy"
        style={{
          y: shouldReduceMotion ? 0 : copyY,
          opacity: shouldReduceMotion ? 1 : copyOpacity,
        }}
      >
        {children}
      </motion.div>
      <p className="warm-hero__note">{note}</p>
    </section>
  );
}
