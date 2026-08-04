"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function ScrollHeader({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 48],
    ["rgba(248, 247, 243, 0)", "rgba(246, 248, 247, 0.9)"],
  );
  const borderColor = useTransform(
    scrollY,
    [0, 48],
    ["rgba(34, 39, 40, 0)", "rgba(34, 39, 40, 0.12)"],
  );

  return (
    <motion.header
      className={`site-header ${isHome ? "site-header--home fixed" : "site-header--inner sticky"} top-0 z-50 border-b backdrop-blur-xl`}
      style={isHome ? { backgroundColor, borderColor } : undefined}
    >
      {children}
    </motion.header>
  );
}
