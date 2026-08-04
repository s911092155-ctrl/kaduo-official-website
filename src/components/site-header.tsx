import Link from "next/link";

const navigation = [
  { href: "/products", label: "产品中心" },
  { href: "/brand", label: "品牌故事" },
  { href: "/design", label: "设计理念" },
  { href: "/contact", label: "联系咨询" },
];

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="page-shell flex min-h-20 flex-col items-start justify-center gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0">
        <Link
          className="site-brand flex shrink-0 items-baseline gap-2 font-semibold"
          href="/"
          aria-label="凯朵 KADUO 首页"
        >
          <span className="text-lg">凯朵</span>
          <span className="text-xs">KADUO</span>
        </Link>
        <nav aria-label="主导航" className="w-full sm:w-auto">
          <ul className="flex items-center justify-between gap-2 text-xs sm:justify-start sm:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="site-nav-link transition-colors" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
