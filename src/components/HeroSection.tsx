import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

export function HeroSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl mb-4 text-(--color-text)">
          {config.name}
        </h1>
        <p className="text-xl md:text-2xl text-(--color-text-secondary) mb-2">
          {config.title}
        </p>
        <p className="text-base md:text-lg text-(--color-text-secondary)">
          {config.bio}
        </p>
      </div>
    </section>
  );
}
