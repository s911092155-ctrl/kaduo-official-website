"use client";

import Image from "next/image";
import {motion, useReducedMotion} from "motion/react";
import {useLocale, useTranslations} from "next-intl";
import {useState} from "react";
import type {LocalizedProduct, ProductImage} from "@/data/products";
import {Link} from "@/i18n/navigation";

const sectionClass = "mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10";

type Props = {product: LocalizedProduct; isDraftPreview: boolean};

function ConceptImage({image, alt, priority = false}: {image: ProductImage; alt: string; priority?: boolean}) {
  return <Image alt={alt} className="object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none" fill loading={priority ? "eager" : "lazy"} sizes="(min-width: 1024px) 58vw, 100vw" src={image.src} />;
}

export function BlushHavenDetail({product, isDraftPreview}: Props) {
  const t = useTranslations("ProductDetail");
  const locale = useLocale();
  const reducedMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);
  const [materialIndex, setMaterialIndex] = useState(0);
  const [showDesignNotes, setShowDesignNotes] = useState(false);
  const mainImage = product.images.main;
  const scenes = product.images.scenes;
  const details = product.images.details;
  const mainCaption = mainImage?.caption;
  const scene = scenes[sceneIndex] ?? mainImage;
  const materialImages = [details[0], details[1], mainImage].filter((image): image is ProductImage => Boolean(image));
  const materialImage = materialImages[materialIndex] ?? mainImage;
  const labels = locale === "en" ? {
    eyebrow: "SHARED LIVING FURNITURE", livingEyebrow: "CAT IN THE LIVING ROOM", designEyebrow: "V6 / DESIGN STAGE", materialEyebrow: "MATERIAL AND LIGHT", galleryEyebrow: "VISUAL GALLERY", standardEyebrow: "STANDARD CONFIGURATION",
    scenes: ["The cat's place", "At home together", "A shared room"], material: ["Transparent acrylic", "Structure and light", "The whole piece"], livingTitle: "How people and cats share this table", structureTitle: "V6 design structure", sizeTitle: "V6 design reference dimensions", galleryTitle: "A living-room piece, seen from close by", exclusions: "What is not included", detailsLink: "View product details"
  } : locale === "zh-TW" ? {
    eyebrow: "人貓共居傢俱系列", livingEyebrow: "貓與客廳", designEyebrow: "V6 / 設計階段", materialEyebrow: "材質與光線", galleryEyebrow: "視覺畫廊", standardEyebrow: "標準配置",
    scenes: ["貓的停留位置", "在家一起生活", "同一個客廳"], material: ["透明壓克力", "結構與光線", "整體視角"], livingTitle: "人與貓如何共享這張茶几", structureTitle: "V6設計結構", sizeTitle: "V6設計參考尺寸", galleryTitle: "一件客廳傢俱，從近處看", exclusions: "明確不包含", detailsLink: "了解產品配置"
  } : {
    eyebrow: "人猫共居家具系列", livingEyebrow: "猫与客厅", designEyebrow: "V6 / 设计阶段", materialEyebrow: "材质与光影", galleryEyebrow: "视觉画廊", standardEyebrow: "标准配置",
    scenes: ["猫的停留位置", "在家一起生活", "同一个客厅"], material: ["透明亚克力", "结构与光影", "整体视角"], livingTitle: "人和猫如何共享这张茶几", structureTitle: "V6设计结构", sizeTitle: "V6设计参考尺寸", galleryTitle: "一件客厅家具，从近处看", exclusions: "明确不包含", detailsLink: "了解产品配置"
  };

  if (!mainImage) return null;

  return <div className="overflow-clip bg-[#f8f7f3] text-[#202725]">
    <section className="border-b border-black/10">
      <div className={`${sectionClass} grid gap-7 pb-14 pt-7 lg:min-h-[790px] lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16 lg:py-16`}>
        <div className="order-2 lg:order-1">
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium tracking-[0.16em] text-[#8f6b6b]"><span>{labels.eyebrow}</span>{isDraftPreview ? <span className="border border-[#d7aaaa] bg-[rgba(250,248,243,0.72)] px-2.5 py-1 text-[0.64rem] text-[#8f5d65] backdrop-blur-sm">{t("draftPreview")}</span> : null}</div>
          <h1 className="mt-5 max-w-[9em] text-[clamp(2.65rem,5.2vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.06em]">{product.name}</h1>
          <p className="mt-4 text-xs tracking-[0.11em] text-[#6b7370] sm:text-sm">{product.englishName}</p>
          {product.summary ? <p className="mt-6 max-w-[35rem] text-base leading-8 text-[#596461] sm:text-lg">{product.summary}</p> : null}
          <Link className="product-detail-control group mt-7 inline-flex min-h-12 items-center gap-3 bg-[#273130] px-7 text-sm font-medium text-white hover:bg-[#8f5d65]" href="/contact">{product.inquiryLabel}<span aria-hidden="true" className="product-detail-action-arrow">→</span></Link>
        </div>
        <motion.figure animate={{y: reducedMotion ? 0 : -10}} className="group order-1 relative aspect-[3/4] overflow-hidden bg-[#efe7e3] lg:order-2 lg:aspect-[4/3]" initial={{y: 0}} transition={{duration: 0.45, ease: "easeOut"}}>
          <ConceptImage alt={mainImage.alt} image={mainImage} priority />
          {mainCaption ? <figcaption className="absolute bottom-3 left-3 right-3 max-w-[36rem] bg-[rgba(250,248,243,0.72)] px-3 py-2 text-[0.67rem] leading-5 text-[#5a6561] backdrop-blur-md">{mainCaption}</figcaption> : null}
        </motion.figure>
      </div>
    </section>

    <section className={`${sectionClass} py-16 sm:py-24 lg:py-28`}>
      <div className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
        <div><p className="text-xs font-medium tracking-[0.18em] text-[#9a7477]">CATDOW / BLUSH HAVEN</p><h2 className="mt-4 max-w-[10em] text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{product.designConceptTitle}</h2></div>
        <div className="max-w-[38rem] space-y-5 text-base leading-8 text-[#5e6864]">{product.detailIntroduction.map((item) => <p key={item}>{item}</p>)}</div>
      </div>
    </section>

    {scene ? <section className="bg-[#f1ece8] py-12 sm:py-16"><div className={sectionClass}><div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-16">
      <div className="group relative aspect-[3/4] overflow-hidden bg-[#eee4e0] sm:aspect-[16/10]"><ConceptImage alt={scene.alt} image={scene} /></div>
      <div><p className="text-xs font-medium tracking-[0.18em] text-[#9a7477]">{labels.livingEyebrow}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{labels.livingTitle}</h2><div className="mt-7 flex flex-wrap gap-2">{scenes.map((item, index) => <button aria-pressed={sceneIndex === index} className={`product-detail-control min-h-11 border px-4 text-sm ${sceneIndex === index ? "border-[#b9878d] bg-[rgba(250,248,243,0.76)] text-[#81575d]" : "border-black/10 text-[#5e6864]"}`} key={item.src} onClick={() => setSceneIndex(index)} type="button">{labels.scenes[index] ?? String(index + 1).padStart(2, "0")}</button>)}</div><p className="mt-5 max-w-[34rem] text-sm leading-7 text-[#66706e]">{scene.caption}</p></div>
    </div></div></section> : null}

    <section className={`${sectionClass} py-16 sm:py-24`}><div className="max-w-[38rem]"><p className="text-xs font-medium tracking-[0.18em] text-[#9a7477]">04 / EVERYDAY USE</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{t("coreExperienceTitle")}</h2></div><ol className="mt-10 grid border-t border-black/12 md:grid-cols-2">{product.features.map((feature, index) => <li className="grid grid-cols-[2rem_1fr] gap-4 border-b border-black/12 py-7 md:min-h-44 md:px-8 md:first:pl-0 md:even:border-l" key={feature.title}><span className="pt-1 text-xs text-[#9a7477]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-medium">{feature.title}</h3><p className="mt-3 max-w-[29rem] text-sm leading-7 text-[#5e6966]">{feature.description}</p></div></li>)}</ol></section>

    <section className="bg-[#f1ece8] py-16 sm:py-24"><div className={sectionClass}><div className="grid gap-9 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
      <div><p className="text-xs font-medium tracking-[0.18em] text-[#9a7477]">{labels.designEyebrow}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{labels.structureTitle}</h2><p className="mt-6 text-base leading-8 text-[#5e6864]">{product.modules[0]?.description}</p><button aria-expanded={showDesignNotes} className="product-detail-control mt-7 inline-flex min-h-11 items-center gap-3 border-b border-[#af8589] text-sm font-medium text-[#81575d]" onClick={() => setShowDesignNotes((value) => !value)} type="button">{showDesignNotes ? "−" : "+"} {showDesignNotes ? t("collapseModules") : t("allModules")}</button>{showDesignNotes ? <p className="mt-5 text-sm leading-7 text-[#66706e]">{product.moduleNote}</p> : null}</div>
      <div className="border-t border-[#cfbfc0] pt-5 lg:pt-12"><p className="text-xs tracking-[0.16em] text-[#7a7672]">{labels.sizeTitle}</p><p className="mt-4 whitespace-pre-line text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{product.dimensionsDisplay}</p><p className="mt-5 max-w-[38rem] whitespace-pre-line text-sm leading-7 text-[#66706e]">{product.dimensionsNote}</p><p className="mt-6 text-xs leading-6 text-[#7a7672]">{product.moduleNote}</p></div>
    </div></div></section>

    {materialImage ? <section className={`${sectionClass} py-16 sm:py-24`}><div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
      <div><p className="text-xs font-medium tracking-[0.18em] text-[#9a7477]">{labels.materialEyebrow}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{t("designDetails")}</h2><p className="mt-6 max-w-[38rem] text-base leading-8 text-[#5e6864]">{product.materialDescription}</p><div className="mt-7 flex flex-wrap gap-2">{materialImages.map((item, index) => <button aria-pressed={materialIndex === index} className={`product-detail-control min-h-11 border px-4 text-sm ${materialIndex === index ? "border-[#b9878d] bg-[rgba(250,248,243,0.76)] text-[#81575d]" : "border-black/10 text-[#5e6864]"}`} key={item.src} onClick={() => setMaterialIndex(index)} type="button">{labels.material[index]}</button>)}</div><p className="mt-5 max-w-[38rem] text-xs leading-6 text-[#747c79]">{product.materialNote}</p></div>
      <div className="group relative aspect-[3/4] overflow-hidden bg-[#f1e6e3] sm:aspect-[4/3]"><ConceptImage alt={materialImage.alt} image={materialImage} /></div>
    </div></section> : null}

    <section className={`${sectionClass} border-t border-black/10 py-16 sm:py-24`}><div className="max-w-[38rem]"><p className="text-xs font-medium tracking-[0.18em] text-[#9a7477]">{labels.galleryEyebrow}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{labels.galleryTitle}</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-12">{[mainImage, ...scenes, ...details].filter((image): image is ProductImage => Boolean(image)).map((image, index) => <div className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5 lg:pt-12" : "lg:col-span-4"} key={image.src}><figure className="group relative aspect-[3/4] overflow-hidden bg-[#eee4e0]"><ConceptImage alt={image.alt} image={image} /></figure></div>)}</div></section>

    <section className={`${sectionClass} border-t border-black/10 py-16 sm:py-20`}><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><div><p className="text-xs font-medium tracking-[0.18em] text-[#9a7477]">{labels.standardEyebrow}</p><h2 className="mt-4 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">{t("standardExclusions")}</h2></div><div><h3 className="text-base font-medium">{labels.exclusions}</h3><ul className="mt-5 grid grid-cols-2 gap-x-8 border-t border-black/12">{product.standardExclusions.map((item) => <li className="border-b border-black/12 py-4 text-sm" key={item}>{item}</li>)}</ul><p className="mt-6 text-xs leading-6 text-[#747c79]">{product.cushionNote}</p><p className="mt-3 text-xs leading-6 text-[#747c79]"><strong className="mr-2 font-medium text-[#3d4744]">{t("displayNoticeLabel")}</strong>{product.displayNotice}</p></div></div></section>

    {product.consultation ? <section className={`${sectionClass} pb-16 sm:pb-24`}><div className="bg-[#273130] px-6 py-9 text-white sm:px-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12"><div><h2 className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl">{product.consultation.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{product.consultation.description}</p><Link className="product-detail-control mt-5 inline-flex items-center gap-2 text-sm text-white/72 underline decoration-white/35 underline-offset-4 hover:text-white" href="/contact">{labels.detailsLink}<span aria-hidden="true" className="product-detail-action-arrow">→</span></Link></div><div className="mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col"><Link className="product-detail-control group inline-flex min-h-12 items-center justify-center gap-3 bg-white px-6 text-sm font-medium text-[#273130] hover:bg-[#f0dfe0]" href="/contact">{product.consultation.primaryLabel}<span aria-hidden="true" className="product-detail-action-arrow">→</span></Link><Link className="product-detail-control group inline-flex min-h-12 items-center justify-center gap-3 border border-white/35 px-6 text-sm font-medium text-white hover:border-white/75" href="/contact">{product.consultation.secondaryLabel}<span aria-hidden="true" className="product-detail-action-arrow">→</span></Link></div></div></section> : null}
  </div>;
}
