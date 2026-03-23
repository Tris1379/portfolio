import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { ExternalLink } from "lucide-react";

export function GallerySection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8">
          {config.sections.gallery.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.sections.gallery.projects.map((project) => (
            <div key={project.name} className="glass p-6">
              <h3 className="font-[family-name:var(--font-display)] text-xl mb-2">
                {project.name}
              </h3>
              <p className="text-(--color-text-secondary) mb-4">
                {project.description}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-primary) hover:underline inline-flex items-center"
                >
                  <ExternalLink className="w-4 h-4 inline mr-1" />
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
