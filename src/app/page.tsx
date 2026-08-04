import Image from "next/image";
import Link from "next/link";
import { HeroParallax } from "@/components/motion/hero-parallax";
import { MotionProvider } from "@/components/motion/motion-provider";
import { RevealOnScroll } from "@/components/motion/reveal-on-scroll";
import {
  StickyProductStory,
  type ProductStoryItem,
} from "@/components/motion/sticky-product-story";
import { products } from "@/data/products";

const featuredProduct = products.find((product) => product.id === "cactus-cat-tree");

const productStory: ProductStoryItem[] = [
  {
    eyebrow: "01 / 整体设计",
    title: "在家里，它先是一件家具。",
    description:
      "透明结构让产品进入客厅时保持轻盈。具体比例、尺寸与承重信息将在产品资料确认后发布。",
    image: "/images/home/warm-hero-living-room.png",
    alt: "明亮客厅中的透明宠物家具与猫咪视觉示意",
  },
  {
    eyebrow: "02 / 猫咪功能",
    title: "猫可以停留，观察，也可以安心休息。",
    description:
      "功能从猫真实的日常动作出发。当前画面用于确认猫与家具、人与空间之间的关系，不代替功能参数。",
    image: "/images/home/cat-family-living-room.png",
    alt: "猫咪在透明家具旁休息的温暖家居视觉示意",
  },
  {
    eyebrow: "03 / 模块系统",
    title: "把活动路径，整理成家的秩序。",
    description:
      "模块或配件将由产品数据独立维护。未经确认的组合方式和数量不会提前写入页面。",
    image: "/images/home/warm-hero-living-room.png",
    alt: "透明宠物家具在现代住宅中的空间视觉示意",
  },
  {
    eyebrow: "04 / 材质细节",
    title: "透明，不等于没有细节。",
    description:
      "边缘、连接与光线共同影响产品在家中的质感。正式材质说明将以确认后的产品资料为准。",
    image: "/images/home/acrylic-warm-detail.png",
    alt: "自然光下的透明亚克力边缘和连接细节视觉示意",
  },
];

