import { siteConfig } from "@/config/site";

export function StorySection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8 text-(--color-text)">
          {siteConfig.sections.story.title}
        </h2>
        <div className="glass p-6 md:p-8">
          {siteConfig.sections.story.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-(--color-text-secondary) ${index < siteConfig.sections.story.paragraphs.length - 1 ? "mb-4" : ""}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
