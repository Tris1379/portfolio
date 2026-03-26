"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { FadeInUp } from "@/components/FadeInUp";

export function ValuesSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <FadeInUp>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8">
            {config.sections.values.title}
          </h2>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.sections.values.items.map((item, i) => (
            <FadeInUp key={item.title} delay={i * 0.1}>
              <div className="glass p-6 h-full">
                <h3 className="font-[family-name:var(--font-display)] text-xl mb-2">
                  {item.title}
                </h3>
                <p className="text-(--color-text-secondary)">
                  {item.description}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
