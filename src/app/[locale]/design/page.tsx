import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {PageHero} from "@/components/page-hero";
import {localizedMetadata} from "@/i18n/metadata";
import type {AppLocale} from "@/i18n/routing";

type Props = {params: Promise<{locale: AppLocale}>};
type Method = {title: string; text: string};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Metadata"});
  return localizedMetadata({locale, pathname: "/design", title: t("designTitle"), description: t("designDescription")});
}

export default async function DesignPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DesignPage");
  const methods = t.raw("methods") as Method[];
  return <>
    <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
    <section className="page-shell py-16 sm:py-24"><div className="grid border-t border-[var(--line)] md:grid-cols-2">
      {methods.map((method, index) => <article className="border-b border-[var(--line)] py-10 md:min-h-72 md:px-10 md:even:border-l md:first:pl-0 md:nth-[3]:pl-0" key={method.title}><p className="text-sm text-[var(--moss)]">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-12 font-serif text-3xl">{method.title}</h2><p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">{method.text}</p></article>)}
    </div></section>
  </>;
}
