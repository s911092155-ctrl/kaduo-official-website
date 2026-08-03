import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "品牌故事",
  description: "了解凯朵 KADUO 对人宠共居生活的思考。",
};

export default function BrandPage() {
  return (
    <>
      <PageHero
        eyebrow="OUR STORY"
        title="品牌故事"
        description="凯朵从一个具体的问题开始：宠物进入家庭之后，它们需要的物品，能不能不打断家的秩序与审美？"
      />
      <section className="page-shell grid gap-12 py-16 sm:py-24 md:grid-cols-[0.7fr_1.3fr]">
        <p className="eyebrow">WHY KADUO</p>
        <div className="max-w-3xl space-y-7 text-lg leading-9 text-[var(--muted)]">
          <p>
            人与宠物共享的不只是面积，也是每天经过的路径、停留的角落和彼此陪伴的时间。我们希望从这些真实场景出发，重新理解宠物家居应该怎样被设计。
          </p>
          <p>
            凯朵仍处在品牌建设的早期阶段。我们不急着用未经确认的数字或标签定义自己，而是先把产品资料、设计方法和信息标准建立清楚。
          </p>
          <p>
            这版网站是起点。随着产品完成验证，公开内容会逐步补充；任何材质、尺寸与功能说明，都应以最终确认资料为准。
          </p>
        </div>
      </section>
      <section className="bg-[var(--moss)] text-[var(--paper)]">
        <div className="page-shell grid gap-10 py-16 sm:py-24 md:grid-cols-2 md:items-end">
          <h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-6xl">
            家不是人的布景，也不是宠物的容器。
          </h2>
          <p className="max-w-xl text-lg leading-8 text-[color:rgba(245,241,232,0.78)]">
            它是一段共同生活。凯朵想做的，是把两种尺度放在同一张设计图里。
          </p>
        </div>
      </section>
    </>
  );
}
