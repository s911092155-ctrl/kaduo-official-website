"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useShouldReduceMotion } from "@/components/motion/motion-provider";

export type ProductStoryItem = {
  alt: string;
  description: string;
  eyebrow: string;
  image: string;
  notice: string;
  title: string;
};

export function StickyProductStory({ items, label }: { items: ProductStoryItem[]; label: string }) {
  const ref = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useShouldReduceMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(items.length - 1, Math.floor(value * items.length));
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <section ref={ref} className="product-story warm-shell" aria-label={label}>
      <div className="product-story__steps">
        {items.map((item, index) => (
          <article
            className={index === activeIndex ? "is-active" : undefined}
            key={item.title}
          >
            <div className="product-story__mobile-image">
              <Image alt={item.alt} fill sizes="100vw" src={item.image} />
            </div>
            <p>{item.eyebrow}</p>
            <h3>{item.title}</h3>
            <span>{item.description}</span>
          </article>
        ))}
      </div>
      <div className="product-story__sticky" aria-live="polite">
        <AnimatePresence initial={false}>
          <motion.figure
            key={activeItem.image}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: "easeOut" }}
          >
            <Image
              alt={activeItem.alt}
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 900px) 56vw, 100vw"
              src={activeItem.image}
            />
            <figcaption>{activeItem.notice}</figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
    </section>
  );
}
