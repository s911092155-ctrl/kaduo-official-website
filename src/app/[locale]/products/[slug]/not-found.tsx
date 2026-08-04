"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

export default function ProductNotFound() {
  const t = useTranslations("NotFound");
  return <section className="page-shell grid min-h-[65vh] place-items-center py-20 text-center"><div className="max-w-lg"><p className="eyebrow">{t("productEyebrow")}</p><h1 className="mt-6 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">{t("productTitle")}</h1><p className="mt-6 leading-7 text-[var(--muted)]">{t("productBody")}</p><Link className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#273130] px-7 text-sm font-medium text-white transition-colors hover:bg-[var(--moss)]" href="/products">{t("backProducts")}</Link></div></section>;
}
