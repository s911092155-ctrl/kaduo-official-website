import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {ProductCard} from "@/components/products/product-card";
import {getVisibleProducts, publishedProducts} from "@/data/products";
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
  const isDevelopmentPreview = process.env.NODE_ENV === "development" && publishedProducts.length === 0 && visibleProducts.length > 0;
  const titleLines = t("title").split("\n");
  const labels = {viewDetails:t("viewDetails"),developmentOnly:t("developmentOnly"),imageMissing:t("imageMissing"),detailsAria:t("detailsAria")};

  return <>
    <section className="relative overflow-hidden border-b border-[var(--line)] bg-[#f6f5f1]"><div aria-hidden="true" className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[rgba(141,234,255,0.13)] blur-3xl sm:h-[28rem] sm:w-[28rem]"/><div className="page-shell relative grid min-h-[29rem] gap-10 py-16 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:py-28"><div><p className="eyebrow">{t("eyebrow")}</p><h1 className="mt-7 max-w-xl text-[clamp(3.3rem,8vw,7.8rem)] font-medium leading-[0.88] tracking-[-0.075em]">{titleLines.map((line,index) => <span key={line}>{line}{index < titleLines.length-1 ? <br/> : null}</span>)}</h1></div><div className="max-w-2xl lg:pb-3"><p className="text-[clamp(1.25rem,2.25vw,2rem)] leading-[1.5] tracking-[-0.025em] text-[#303a3a]">{t("lead")}</p><p className="mt-7 max-w-xl text-sm leading-7 text-[var(--muted)]">{t("note")}</p></div></div></section>
    <section className="page-shell py-16 sm:py-24">{visibleProducts.length === 0 ? <div className="grid min-h-[25rem] place-items-center rounded-[2rem] border border-dashed border-[color:rgba(34,39,40,0.2)] bg-[rgba(255,255,255,0.45)] px-6 text-center"><div className="max-w-lg"><p className="eyebrow">{t("emptyEyebrow")}</p><h2 className="mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{t("emptyTitle")}</h2><p className="mt-5 leading-7 text-[var(--muted)]">{t("emptyBody")}</p></div></div> : <><div className="mb-10 flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">{t(isDevelopmentPreview ? "developmentEyebrow" : "collectionEyebrow")}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{t(isDevelopmentPreview ? "developmentTitle" : "publishedTitle")}</h2></div>{isDevelopmentPreview ? <p className="max-w-md text-sm leading-6 text-[var(--muted)]">{t("developmentNote")}</p> : null}</div><div className="grid min-w-0 gap-7 md:grid-cols-2">{visibleProducts.map((product,index) => <ProductCard key={product.id} labels={labels} priority={index===0} product={product}/>)}</div></>}</section>
  </>;
}
