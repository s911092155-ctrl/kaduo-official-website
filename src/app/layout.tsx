import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://catdow.example.com"),
  title: {
    default: "凯朵 CATDOW｜高端宠物家居与人宠共居美学",
    template: "%s｜凯朵 CATDOW",
  },
  description:
    "凯朵 CATDOW 是一个关注宠物真实需要与居住空间关系的高端宠物家居品牌。",
  openGraph: {
    title: "凯朵 CATDOW",
    description: "高端宠物家居与人宠共居美学品牌。",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[var(--paper)] text-[var(--ink)] antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
