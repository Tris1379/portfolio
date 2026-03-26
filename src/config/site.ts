// src/config/site.ts — Centralized site configuration
// ALL visible text must come from this file. No hardcoded strings in components.

import { asset } from "@/lib/asset";

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

export interface AboutMeSection {
  title: { en: string; vi: string };
  info: {
    name: { en: string; vi: string };
    nickname: { en: string; vi: string };
    dob: { en: string; vi: string };
    nationality: { en: string; vi: string };
    school: { en: string; vi: string };
    personality: { en: string; vi: string };
  };
  likes: { en: string[]; vi: string[] };
  dislikes: { en: string[]; vi: string[] };
  aspiration: { en: string; vi: string };
}

export interface JourneySection {
  title: { en: string; vi: string };
  paragraphs: { en: string; vi: string }[];
  lessons: {
    en: string;
    vi: string;
  }[];
}

export interface ForcedConnectionSection {
  question: { en: string; vi: string };
  yesLabel: { en: string; vi: string };
  noLabel: { en: string; vi: string };
  nextLabel: { en: string; vi: string };
}

export interface CompanionSection {
  title: { en: string; vi: string };
  subtitle: { en: string; vi: string };
  message: { en: string; vi: string };
  cta: { en: string; vi: string };
  ctaUrl: string;
  discordCta: { en: string; vi: string };
  discordUrl: string;
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

export interface MusicTrack {
  title: string;       // NOT translated — song titles stay as-is
  src: string;         // path relative to /public
}

export interface MusicConfig {
  tracks: MusicTrack[];
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
    aboutMe: AboutMeSection;
    journey: JourneySection;
    forcedConnection: ForcedConnectionSection;
    companion: CompanionSection;
    personalSide: PersonalSideSection;
  };
  particles: ParticlesConfig;
  music: MusicConfig;
}

