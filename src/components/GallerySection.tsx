"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { ExternalLink } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";
import { asset } from "@/lib/asset";

export function GallerySection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  return (
    <section className="py-16 md:py-24 atmosphere-section atmosphere-gallery">
      <div style={{ 
        position: 'fixed',
        inset: 0,
        backgroundColor: 'blue',
        border: '10px solid red',
        zIndex: 9999,
        backgroundImage: `url('${asset("/gallery.png")}')`
      }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
          <FadeInUp>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8 text-white"
                style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.3)' }}>
              {config.sections.gallery.title}
            </h2>
          </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.sections.gallery.projects.map((project, i) => (
            <FadeInUp key={project.name} delay={i * 0.1}>
              <div className="glass p-6 h-full">
                <h3 className="font-[family-name:var(--font-display)] text-xl mb-2 text-white"
                    style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.3)' }}>
                  {project.name}
                </h3>
                <p className="text-white/60 mb-4"
                   style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}>
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
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
