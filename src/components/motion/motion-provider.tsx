"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useSyncExternalStore } from "react";
import { MotionConfig, useReducedMotion } from "motion/react";

const ReducedMotionPreviewContext = createContext(false);

function subscribeToPreview(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

function getPreviewSnapshot() {
  return new URLSearchParams(window.location.search).get("reduced-motion") === "1";
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const forceReducedMotion = useSyncExternalStore(
    subscribeToPreview,
    getPreviewSnapshot,
    () => false,
  );

  return (
    <ReducedMotionPreviewContext value={forceReducedMotion}>
      <MotionConfig reducedMotion={forceReducedMotion ? "always" : "user"}>
        {children}
      </MotionConfig>
    </ReducedMotionPreviewContext>
  );
}

export function useShouldReduceMotion() {
  const prefersReducedMotion = useReducedMotion();
  const forceReducedMotion = useContext(ReducedMotionPreviewContext);
  return Boolean(prefersReducedMotion || forceReducedMotion);
}
