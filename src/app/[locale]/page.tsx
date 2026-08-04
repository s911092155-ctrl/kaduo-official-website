import Image from "next/image";
import type {Metadata} from "next";
import {getTranslations, setRequestLocale} from "next-intl/server";
import { HeroParallax } from "@/components/motion/hero-parallax";
import { MotionProvider } from "@/components/motion/motion-provider";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import {
  StickyProductStory,
  type ProductStoryItem,
} from "@/components/motion/sticky-product-story";
import {homepageImagePaths} from "@/config/homepage-images";
import {getLocalizedProductById} from "@/data/products";
import {Link} from "@/i18n/navigation";
import {localizedMetadata} from "@/i18n/metadata";
import type {AppLocale} from "@/i18n/routing";

type Props = {params: Promise<{locale: AppLocale}>};
type StoryMessage = {eyebrow: string; title: string; description: string};
type MaterialPoint = {term: string; detail: string};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Metadata"});
  return localizedMetadata({locale, pathname: "/", title: t("homeTitle"), description: t("siteDescription")});
}

export default async function Home({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const featuredProduct = getLocalizedProductById("cactus-haven-acrylic-cat-tree", locale);
  const storyMessages = t.raw("storyItems") as StoryMessage[];
  const materialPoints = t.raw("materialPoints") as MaterialPoint[];
  const alt = (key: string) => t(`imageAlts.${key}`);
  const homepageImages = {
    hero: {src:homepageImagePaths.hero,alt:alt("hero"),notice:t("imageNotice")},
    productSeries:{src:homepageImagePaths.productSeries,alt:alt("productSeries"),notice:t("imageNotice")},
    catFamily:{src:homepageImagePaths.catFamily,alt:alt("catFamily"),notice:t("catImageNotice")},
    materialDetail:{src:homepageImagePaths.materialDetail,alt:alt("materialDetail"),notice:t("materialImageNotice")},
    sharedSpace:{src:homepageImagePaths.sharedSpace,alt:alt("sharedSpace"),notice:t("imageNotice")},
  };
  const storyImages = [homepageImages.hero, homepageImages.catFamily, homepageImages.sharedSpace, homepageImages.materialDetail];
  const productStory: ProductStoryItem[] = storyMessages.map((item,index) => ({...item,image:storyImages[index].src,alt:storyImages[index].alt,notice:storyImages[index].notice}));
  const lines = (value: string) => value.split("\n").map((line,index,array) => <span key={line}>{line}{index < array.length-1 ? <br /> : null}</span>);
  return (
    <MotionProvider>
      <div className="home-warm">
        <HeroParallax
          alt={homepageImages.hero.alt}
          note={homepageImages.hero.notice}
          src={homepageImages.hero.src}
        >
          <p className="warm-eyebrow">{t("heroEyebrow")}</p>
          <h1>{lines(t("heroTitle"))}</h1>
          <p className="warm-hero__summary">
            {t("heroSummary")}
          </p>
          <div className="warm-actions">
            <Link className="warm-button warm-button--primary" href="/products">
              {t("exploreProducts")} <span aria-hidden="true">↗</span>
            </Link>
            <Link className="warm-button warm-button--quiet" href="/brand">
              {t("aboutCatdow")}
            </Link>
          </div>
        </HeroParallax>

        <section className="warm-products warm-shell">
          <div className="warm-section-heading">
            <RevealOnScroll>
              <p className="warm-eyebrow">{t("seriesEyebrow")}</p>
              <h2>{lines(t("seriesTitle"))}</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p>
                {t("seriesIntro")}
              </p>
            </RevealOnScroll>
          </div>

          <div className="warm-product-grid">
            <RevealOnScroll className="warm-product-card" distance={20}>
              <Link href="/products" aria-label={t("exploreProducts")}>
                <figure>
                  <Image
                    alt={homepageImages.productSeries.alt}
                    fill
                    sizes="(min-width: 900px) 72vw, 100vw"
                    src={homepageImages.productSeries.src}
                  />
                  <figcaption>{homepageImages.productSeries.notice}</figcaption>
                </figure>
                <div className="warm-product-card__meta">
                  <div>
                    <p>{featuredProduct?.name ?? t("productPreparing")}</p>
                    <span>
                      {featuredProduct?.summary ?? t("productPreparingSummary")}
                      {t("conceptDisclaimer")}
                    </span>
                  </div>
                  <span>{t("draftInfo")} ↗</span>
                </div>
              </Link>
            </RevealOnScroll>
          </div>
        </section>

        <section className="warm-story-intro warm-shell">
          <RevealOnScroll>
            <p className="warm-eyebrow">{t("storyEyebrow")}</p>
            <h2>{lines(t("storyTitle"))}</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <p>{t("storyIntro")}</p>
          </RevealOnScroll>
        </section>

        <StickyProductStory items={productStory} label={t("storyEyebrow")} />

        <section className="cat-family warm-shell">
          <RevealOnScroll className="cat-family__image" distance={28}>
            <Image
              alt={homepageImages.catFamily.alt}
              fill
              sizes="(min-width: 900px) 68vw, 100vw"
              src={homepageImages.catFamily.src}
            />
            <p>{homepageImages.catFamily.notice}</p>
          </RevealOnScroll>
          <div className="cat-family__copy">
            <RevealOnScroll>
              <p className="warm-eyebrow">{t("catEyebrow")}</p>
              <p className="cat-family__word" aria-hidden="true">{t("catWord")}</p>
              <h2>{lines(t("catTitle"))}</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="cat-family__body">
                {t("catBody")}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="warm-material">
          <div className="warm-shell warm-material__grid">
            <RevealOnScroll className="warm-material__copy">
              <p className="warm-eyebrow">{t("materialEyebrow")}</p>
              <h2>{lines(t("materialTitle"))}</h2>
              <p>
                {t("materialBody")}
              </p>
              <dl>
                {materialPoints.map((point) => <div key={point.term}><dt>{point.term}</dt><dd>{point.detail}</dd></div>)}
              </dl>
            </RevealOnScroll>
            <RevealOnScroll
              className="warm-material__image"
              delay={0.08}
              distance={20}
              scaleFrom={0.965}
            >
              <Image
                alt={homepageImages.materialDetail.alt}
                fill
                sizes="(min-width: 900px) 54vw, 100vw"
                src={homepageImages.materialDetail.src}
              />
              <span>{homepageImages.materialDetail.notice}</span>
            </RevealOnScroll>
          </div>
        </section>

        <section className="shared-space warm-shell">
          <RevealOnScroll className="shared-space__heading">
            <p className="warm-eyebrow">{t("spaceEyebrow")}</p>
            <h2>{lines(t("spaceTitle"))}</h2>
          </RevealOnScroll>
          <RevealOnScroll className="shared-space__image" delay={0.08}>
            <Image
              alt={homepageImages.sharedSpace.alt}
              fill
              sizes="100vw"
              src={homepageImages.sharedSpace.src}
            />
            <div>
              <p>HOME / CAT / CATDOW</p>
              <span>{t("spaceNote")}</span>
            </div>
          </RevealOnScroll>
        </section>

        <section className="warm-closing warm-shell">
          <RevealOnScroll>
            <p className="warm-eyebrow">{t("closingEyebrow")}</p>
            <h2>{lines(t("closingTitle"))}</h2>
            <Link className="warm-button warm-button--primary" href="/brand">
              {t("aboutCatdow")} <span aria-hidden="true">↗</span>
            </Link>
          </RevealOnScroll>
        </section>
      </div>
    </MotionProvider>
  );
}
