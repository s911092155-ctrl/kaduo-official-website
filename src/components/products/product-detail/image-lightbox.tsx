"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { MouseEvent, PointerEvent as ReactPointerEvent } from "react";
import type { ProductImage } from "@/data/products";

export type LightboxItem = {
  image: ProductImage;
  label: string;
};

type ImageLightboxProps = {
  gallery?: LightboxItem[];
  image: ProductImage;
  label: string;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export function ImageLightbox({ gallery, image, label }: ImageLightboxProps) {
  const items = gallery?.length ? gallery : [{ image, label }];
  const initialIndex = Math.max(
    0,
    items.findIndex((item) => item.image.src === image.src),
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const panRef = useRef({ x: 0, y: 0 });
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const titleId = useId();
  const active = items[activeIndex] ?? items[0];

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      const previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = "hidden";
      window.requestAnimationFrame(() => closeRef.current?.focus());

      return () => {
        document.body.style.overflow = previousOverflow;
        if (dialog.open) {
          dialog.close();
        }
      };
    }
  }, [open]);

  useEffect(() => {
    const layer = imageLayerRef.current;
    if (!layer) {
      return;
    }

    const { x, y } = panRef.current;
    layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${zoom})`;
  }, [zoom]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
      } else if (event.key === "ArrowLeft" && items.length > 1) {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight" && items.length > 1) {
        event.preventDefault();
        showNext();
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP));
      } else if (event.key === "-") {
        event.preventDefault();
        setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP));
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  });

  function resetView() {
    panRef.current = { x: 0, y: 0 };
    setZoom(MIN_ZOOM);
    if (imageLayerRef.current) {
      imageLayerRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
    }
  }

  function selectImage(index: number) {
    resetView();
    setActiveIndex(index);
  }

  function showPrevious() {
    selectImage((activeIndex - 1 + items.length) % items.length);
  }

  function showNext() {
    selectImage((activeIndex + 1) % items.length);
  }

  function closeDialog() {
    setOpen(false);
    resetView();
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function handleBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (zoom <= MIN_ZOOM) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.dataset.dragging = "true";
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    const layer = imageLayerRef.current;

    if (!drag || drag.pointerId !== event.pointerId || !layer) {
      return;
    }

    panRef.current = {
      x: panRef.current.x + event.clientX - drag.x,
      y: panRef.current.y + event.clientY - drag.y,
    };
    dragRef.current = { ...drag, x: event.clientX, y: event.clientY };
    const { x, y } = panRef.current;
    layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${zoom})`;
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      event.currentTarget.dataset.dragging = "false";
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <>
      <button
        aria-haspopup="dialog"
        className="product-detail-control group block w-full text-left outline-none"
        onClick={() => {
          setActiveIndex(initialIndex);
          setOpen(true);
        }}
        ref={triggerRef}
        type="button"
      >
        <span className="relative block aspect-[4/3] overflow-hidden bg-white">
          <Image
            alt={image.alt}
            className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.015] group-focus-visible:scale-[1.015] motion-reduce:transition-none"
            fill
            sizes="(min-width: 1024px) 22vw, 46vw"
            src={image.src}
          />
        </span>
        <span className="mt-3 flex items-center justify-between gap-3 text-sm font-medium">
          {label}
          <span aria-hidden="true" className="product-detail-action-arrow text-[var(--moss)]">↗</span>
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
        <div className="relative max-h-[96vh] w-[96vw] max-w-[76rem] overflow-hidden bg-white p-3 shadow-2xl sm:p-5">
          <div className="product-detail-lightbox-toolbar flex flex-col items-stretch gap-2 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="min-w-0">
              <h2 className="text-sm font-medium sm:truncate sm:text-base" id={titleId}>{active.label}</h2>
              {items.length > 1 ? (
                <p aria-live="polite" className="mt-0.5 text-[0.65rem] text-[#727a77]">
                  {activeIndex + 1} / {items.length}
                  <span className="hidden sm:inline"> · 使用左右方向键切换</span>
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center justify-between gap-1.5 sm:justify-start">
              {items.length > 1 ? (
                <>
                  <button aria-label="上一张设计图" className="product-detail-lightbox-tool" onClick={showPrevious} type="button">←</button>
                  <button aria-label="下一张设计图" className="product-detail-lightbox-tool" onClick={showNext} type="button">→</button>
                </>
              ) : null}
              <button
                aria-label="缩小设计图"
                className="product-detail-lightbox-tool"
                disabled={zoom <= MIN_ZOOM}
                onClick={() => setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP))}
                type="button"
              >
                −
              </button>
              <span className="min-w-10 text-center text-[0.65rem] tabular-nums text-[#596461]">{Math.round(zoom * 100)}%</span>
              <button
                aria-label="放大设计图"
                className="product-detail-lightbox-tool"
                disabled={zoom >= MAX_ZOOM}
                onClick={() => setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP))}
                type="button"
              >
                +
              </button>
              <button
                aria-label="关闭设计图"
                className="product-detail-lightbox-close grid size-10 shrink-0 place-items-center rounded-full text-xl outline-none hover:border-black/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--moss)]"
                onClick={closeDialog}
                ref={closeRef}
                type="button"
              >
                ×
              </button>
            </div>
          </div>
          <div
            aria-label="可放大并拖动的设计图"
            className="product-detail-lightbox-canvas relative h-[min(74vh,48rem)] w-full touch-none overflow-hidden bg-white"
            data-dragging="false"
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <div className="absolute inset-0 origin-center" ref={imageLayerRef}>
              <Image
                alt={active.image.alt}
                className="select-none object-contain py-4"
                draggable={false}
                fill
                key={active.image.src}
                sizes="96vw"
                src={active.image.src}
              />
            </div>
          </div>
          {active.image.caption ? (
            <p className="border-t border-black/10 pt-3 text-xs leading-5 text-[#69716f]">
              {active.image.caption}
            </p>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
