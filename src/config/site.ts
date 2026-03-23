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

export interface VisionSection {
  title: { en: string; vi: string };
  subtitle: { en: string; vi: string };
  paragraphs: { en: string; vi: string }[];
}

export interface PersonalitySection {
  title: { en: string; vi: string };
  mbti: string;
  traits: {
    name: { en: string; vi: string };
    description: { en: string; vi: string };
  }[];
}

export interface JourneySection {
  title: { en: string; vi: string };
  paragraphs: { en: string; vi: string }[];
  lessons: {
    en: string;
    vi: string;
  }[];
}

export interface CompanionSection {
  title: { en: string; vi: string };
  subtitle: { en: string; vi: string };
  message: { en: string; vi: string };
  cta: { en: string; vi: string };
  email: string;
}

export interface PersonalSideSection {
  title: { en: string; vi: string };
  subtitle: { en: string; vi: string };
  categories: {
    id: string;  // NOT translated — used as filter key
    label: { en: string; vi: string };
  }[];
  items: {
    category: string;  // matches a category id
    image: string;      // path relative to /public
    caption: { en: string; vi: string };
    span?: "tall" | "wide";  // optional masonry span
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
    vision: VisionSection;
    personality: PersonalitySection;
    journey: JourneySection;
    companion: CompanionSection;
    personalSide: PersonalSideSection;
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
      platform: "facebook",
      url: "https://facebook.com/kazuha",
      label: { en: "Facebook", vi: "Facebook" },
      icon: "facebook",
    },
    {
      platform: "discord",
      url: "https://discord.com/users/kazuha",
      label: { en: "Discord", vi: "Discord" },
      icon: "discord",
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
    vision: {
      title: { en: "The Vision", vi: "Tầm nhìn" },
      subtitle: {
        en: "Why I Do This",
        vi: "Tại sao tôi làm điều này",
      },
      paragraphs: [
        {
          en: "Security is not about building walls. It's about understanding the landscape so deeply that you can walk through any terrain — and guide others safely through it.",
          vi: "Bảo mật không phải xây tường. Đó là hiểu địa hình sâu sắc đến mức bạn có thể đi qua bất kỳ địa hình nào — và dẫn người khác đi an toàn.",
        },
        {
          en: "I don't chase threats for the thrill. I study them because understanding how things break is the only way to build something that lasts.",
          vi: "Tôi không theo đuổi mối đe dọa vì cảm giác mạnh. Tôi nghiên cứu chúng vì hiểu cách mọi thứ bị phá vỡ là cách duy nhất để xây dựng thứ gì đó bền vững.",
        },
        {
          en: "My vision is a digital world where security is woven into the foundation — not bolted on as an afterthought.",
          vi: "Tầm nhìn của tôi là một thế giới số nơi bảo mật được dệt vào nền tảng — không phải gắn thêm như suy nghĩ sau cùng.",
        },
      ],
    },
    personality: {
      title: { en: "Personality", vi: "Tính cách" },
      mbti: "INFJ-A",
      traits: [
        {
          name: { en: "The Advocate", vi: "Nhà ủng hộ" },
          description: {
            en: "Quiet but determined. I see patterns others miss and pursue solutions with relentless patience.",
            vi: "Ít nói nhưng kiên quyết. Tôi thấy những mô hình người khác bỏ qua và theo đuổi giải pháp với sự kiên nhẫn không ngừng.",
          },
        },
        {
          name: { en: "Strategic Thinker", vi: "Nhà tư duy chiến lược" },
          description: {
            en: "I don't start coding until I've mapped the entire attack surface. Planning is 80% of the work.",
            vi: "Tôi không bắt đầu viết code cho đến khi đã vẽ bản đồ toàn bộ bề mặt tấn công. Lên kế hoạch chiếm 80% công việc.",
          },
        },
        {
          name: { en: "Calm Under Pressure", vi: "Điềm tĩnh dưới áp lực" },
          description: {
            en: "Incident response at 3 AM? No panic. Just methodical, focused execution until the threat is contained.",
            vi: "Xử lý sự cố lúc 3 giờ sáng? Không hoảng loạn. Chỉ cần thực thi có phương pháp, tập trung cho đến khi mối đe dọa được kiểm soát.",
          },
        },
        {
          name: { en: "Lifelong Learner", vi: "Người học suốt đời" },
          description: {
            en: "The threat landscape evolves daily. Standing still is falling behind.",
            vi: "Mối đe dọa phát triển hàng ngày. Đứng yên là tụt lại phía sau.",
          },
        },
      ],
    },
    journey: {
      title: { en: "The Journey", vi: "Hành trình" },
      paragraphs: [
        {
          en: "I didn't start in security. I started by breaking my own computer at 15 — trying to install a 'cool' Linux distro and wiping the boot partition. That panic taught me more about systems than any textbook.",
          vi: "Tôi không bắt đầu với bảo mật. Tôi bắt đầu bằng cách phá hỏng máy tính của mình năm 15 tuổi — cố cài một bản Linux 'ngầu' và xóa phân vùng khởi động. Sự hoảng loạn đó dạy tôi về hệ thống nhiều hơn bất kỳ cuốn sách nào.",
        },
        {
          en: "Every certification I earned came after failures I don't post about. The OSCP took two attempts. The first homelab caught fire (figuratively). Each failure was a lesson in humility and persistence.",
          vi: "Mỗi chứng chỉ tôi đạt được đều đến sau những thất bại tôi không đăng tải. OSCP mất hai lần thử. Homelab đầu tiên 'cháy' (nghĩa bóng). Mỗi thất bại là một bài học về sự khiêm tốn và kiên trì.",
        },
        {
          en: "Today, I protect systems that matter. Not because I'm special — but because I never stopped being curious, and I never stopped showing up after being knocked down.",
          vi: "Hôm nay, tôi bảo vệ những hệ thống quan trọng. Không phải vì tôi đặc biệt — mà vì tôi không bao giờ ngừng tò mò, và không bao giờ ngừng xuất hiện sau khi bị đánh gục.",
        },
      ],
      lessons: [
        {
          en: "Failure is data, not defeat",
          vi: "Thất bại là dữ liệu, không phải thất bại",
        },
        {
          en: "Curiosity outlasts talent",
          vi: "Sự tò mò bền bỉ hơn tài năng",
        },
        {
          en: "Protect quietly, impact loudly",
          vi: "Bảo vệ thầm lặng, tác động mạnh mẽ",
        },
      ],
    },
    companion: {
      title: { en: "Companion", vi: "Đồng hành" },
      subtitle: {
        en: "Looking for a Lifetime Partner",
        vi: "Tìm người đồng hành trọn đời",
      },
      message: {
        en: "I'm not looking for a quick project or a short-term role. I'm looking for someone — or a team — who values depth over speed, integrity over convenience, and growth over comfort. If that resonates, let's talk.",
        vi: "Tôi không tìm kiếm dự án ngắn hạn hay vai trò tạm thời. Tôi đang tìm một người — hoặc một đội — coi trọng chiều sâu hơn tốc độ, sự chính trực hơn sự tiện lợi, và sự phát triển hơn sự thoải mái. Nếu điều này cộng hưởng, hãy trò chuyện.",
      },
      cta: {
        en: "Start a Conversation",
        vi: "Bắt đầu cuộc trò chuyện",
      },
      email: "kazuha@example.com",
    },
    personalSide: {
      title: { en: "Personal Side", vi: "Mặt cá nhân" },
      subtitle: {
        en: "Beyond the terminal",
        vi: " Ngoài terminal",
      },
      categories: [
        { id: "all", label: { en: "All", vi: "Tất cả" } },
        { id: "nature", label: { en: "Nature", vi: "Thiên nhiên" } },
        { id: "companions", label: { en: "Companions", vi: "Đồng hành" } },
        { id: "work", label: { en: "Work", vi: "Công việc" } },
      ],
      items: [
        {
          category: "nature",
          image: "/gallery/nature-1.png",
          caption: { en: "Morning mist through the mountains", vi: "Sương mù buổi sáng qua núi" },
          span: "tall",
        },
        {
          category: "nature",
          image: "/gallery/nature-2.png",
          caption: { en: "Where the river meets the sea", vi: "Nơi sông gặp biển" },
        },
        {
          category: "companions",
          image: "/gallery/pet-1.png",
          caption: { en: "My faithful companion on late nights", vi: "Người bạn trung thành trong đêm khuya" },
          span: "wide",
        },
        {
          category: "companions",
          image: "/gallery/pet-2.png",
          caption: { en: "Quiet moments, warm company", vi: "Khoảnh khắc yên tĩnh, bạn đồng hành ấm áp" },
        },
        {
          category: "work",
          image: "/gallery/workspace-1.png",
          caption: { en: "Where the magic happens", vi: "Nơi điều kỳ diệu xảy ra" },
          span: "wide",
        },
        {
          category: "work",
          image: "/gallery/workspace-2.png",
          caption: { en: "The homelab that started it all", vi: "Homelab bắt đầu tất cả" },
          span: "tall",
        },
        {
          category: "nature",
          image: "/gallery/nature-3.png",
          caption: { en: "Autumn leaves, eternal inspiration", vi: "Lá mùa thu, nguồn cảm hứng bất tận" },
        },
        {
          category: "work",
          image: "/gallery/workspace-3.png",
          caption: { en: "Late night debugging sessions", vi: "Phiên debug đêm khuya" },
        },
      ],
    },
  },
  particles: {
    imagePaths: ["/leaf1.png", "/leaf2.png"],
    maxParticles: 50,
    mobileParticles: 20,
  },
} as const;
