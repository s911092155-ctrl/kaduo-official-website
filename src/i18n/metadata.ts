import type {Metadata} from "next";
import {getPathname} from "@/i18n/navigation";
import {locales, openGraphLocales, type AppLocale} from "@/i18n/routing";

export const siteUrl = "https://catdow.example.com";

export function localizedAlternates(locale: AppLocale, pathname: string) {
  const urlFor = (targetLocale: AppLocale) =>
    new URL(getPathname({locale: targetLocale, href: pathname}), siteUrl).toString();

  return {
    canonical: urlFor(locale),
    languages: {
      "zh-CN": urlFor("zh-CN"),
      "zh-TW": urlFor("zh-TW"),
      en: urlFor("en"),
      "x-default": urlFor("zh-CN"),
    },
  } satisfies Metadata["alternates"];
}

export function localizedMetadata({
  locale,
  pathname,
  title,
  description,
  robots,
}: {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
  robots?: Metadata["robots"];
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, pathname),
    openGraph: {
      title,
      description,
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => openGraphLocales[item]),
      type: "website",
      url: new URL(getPathname({locale, href: pathname}), siteUrl),
    },
    robots,
  };
}
