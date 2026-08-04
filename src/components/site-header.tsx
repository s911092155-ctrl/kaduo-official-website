import Link from "next/link";
import { ScrollHeader } from "@/components/motion/scroll-header";
import { MobileNavigation } from "@/components/mobile-navigation";

const navigation = [
  { href: "/products", label: "产品中心" },
  { href: "/brand", label: "品牌故事" },
  { href: "/design", label: "设计理念" },
  { href: "/contact", label: "联系咨询" },
];

export function SiteHeader() {
  return (
    <ScrollHeader>
      <div className="page-shell flex min-h-[4.5rem] items-center justify-between gap-6">
        <Link
          className="site-brand flex shrink-0 items-baseline gap-2 font-semibold"
          href="/"
          aria-label="凯朵 CATDOW 首页"
        >
          <span className="text-lg">凯朵</span>
          <span className="text-xs">CATDOW</span>
        </Link>
        <nav aria-label="主导航" className="hidden md:block">
          <ul className="flex items-center gap-8 text-xs">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link className="site-nav-link transition-colors" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNavigation items={navigation} />
      </div>
    </ScrollHeader>
  );
}
