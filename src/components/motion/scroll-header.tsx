"use client";

import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

export function ScrollHeader({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 48;
    setIsScrolled((current) =>
      current === nextScrolled ? current : nextScrolled,
    );
  });

  return (
    <motion.header
      className={`site-header ${isHome ? "site-header--home fixed" : "site-header--inner sticky"} ${isScrolled ? "site-header--scrolled" : ""} top-0 z-50 border-b`}
    >
      {children}
    </motion.header>
  );
}
