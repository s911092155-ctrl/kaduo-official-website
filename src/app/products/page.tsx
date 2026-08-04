import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { publishedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "产品中心",
  description: "浏览凯朵 KADUO 已公开的宠物家居产品。",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="PRODUCTS"
        title="产品中心"
        description="这里将展示资料已经确认、可以公开介绍的产品。草稿产品会保留在数据文件中，但不会提前出现在网站上。"
      />
      <section className="page-shell py-16 sm:py-24">
        {publishedProducts.length === 0 ? (
          <div className="grid min-h-[24rem] place-items-center rounded-[2rem] border border-dashed border-[var(--line)] bg-[color:rgba(236,229,216,0.45)] px-6 text-center">
            <div className="max-w-lg">
              <p className="eyebrow">COMING SOON</p>
              <h2 className="mt-5 font-serif text-3xl sm:text-4xl">首批产品资料正在整理</h2>
              <p className="mt-5 leading-7 text-[var(--muted)]">
                图片、参数与产品说明确认完整后，我们会在这里正式发布。当前页面不展示未经确认的信息。
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedProducts.map((product) => (
              <article className="rounded-3xl border border-[var(--line)] p-6" key={product.id}>
                <p className="text-sm text-[var(--muted)]">{product.series}</p>
                <h2 className="mt-3 font-serif text-2xl">{product.name}</h2>
                <p className="mt-4 leading-7 text-[var(--muted)]">{product.summary}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
