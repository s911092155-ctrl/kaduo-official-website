import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ImageLightbox } from "@/components/products/product-detail/image-lightbox";
import {
  ModuleExplorer,
  type ModuleExplorerItem,
} from "@/components/products/product-detail/module-explorer";
import { ProductMedia } from "@/components/products/product-detail/product-media";
import {
  getVisibleProductBySlug,
  getVisibleProducts,
  publishedProducts,
  type ProductImage,
} from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const coreExperienceTitles = [
  ["分层垂直攀爬", "分层攀爬"],
  ["多种休憩空间", "多种休憩"],
  ["躲藏与观察", "躲藏观察"],
  ["抓挠与互动", "抓挠互动"],
] as const;

const featuredModuleNames = [
  "顶部瞭望猫屋",
  "悬浮猫兜",
  "透明中舱猫房",
  "底层休憩猫窝",
] as const;

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
  const isDraftPreview =
    process.env.NODE_ENV === "development" && product.status !== "published";
  const designParagraphs = product.designConcept
    ? product.designConcept.split("\n\n").filter(Boolean)
    : [];
  const coreExperiences = coreExperienceTitles.flatMap(
    ([sourceTitle, displayTitle]) => {
      const feature = product.features.find((item) => item.title === sourceTitle);
      return feature ? [{ ...feature, displayTitle }] : [];
    },
  );
  const moduleImages = [mainImage, detailImages[0], sceneImages[1], detailImages[1]].filter(
    (image): image is ProductImage => Boolean(image),
  );
  const featuredModules = featuredModuleNames.flatMap((name, index) => {
    const productModule = product.modules.find((item) => item.name === name);
    const image = productModule?.image && isRenderableImage(productModule.image)
      ? productModule.image
      : moduleImages[index];

    return productModule && image
      ? [{ ...productModule, image } satisfies ModuleExplorerItem]
      : [];
  });
  const remainingModules = product.modules.filter(
    (module) => !featuredModuleNames.includes(module.name as (typeof featuredModuleNames)[number]),
  );
  const conceptImage = sceneImages[0] ?? mainImage;
  const galleryImages = [mainImage, detailImages[0], detailImages[1], sceneImages[1]].filter(
    (image): image is ProductImage => Boolean(image),
  );
  const prototypePrimaryImages = [prototypeImages[0], drawingImages[1]].filter(
    (image): image is ProductImage => Boolean(image),
  );
  const extraPrototypeImages = [
    ...prototypeImages.slice(1),
    ...drawingImages.slice(2),
  ];
  const sectionClass =
    "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10";

  return (
    <main className="overflow-clip bg-[#f8f7f3] text-[#202725]">
      <div className="border-b border-black/10">
        <div className={`${sectionClass} flex min-h-14 items-center gap-2 overflow-hidden text-xs text-[#747c79]`}>
          <Link className="shrink-0 transition-colors hover:text-[#202725]" href="/products">
            产品中心
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-[#35403e]">{product.name}</span>
        </div>
      </div>

      <section>
        <div className={`${sectionClass} grid gap-6 pb-14 pt-7 sm:gap-8 sm:pb-20 sm:pt-10 lg:min-h-[760px] lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16 lg:py-20`}>
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-[var(--moss)]">
                {product.series ?? "CATDOW PRODUCT"}
              </p>
              {isDraftPreview ? (
                <span className="border border-[color:rgba(8,127,153,0.28)] px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.12em] text-[var(--moss)]">
                  草稿预览 · 尚未公开
                </span>
              ) : null}
              {product.developmentOnly ? (
                <span className="border border-black/15 px-2.5 py-1 text-[0.65rem] font-medium tracking-[0.12em] text-[#66706e]">
                  开发演示 · 非正式产品
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 max-w-[9em] text-[clamp(2.45rem,5vw,4.8rem)] font-medium leading-[1.05] tracking-[-0.055em] sm:mt-7">
              {product.name}
            </h1>
            {product.englishName ? (
              <p className="mt-3 max-w-[34rem] text-xs leading-6 tracking-[0.1em] text-[#6a7471] sm:mt-4 sm:text-sm">
                {product.englishName}
              </p>
            ) : null}
            {product.summary ? (
              <p className="mt-4 max-w-[36rem] text-[0.95rem] leading-7 text-[#596461] sm:mt-6 sm:text-lg sm:leading-8">
                {product.summary}
              </p>
            ) : null}
            {product.inquiryLabel ? (
              <Link
                className="mt-5 inline-flex min-h-12 items-center justify-center bg-[#273130] px-7 text-sm font-medium text-white transition-colors hover:bg-[var(--moss)] sm:mt-7"
                href="/contact"
              >
                {product.inquiryLabel}
              </Link>
            ) : null}
          </div>

          <div className="order-1 lg:order-2">
            {mainImage ? (
              <ProductMedia
                frameClassName="aspect-[16/10] sm:aspect-[4/3]"
                image={mainImage}
                imageClassName="object-cover"
                captionOverlay
                priority
                sizes="(min-width: 1024px) 62vw, 100vw"
              />
            ) : (
              <div className="grid aspect-[4/3] place-items-center bg-[#eceeea] px-8 text-center text-sm text-[#69736f]">
                产品主图尚未配置
              </div>
            )}
          </div>
        </div>
      </section>

      {product.designConcept ? (
        <section className={`${sectionClass} border-t border-black/10 py-14 sm:py-20 lg:py-28`}>
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
            {conceptImage ? (
              <div className="mx-auto w-full max-w-[32rem] lg:mx-0">
                <ProductMedia
                  frameClassName="aspect-[3/4]"
                  image={conceptImage}
                  imageClassName="object-contain"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
            ) : null}
            <div className="max-w-[37rem]">
              <p className="hidden text-xs font-medium tracking-[0.18em] text-[var(--moss)] sm:block">
                DESIGN CONCEPT
              </p>
              <h2 className="text-3xl font-medium leading-tight tracking-[-0.045em] sm:mt-4 sm:text-5xl">
                {product.designConceptTitle ?? "设计理念"}
              </h2>
              <div className="mt-7 space-y-5 text-base leading-8 text-[#5f6966] sm:text-lg sm:leading-9">
                {designParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {coreExperiences.length > 0 ? (
        <section className="bg-[#e9efea] py-14 sm:py-20 lg:py-24">
          <div className={sectionClass}>
            <div className="max-w-[38rem]">
              <p className="hidden text-xs font-medium tracking-[0.18em] text-[var(--moss)] sm:block">
                CORE EXPERIENCE
              </p>
              <h2 className="text-3xl font-medium tracking-[-0.045em] sm:mt-4 sm:text-5xl">
                猫咪的四种核心体验
              </h2>
            </div>
            <ol className="mt-9 grid border-t border-black/15 sm:mt-12 md:grid-cols-2">
              {coreExperiences.map((feature, index) => (
                <li
                  className="grid grid-cols-[2rem_1fr] gap-4 border-b border-black/15 py-7 md:min-h-44 md:px-8 md:first:pl-0 md:even:border-l"
                  key={feature.title}
                >
                  <span className="pt-1 text-xs text-[var(--moss)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium">{feature.displayTitle}</h3>
                    <p className="mt-3 max-w-[29rem] text-sm leading-7 text-[#5e6966]">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {featuredModules.length > 0 ? (
        <section className={`${sectionClass} py-14 sm:py-20 lg:py-28`}>
          <div className="mb-9 max-w-[38rem] sm:mb-12">
            <p className="hidden text-xs font-medium tracking-[0.18em] text-[var(--moss)] sm:block">
              MODULE EXPLORATION
            </p>
            <h2 className="text-3xl font-medium tracking-[-0.045em] sm:mt-4 sm:text-5xl">
              模块探索
            </h2>
            <p className="mt-5 text-base leading-8 text-[#5f6966]">
              从高处瞭望到低处安睡，四个重点模块对应猫咪不同的停留方式。
            </p>
          </div>
          <ModuleExplorer
            featured={featuredModules}
            note={product.moduleNote}
            remaining={remainingModules}
          />
          <div className="mt-9 border-t border-black/10 pt-6 sm:hidden">
            <Link
              className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-[var(--moss)]"
              href="/contact"
            >
              预约产品咨询 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      ) : null}

      {(product.materials.length > 0 || product.overallDimensions || dimensionImages.length > 0) ? (
        <section className={`${sectionClass} border-t border-black/10 py-14 sm:py-20 lg:py-28`}>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
            <div>
              <p className="hidden text-xs font-medium tracking-[0.18em] text-[var(--moss)] sm:block">
                DESIGN DETAILS
              </p>
              <h2 className="text-3xl font-medium tracking-[-0.045em] sm:mt-4 sm:text-5xl">
                设计细节
              </h2>
              {product.materialDescription ? (
                <p className="mt-7 max-w-[37rem] text-base leading-8 text-[#5f6966] sm:text-lg sm:leading-9">
                  {product.materialDescription}
                </p>
              ) : null}
              {product.materials.length > 0 ? (
                <ul className="mt-8 max-w-[37rem] border-t border-black/12">
                  {product.materials.map((material) => (
                    <li className="border-b border-black/12 py-4 text-sm" key={material}>
                      {material}
                    </li>
                  ))}
                  {product.features.some((feature) => feature.title === "模块化组合") ? (
                    <li className="border-b border-black/12 py-4 text-sm">模块化结构</li>
                  ) : null}
                </ul>
              ) : null}
              {product.materialNote ? (
                <p className="mt-6 max-w-[37rem] text-xs leading-6 text-[#747c79]">
                  {product.materialNote}
                </p>
              ) : null}
            </div>

            <div className="lg:pt-12">
              {product.overallDimensions ? (
                <div className="border-t border-black/15 pt-5">
                  <p className="text-xs tracking-[0.16em] text-[#737c79]">产品尺寸</p>
                  <p className="mt-3 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                    {product.overallDimensions}
                  </p>
                  {product.dimensionsDisplay ? (
                    <p className="mt-2 text-sm leading-7 text-[#66706e]">
                      {product.dimensionsDisplay}
                    </p>
                  ) : null}
                  {product.dimensionsNote ? (
                    <p className="mt-4 text-xs leading-6 text-[#747c79]">
                      {product.dimensionsNote}
                    </p>
                  ) : null}
                </div>
              ) : null}
              {(dimensionImages[0] || drawingImages[0]) ? (
                <div className="mt-8 grid grid-cols-2 gap-5">
                  {dimensionImages[0] ? (
                    <ImageLightbox image={dimensionImages[0]} label="整体尺寸图" />
                  ) : null}
                  {drawingImages[0] ? (
                    <ImageLightbox image={drawingImages[0]} label="模块系统图" />
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {prototypePrimaryImages.length > 0 ? (
        <section className={`${sectionClass} border-t border-black/10 py-14 sm:py-20 lg:py-28`}>
          <div className="max-w-[38rem]">
            <p className="hidden text-xs font-medium tracking-[0.18em] text-[var(--moss)] sm:block">
              PROTOTYPE VERIFICATION
            </p>
            <h2 className="text-3xl font-medium tracking-[-0.045em] sm:mt-4 sm:text-5xl">
              打样与组装验证
            </h2>
            {product.prototypeNote ? (
              <p className="mt-6 text-base leading-8 text-[#5f6966]">
                {product.prototypeNote}
              </p>
            ) : null}
          </div>
          <div className="mt-9 grid items-start gap-8 md:grid-cols-[0.72fr_1.28fr] lg:mt-12 lg:gap-12">
            {prototypePrimaryImages[0] ? (
              <ProductMedia
                frameClassName="aspect-[3/4]"
                image={prototypePrimaryImages[0]}
                imageClassName="object-contain"
                sizes="(min-width: 768px) 38vw, 100vw"
              />
            ) : null}
            {prototypePrimaryImages[1] ? (
              <ImageLightbox image={prototypePrimaryImages[1]} label="组装步骤设计图" />
            ) : null}
          </div>
          {extraPrototypeImages.length > 0 ? (
            <details className="mt-9 border-t border-black/12 pt-5">
              <summary className="cursor-pointer text-sm font-medium text-[#2d3937]">
                查看更多打样资料
              </summary>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {extraPrototypeImages.map((image) => (
                  <ProductMedia
                    frameClassName="aspect-[4/3]"
                    image={image}
                    imageClassName="object-contain"
                    key={image.src}
                  />
                ))}
              </div>
            </details>
          ) : null}
        </section>
      ) : null}

      {galleryImages.length > 0 ? (
        <section className={`${sectionClass} border-t border-black/10 py-14 sm:py-20 lg:py-28`}>
          <div className="max-w-[38rem]">
            <p className="hidden text-xs font-medium tracking-[0.18em] text-[var(--moss)] sm:block">
              EDITORIAL GALLERY
            </p>
            <h2 className="text-3xl font-medium tracking-[-0.045em] sm:mt-4 sm:text-5xl">
              猫与透明家具的生活场景
            </h2>
          </div>
          <div className="mt-9 grid gap-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-12 lg:items-start">
            {galleryImages[0] ? (
              <div className="md:col-span-2 lg:col-span-12">
                <ProductMedia
                  frameClassName="aspect-[16/9]"
                  image={galleryImages[0]}
                  imageClassName="object-cover"
                  sizes="(min-width: 1024px) 1200px, 100vw"
                />
              </div>
            ) : null}
            {galleryImages.slice(1).map((image, index) => (
              <div
                className={index === 2 ? "lg:col-span-4 lg:pt-16" : "lg:col-span-4"}
                key={image.src}
              >
                <ProductMedia
                  frameClassName="aspect-[3/4]"
                  image={image}
                  imageClassName="object-contain"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {product.standardExclusions.length > 0 ? (
        <section className={`${sectionClass} border-t border-black/10 py-14 sm:py-20 lg:py-24`}>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="hidden text-xs font-medium tracking-[0.18em] text-[var(--moss)] sm:block">
                STANDARD CONFIGURATION
              </p>
              <h2 className="text-3xl font-medium tracking-[-0.045em] sm:mt-4 sm:text-5xl">
                标准配置说明
              </h2>
            </div>
            <div>
              <h3 className="text-base font-medium">图片中以下物品不包含在标准配置中</h3>
              <ul className="mt-5 grid grid-cols-2 gap-x-8 border-t border-black/12">
                {product.standardExclusions.map((item) => (
                  <li className="border-b border-black/12 py-4 text-sm" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
              {product.cushionNote ? (
                <p className="mt-6 text-xs leading-6 text-[#747c79]">
                  {product.cushionNote}
                </p>
              ) : null}
              {product.displayNotice ? (
                <p className="mt-3 text-xs leading-6 text-[#747c79]">
                  <strong className="mr-2 font-medium text-[#3d4744]">图片展示说明</strong>
                  {product.displayNotice}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {product.consultation ? (
        <section className={`${sectionClass} pb-14 sm:pb-20 lg:pb-24`}>
          <div className="bg-[#273130] px-6 py-9 text-white sm:px-10 sm:py-11 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12">
            <div>
              <p className="hidden text-xs font-medium tracking-[0.18em] text-[#9bd8e1] sm:block">
                CATDOW CONSULTATION
              </p>
              <h2 className="text-3xl font-medium tracking-[-0.045em] sm:mt-4 sm:text-4xl">
                {product.consultation.title}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                {product.consultation.description}
              </p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
              <Link
                className="inline-flex min-h-12 w-full items-center justify-center bg-white px-6 text-sm font-medium text-[#273130] transition-colors hover:bg-[#d9f0f3] sm:w-auto"
                href="/contact"
              >
                {product.consultation.primaryLabel}
              </Link>
              {product.consultation.secondaryLabel ? (
                <Link
                  className="inline-flex min-h-12 w-full items-center justify-center border border-white/35 px-6 text-sm font-medium text-white transition-colors hover:border-white/75 sm:w-auto"
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
        <nav aria-label="上一款和下一款产品" className="border-t border-black/10">
          <div className={`${sectionClass} grid sm:grid-cols-2`}>
            {previousProduct ? (
              <Link
                className="border-b border-black/10 py-8 transition-colors hover:text-[var(--moss)] sm:border-b-0 sm:border-r sm:pr-8"
                href={`/products/${previousProduct.slug}`}
              >
                <span className="text-xs text-[#747c79]">← 上一款</span>
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
                <span className="text-xs text-[#747c79]">下一款 →</span>
                <strong className="mt-3 block text-lg font-medium">{nextProduct.name}</strong>
              </Link>
            ) : null}
          </div>
        </nav>
      ) : null}
    </main>
  );
}
