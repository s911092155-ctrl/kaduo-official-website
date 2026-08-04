"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ProductImage, ProductModule } from "@/data/products";
import { ProductMedia } from "@/components/products/product-detail/product-media";

export type ModuleExplorerItem = ProductModule & {
  image: ProductImage;
};

type ModuleExplorerProps = {
  featured: ModuleExplorerItem[];
  remaining: ProductModule[];
  note: string | null;
};

export function ModuleExplorer({
  featured,
  remaining,
  note,
}: ModuleExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const active = featured[activeIndex];

  if (!active) {
    return null;
  }

  return (
    <div>
      <div className="hidden gap-12 lg:grid lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="sticky top-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              key={active.image.src}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <ProductMedia
                frameClassName="aspect-[4/3]"
                image={active.image}
                imageClassName={
                  active.image.sourceType === "ai-render"
                    ? "object-cover"
                    : "object-contain"
                }
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <ol className="border-t border-black/12">
          {featured.map((item, index) => {
            const selected = index === activeIndex;

            return (
              <li className="border-b border-black/12" key={item.name}>
                <button
                  aria-current={selected ? "true" : undefined}
                  className="group grid w-full grid-cols-[2rem_1fr] gap-4 py-6 text-left outline-none transition-colors focus-visible:text-[var(--moss)]"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  type="button"
                >
                  <span className="pt-1 text-xs text-[var(--moss)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-xl font-medium tracking-[-0.025em] group-hover:text-[var(--moss)]">
                      {item.name}
                    </span>
                    {item.description ? (
                      <span
                        className={`mt-2 block text-sm leading-7 text-[#66706e] transition-opacity ${selected ? "opacity-100" : "opacity-65"}`}
                      >
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="lg:hidden">
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
          {featured.map((item, index) => (
            <article
              className="w-[82vw] max-w-[21rem] shrink-0 snap-center"
              key={item.name}
            >
              <ProductMedia
                frameClassName="aspect-[4/3]"
                image={item.image}
                imageClassName="object-cover"
                sizes="82vw"
              />
              <div className="mt-5 grid grid-cols-[2rem_1fr] gap-3">
                <span className="pt-1 text-xs text-[var(--moss)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.025em]">
                    {item.name}
                  </h3>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-7 text-[#66706e]">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-2 text-xs text-[#7a817f]">左右滑动查看四个重点模块</p>
      </div>

      {remaining.length > 0 ? (
        <div className="mt-10 border-t border-black/12 pt-6">
          <button
            aria-expanded={showAll}
            className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-[#2d3937] outline-none transition-colors hover:text-[var(--moss)] focus-visible:text-[var(--moss)]"
            onClick={() => setShowAll((current) => !current)}
            type="button"
          >
            {showAll ? "收起其他设计模块" : "查看全部设计模块"}
            <span aria-hidden="true">{showAll ? "−" : "+"}</span>
          </button>
          {showAll ? (
            <ul className="mt-6 grid gap-x-12 border-t border-black/10 sm:grid-cols-2">
              {remaining.map((item) => (
                <li className="border-b border-black/10 py-5" key={item.name}>
                  <h3 className="font-medium">{item.name}</h3>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-7 text-[#66706e]">
                      {item.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {note ? (
        <p className="mt-6 max-w-3xl text-xs leading-6 text-[#747c79]">{note}</p>
      ) : null}
    </div>
  );
}
