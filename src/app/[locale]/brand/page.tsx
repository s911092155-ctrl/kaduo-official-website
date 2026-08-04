import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/page-hero";
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
  const paragraphs = t.raw("paragraphs") as string[];
  return <>
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
    <section className="page-shell grid gap-12 py-16 sm:py-24 md:grid-cols-[0.7fr_1.3fr]">
      <p className="eyebrow">{t("sectionEyebrow")}</p>
      <div className="max-w-3xl space-y-7 text-lg leading-9 text-[var(--muted)]">{paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
    </section>
    <section className="bg-[var(--moss)] text-[var(--paper)]"><div className="page-shell grid gap-10 py-16 sm:py-24 md:grid-cols-2 md:items-end"><h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-6xl">{t("statement")}</h2><p className="max-w-xl text-lg leading-8 text-[color:rgba(245,241,232,0.78)]">{t("statementBody")}</p></div></section>
  </>;
}
