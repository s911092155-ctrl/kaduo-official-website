type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="page-shell grid gap-8 border-b border-[var(--line)] py-14 sm:py-20 md:grid-cols-[0.7fr_1.3fr] md:py-24">
      <p className="eyebrow">{eyebrow}</p>
      <div>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.98] tracking-[-0.05em]">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--muted)]">{description}</p>
      </div>
    </section>
  );
}
