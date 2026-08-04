import Link from "next/link";

export default function ProductNotFound() {
  return (
    <section className="page-shell grid min-h-[65vh] place-items-center py-20 text-center">
      <div className="max-w-lg">
        <p className="eyebrow">PRODUCT NOT FOUND</p>
        <h1 className="mt-6 text-4xl font-medium tracking-[-0.05em] sm:text-6xl">
          没有找到这个产品
        </h1>
        <p className="mt-6 leading-7 text-[var(--muted)]">
          该产品可能尚未发布、已经归档，或链接地址有误。
        </p>
        <Link
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#273130] px-7 text-sm font-medium text-white transition-colors hover:bg-[var(--moss)]"
          href="/products"
        >
          返回产品中心
        </Link>
      </div>
    </section>
  );
}
