"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { ProductImage } from "@/data/products";

type ImageLightboxProps = {
  image: ProductImage;
  label: string;
};

export function ImageLightbox({ image, label }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      const previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
        if (dialog.open) {
          dialog.close();
        }
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    }

    document.addEventListener("keydown", handleEscape, true);
    return () => document.removeEventListener("keydown", handleEscape, true);
  }, [open]);

  function closeDialog() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  }

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="group block w-full text-left outline-none"
        onClick={() => setOpen(true)}
        ref={triggerRef}
        type="button"
      >
        <span className="relative block aspect-[4/3] overflow-hidden bg-white">
          <Image
            alt={image.alt}
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.015] group-focus-visible:scale-[1.015]"
            fill
            sizes="(min-width: 1024px) 22vw, 46vw"
            src={image.src}
          />
        </span>
        <span className="mt-3 flex items-center justify-between gap-3 text-sm font-medium">
          {label}
          <span aria-hidden="true" className="text-[var(--moss)]">↗</span>
        </span>
        <span className="mt-1 block text-xs text-[#727a77]">点击查看设计图</span>
      </button>

      <dialog
        aria-labelledby={titleId}
        className="m-auto max-h-none max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/55"
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClick={handleBackdropClick}
        ref={dialogRef}
      >
        <div className="relative max-h-[94vh] w-[94vw] max-w-[76rem] overflow-hidden bg-[#f8f7f3] p-4 shadow-2xl sm:p-6">
          <div className="flex items-center justify-between gap-5 border-b border-black/10 pb-4">
            <h2 className="text-base font-medium" id={titleId}>{label}</h2>
            <button
              aria-label="关闭设计图"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-black/20 text-xl outline-none transition-colors hover:border-black/45 focus-visible:border-[var(--moss)]"
              onClick={closeDialog}
              type="button"
            >
              ×
            </button>
          </div>
          <div className="relative h-[min(76vh,50rem)] w-full">
            <Image
              alt={image.alt}
              className="object-contain py-4"
              fill
              sizes="94vw"
              src={image.src}
            />
          </div>
          {image.caption ? (
            <p className="border-t border-black/10 pt-3 text-xs leading-5 text-[#69716f]">
              {image.caption}
            </p>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
