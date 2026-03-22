import { siteConfig } from "@/config/site";

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8">
          {siteConfig.sections.values.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.sections.values.items.map((item) => (
            <div key={item.title} className="glass p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl mb-2">
                {item.title}
              </h3>
              <p className="text-(--color-text-secondary)">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
