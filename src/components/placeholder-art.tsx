export function PlaceholderArt() {
  return (
    <div
      className="relative aspect-[4/5] min-h-[28rem] overflow-hidden rounded-[2rem] bg-[var(--paper-deep)]"
      aria-label="品牌视觉占位图"
      role="img"
    >
      <div className="absolute inset-x-[12%] bottom-[9%] h-[42%] rounded-t-[45%] bg-[var(--sage)]" />
      <div className="absolute bottom-[9%] left-[26%] h-[62%] w-[16%] rounded-full bg-[var(--moss)]" />
      <div className="absolute bottom-[9%] right-[16%] h-[34%] w-[34%] rounded-full border-[1.2rem] border-[var(--clay)]" />
      <div className="absolute left-[12%] top-[10%] text-xs font-semibold tracking-[0.2em] text-[var(--muted)]">
        KADUO / LIVING WITH PETS
      </div>
      <div className="absolute right-[9%] top-[20%] h-20 w-20 rounded-full bg-[var(--paper)]" />
      <p className="absolute bottom-[13%] left-[11%] z-10 max-w-40 font-serif text-2xl leading-tight text-[var(--paper)]">
        让功能融入家的轮廓
      </p>
    </div>
  );
}
