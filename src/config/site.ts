// src/config/site.ts — Centralized site configuration
// ALL visible text must come from this file. No hardcoded strings in components.

export interface SocialLink {
  platform: string;   // NOT translated
  url: string;        // NOT translated
  label: { en: string; vi: string };  // Translated
  icon: string;       // NOT translated
}

export interface StorySection {
  title: { en: string; vi: string };
  paragraphs: { en: string; vi: string }[];
}

export interface ArsenalSection {
  title: { en: string; vi: string };
  categories: {
    name: { en: string; vi: string };  // Category names translated
    skills: string[];  // NOT translated — technical terms stay English
  }[];
}

export interface GallerySection {
  title: { en: string; vi: string };
  projects: {
    name: { en: string; vi: string };
    description: { en: string; vi: string };
    link?: string;
  }[];
}

export interface ValuesSection {
  title: { en: string; vi: string };
  items: {
    title: { en: string; vi: string };
    description: { en: string; vi: string };
  }[];
}

export interface ParticlesConfig {
  imagePaths: string[];
  maxParticles: number;
  mobileParticles: number;
}

export interface SiteConfig {
  name: string;  // "Kazuha" — proper noun, stays string
  title: { en: string; vi: string };
  bio: { en: string; vi: string };
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
  title: {
    en: "Information Security Professional",
    vi: "Chuyên gia An toàn Thông tin",
  },
  bio: {
    en: "Protecting digital landscapes with the calm precision of a wanderer through wind and leaves.",
    vi: "Bảo vệ thế giới số với sự điềm tĩnh tinh tế của kẻ lữ hành qua gió và lá.",
  },
  social: [
    {
      platform: "github",
      url: "https://github.com/kazuha",
      label: { en: "GitHub", vi: "GitHub" },
      icon: "github",
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/in/kazuha",
      label: { en: "LinkedIn", vi: "LinkedIn" },
      icon: "linkedin",
    },
    {
      platform: "email",
      url: "mailto:kazuha@example.com",
      label: { en: "Email", vi: "Email" },
      icon: "mail",
    },
  ],
  sections: {
    story: {
      title: { en: "My Story", vi: "Câu chuyện của tôi" },
      paragraphs: [
        {
          en: "Like the wanderer Kazuha, I move through the digital world with purpose and calm. My journey into Information Security began with curiosity about how systems work — and how they break.",
          vi: "Như Kazuha lang thang, tôi bước qua thế giới số với mục đích và điềm tĩnh. Hành trình vào An toàn Thông tin bắt đầu từ sự tò mò về cách hệ thống hoạt động — và cách chúng bị phá vỡ.",
        },
        {
          en: "Every vulnerability I find, every system I protect, is guided by the same principle: understand deeply, act precisely, and always leave things better than you found them.",
          vi: "Mỗi lỗ hổng tôi tìm ra, mỗi hệ thống tôi bảo vệ, đều được dẫn lối bởi một nguyên tắc: hiểu sâu, hành động chính xác, và luôn để lại mọi thứ tốt hơn lúc bạn tìm thấy.",
        },
      ],
    },
    arsenal: {
      title: { en: "Arsenal", vi: "Vũ khí" },
      categories: [
        {
          name: { en: "Security", vi: "Bảo mật" },
          skills: ["Penetration Testing", "Vulnerability Assessment", "SIEM", "Incident Response"],
        },
        {
          name: { en: "Development", vi: "Lập trình" },
          skills: ["Python", "JavaScript", "TypeScript", "Bash Scripting"],
        },
        {
          name: { en: "Infrastructure", vi: "Hạ tầng" },
          skills: ["Linux", "Docker", "AWS", "Network Security"],
        },
      ],
    },
    gallery: {
      title: { en: "Gallery", vi: "Bộ sưu tập" },
      projects: [
        {
          name: { en: "Project Alpha", vi: "Dự án Alpha" },
          description: {
            en: "Automated vulnerability scanner for web applications",
            vi: "Công cụ quét lỗ hổng tự động cho ứng dụng web",
          },
          link: "https://github.com/kazuha/project-alpha",
        },
        {
          name: { en: "Homelab", vi: "Homelab" },
          description: {
            en: "Self-hosted security monitoring and SIEM setup",
            vi: "Hệ thống giám sát bảo mật và SIEM tự lưu trữ",
          },
        },
      ],
    },
    values: {
      title: { en: "Values", vi: "Giá trị cốt lõi" },
      items: [
        {
          title: { en: "Precision", vi: "Chính xác" },
          description: {
            en: "Every line of code, every analysis — done with care and attention to detail.",
            vi: "Từng dòng mã, từng phân tích — đều được thực hiện với sự cẩn thận và chú ý đến từng chi tiết.",
          },
        },
        {
          title: { en: "Curiosity", vi: "Tò mò" },
          description: {
            en: "The drive to understand how things work, and how they can be made better.",
            vi: "Khát khao hiểu cách mọi thứ hoạt động, và làm thế nào để cải thiện chúng.",
          },
        },
        {
          title: { en: "Integrity", vi: "Chính trực" },
          description: {
            en: "Honest in findings, transparent in methods, trustworthy in handling sensitive data.",
            vi: "Trung thực trong phát hiện, minh bạch trong phương pháp, đáng tin cậy khi xử lý dữ liệu nhạy cảm.",
          },
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
