import type {Metadata} from "next";
import Image from "next/image";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ProductCard} from "@/components/products/product-card";
import {RevealOnScroll} from "@/components/motion/reveal-on-scroll";
import {getVisibleProducts} from "@/data/products";
import {Link} from "@/i18n/navigation";
import {localizedMetadata} from "@/i18n/metadata";
import type {AppLocale} from "@/i18n/routing";

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Metadata"});
  return localizedMetadata({locale, pathname: "/brand", title: t("brandTitle"), description: t("brandDescription")});
}

export default async function BrandPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("BrandPage");
  const products = getVisibleProducts(locale);
  const principles = t.raw("principles") as Array<{title: string; body: string}>;
  const process = t.raw("process") as string[];
  const labels = {viewDetails:t("viewDetails"),draftPreview:t("draftPreview"),imageMissing:t("imageMissing"),detailsAria:t("detailsAria"),productNumber:t("productNumber"),seriesFallback:t("seriesFallback")};

  return <main className="overflow-clip bg-[#f8f7f3] text-[#202725]">
    <section className="border-b border-[var(--line)]"><div className="page-shell grid gap-8 py-8 sm:py-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16 lg:py-16"><div className="order-2 lg:order-1"><p className="eyebrow">{t("eyebrow")}</p><h1 className="mt-6 max-w-md text-[clamp(3.25rem,6.1vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.075em]">{t("title")}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">{t("description")}</p></div><figure className="order-1 relative aspect-[4/3] overflow-hidden bg-[#e9e5dd] lg:order-2"><Image alt={t("heroImageAlt")} className="object-cover" fill priority sizes="(min-width: 1024px) 68vw, 100vw" src="/images/homepage/hero-living-room.png"/></figure></div></section>

    <section className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20"><RevealOnScroll className="relative aspect-[4/5] overflow-hidden bg-[#eee6de] sm:aspect-[5/4]"><Image alt={t("whyImageAlt")} className="object-cover" fill sizes="(min-width: 1024px) 52vw, 100vw" src="/images/cats/cat-family-living-room.png"/></RevealOnScroll><RevealOnScroll delay={0.08}><p className="eyebrow">{t("sectionEyebrow")}</p><h2 className="mt-5 max-w-xl text-[clamp(2.5rem,4.6vw,5.1rem)] font-medium leading-[1] tracking-[-0.065em]">{t("whyTitle")}</h2><div className="mt-8 max-w-[38rem] space-y-5 text-base leading-8 text-[var(--muted)]">{(t.raw("paragraphs") as string[]).slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></RevealOnScroll></section>

    <section className="border-y border-[var(--line)] bg-[#f1ece8]"><div className="page-shell py-16 sm:py-24"><p className="eyebrow">{t("principlesEyebrow")}</p><div className="mt-8 grid border-t border-[var(--line)] md:grid-cols-3">{principles.map((principle,index) => <RevealOnScroll className="border-b border-[var(--line)] py-8 md:border-b-0 md:px-8 md:first:pl-0 md:[&:not(:last-child)]:border-r" delay={index * 0.06} key={principle.title}><p className="text-xs font-medium tracking-[0.16em] text-[var(--moss)]">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-5 text-2xl font-medium tracking-[-0.04em]">{principle.title}</h2><p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">{principle.body}</p></RevealOnScroll>)}</div></div></section>

    <section className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-20"><RevealOnScroll><p className="eyebrow">{t("processEyebrow")}</p><h2 className="mt-5 max-w-md text-[clamp(2.5rem,4.6vw,5.1rem)] font-medium leading-[1] tracking-[-0.065em]">{t("processTitle")}</h2><p className="mt-7 max-w-lg text-base leading-8 text-[var(--muted)]">{t("processBody")}</p></RevealOnScroll><RevealOnScroll delay={0.08} className="grid gap-8 sm:grid-cols-[0.82fr_1.18fr] sm:items-end"><ol className="border-t border-[var(--line)]">{process.map((item,index) => <li className="flex gap-5 border-b border-[var(--line)] py-4 text-base" key={item}><span className="text-xs font-medium tracking-[0.16em] text-[var(--moss)]">0{index + 1}</span><span>{item}</span></li>)}</ol><figure className="relative aspect-[4/5] overflow-hidden bg-[#eee6de]"><Image alt={t("processImageAlt")} className="object-cover" fill sizes="(min-width: 640px) 44vw, 100vw" src="/images/homepage/acrylic-material-detail.png"/></figure></RevealOnScroll></section>

    <section className="border-t border-[var(--line)]"><div className="page-shell py-16 sm:py-24"><div className="flex flex-col gap-5 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">{t("exploreEyebrow")}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{t("exploreTitle")}</h2></div><p className="max-w-md text-sm leading-7 text-[var(--muted)]">{products.length > 0 ? t("exploreDraftNote") : t("explorePublicNote")}</p></div>{products.length > 0 ? <div>{products.map((product,index) => <ProductCard index={index} key={product.id} labels={labels} priority={index === 0} product={product}/>)}</div> : <Link className="mt-10 inline-flex items-center gap-3 border-b border-[color:rgba(8,127,153,0.35)] pb-1 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--moss)] hover:text-[var(--moss)]" href="/products">{t("exploreProducts")} <span aria-hidden="true">→</span></Link>}</div></section>
  </main>;
}
