import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

export function ArsenalSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8">
          {config.sections.arsenal.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.sections.arsenal.categories.map((category) => (
            <div key={category.name} className="glass p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl mb-4">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm border border-(--color-primary)/30 text-(--color-primary)"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
