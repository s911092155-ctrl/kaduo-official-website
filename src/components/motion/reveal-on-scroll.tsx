"use client";

import type { ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { useShouldReduceMotion } from "@/components/motion/motion-provider";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  scaleFrom?: number;
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  distance = 24,
  scaleFrom = 1,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasHydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -12% 0px",
  });
  const shouldReduceMotion = useShouldReduceMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        !hasHydrated || shouldReduceMotion || isInView
          ? { opacity: 1, y: 0, scaleX: 1 }
          : { opacity: 0, y: distance, scaleX: scaleFrom }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : scaleFrom === 1 ? 0.62 : 0.9,
        delay: shouldReduceMotion ? 0 : Math.min(delay, 0.12),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
