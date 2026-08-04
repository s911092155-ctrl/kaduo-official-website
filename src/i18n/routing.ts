import {defineRouting} from "next-intl/routing";

export const locales = ["zh-CN", "zh-TW", "en"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "zh-CN",
  localePrefix: "always",
  localeDetection: false,
});

export const localeLabels: Record<AppLocale, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  en: "English",
};

export const openGraphLocales: Record<AppLocale, string> = {
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
  en: "en_US",
};
