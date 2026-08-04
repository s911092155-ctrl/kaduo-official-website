"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import type { ProductImage } from "@/data/products";

export type MaterialExplorerItem = {
  name: string;
  description: string;
  image: ProductImage;
};

export function MaterialExplorer({ items, label }: { items: MaterialExplorerItem[]; label: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex];
  const panelId = useId();
  const reducedMotion = useReducedMotion();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  if (!active) {
    return null;
  }

  function handleTabKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
    }
  }

  return (
    <div className="mt-8">
      <div aria-label={label} className="flex gap-2 overflow-x-auto pb-2" role="tablist">
        {items.map((item, index) => {
          const selected = index === activeIndex;

          return (
            <button
              aria-controls={panelId}
              aria-selected={selected}
              className={`product-detail-control min-h-11 shrink-0 border px-4 text-sm font-medium outline-none ${selected ? "border-[var(--moss)] bg-[#e7efeb] text-[var(--moss)]" : "border-black/12 bg-transparent text-[#46514e]"}`}
              key={item.name}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              ref={(element) => {
                buttonRefs.current[index] = element;
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="mt-4" id={panelId} role="tabpanel">
        <div className="relative aspect-[16/10] overflow-hidden bg-white">
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
                className={`${active.image.sourceType === "ai-render" ? "object-cover" : "object-contain"} transition-transform duration-300 motion-reduce:transition-none hover:scale-[1.02]`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={active.image.src}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div aria-live="polite" className="mt-4 border-t border-black/12 pt-4">
          <h3 className="text-lg font-medium">{active.name}</h3>
          <p className="mt-2 max-w-[37rem] text-sm leading-7 text-[#66706e]">
            {active.description}
          </p>
          {active.image.caption ? (
            <p className="mt-3 text-[0.7rem] leading-5 text-[#747c79]">{active.image.caption}</p>
          ) : null}
        </div>
      </div>

      <noscript>
        <ul className="mt-5 space-y-3 text-sm leading-7 text-[#66706e]">
          {items.map((item) => <li key={item.name}>{item.name}：{item.description}</li>)}
        </ul>
      </noscript>
    </div>
  );
}