export const siteConfig: SiteConfig = {
  name: "Ming Tris",
  title: {
    en: "Cybersecurity University Student",
    vi: "Sinh viên An toàn Thông tin",
  },
  bio: {
    en: "Do not let the breeze of comfort carry away your dreams.",
    vi: "Đừng để sự thoải mái cuốn trôi giấc mơ của bạn",
  },
  social: [
    {
      platform: "github",
      url: "https://github.com/Tris1379",
      label: { en: "GitHub", vi: "GitHub" },
      icon: "github",
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/minh.tris0802",
      label: { en: "Facebook", vi: "Facebook" },
      icon: "facebook",
    },
    {
      platform: "discord",
      url: "https://discord.com/users/773546988707905547",
      label: { en: "Discord", vi: "Discord" },
      icon: "discord",
    },
    {
      platform: "email",
      url: "mailto:lilhorni0829@gmail.com",
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
          vi: "Tôi trân trọng sự tự do và nhàn hạ, và đó chính là lý do tôi chọn sự đau khổ của kỷ luật khi còn trẻ. Tôi rèn luyện hôm nay để có thể tận hưởng cuộc sống một cách trọn vẹn nhất sau này, thay vì phải đối mặt với sự ân hận khi về già. ",
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
        en: "My ideal of life",
        vi: "Lý tưởng sống của tôi",
      },
      paragraphs: [
        {
          en: "The wind only calms when the storm has passed, and peace truly exists only when we have walked through the fiercest gales...",
          vi: "Gió chỉ lặng khi bão đã tan, và bình yên chỉ thực sự hiện hữu khi ta đã đi xuyên qua những ngày giông bão nhất...",
        },
        {
          en: "A wanderer fears not the abyss as a destination, but a journey that leaves no echo in this world. I do not fear death; I only fear wandering through life without meaning. Instead of fading like nameless dust, I choose to venture forth, ensuring every 'slash' that carves my resolve bears witness to my existence. I would rather brave the storm to grasp my ideals than drift through a life of silent aimlessness",
          vi: "Tôi không sợ đích đến là vực thẳm, chỉ sợ bước chân đi mà chẳng để lại dấu ấn gì cho đời. Tôi không sợ cái chết, tôi chỉ sợ lang thang trong đời mà không có ý nghĩa. Thay vì tan biến như một hạt bụi, tôi chọn dấn thân để mỗi 'nhát chém' tạc nên ý chí của tôi sẽ trở thành minh chứng cho sự tồn tại của chính mình. Tôi thà kiên cường đi xuyên qua bão tố để chạm đến lý tưởng, còn hơn sống một đời lặng lẽ mà vô định.",
        },
        {
          en: "Humanity would perish if people ceased to help one another. We cannot exist without mutual support. Therefore, all who need assistance have the right to seek it from others; and no one capable of helping can refuse without a sense of remorse",
          vi: "Loài người sẽ diệt vong nếu con người ngừng giúp đỡ lẫn nhau. Chúng ta không thể tồn tại mà không hỗ trợ lẫn nhau. Và do đó tất cả những người cần trợ giúp có quyền đi tìm sự giúp đỡ từ người khác; và không ai có khả năng giúp đỡ lại có thể từ chối mà không thấy cắn rứt.",
        },
      ],
    },
    aboutMe: {
      title: { en: "About Me", vi: "Về tôi" },
      info: {
        name: { en: "Pham Minh Tri", vi: "Phạm Minh Trí" },
        nickname: { en: "Tris", vi: "Tris" },
        dob: { en: "08/02/200*", vi: "08/02/200*" },
        nationality: { en: "Vietnam", vi: "Việt Nam" },
        school: { en: "University of Information Technology - VNUHCM", vi: "Đại Học Công nghệ Thông tin - ĐHQG TP.HCM" },
        personality: { en: "INTJ-A", vi: "INTJ-A" },
      },
      likes: {
        en: ["Helping each other <3", "Experience new things", "Admire all the beauty ( Arts & Life )", "Books & Sports", "Analyzing & solving problems"],
        vi: ["Giúp đỡ người khác <3", "Trải nghiệm những điều mới", "Chiêm ngưỡng mọi vẻ đẹp ( Nghệ thuật & Cuộc sống )", "Sách & Thể thao", "Phân tích & giải quyết vấn đề"],
      },
      dislikes: {
        en: ["Carelessness", "Superficial solutions", "Unnecessary complexity","Hypocrisy & Pettiness"],
        vi: ["Sự cẩu thả", "Giải pháp hời hợt", "Sự phức tạp không cần thiết", "Sự giả tạo & tính tiểu nhân"],
      },
      aspiration: {
        en: "I aspire to embody the virtues of a 'Quân tử' (Noble Man) — constantly refining my soul and relentlessly moving forward with the ideal of serving others. My ultimate goal is to leverage my knowledge to protect and uplift the community, contributing to a prosperous and digitally resilient Vietnam.",
        vi: "Tôi hướng mình theo phong thái của một bậc quân tử — người bền bỉ hoàn thiện bản thân và không ngừng tiến bước với lý tưởng phụng sự cộng đồng. Khát vọng lớn nhất của tôi là dùng tri thức để bảo vệ và giúp đỡ mọi người, góp phần xây dựng một Việt Nam giàu mạnh.",
      },
    },
    journey: {
      title: { en: "The Journey", vi: "Hành trình" },
      paragraphs: [
        {
          en: "There was once a time when I was merely a faint shadow amidst the currents of life. Without ideals or a destination, I allowed myself to sink into a hollow loop of 'eat, sleep, play, and study.' Those days were so grey and blurred that I could barely remember why I existed or how I lived; I felt nothing... except for a suffocating boredom that haunted every corner of my soul.",
          vi: "Đã từng có một khoảng thời gian, tôi chỉ là một cái bóng nhạt nhòa giữa dòng đời. Không lý tưởng, không đích đến, tôi để mặc bản thân chìm nghỉm trong vòng lặp vô vị của 'ăn, ngủ, chơi và học'. Những ngày tháng ấy xám xịt lu mờ đến mức tôi chẳng thể nhớ nổi mình đã tồn tại vì điều gì, đã sống như thế nào, chẳng cảm nhận được gì... ngoài cảm giác chán nản bủa vây mọi ngóc ngách của tâm hồn.",
        },
        {
          en: "But within that deep abyss, I suddenly heard the call of my true self—painful yet profound questions of self-reflection: 'What am I living for?'; 'Is my youth meant to be nothing more than this?'; 'What is true peace, and what price must I pay to touch it?' Those very questions became the slash that tore through the mist, leading me on a quest for my own answers.",
          vi: "Nhưng giữa vực thẳm sâu hút đó, tôi chợt nghe thấy tiếng gọi của bản ngã, những câu hỏi tự vấn đầy đớn đau nhưng sâu sắc: 'Mình đang sống vì điều gì?'; 'Lẽ nào tuổi trẻ của mình chỉ như vậy thôi sao ?'; 'Bình yên thực sự là gì, và tôi phải trả giá bao nhiêu để chạm vào nó?'. Chính những câu hỏi ấy đã trở thành nhát chém xé toạc màn sương, đưa tôi đi tìm câu trả lời cho riêng mình.",
        },
        {
          en: "The moment I found my life's purpose, everything changed. Opportunities once obscured by fear and laziness now stood clear before my eyes. The yearning to shine and to live a life of meaning has incinerated every fear of failure. To me now, hardship is a catalyst, and failure is but the steps on the ladder leading to my peak.",
          vi: "Khoảnh khắc tôi tìm thấy lý tưởng sống của chính mình. Những cơ hội trước đây bị nỗi sợ hãi và sự lười biếng che lấp, giờ đây hiện rõ ngay trước mắt tôi. Khát khao được tỏa sáng, được sống một cuộc đời ý nghĩa đã thiêu rụi mọi nỗi sợ thất bại. Với tôi hiện tại, khó khăn là chất xúc tác, và thất bại chỉ là những nấc thang để tôi leo lên đến đỉnh cao.",
        },
      ],
      lessons: [
        {
          en: "You never truly fail until you stop trying",
          vi: "Bạn chỉ thật sự thất bại khi bạn bỏ cuộc",
        },
        {
          en: "Let your aspirations overcome your fears",
          vi: "Hãy để khát vọng vượt qua nỗi sợ của bạn",
        },
        {
          en: "Evolve into your best self",
          vi: "Hãy Không ngừng hoàn thiện bản thân",
        },
      ],
    },
    forcedConnection: {
      question: { en: "Would you like to journey with me?", vi: "Bạn có muốn đồng hành cùng tôi không?" },
      yesLabel: { en: "Yes", vi: "Có" },
      noLabel: { en: "No", vi: "Không" },
      nextLabel: { en: "Next", vi: "Tiếp theo" },
    },
    companion: {
      title: { en: "Companion", vi: "Đồng hành" },
      subtitle: {
        en: "Where journeys converge",
        vi: "Nơi những hành trình giao thoa",
      },
      message: {
        en: "I am not merely seeking casual social ties. I am searching for a companion — someone who values depth over speed, integrity over convenience, and growth over comfort. If this resonance speaks to you, or if you aspire to redefine yourself, reach out. Let’s connect. :)",
        vi: "Tôi không chỉ đơn giản là tìm kiếm bạn bè xã giao. Tôi đang tìm một người đồng hành — coi trọng chiều sâu hơn tốc độ, sự chính trực hơn sự tiện lợi, và sự phát triển hơn sự thoải mái. Nếu tần số này cộng hưởng, hay bạn muốn thay đổi bản thân. Hãy nhắn cho tôi, chúng ta có thể làm quen :)",
      },
      cta: {
        en: "Start a Conversation",
        vi: "Bắt đầu cuộc trò chuyện",
      },
      ctaUrl: "https://www.facebook.com/minh.tris0802",
      discordCta: {
        en: "Join Learning Community",
        vi: "Tham gia cộng đồng học tập",
      },
      discordUrl: "https://discord.gg/GNnfYtShEu",
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
        { id: "scenery", label: { en: "Scenery", vi: "Cảnh vật" } },
        { id: "pets", label: { en: "Pets", vi: "Thú cưng" } },
        { id: "workspace", label: { en: "Workspace", vi: "Không gian làm việc" } },
      ],
      items: [
        {
          category: "scenery",
          image: asset("/gallery/scenery-1.png"),
          caption: { en: "What a beautiful sight of nature !", vi: "Cảnh đồng lúa xanh ngát tuyệt đẹp" },
          span: "tall",
        },
        {
          category: "pets",
          image: asset("/gallery/pet-1.png"),
          caption: { en: "Holy he really need some sleep duh :))", vi: "Trong nó tả không chịu được :)))" },
          span: "wide",
        },
        {
          category: "scenery",
          image: asset("/gallery/scenery-2.png"),
          caption: { en: "Night Drive feel so good !", vi: "Đi đêm quá đã !" },
          span: "tall",
        },
        {
          category: "workspace",
          image: asset("/gallery/workspace-1.png"),
          caption: { en: "Hot Cacao & Calculator", vi: "Cacao và Calculator" },
          span: "wide",
        },
      ],
    },
  },
  particles: {
    imagePaths: [asset("/leaf1.png"), asset("/leaf2.png")],
    maxParticles: 50,
    mobileParticles: 20,
  },
  music: {
    tracks: [
      { title: "Lateral Thinking | Haloweak", src: asset("/music/track1.mp3") },
      { title: "Blood & Tears | MyoMouse", src: asset("/music/track2.mp3") },
      { title: "VIETNAM My Home - Masew, MyoMouse, Nguyen Loi", src: asset("/music/track3.mp3") },
      { title: "Flow | Haloweak", src: asset("/music/track4.mp3") },
      { title: "The Lost Beyond | Kuro Games", src: asset("/music/track5.mp3") },
    ],
  },
} as const;
