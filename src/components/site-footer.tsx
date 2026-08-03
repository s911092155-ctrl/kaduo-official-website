import Link from "next/link";

const footerLinks = [
  { href: "/products", label: "产品中心" },
  { href: "/brand", label: "品牌故事" },
  { href: "/design", label: "设计理念" },
  { href: "/contact", label: "联系咨询" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper-deep)]">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="font-serif text-3xl">凯朵 KADUO</p>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            高端宠物家居与人宠共居美学品牌
          </p>
          <p className="mt-8 text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} KADUO. 网站内容持续完善中。
          </p>
        </div>
        <nav aria-label="页脚导航">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-right">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-[var(--muted)] hover:text-[var(--ink)]" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
