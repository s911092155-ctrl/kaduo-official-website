import Image from "next/image";
import type { ProductImage } from "@/data/products";

const sourceTypeLabels = {
  "ai-render": "AI效果示意",
  "prototype-photo": "打样实拍",
  "design-drawing": "设计图",
} as const;

type ProductMediaProps = {
  image: ProductImage;
  frameClassName: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
};

export function ProductMedia({
  image,
  frameClassName,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 55vw, 100vw",
  showCaption = true,
}: ProductMediaProps) {
  if (image.publicApproved === false) {
    return null;
  }

  const defaultImageClass =
    image.sourceType === "design-drawing" ||
    image.sourceType === "prototype-photo"
      ? "object-contain"
      : "object-cover";

  return (
    <figure>
      <div className={`relative overflow-hidden bg-[#eceeea] ${frameClassName}`}>
        <Image
          alt={image.alt}
          className={imageClassName ?? defaultImageClass}
          fill
          loading={priority ? "eager" : undefined}
          sizes={sizes}
          src={image.src}
        />
      </div>
      {showCaption && image.caption ? (
        <figcaption className="mt-3 flex max-w-3xl flex-wrap items-start gap-x-2 gap-y-1 text-[0.7rem] leading-5 text-[#66706e]">
          {image.sourceType ? (
            <span className="shrink-0 font-medium text-[#34413f]">
              {sourceTypeLabels[image.sourceType]}
            </span>
          ) : null}
          <span>{image.caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
