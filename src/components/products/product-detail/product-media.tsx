import Image from "next/image";
import {useTranslations} from "next-intl";
import type { ProductImage } from "@/data/products";

type ProductMediaProps = {
  image: ProductImage;
  frameClassName: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  captionOverlay?: boolean;
};

export function ProductMedia({
  image,
  frameClassName,
  imageClassName,
  priority = false,
  sizes = "(min-width: 1024px) 55vw, 100vw",
  showCaption = true,
  captionOverlay = false,
}: ProductMediaProps) {
  const t = useTranslations("ProductDetail.imageTypes");
  if (image.publicApproved === false && process.env.NODE_ENV !== "development") {
    return null;
  }

  const defaultImageClass =
    image.sourceType === "design-drawing" ||
    image.sourceType === "prototype-photo"
      ? "object-contain"
      : "object-cover";

  return (
    <figure className={captionOverlay ? "group relative" : "group"}>
      <div className={`relative overflow-hidden bg-[#eceeea] ${frameClassName}`}>
        <Image
          alt={image.alt}
          className={`${imageClassName ?? defaultImageClass} transition-transform duration-300 group-hover:scale-[1.02] group-focus-within:scale-[1.02] motion-reduce:transition-none`}
          fill
          loading={priority ? "eager" : undefined}
          sizes={sizes}
          src={image.src}
        />
      </div>
      {showCaption && image.caption ? (
        <figcaption
          className={
            captionOverlay
              ? "product-detail-hero-caption absolute bottom-2 left-2 right-2 z-10 flex max-w-[34rem] flex-wrap items-start gap-x-2 gap-y-0.5 px-3 py-2 text-[0.64rem] leading-4 text-[#4d5754] sm:bottom-3 sm:left-3 sm:right-auto"
              : "mt-3 flex max-w-3xl flex-wrap items-start gap-x-2 gap-y-1 text-[0.7rem] leading-5 text-[#66706e]"
          }
        >
          {image.sourceType ? (
            <span className="shrink-0 font-medium text-[#34413f]">
              {t(image.sourceType)}
            </span>
          ) : null}
          <span>{image.caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
