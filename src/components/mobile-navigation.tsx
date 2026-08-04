"use client";

import {useTranslations} from "next-intl";
import { Suspense, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {LanguageSwitcher} from "@/components/language-switcher";
import {Link} from "@/i18n/navigation";

type NavigationItem = {
  href: string;
  label: string;
};

export function MobileNavigation({ items }: { items: NavigationItem[] }) {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerId = useId();
  const titleId = useId();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerButton = buttonRef.current;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const drawer = drawerRef.current;
    drawer?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !drawer) return;

      const elements = Array.from(
        drawer.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));
      const first = elements[0];
      const last = elements.at(-1);

      if (!first || !last) return;

      if (document.activeElement === drawer) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerButton?.focus();
    };
  }, [isOpen]);

  return (
    <div className="mobile-nav lg:hidden">
      <button
        ref={buttonRef}
        aria-controls={drawerId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="mobile-nav__trigger"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span>{t("menu")}</span>
        <span aria-hidden="true" className="mobile-nav__trigger-icon">
          <i />
          <i />
        </span>
      </button>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {isOpen ? (
                <div className="mobile-nav__layer">
                  <motion.div
                    aria-hidden="true"
                    className="mobile-nav__backdrop"
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
                  />
                  <motion.div
                    ref={drawerRef}
                    aria-labelledby={titleId}
                    aria-modal="true"
                    className="mobile-nav__drawer"
                    id={drawerId}
                    initial={shouldReduceMotion ? false : { x: "100%" }}
                    animate={{ x: 0 }}
                    exit={shouldReduceMotion ? undefined : { x: "100%" }}
                    role="dialog"
                    tabIndex={-1}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.26,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <div className="mobile-nav__drawer-head">
                      <p id={titleId}>
                        <span>{t("brand")}</span>
                        <span>CATDOW</span>
                      </p>
                      <button
                        aria-label={t("closeMenu")}
                        className="mobile-nav__close"
                        onClick={() => setIsOpen(false)}
                        type="button"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <nav aria-label={t("mobileNavigationLabel")}>
                      <ul>
                        {items.map((item) => (
                          <li key={item.href}>
                            <Link href={item.href} onClick={() => setIsOpen(false)}>
                              {item.label}
                              <span aria-hidden="true" className="mobile-nav__arrow">↗</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className="mobile-nav__brand-note">
                      <div>
                        <p>{t("brandNoteTitle")}</p>
                        <span>{t("brandNote")}</span>
                      </div>
                      <small>CATDOW / PET FURNITURE</small>
                    </div>
                    <Suspense fallback={null}><LanguageSwitcher variant="mobile" /></Suspense>
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}
