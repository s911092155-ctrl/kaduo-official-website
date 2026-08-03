import Link from "next/link";
import { PlaceholderArt } from "@/components/placeholder-art";

const principles = [
  {
    number: "01",
    title: "从共同生活出发",
    description: "同时考虑宠物的行动习惯与人的居住方式，让功能自然进入日常。",
  },
  {
    number: "02",
    title: "让设计回到空间",
    description: "关注比例、轮廓与摆放关系，减少宠物用品对居住空间的割裂感。",
  },
  {
    number: "03",
    title: "为长期使用留余地",
    description: "从结构、维护与可替换性思考产品，具体方案将在产品资料完整后公开。",
  },
];

export default function Home() {
  return (
    <>
      <section className="page-shell grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <div className="max-w-3xl">
          <p className="eyebrow">KADUO · PET LIVING</p>
          <h1 className="mt-7 text-balance font-serif text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.92] tracking-[-0.055em] text-[var(--ink)]">
            与宠物一起，
            <span className="block text-[var(--moss)]">住得更像家。</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
            凯朵 KADUO 是一个高端宠物家居与人宠共居美学品牌。我们关注宠物的真实需要，也在意一件物品进入家之后，如何与空间、人与日常相处。
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link className="button-primary" href="/products">
              查看产品中心
            </Link>
            <Link className="button-secondary" href="/design">
              了解设计理念
            </Link>
          </div>
        </div>
        <PlaceholderArt />
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-deep)]">
        <div className="page-shell grid gap-8 py-16 md:grid-cols-[0.7fr_1.3fr] md:py-24">
          <div>
            <p className="eyebrow">OUR POINT OF VIEW</p>
            <p className="mt-4 text-sm text-[var(--muted)]">人宠共居，不必牺牲家的完整感。</p>
          </div>
          <div>
            <h2 className="max-w-4xl font-serif text-3xl leading-tight tracking-tight sm:text-5xl">
              宠物用品可以有清楚的功能，也可以安静地成为居住空间的一部分。
            </h2>
            <Link className="text-link mt-8" href="/brand">
              阅读品牌故事
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">DESIGN PRINCIPLES</p>
            <h2 className="section-title mt-4">我们如何思考一件产品</h2>
          </div>
          <Link className="text-link" href="/design">
            查看完整理念
          </Link>
        </div>
        <div className="mt-12 grid border-t border-[var(--line)] md:grid-cols-3">
          {principles.map((principle) => (
            <article
              className="border-b border-[var(--line)] py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              key={principle.number}
            >
              <p className="text-sm tabular-nums text-[var(--moss)]">{principle.number}</p>
              <h3 className="mt-12 text-xl font-medium">{principle.title}</h3>
              <p className="mt-4 leading-7 text-[var(--muted)]">{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell pb-20 sm:pb-28">
        <div className="rounded-[2rem] bg-[var(--ink)] px-6 py-12 text-[var(--paper)] sm:px-12 sm:py-16">
          <p className="eyebrow !text-[var(--sage)]">PRODUCTS IN PREPARATION</p>
          <div className="mt-6 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-5xl">
              首批产品资料正在整理中，完整信息确认后再与您见面。
            </h2>
            <Link className="button-light" href="/products">
              前往产品中心
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
