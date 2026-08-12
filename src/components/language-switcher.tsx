"use client";

import {useLocale, useTranslations} from "next-intl";
import {useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent as ReactKeyboardEvent} from "react";
import {localeLabels, locales, type AppLocale} from "@/i18n/routing";
import {usePathname, useRouter} from "@/i18n/navigation";

export function LanguageSwitcher({variant}: {variant: "desktop" | "mobile"}) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Language");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;
    const focusFrame = requestAnimationFrame(() => {
      const currentIndex = locales.indexOf(locale);
      optionRefs.current[currentIndex]?.focus();
    });
    function handlePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [locale, open]);

  function switchLocale(nextLocale: AppLocale) {
    const query = searchParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {locale: nextLocale});
    setOpen(false);
  }

  function handleOptionKey(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowDown") next = (index + 1) % locales.length;
    if (event.key === "ArrowUp") next = (index - 1 + locales.length) % locales.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = locales.length - 1;
    if (next !== null) {
      event.preventDefault();
      optionRefs.current[next]?.focus();
    }
  }

  const options = locales.map((item, index) => (
    <button
      aria-current={item === locale ? "true" : undefined}
      className="language-switcher__option"
      key={item}
      onClick={() => switchLocale(item)}
      onKeyDown={(event) => handleOptionKey(event, index)}
      ref={(element) => { optionRefs.current[index] = element; }}
      role="menuitemradio"
      aria-checked={item === locale}
      type="button"
    >
      <span>{localeLabels[item]}</span><span aria-hidden="true">{item === locale ? "✓" : ""}</span>
    </button>
  ));

  if (variant === "mobile") {
    return (
      <div className="language-switcher language-switcher--mobile" ref={rootRef}>
        <p>{t("label")}</p>
        <div aria-label={t("switcherLabel")} role="menu">{options}</div>
      </div>
    );
  }

  return (
    <div className="language-switcher" ref={rootRef}>
      <button aria-expanded={open} aria-haspopup="menu" className="language-switcher__trigger" onClick={() => setOpen((value) => !value)} ref={triggerRef} type="button">
        {localeLabels[locale]} <span aria-hidden="true">⌄</span>
      </button>
      {open ? <div aria-label={t("switcherLabel")} className="language-switcher__menu" role="menu">{options}</div> : null}
    </div>
  );
}