export default function Home() {
  return (
    <MotionProvider>
      <div className="home-warm">
        <HeroParallax
          alt="明亮现代客厅中的透明宠物家具与猫咪视觉示意"
          note="家居与产品视觉示意 / 实物图片待替换"
          src="/images/home/warm-hero-living-room.png"
        >
          <p className="warm-eyebrow">KADUO / 猫与家的共同风景</p>
          <h1>让猫的领地，<br />成为家的风景。</h1>
          <p className="warm-hero__summary">
            将猫真实的生活方式，放进现代家居的尺度里。透明家具留住光，也让陪伴自然发生。
          </p>
          <div className="warm-actions">
            <Link className="warm-button warm-button--primary" href="/products">
              探索产品 <span aria-hidden="true">↗</span>
            </Link>
            <Link className="warm-button warm-button--quiet" href="/brand">
              了解凯朵
            </Link>
          </div>
        </HeroParallax>

        <section className="warm-products warm-shell">
          <div className="warm-section-heading">
            <RevealOnScroll>
              <p className="warm-eyebrow">01 / 产品系列</p>
              <h2>为猫设计，<br />也为家选择。</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.08}>
              <p>
                产品资料可以持续增加。每件产品都保留名称、简介、设计理念、功能、材质、尺寸和图片等独立字段。
              </p>
            </RevealOnScroll>
          </div>

          <div className="warm-product-grid">
            <RevealOnScroll className="warm-product-card" distance={20}>
              <Link href="/products" aria-label="查看仙人掌猫爬架产品资料">
                <figure>
                  <Image
                    alt="仙人掌猫爬架家居场景视觉示意"
                    fill
                    sizes="(min-width: 900px) 72vw, 100vw"
                    src="/images/home/warm-hero-living-room.png"
                  />
                  <figcaption>视觉示意 / 实物图片待替换</figcaption>
                </figure>
                <div className="warm-product-card__meta">
                  <div>
                    <p>{featuredProduct?.name ?? "产品资料整理中"}</p>
                    <span>{featuredProduct?.summary ?? "产品资料整理中，暂不对外发布。"}</span>
                  </div>
                  <span>草稿资料 ↗</span>
                </div>
              </Link>
            </RevealOnScroll>
          </div>
        </section>

        <section className="warm-story-intro warm-shell">
          <RevealOnScroll>
            <p className="warm-eyebrow">02 / 旗舰产品叙事</p>
            <h2>从一件家具，<br />看见猫在家的每一天。</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <p>向下滚动，依次查看整体设计、猫咪功能、模块系统与材质细节。</p>
          </RevealOnScroll>
        </section>

        <StickyProductStory items={productStory} />

        <section className="cat-family warm-shell">
          <RevealOnScroll className="cat-family__image" distance={28}>
            <Image
              alt="猫咪在明亮客厅中陪伴家人生活的视觉示意"
              fill
              sizes="(min-width: 900px) 68vw, 100vw"
              src="/images/home/cat-family-living-room.png"
            />
            <p>生活场景视觉示意 / 非实际产品图</p>
          </RevealOnScroll>
          <div className="cat-family__copy">
            <RevealOnScroll>
              <p className="warm-eyebrow">03 / 猫与家</p>
              <p className="cat-family__word" aria-hidden="true">一起生活</p>
              <h2>猫不是宠物用品的使用者。<br />它是住在这里的家人。</h2>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p className="cat-family__body">
                所以我们关心的不只是猫能不能使用，也关心一件家具如何进入共同的客厅、光线和日常。
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <section className="warm-material">
          <div className="warm-shell warm-material__grid">
            <RevealOnScroll className="warm-material__copy">
              <p className="warm-eyebrow">04 / 材质与设计</p>
              <h2>让透明，<br />经得起近看。</h2>
              <p>
                透明材质会把边缘、连接与环境光放大。页面先呈现设计关注点，具体材质与结构参数仍等待产品资料确认。
              </p>
              <dl>
                <div><dt>边缘</dt><dd>观察触感与光线表现</dd></div>
                <div><dt>连接</dt><dd>整理结构与视觉关系</dd></div>
                <div><dt>模块</dt><dd>为后续产品扩展保留位置</dd></div>
              </dl>
            </RevealOnScroll>
            <RevealOnScroll
              className="warm-material__image"
              delay={0.08}
              distance={20}
              scaleFrom={0.965}
            >
              <Image
                alt="暖色自然光中的透明亚克力边缘与连接细节视觉示意"
                fill
                sizes="(min-width: 900px) 54vw, 100vw"
                src="/images/home/acrylic-warm-detail.png"
              />
              <span>材质视觉示意 / 参数待确认</span>
            </RevealOnScroll>
          </div>
        </section>

        <section className="shared-space warm-shell">
          <RevealOnScroll className="shared-space__heading">
            <p className="warm-eyebrow">05 / 共居空间</p>
            <h2>它属于猫，<br />也自然属于这个家。</h2>
          </RevealOnScroll>
          <RevealOnScroll className="shared-space__image" delay={0.08}>
            <Image
              alt="透明宠物家具、猫与现代客厅共同生活的视觉示意"
              fill
              sizes="100vw"
              src="/images/home/warm-hero-living-room.png"
            />
            <div>
              <p>HOME / CAT / KADUO</p>
              <span>真实产品照片到位后，可直接替换当前场景图。</span>
            </div>
          </RevealOnScroll>
        </section>

        <section className="warm-closing warm-shell">
          <RevealOnScroll>
            <p className="warm-eyebrow">KADUO / 让陪伴留在风景里</p>
            <h2>从猫的日常出发，<br />回到家的日常。</h2>
            <Link className="warm-button warm-button--primary" href="/brand">
              了解凯朵 <span aria-hidden="true">↗</span>
            </Link>
          </RevealOnScroll>
        </section>
      </div>
    </MotionProvider>
  );
}
