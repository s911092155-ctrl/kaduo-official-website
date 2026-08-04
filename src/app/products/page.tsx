import type { Metadata } from "next";
import { ProductCard } from "@/components/products/product-card";
import { getVisibleProducts, publishedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "产品中心",
  description: "浏览凯朵 KADUO 已公开的宠物家居产品。",
};

export default function ProductsPage() {
  const visibleProducts = getVisibleProducts();
  const isDevelopmentPreview =
    process.env.NODE_ENV === "development" && publishedProducts.length === 0;

  return (
    <>
      <section className="relative overflow-hidden border-b border-[var(--line)] bg-[#f6f5f1]">
        <div
          aria-hidden="true"
          className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[rgba(141,234,255,0.13)] blur-3xl sm:h-[28rem] sm:w-[28rem]"
        />
        <div className="page-shell relative grid min-h-[29rem] gap-10 py-16 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:py-28">
          <div>
            <p className="eyebrow">KADUO PRODUCTS</p>
            <h1 className="mt-7 max-w-xl text-[clamp(3.3rem,8vw,7.8rem)] font-medium leading-[0.88] tracking-[-0.075em]">
              产品
              <br />
              中心
            </h1>
          </div>
          <div className="max-w-2xl lg:pb-3">
            <p className="text-[clamp(1.25rem,2.25vw,2rem)] leading-[1.5] tracking-[-0.025em] text-[#303a3a]">
              为猫的真实生活设计，也让透明、光影与结构自然进入现代家居。
            </p>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--muted)]">
              公开列表只展示资料已经确认并完成发布的产品。草稿、归档与开发演示记录不会进入正式网站。
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-24">
        {visibleProducts.length === 0 ? (
          <div className="grid min-h-[25rem] place-items-center rounded-[2rem] border border-dashed border-[color:rgba(34,39,40,0.2)] bg-[rgba(255,255,255,0.45)] px-6 text-center">
            <div className="max-w-lg">
              <p className="eyebrow">NO PUBLISHED PRODUCTS</p>
              <h2 className="mt-5 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                当前没有已发布产品
              </h2>
              <p className="mt-5 leading-7 text-[var(--muted)]">
                这是开发阶段的空状态。产品资料确认后，维护者可以在产品数据文件中将对应记录设为已发布。
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10 flex flex-col gap-4 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">
                  {isDevelopmentPreview ? "DEVELOPMENT PREVIEW" : "PRODUCT COLLECTION"}
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  {isDevelopmentPreview ? "开发环境版式检查" : "已发布产品"}
                </h2>
              </div>
              {isDevelopmentPreview ? (
                <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                  以下记录仅在本地开发模式显示，用于检查页面布局，不代表正式产品。
                </p>
              ) : null}
            </div>
            <div className="grid min-w-0 gap-7 md:grid-cols-2">
              {visibleProducts.map((product, index) => (
                <ProductCard key={product.id} priority={index === 0} product={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
