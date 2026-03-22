// src/config/site.ts — Centralized site configuration
// ALL visible text must come from this file. No hardcoded strings in components.

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
}

export interface StorySection {
  title: string;
  paragraphs: string[];
}

export interface ArsenalSection {
  title: string;
  categories: {
    name: string;
    skills: string[];
  }[];
}

export interface GallerySection {
  title: string;
  projects: {
    name: string;
    description: string;
    link?: string;
  }[];
}

export interface ValuesSection {
  title: string;
  items: {
    title: string;
    description: string;
  }[];
}

export interface ParticlesConfig {
  imagePaths: string[];
  maxParticles: number;
  mobileParticles: number;
}

export interface SiteConfig {
  name: string;
  title: string;
  bio: string;
  social: SocialLink[];
  sections: {
    story: StorySection;
    arsenal: ArsenalSection;
    gallery: GallerySection;
    values: ValuesSection;
  };
  particles: ParticlesConfig;
}

export const siteConfig: SiteConfig = {
  name: "Kazuha",
  title: "Information Security Professional",
  bio: "Protecting digital landscapes with the calm precision of a wanderer through wind and leaves.",
  social: [
    {
      platform: "github",
      url: "https://github.com/kazuha",
      label: "GitHub",
      icon: "github",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/kazuha",
      label: "LinkedIn",
      icon: "linkedin",
    },
    {
      platform: "email",
      url: "mailto:kazuha@example.com",
      label: "Email",
      icon: "mail",
    },
  ],
  sections: {
    story: {
      title: "My Story",
      paragraphs: [
        "Like the wanderer Kazuha, I move through the digital world with purpose and calm. My journey into Information Security began with curiosity about how systems work \u2014 and how they break.",
        "Every vulnerability I find, every system I protect, is guided by the same principle: understand deeply, act precisely, and always leave things better than you found them.",
      ],
    },
    arsenal: {
      title: "Arsenal",
      categories: [
        {
          name: "Security",
          skills: ["Penetration Testing", "Vulnerability Assessment", "SIEM", "Incident Response"],
        },
        {
          name: "Development",
          skills: ["Python", "JavaScript", "TypeScript", "Bash Scripting"],
        },
        {
          name: "Infrastructure",
          skills: ["Linux", "Docker", "AWS", "Network Security"],
        },
      ],
    },
    gallery: {
      title: "Gallery",
      projects: [
        {
          name: "Project Alpha",
          description: "Automated vulnerability scanner for web applications",
          link: "https://github.com/kazuha/project-alpha",
        },
        {
          name: "Homelab",
          description: "Self-hosted security monitoring and SIEM setup",
        },
      ],
    },
    values: {
      title: "Values",
      items: [
        {
          title: "Precision",
          description: "Every line of code, every analysis \u2014 done with care and attention to detail.",
        },
        {
          title: "Curiosity",
          description: "The drive to understand how things work, and how they can be made better.",
        },
        {
          title: "Integrity",
          description: "Honest in findings, transparent in methods, trustworthy in handling sensitive data.",
        },
      ],
    },
  },
  particles: {
    imagePaths: ["/maple-leaf.svg"],
    maxParticles: 50,
    mobileParticles: 20,
  },
} as const;
