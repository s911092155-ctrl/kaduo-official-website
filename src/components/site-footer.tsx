import {getTranslations} from "next-intl/server";
import {Link} from "@/i18n/navigation";

export async function SiteFooter() {
  const header = await getTranslations("Header");
  const t = await getTranslations("Footer");
  const footerLinks = [
    {href: "/products", label: header("products")},
    {href: "/brand", label: header("brandStory")},
    {href: "/design", label: header("design")},
    {href: "/contact", label: header("contact")},
  ];

  return (
    <footer className="site-footer border-t">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-3xl font-semibold tracking-[-0.04em]">{t("brand")}</p>
          <p className="mt-3 text-sm leading-6">{t("positioning")}</p>
          <p className="mt-8 text-xs opacity-55">© {new Date().getFullYear()} {t("copyright")}</p>
        </div>
        <nav aria-label={t("navigationLabel")}>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-right">
            {footerLinks.map((link) => <li key={link.href}><Link className="opacity-65 transition-opacity hover:opacity-100" href={link.href}>{link.label}</Link></li>)}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
