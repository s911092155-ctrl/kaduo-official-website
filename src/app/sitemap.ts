import type {MetadataRoute} from "next";
import {publishedProducts} from "@/data/products";
import {getPathname} from "@/i18n/navigation";
import {locales, type AppLocale} from "@/i18n/routing";
import {siteUrl} from "@/i18n/metadata";

const staticRoutes = ["/", "/products", "/brand", "/design", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...publishedProducts.map((product) => `/products/${product.slug}`)];
  return routes.flatMap((pathname) => locales.map((locale) => {
    const languages = Object.fromEntries(locales.map((item) => [item, new URL(getPathname({locale:item, href:pathname}), siteUrl).toString()]));
    languages["x-default"] = new URL(getPathname({locale:"zh-CN", href:pathname}), siteUrl).toString();
    return {
      url:new URL(getPathname({locale:locale as AppLocale, href:pathname}), siteUrl).toString(),
      changeFrequency:pathname === "/" ? "weekly" : "monthly",
      priority:pathname === "/" ? 1 : 0.8,
      alternates:{languages},
    } satisfies MetadataRoute.Sitemap[number];
  }));
}
