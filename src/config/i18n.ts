import { siteConfig } from "./site";

export type Locale = "en" | "vi";

export function getConfig(locale: Locale) {
  return {
    name: siteConfig.name,
    title: siteConfig.title[locale],
    bio: siteConfig.bio[locale],
    social: siteConfig.social.map((s) => ({
      ...s,
      label: s.label[locale],
    })),
    sections: {
      story: {
        title: siteConfig.sections.story.title[locale],
        paragraphs: siteConfig.sections.story.paragraphs.map(
          (p) => p[locale]
        ),
      },
      arsenal: {
        title: siteConfig.sections.arsenal.title[locale],
        categories: siteConfig.sections.arsenal.categories.map((c) => ({
          name: c.name[locale],
          skills: c.skills, // NOT translated
        })),
      },
      gallery: {
        title: siteConfig.sections.gallery.title[locale],
        projects: siteConfig.sections.gallery.projects.map((p) => ({
          name: p.name[locale],
          description: p.description[locale],
          link: p.link,
        })),
      },
      values: {
        title: siteConfig.sections.values.title[locale],
        items: siteConfig.sections.values.items.map((item) => ({
          title: item.title[locale],
          description: item.description[locale],
        })),
      },
    },
    particles: siteConfig.particles, // NOT translated
  };
}
