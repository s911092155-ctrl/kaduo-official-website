"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import type { ProductImage, ProductModule } from "@/data/products";

export type ModuleExplorerItem = ProductModule & {
  image: ProductImage;
};

type ModuleExplorerProps = {
  featured: ModuleExplorerItem[];
  overviewImage: ProductImage;
  remaining: ProductModule[];
  note: string | null;
};

const hotspotPositions = [
  { left: "46%", top: "20%" },
  { left: "52%", top: "39%" },
  { left: "48%", top: "57%" },
  { left: "52%", top: "72%" },
] as const;

export function ModuleExplorer({
  featured,
  overviewImage,
  remaining,
  note,
}: ModuleExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const active = featured[activeIndex];
  const detailId = useId();
  const reducedMotion = useReducedMotion();

  if (!active) {
    return null;
  }

  function handleModuleKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveIndex(index);
    }
  }

  return (
    <div>
      <div className="hidden gap-8 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:items-start xl:gap-12">
        <div className="sticky top-24">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#eceeea]">
            <Image
              alt={overviewImage.alt}
              className="object-cover transition-transform duration-300 motion-reduce:transition-none hover:scale-[1.02]"
              fill
              sizes="(min-width: 1280px) 700px, 58vw"
              src={overviewImage.src}
            />
            <div aria-label="产品模块热点" className="absolute inset-0" role="group">
              {featured.map((item, index) => {
                const selected = index === activeIndex;
                const position = hotspotPositions[index] ?? hotspotPositions[0];

                return (
                  <button
                    aria-controls={detailId}
                    aria-pressed={selected}
                    aria-label={`查看${item.name}`}
                    className={`product-module-hotspot product-detail-control ${selected ? "is-active" : ""}`}
                    key={item.name}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleModuleKeyDown(event, index)}
                    style={position}
                    type="button"
                  >
                    <span aria-hidden="true" className="product-module-hotspot__dot">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="product-module-hotspot__label">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-[0.7rem] leading-5 text-[#66706e]">
            {overviewImage.caption}
          </p>
        </div>

        <div>
          <div className="relative aspect-[16/10] overflow-hidden bg-[#eceeea]" id={detailId}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0"
                exit={{ opacity: 0 }}
                initial={{ opacity: reducedMotion ? 1 : 0 }}
                key={active.image.src}
                transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
              >
                <Image
                  alt={active.image.alt}
                  className="object-cover transition-transform duration-300 motion-reduce:transition-none hover:scale-[1.02]"
                  fill
                  sizes="(min-width: 1280px) 440px, 40vw"
                  src={active.image.src}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-3 text-[0.7rem] leading-5 text-[#66706e]">
            {active.image.caption}
          </p>

          <ol className="product-detail-module-panel mt-5 px-5">
            {featured.map((item, index) => {
              const selected = index === activeIndex;

              return (
                <li className="border-b border-black/10 last:border-b-0" key={item.name}>
                  <button
                    aria-controls={detailId}
                    aria-pressed={selected}
                    className="product-detail-control group grid w-full grid-cols-[2rem_1fr] gap-3 py-4 text-left outline-none"
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleModuleKeyDown(event, index)}
                    type="button"
                  >
                    <span className="pt-1 text-[0.65rem] text-[var(--moss)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={`block text-base font-medium transition-colors ${selected ? "text-[var(--moss)]" : "group-hover:text-[var(--moss)]"}`}>
                        {item.name}
                      </span>
                      {selected && item.description ? (
                        <span aria-live="polite" className="mt-1.5 block text-xs leading-6 text-[#66706e]">
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
      </div>

      <div className="lg:hidden">
        <div aria-label="选择产品模块" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8" role="group">
          {featured.map((item, index) => {
            const selected = index === activeIndex;

            return (
              <button
                aria-pressed={selected}
                className={`product-detail-control min-h-11 shrink-0 border px-4 text-sm font-medium outline-none ${selected ? "border-[var(--moss)] bg-[#e7efeb] text-[var(--moss)]" : "border-black/12 bg-white/45 text-[#46514e]"}`}
                key={item.name}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleModuleKeyDown(event, index)}
                type="button"
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#eceeea]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0"
                exit={{ opacity: 0 }}
                initial={{ opacity: reducedMotion ? 1 : 0 }}
                key={active.image.src}
                transition={{ duration: reducedMotion ? 0 : 0.22, ease: "easeOut" }}
              >
                <Image
                  alt={active.image.alt}
                  className="object-cover"
                  fill
                  sizes="100vw"
                  src={active.image.src}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 grid grid-cols-[2rem_1fr] gap-3">
            <span className="pt-1 text-xs text-[var(--moss)]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <div aria-live="polite">
              <h3 className="text-xl font-medium tracking-[-0.025em]">{active.name}</h3>
              {active.description ? (
                <p className="mt-2 text-sm leading-7 text-[#66706e]">{active.description}</p>
              ) : null}
            </div>
          </div>
          <p className="mt-3 text-[0.7rem] leading-5 text-[#66706e]">{active.image.caption}</p>
        </div>
      </div>

      {remaining.length > 0 ? (
        <div className="mt-10 border-t border-black/12 pt-6">
          <button
            aria-expanded={showAll}
            className="product-detail-control group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-[#2d3937] outline-none hover:text-[var(--moss)] focus-visible:text-[var(--moss)]"
            onClick={() => setShowAll((current) => !current)}
            type="button"
          >
            {showAll ? "收起其他设计模块" : "查看全部设计模块"}
            <span aria-hidden="true" className="product-detail-action-arrow">{showAll ? "−" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {showAll ? (
              <motion.div
                animate={{ height: "auto", opacity: 1 }}
                className="overflow-hidden"
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: reducedMotion ? 1 : 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.24, ease: "easeOut" }}
              >
                <ul className="mt-6 grid gap-x-12 border-t border-black/10 sm:grid-cols-2">
                  {remaining.map((item) => (
                    <li className="border-b border-black/10 py-5" key={item.name}>
                      <h3 className="font-medium">{item.name}</h3>
                      {item.description ? (
                        <p className="mt-2 text-sm leading-7 text-[#66706e]">{item.description}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <noscript>
            <ul className="mt-6 grid gap-x-12 border-t border-black/10 sm:grid-cols-2">
              {remaining.map((item) => (
                <li className="border-b border-black/10 py-5" key={item.name}>
                  <h3 className="font-medium">{item.name}</h3>
                  {item.description ? <p className="mt-2 text-sm leading-7">{item.description}</p> : null}
                </li>
              ))}
            </ul>
          </noscript>
        </div>
      ) : null}

      {note ? <p className="mt-6 max-w-3xl text-xs leading-6 text-[#747c79]">{note}</p> : null}
    </div>
  );
}
