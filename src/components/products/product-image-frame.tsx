"use client";

import Image from "next/image";
import {useState} from "react";

type Props = {
  alt: string;
  fallback: string;
  priority?: boolean;
  sizes: string;
  src: string | null;
};

/** Keeps missing local draft assets from leaving a broken product card. */
export function ProductImageFrame({alt, fallback, priority = false, sizes, src}: Props) {
  const [unavailable, setUnavailable] = useState(!src);

  if (unavailable || !src) {
    return <span className="grid h-full place-items-center px-6 text-center text-sm text-[var(--muted)]">{fallback}</span>;
  }

  return <Image alt={alt} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none" fill onError={() => setUnavailable(true)} priority={priority} sizes={sizes} src={src}/>;
}
