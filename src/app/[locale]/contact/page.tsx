import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/page-hero";
import {localizedMetadata} from "@/i18n/metadata";
import type {AppLocale} from "@/i18n/routing";

type Props = {params: Promise<{locale: AppLocale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Metadata"});
  return localizedMetadata({locale, pathname: "/contact", title: t("contactTitle"), description: t("contactDescription")});
}

export default async function ContactPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");
  const items = t.raw("items") as string[];
  return <>
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
    <section className="page-shell grid gap-8 py-16 sm:py-24 md:grid-cols-2">
      <div className="rounded-[2rem] bg-[var(--paper-deep)] p-7 sm:p-10"><p className="eyebrow">{t("detailsEyebrow")}</p><h2 className="mt-5 font-serif text-3xl">{t("detailsTitle")}</h2><p className="mt-5 max-w-lg leading-7 text-[var(--muted)]">{t("detailsBody")}</p></div>
      <div className="rounded-[2rem] border border-[var(--line)] p-7 sm:p-10"><p className="eyebrow">{t("beforeEyebrow")}</p><h2 className="mt-5 font-serif text-3xl">{t("beforeTitle")}</h2><ul className="mt-6 space-y-4 text-[var(--muted)]">{items.map((item) => <li className="flex gap-3 border-b border-[var(--line)] pb-4" key={item}><span aria-hidden="true" className="text-[var(--moss)]">○</span>{item}</li>)}</ul></div>
    </section>
  </>;
}
