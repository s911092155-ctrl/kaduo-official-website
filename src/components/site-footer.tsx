import Link from "next/link";

const footerLinks = [
  { href: "/products", label: "产品中心" },
  { href: "/brand", label: "品牌故事" },
  { href: "/design", label: "设计理念" },
  { href: "/contact", label: "联系咨询" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer border-t">
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-3xl font-semibold tracking-[-0.04em]">凯朵 CATDOW</p>
          <p className="mt-3 text-sm leading-6">
            高端宠物家具 / 亚克力空间设计
          </p>
          <p className="mt-8 text-xs opacity-55">
            © {new Date().getFullYear()} CATDOW. 网站内容持续完善中。
          </p>
        </div>
        <nav aria-label="页脚导航">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:text-right">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="opacity-65 transition-opacity hover:opacity-100" href={link.href}>
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
