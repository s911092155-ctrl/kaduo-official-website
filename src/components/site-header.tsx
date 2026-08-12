import {getTranslations} from "next-intl/server";
import {Suspense} from "react";
import {LanguageSwitcher} from "@/components/language-switcher";
import {MobileNavigation} from "@/components/mobile-navigation";
import {ScrollHeader} from "@/components/motion/scroll-header";
import {Link} from "@/i18n/navigation";

export async function SiteHeader() {
  const t = await getTranslations("Header");
  const navigation = [
    {href: "/products", label: t("products")},
    {href: "/brand", label: t("brandStory")},
    {href: "/design", label: t("design")},
    {href: "/contact", label: t("contact")},
  ];

  return (
    <ScrollHeader>
      <div className="page-shell flex min-h-[4.5rem] items-center justify-between gap-5">
        <Link className="site-brand flex shrink-0 items-baseline gap-2 font-semibold" href="/" aria-label={t("homeLabel")}>
          {t("brand") === "CATDOW" ? (
            <span className="text-base tracking-[0.08em]">CATDOW</span>
          ) : (
            <><span className="text-lg">{t("brand")}</span><span className="text-xs">CATDOW</span></>
          )}
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          <nav aria-label={t("navigationLabel")}>
            <ul className="flex items-center gap-6 text-xs xl:gap-8">
              {navigation.map((item) => (
                <li key={item.href}><Link className="site-nav-link transition-colors" href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
          <Suspense fallback={<span className="min-h-10 min-w-24" aria-hidden="true" />}><LanguageSwitcher variant="desktop" /></Suspense>
        </div>
        <MobileNavigation items={navigation} />
      </div>
    </ScrollHeader>
  );
}
