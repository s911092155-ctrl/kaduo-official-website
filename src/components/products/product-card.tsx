import type {LocalizedProduct} from "@/data/products";
import {Link} from "@/i18n/navigation";
import {ProductImageFrame} from "@/components/products/product-image-frame";

type Labels = {viewDetails: string; draftPreview: string; imageMissing: string; detailsAria: string; productNumber: string; seriesFallback: string};

export function ProductCard({product, labels, priority=false, index=0}: {product: LocalizedProduct; labels: Labels; priority?: boolean; index?: number}) {
  const isReversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const href = `/products/${product.slug}`;

  return <article className={`group grid min-w-0 items-center gap-8 border-t border-[var(--line)] py-10 sm:gap-12 sm:py-14 lg:grid-cols-2 lg:gap-20 lg:py-20 ${isReversed ? "lg:[&>*:first-child]:order-2" : ""}`}>
    <Link aria-label={`${labels.detailsAria}${product.name}`} className={`relative block overflow-hidden bg-[#e7eceb] ${isReversed ? "aspect-[16/10]" : "aspect-[4/5]"}`} href={href}>
      <ProductImageFrame alt={product.images.main?.alt ?? labels.imageMissing} fallback={labels.imageMissing} priority={priority} sizes="(min-width: 1024px) 56vw, 100vw" src={product.images.main?.src ?? null}/>
      {product.status === "draft" ? <span className="absolute left-4 top-4 border border-white/60 bg-[rgba(250,248,243,0.74)] px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.12em] text-[#41504d] backdrop-blur-md">{labels.draftPreview}</span> : null}
    </Link>
    <div className="flex min-h-[18rem] flex-col py-2 lg:py-7"><p className="text-xs font-medium tracking-[0.18em] text-[var(--moss)]">{labels.productNumber} {number}</p><p className="mt-8 text-xs font-medium tracking-[0.15em] text-[#62706c]">{product.series ?? labels.seriesFallback}</p><h2 className="mt-4 max-w-xl text-[clamp(2.05rem,3.7vw,4rem)] font-medium leading-[1.03] tracking-[-0.055em]">{product.name}</h2>{product.englishName && product.englishName !== product.name ? <p className="mt-4 text-xs tracking-[0.12em] text-[#737e7a]">{product.englishName}</p> : null}{product.summary ? <p className="mt-7 max-w-lg text-base leading-8 text-[var(--muted)]">{product.summary}</p> : null}<Link className="mt-auto inline-flex w-fit items-center gap-3 border-b border-[color:rgba(8,127,153,0.35)] pb-1 pt-9 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--moss)] hover:text-[var(--moss)]" href={href}>{labels.viewDetails} <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none">→</span></Link></div>
  </article>;
}
