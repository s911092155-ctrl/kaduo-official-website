import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "设计理念",
  description: "凯朵 KADUO 的人宠共居设计原则。",
};

const methods = [
  {
    number: "01",
    title: "先看生活，再画物件",
    text: "从宠物与人的日常路径、停留位置和互动方式出发，再判断产品应该承担什么功能。",
  },
  {
    number: "02",
    title: "同时处理两种尺度",
    text: "宠物在意攀爬、停靠与安全感，人则要考虑清洁、动线和空间关系。设计需要让两边都成立。",
  },
  {
    number: "03",
    title: "结构应当容易理解",
    text: "模块、配件与维护方式会在产品资料中明确记录。无法确认的内容不会提前写入公开页面。",
  },
  {
    number: "04",
    title: "视觉表达保持克制",
    text: "轮廓、色彩和材质需要进入真实居住环境。它们不应只在单张产品图里好看。",
  },
];

export default function DesignPage() {
  return (
    <>
      <PageHero
        eyebrow="DESIGN PHILOSOPHY"
        title="设计理念"
        description="我们把宠物的行为尺度、人的使用习惯和家的空间关系放在一起考虑。功能清楚，表达克制，信息经得起核对。"
      />
      <section className="page-shell py-16 sm:py-24">
        <div className="grid border-t border-[var(--line)] md:grid-cols-2">
          {methods.map((method) => (
            <article
              className="border-b border-[var(--line)] py-10 md:min-h-72 md:px-10 md:even:border-l md:first:pl-0 md:nth-[3]:pl-0"
              key={method.number}
            >
              <p className="text-sm text-[var(--moss)]">{method.number}</p>
              <h2 className="mt-12 font-serif text-3xl">{method.title}</h2>
              <p className="mt-5 max-w-xl leading-7 text-[var(--muted)]">{method.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
