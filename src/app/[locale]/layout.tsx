import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import {SiteFooter} from "@/components/site-footer";
import {SiteHeader} from "@/components/site-header";
import {localizedAlternates, siteUrl} from "@/i18n/metadata";
import {openGraphLocales, routing, type AppLocale} from "@/i18n/routing";
import "../globals.css";

type Props = {children: React.ReactNode; params: Promise<{locale: string}>};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Omit<Props, "children">): Promise<Metadata> {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({locale, namespace: "Metadata"});
  return {
    metadataBase: new URL(siteUrl),
    title: t("siteTitle"),
    description: t("siteDescription"),
    alternates: localizedAlternates(locale, "/"),
    openGraph: {
      title: t("siteTitle"),
      description: t("siteDescription"),
      locale: openGraphLocales[locale as AppLocale],
      type: "website",
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased">
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
