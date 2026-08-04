import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getVisibleProductBySlug,
  getVisibleProducts,
  publishedProducts,
  type ProductImage,
} from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publishedProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getVisibleProductBySlug(slug);

  if (!product) {
    return { title: "产品未找到" };
  }

  return {
    title: product.name,
    description: product.summary ?? `凯朵 KADUO ${product.name}产品信息。`,
  };
}

function ProductImageFigure({
  image,
  className,
  priority = false,
}: {
  image: ProductImage;
  className: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden bg-[#e4e9e7] ${className}`}>
      <Image
        alt={image.alt}
        className="object-cover"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 55vw, 100vw"
        src={image.src}
      />
    </figure>
  );
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getVisibleProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const visibleProducts = getVisibleProducts();
  const currentIndex = visibleProducts.findIndex((item) => item.id === product.id);
  const previousProduct = currentIndex > 0 ? visibleProducts[currentIndex - 1] : null;
  const nextProduct =
    currentIndex >= 0 && currentIndex < visibleProducts.length - 1
      ? visibleProducts[currentIndex + 1]
      : null;
  const specifications = [
    { label: "材质", values: product.materials },
    {
      label: "整体尺寸",
      values: product.overallDimensions ? [product.overallDimensions] : [],
    },
    { label: "重量", values: product.weight ? [product.weight] : [] },
    {
      label: "适用猫咪",
      values: product.suitableCats ? [product.suitableCats] : [],
    },
    { label: "产品颜色", values: product.colors.map((color) => color.name) },
  ].filter((item) => item.values.length > 0);
  const galleryImages = [
    ...product.images.details,
    ...product.images.dimensions,
    ...product.images.scenes.slice(1),
  ];

  return (
    <>
      <div className="border-b border-[var(--line)] bg-[#f7f6f2]">
        <div className="page-shell flex min-h-14 items-center gap-2 overflow-hidden text-xs text-[var(--muted)]">
          <Link className="shrink-0 transition-colors hover:text-[var(--ink)]" href="/products">
            产品中心
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-[var(--ink)]">{product.name}</span>
        </div>
      </div>

      <section className="bg-[#f7f6f2]">
        <div className="page-shell grid gap-10 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:py-20">
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">{product.series ?? "KADUO PRODUCT"}</p>
              {product.developmentOnly ? (
                <span className="rounded-full border border-[color:rgba(8,127,153,0.25)] bg-white/55 px-3 py-1 text-[0.65rem] font-medium tracking-[0.14em] text-[var(--moss)]">
                  开发演示 · 非正式产品
                </span>
              ) : null}
            </div>
            <h1 className="mt-7 max-w-2xl text-[clamp(2.8rem,6.5vw,6rem)] font-medium leading-[0.94] tracking-[-0.065em]">
              {product.name}
            </h1>
            {product.englishName ? (
              <p className="mt-4 text-sm tracking-[0.16em] text-[var(--muted)]">
                {product.englishName}
              </p>
            ) : null}
            {product.summary ? (
              <p className="mt-8 max-w-xl text-base leading-8 text-[#4f5b5a] sm:text-lg">
                {product.summary}
              </p>
            ) : null}
            {product.inquiryLabel ? (
              <Link
                className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full bg-[#273130] px-7 text-sm font-medium text-white transition-colors hover:bg-[var(--moss)]"
                href="/contact"
              >
                {product.inquiryLabel}
              </Link>
            ) : null}
          </div>
          <div className="order-1 lg:order-2">
            {product.images.main ? (
              <ProductImageFigure
                className="aspect-[4/3] rounded-[1.5rem] sm:rounded-[2.25rem]"
                image={product.images.main}
                priority
              />
            ) : (
              <div className="grid aspect-[4/3] place-items-center rounded-[1.5rem] bg-[#e4e9e7] px-8 text-center text-sm text-[var(--muted)] sm:rounded-[2.25rem]">
                产品主图尚未配置
              </div>
            )}
          </div>
        </div>
      </section>

      {product.designConcept ? (
        <section className="page-shell grid gap-8 py-16 sm:py-24 lg:grid-cols-[0.65fr_1.35fr] lg:gap-16">
          <p className="eyebrow">DESIGN CONCEPT</p>
          <div>
            <h2 className="text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
              设计理念
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-9 text-[var(--muted)]">
              {product.designConcept}
            </p>
          </div>
        </section>
      ) : null}

      {product.images.scenes.length > 0 ? (
        <section className="bg-[#e6ebe8] py-16 sm:py-24">
          <div className="page-shell">
            <div className="mb-8 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">AT HOME</p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                  家居场景
                </h2>
              </div>
              {product.developmentOnly ? (
                <p className="text-xs text-[var(--muted)]">开发演示图 / 不代表正式产品</p>
              ) : null}
            </div>
            <ProductImageFigure
              className="aspect-[16/9] rounded-[1.5rem] sm:rounded-[2.25rem]"
              image={product.images.scenes[0]}
            />
          </div>
        </section>
      ) : null}

      {product.features.length > 0 ? (
        <section className="page-shell py-16 sm:py-24">
          <p className="eyebrow">FUNCTION</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
            功能特点
          </h2>
          <ol className="mt-10 grid border-t border-[var(--line)] md:grid-cols-2">
            {product.features.map((feature, index) => (
              <li
                className="grid min-h-48 grid-cols-[auto_1fr] gap-5 border-b border-[var(--line)] py-8 md:px-8 md:first:pl-0 md:even:border-l"
                key={feature}
              >
                <span className="text-xs text-[var(--moss)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-8">{feature}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {specifications.length > 0 ? (
        <section className="border-y border-[var(--line)] bg-[rgba(255,255,255,0.36)]">
          <div className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">MATERIAL & SPECIFICATION</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                材质与信息
              </h2>
            </div>
            <dl className="border-t border-[var(--line)]">
              {specifications.map((item) => (
                <div
                  className="grid gap-3 border-b border-[var(--line)] py-5 sm:grid-cols-[9rem_1fr]"
                  key={item.label}
                >
                  <dt className="text-sm text-[var(--muted)]">{item.label}</dt>
                  <dd className="leading-7">{item.values.join(" / ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {product.modules.length > 0 ? (
        <section className="page-shell py-16 sm:py-24">
          <p className="eyebrow">MODULES & ACCESSORIES</p>
          <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
            模块与配件
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.modules.map((module) => (
              <article
                className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-white/50"
                key={module.name}
              >
                {module.image ? (
                  <ProductImageFigure className="aspect-[4/3]" image={module.image} />
                ) : null}
                <div className="p-6">
                  <h3 className="text-xl font-medium">{module.name}</h3>
                  {module.description ? (
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {module.description}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {galleryImages.length > 0 ? (
        <section className="page-shell py-16 sm:py-24">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
            <div>
              <p className="eyebrow">GALLERY</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                图片画廊
              </h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {galleryImages.map((image) => (
              <ProductImageFigure
                className="aspect-[4/3] rounded-[1.5rem]"
                image={image}
                key={`${image.src}-${image.alt}`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {product.video.url && product.video.cover ? (
        <section className="page-shell pb-16 sm:pb-24">
          <a
            className="group relative block overflow-hidden rounded-[1.5rem] sm:rounded-[2.25rem]"
            href={product.video.url}
            rel="noreferrer"
            target="_blank"
          >
            <ProductImageFigure
              className="aspect-video transition-transform duration-700 group-hover:scale-[1.015]"
              image={product.video.cover}
            />
            <span className="absolute inset-0 grid place-items-center bg-black/10">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-sm shadow-lg">
                播放
              </span>
            </span>
          </a>
        </section>
      ) : null}

      <nav
        aria-label="上一款和下一款产品"
        className="border-t border-[var(--line)] bg-[#f7f6f2]"
      >
        <div className="page-shell grid sm:grid-cols-2">
          {previousProduct ? (
            <Link
              className="border-b border-[var(--line)] py-8 transition-colors hover:text-[var(--moss)] sm:border-b-0 sm:border-r sm:pr-8"
              href={`/products/${previousProduct.slug}`}
            >
              <span className="text-xs text-[var(--muted)]">← 上一款</span>
              <strong className="mt-3 block text-lg font-medium">{previousProduct.name}</strong>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {nextProduct ? (
            <Link
              className="py-8 text-right transition-colors hover:text-[var(--moss)] sm:pl-8"
              href={`/products/${nextProduct.slug}`}
            >
              <span className="text-xs text-[var(--muted)]">下一款 →</span>
              <strong className="mt-3 block text-lg font-medium">{nextProduct.name}</strong>
            </Link>
          ) : null}
        </div>
      </nav>
    </>
  );
}
