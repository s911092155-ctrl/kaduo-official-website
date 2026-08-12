import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import Image from "next/image";
import {ProductCard} from "@/components/products/product-card";
import {getVisibleProducts} from "@/data/products";
import {localizedMetadata} from "@/i18n/metadata";
import type {AppLocale} from "@/i18n/routing";

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace:"Metadata"});
  return localizedMetadata({locale, pathname:"/products", title:t("productsTitle"), description:t("productsDescription")});
}

export default async function ProductsPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Products");
  const visibleProducts = getVisibleProducts(locale);
  const isDevelopmentPreview = process.env.NODE_ENV === "development" && visibleProducts.length > 0;
  const labels = {viewDetails:t("viewDetails"),draftPreview:t("draftPreview"),imageMissing:t("imageMissing"),detailsAria:t("detailsAria"),productNumber:t("productNumber"),seriesFallback:t("seriesFallback")};

  return <>
    <section className="border-b border-[var(--line)] bg-[#f8f7f3]"><div className="page-shell grid gap-8 py-8 sm:py-12 lg:grid-cols-[0.76fr_1.24fr] lg:items-center lg:gap-16 lg:py-16"><div className="order-2 lg:order-1"><p className="eyebrow">{t("eyebrow")}</p><h1 className="mt-6 text-[clamp(3.25rem,6.4vw,6.7rem)] font-medium leading-[0.9] tracking-[-0.075em]">{t("title")}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">{t("lead")}</p></div><figure className="relative order-1 aspect-[4/3] overflow-hidden bg-[#e9e5dd] lg:order-2"><Image alt={t("heroImageAlt")} className="object-cover" fill priority sizes="(min-width: 1024px) 66vw, 100vw" src="/images/homepage/hero-living-room.png"/></figure></div></section>
    <section className="page-shell py-16 sm:py-24">{visibleProducts.length === 0 ? <div className="grid gap-8 border-t border-[var(--line)] pt-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center"><figure className="relative aspect-[16/10] overflow-hidden bg-[#e9e5dd]"><Image alt={t("emptyImageAlt")} className="object-cover" fill sizes="(min-width: 1024px) 55vw, 100vw" src="/images/cats/cat-family-living-room.png"/></figure><div><p className="eyebrow">{t("emptyEyebrow")}</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{t("emptyTitle")}</h2><p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)]">{t("emptyBody")}</p></div></div> : <><div className="mb-3 flex flex-col gap-4 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">{t(isDevelopmentPreview ? "draftCollectionEyebrow" : "collectionEyebrow")}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{t(isDevelopmentPreview ? "draftCollectionTitle" : "publishedTitle")}</h2></div>{isDevelopmentPreview ? <p className="max-w-md text-sm leading-7 text-[var(--muted)]">{t("draftCollectionNote")}</p> : null}</div><div>{visibleProducts.map((product,index) => <ProductCard index={index} key={product.id} labels={labels} priority={index===0} product={product}/>)}</div></>}</section>
  </>;
}
