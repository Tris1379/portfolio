import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl mb-4 text-(--color-text)">
          {siteConfig.name}
        </h1>
        <p className="text-xl md:text-2xl text-(--color-text-secondary) mb-2">
          {siteConfig.title}
        </p>
        <p className="text-base md:text-lg text-(--color-text-secondary)">
          {siteConfig.bio}
        </p>
      </div>
    </section>
  );
}
