import Image from "next/image";
import type {LocalizedProduct} from "@/data/products";
import {Link} from "@/i18n/navigation";

type Labels = {viewDetails: string; developmentOnly: string; imageMissing: string; detailsAria: string};

export function ProductCard({product, labels, priority=false}: {product: LocalizedProduct; labels: Labels; priority?: boolean}) {
  return <article className="group grid min-w-0 overflow-hidden rounded-[1.75rem] border border-[color:rgba(34,39,40,0.12)] bg-[color:rgba(255,255,255,0.62)] shadow-[0_18px_60px_rgba(43,50,48,0.06)]">
    <Link aria-label={`${labels.detailsAria}${product.name}`} className="relative aspect-[4/3] overflow-hidden bg-[#e7eceb]" href={`/products/${product.slug}`}>
      {product.images.main ? <Image alt={product.images.main.alt} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]" fill priority={priority} sizes="(min-width: 1024px) 44vw, (min-width: 640px) 50vw, 100vw" src={product.images.main.src} /> : <span className="grid h-full place-items-center px-6 text-center text-sm text-[var(--muted)]">{labels.imageMissing}</span>}
      {product.developmentOnly ? <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-[rgba(248,247,243,0.9)] px-3 py-1 text-[0.68rem] font-medium tracking-[0.12em] text-[#384543] backdrop-blur-md">{labels.developmentOnly}</span> : null}
    </Link>
    <div className="flex min-h-64 flex-col p-6 sm:p-7"><p className="text-xs tracking-[0.14em] text-[var(--moss)]">{product.series ?? "CATDOW PRODUCT"}</p><h2 className="mt-4 text-[1.65rem] font-medium leading-tight tracking-[-0.035em]">{product.name}</h2>{product.summary ? <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--muted)]">{product.summary}</p> : null}<Link className="mt-auto inline-flex w-fit items-center gap-3 border-b border-[color:rgba(8,127,153,0.35)] pb-1 pt-8 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--moss)] hover:text-[var(--moss)]" href={`/products/${product.slug}`}>{labels.viewDetails} <span aria-hidden="true">↗</span></Link></div>
  </article>;
}
