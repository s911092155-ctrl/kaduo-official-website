import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "联系咨询",
  description: "联系凯朵 CATDOW。正式联系方式将在确认后公布。",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="联系咨询"
        description="欢迎就产品、空间合作或品牌事务与凯朵联系。当前版本暂未接入在线表单，正式联系方式确认后会更新到这里。"
      />
      <section className="page-shell grid gap-8 py-16 sm:py-24 md:grid-cols-2">
        <div className="rounded-[2rem] bg-[var(--paper-deep)] p-7 sm:p-10">
          <p className="eyebrow">CONTACT DETAILS</p>
          <h2 className="mt-5 font-serif text-3xl">联系方式待补充</h2>
          <p className="mt-5 max-w-lg leading-7 text-[var(--muted)]">
            为避免误导，这里没有使用临时邮箱、电话号码或办公地址。准备上线前，请将已经确认的联系方式补充到本页面。
          </p>
        </div>
        <div className="rounded-[2rem] border border-[var(--line)] p-7 sm:p-10">
          <p className="eyebrow">BEFORE PUBLISHING</p>
          <h2 className="mt-5 font-serif text-3xl">上线前需要确认</h2>
          <ul className="mt-6 space-y-4 text-[var(--muted)]">
            {["对外联系邮箱", "客服电话或企业微信", "办公地址（如需公开）", "咨询信息的处理方式"].map(
              (item) => (
                <li className="flex gap-3 border-b border-[var(--line)] pb-4" key={item}>
                  <span aria-hidden="true" className="text-[var(--moss)]">
                    ○
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
    </>
  );
}
