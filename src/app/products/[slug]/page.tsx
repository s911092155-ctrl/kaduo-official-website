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

const sourceTypeLabels = {
  "ai-render": "AI效果示意",
  "prototype-photo": "打样实拍",
  "design-drawing": "设计图",
} as const;

function isRenderableImage(image: ProductImage) {
  return image.publicApproved !== false;
}

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
    title: product.seoTitle ? { absolute: product.seoTitle } : product.name,
    description:
      product.seoDescription ??
      product.summary ??
      `凯朵 CATDOW ${product.name}产品信息。`,
    robots: product.status === "published" ? undefined : { index: false, follow: false },
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
  if (!isRenderableImage(image)) {
    return null;
  }

  return (
    <figure>
      <div className={`relative overflow-hidden bg-[#e4e9e7] ${className}`}>
        <Image
          alt={image.alt}
          className={
            image.sourceType === "design-drawing" ||
            image.sourceType === "prototype-photo"
              ? "object-contain p-2"
              : "object-cover"
          }
          fill
          priority={priority}
          sizes="(min-width: 1024px) 55vw, 100vw"
          src={image.src}
        />
      </div>
      {image.caption ? (
        <figcaption className="mt-3 flex flex-wrap items-start gap-2 text-xs leading-5 text-[var(--muted)]">
          {image.sourceType ? (
            <span className="shrink-0 rounded-full border border-[var(--line)] bg-white/60 px-2.5 py-0.5 font-medium text-[var(--ink)]">
              {sourceTypeLabels[image.sourceType]}
            </span>
          ) : null}
          <span className="max-w-3xl">{image.caption}</span>
        </figcaption>
      ) : null}
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
  const mainImage =
    product.images.main && isRenderableImage(product.images.main)
      ? product.images.main
      : null;
  const sceneImages = product.images.scenes.filter(isRenderableImage);
  const detailImages = product.images.details.filter(isRenderableImage);
  const dimensionImages = product.images.dimensions.filter(isRenderableImage);
  const drawingImages = product.images.drawings.filter(isRenderableImage);
  const prototypeImages = product.images.prototypes.filter(isRenderableImage);
  const galleryImages = [
    ...detailImages,
    ...sceneImages.slice(1),
  ];
  const isDraftPreview =
    process.env.NODE_ENV === "development" && product.status !== "published";

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
              <p className="eyebrow">{product.series ?? "CATDOW PRODUCT"}</p>
              {isDraftPreview ? (
                <span className="rounded-full border border-[color:rgba(8,127,153,0.25)] bg-white/70 px-3 py-1 text-[0.65rem] font-medium tracking-[0.14em] text-[var(--moss)]">
                  草稿预览 · 尚未公开
                </span>
              ) : null}
              {product.developmentOnly ? (
                <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[0.65rem] font-medium tracking-[0.14em] text-[var(--muted)]">
                  开发演示 · 非正式产品
                </span>
              ) : null}
            </div>
            <h1 className="mt-7 max-w-2xl text-[clamp(2.6rem,5.8vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.06em]">
              {product.name}
            </h1>
            {product.englishName ? (
              <p className="mt-4 max-w-xl text-sm leading-6 tracking-[0.12em] text-[var(--muted)]">
                {product.englishName}
              </p>
            ) : null}
            {(product.productType || product.englishSeries) ? (
              <p className="mt-4 text-xs leading-6 text-[var(--muted)]">
                {[product.productType, product.englishSeries].filter(Boolean).join(" · ")}
              </p>
            ) : null}
            {product.summary ? (
              <p className="mt-7 max-w-xl text-base leading-8 text-[#4f5b5a] sm:text-lg">
                {product.summary}
              </p>
            ) : null}
            {product.inquiryLabel ? (
              <Link
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#273130] px-7 text-sm font-medium text-white transition-colors hover:bg-[var(--moss)]"
                href="/contact"
              >
                {product.inquiryLabel}
              </Link>
            ) : null}
          </div>
          <div className="order-1 lg:order-2">
            {mainImage ? (
              <ProductImageFigure
                className="aspect-[4/3] rounded-[1.5rem] sm:rounded-[2.25rem]"
                image={mainImage}
                priority
              />
            ) : (
              <div className="grid aspect-[4/3] place-items-center rounded-[1.5rem] bg-[#e4e9e7] px-8 text-center text-sm text-[var(--muted)] sm:rounded-[2.25rem]">
                产品主图尚未配置
              </div>
            )}
          </div>
          {product.detailIntroduction.length > 0 ? (
            <div className="order-3 grid gap-5 border-t border-[var(--line)] pt-8 lg:col-span-2 lg:grid-cols-2 lg:gap-12">
              {product.detailIntroduction.map((paragraph) => (
                <p className="text-base leading-8 text-[var(--muted)]" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {product.designConcept ? (
        <section className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="eyebrow">DESIGN CONCEPT</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
              {product.designConceptTitle ?? "设计理念"}
            </h2>
          </div>
          <div>
            <div className="space-y-5 whitespace-pre-line text-lg leading-9 text-[var(--muted)]">
              {product.designConcept}
            </div>
            {sceneImages[0] ? (
              <div className="mt-10">
                <ProductImageFigure
                  className="aspect-[3/4] rounded-[1.5rem] sm:rounded-[2rem]"
                  image={sceneImages[0]}
                  priority
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {product.features.length > 0 ? (
        <section className="border-y border-[var(--line)] bg-[#e6ebe8] py-16 sm:py-24">
          <div className="page-shell">
            <p className="eyebrow">FUNCTION</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
              功能特点
            </h2>
            <ol className="mt-10 grid border-t border-[var(--line)] md:grid-cols-2">
              {product.features.map((feature, index) => (
                <li
                  className="grid min-h-48 grid-cols-[auto_1fr] gap-5 border-b border-[var(--line)] py-8 md:px-8 md:first:pl-0 md:even:border-l"
                  key={feature.title}
                >
                  <span className="text-xs text-[var(--moss)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {product.modules.length > 0 ? (
        <section className="page-shell py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="eyebrow">DESIGN MODULES</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                设计模块系统
              </h2>
              {product.moduleNote ? (
                <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
                  {product.moduleNote}
                </p>
              ) : null}
            </div>
            {drawingImages[0] ? (
              <ProductImageFigure
                className="aspect-[16/10] rounded-[1.5rem] border border-[var(--line)] bg-white"
                image={drawingImages[0]}
              />
            ) : null}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.modules.map((module, index) => (
              <article
                className="rounded-[1.25rem] border border-[var(--line)] bg-white/50 p-6"
                key={module.name}
              >
                <span className="text-xs text-[var(--moss)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-medium">{module.name}</h3>
                {module.description ? (
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {module.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {product.materials.length > 0 ? (
        <section className="border-y border-[var(--line)] bg-[rgba(255,255,255,0.36)]">
          <div className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">MATERIAL & STRUCTURE</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                材质与结构
              </h2>
            </div>
            <div>
              {product.materialDescription ? (
                <p className="text-lg leading-9 text-[var(--muted)]">
                  {product.materialDescription}
                </p>
              ) : null}
              <ul className="mt-8 border-t border-[var(--line)]">
                {product.materials.map((material) => (
                  <li className="border-b border-[var(--line)] py-5" key={material}>
                    {material}
                  </li>
                ))}
              </ul>
              {product.materialNote ? (
                <p className="mt-6 rounded-2xl bg-[#eef3f1] p-5 text-sm leading-7 text-[var(--muted)]">
                  {product.materialNote}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {(product.overallDimensions || dimensionImages.length > 0) ? (
        <section className="page-shell grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow">DIMENSIONS</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
              产品尺寸
            </h2>
            {product.overallDimensions ? (
              <p className="mt-7 text-2xl font-medium leading-9 tracking-[-0.025em]">
                {product.overallDimensions}
              </p>
            ) : null}
            {product.dimensionsDisplay ? (
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {product.dimensionsDisplay}
              </p>
            ) : null}
            {product.dimensionsNote ? (
              <p className="mt-6 text-sm leading-7 text-[var(--muted)]">
                {product.dimensionsNote}
              </p>
            ) : null}
          </div>
          {dimensionImages[0] ? (
            <ProductImageFigure
              className="aspect-[16/10] rounded-[1.5rem] border border-[var(--line)] bg-white"
              image={dimensionImages[0]}
            />
          ) : null}
        </section>
      ) : null}

      {prototypeImages.length > 0 ? (
        <section className="bg-[#e6ebe8] py-16 sm:py-24">
          <div className="page-shell">
            <div className="max-w-3xl">
              <p className="eyebrow">PROTOTYPE VERIFICATION</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                打样与组装验证
              </h2>
              {product.prototypeNote ? (
                <p className="mt-6 text-base leading-8 text-[var(--muted)]">
                  {product.prototypeNote}
                </p>
              ) : null}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {prototypeImages.map((image) => (
                <ProductImageFigure
                  className="aspect-[3/4] rounded-[1.5rem]"
                  image={image}
                  key={image.src}
                />
              ))}
              {drawingImages[1] ? (
                <ProductImageFigure
                  className="aspect-[16/10] rounded-[1.5rem] border border-[var(--line)] bg-white"
                  image={drawingImages[1]}
                />
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {product.standardExclusions.length > 0 ? (
        <section className="page-shell py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <p className="eyebrow">STANDARD CONFIGURATION</p>
              <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                标准配置说明
              </h2>
            </div>
            <div>
              <h3 className="text-lg font-medium">明确不包含</h3>
              <ul className="mt-5 grid gap-3 border-t border-[var(--line)] sm:grid-cols-2">
                {product.standardExclusions.map((item) => (
                  <li className="border-b border-[var(--line)] py-4 text-sm" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              {product.cushionNote ? (
                <p className="mt-7 text-sm leading-7 text-[var(--muted)]">
                  {product.cushionNote}
                </p>
              ) : null}
              {product.displayNotice ? (
                <p className="mt-5 rounded-2xl bg-[#f1f3ef] p-5 text-sm leading-7 text-[var(--muted)]">
                  <strong className="mr-2 font-medium text-[var(--ink)]">图片展示说明</strong>
                  {product.displayNotice}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {galleryImages.length > 0 ? (
        <section className="border-y border-[var(--line)] bg-[#f7f6f2] py-16 sm:py-24">
          <div className="page-shell">
            <p className="eyebrow">GALLERY</p>
            <h2 className="mt-4 text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
              更多设计视图
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {galleryImages.map((image) => (
                <ProductImageFigure
                  className="aspect-[3/4] rounded-[1.5rem]"
                  image={image}
                  key={image.src}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {product.consultation ? (
        <section className="page-shell py-16 sm:py-24">
          <div className="rounded-[2rem] bg-[#273130] px-6 py-12 text-white sm:px-12 sm:py-16 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-[#a9dfe7]">
                CATDOW CONSULTATION
              </p>
              <h2 className="mt-5 max-w-3xl text-3xl font-medium tracking-[-0.045em] sm:text-5xl">
                {product.consultation.title}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
                {product.consultation.description}
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-[#273130] transition-colors hover:bg-[#d9f0f3]"
                href="/contact"
              >
                {product.consultation.primaryLabel}
              </Link>
              {product.consultation.secondaryLabel ? (
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:border-white/70"
                  href="/contact"
                >
                  {product.consultation.secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {(previousProduct || nextProduct) ? (
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
      ) : null}
    </>
  );
}
