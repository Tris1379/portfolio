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
      vision: {
        title: siteConfig.sections.vision.title[locale],
        subtitle: siteConfig.sections.vision.subtitle[locale],
        paragraphs: siteConfig.sections.vision.paragraphs.map(
          (p) => p[locale]
        ),
      },
      personality: {
        title: siteConfig.sections.personality.title[locale],
        mbti: siteConfig.sections.personality.mbti,
        traits: siteConfig.sections.personality.traits.map((t) => ({
          name: t.name[locale],
          description: t.description[locale],
        })),
      },
      journey: {
        title: siteConfig.sections.journey.title[locale],
        paragraphs: siteConfig.sections.journey.paragraphs.map(
          (p) => p[locale]
        ),
        lessons: siteConfig.sections.journey.lessons.map((l) => l[locale]),
      },
      companion: {
        title: siteConfig.sections.companion.title[locale],
        subtitle: siteConfig.sections.companion.subtitle[locale],
        message: siteConfig.sections.companion.message[locale],
        cta: siteConfig.sections.companion.cta[locale],
        email: siteConfig.sections.companion.email,
      },
      personalSide: {
        title: siteConfig.sections.personalSide.title[locale],
        subtitle: siteConfig.sections.personalSide.subtitle[locale],
        categories: siteConfig.sections.personalSide.categories.map((c) => ({
          id: c.id,
          label: c.label[locale],
        })),
        items: siteConfig.sections.personalSide.items.map((item) => ({
          category: item.category,
          image: item.image,
          caption: item.caption[locale],
          span: item.span,
        })),
      },
    },
    particles: siteConfig.particles, // NOT translated
  };
}
