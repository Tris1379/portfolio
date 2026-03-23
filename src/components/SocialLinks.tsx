import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { Github, Linkedin, Mail } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export function SocialLinks({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8 text-(--color-text)">
          Connect
        </h2>
        <div className="flex justify-center gap-6">
          {config.social.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target={link.platform === "email" ? undefined : "_blank"}
              rel={link.platform === "email" ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="flex items-center gap-2 text-(--color-text-secondary) hover:text-(--color-primary) transition-colors"
            >
              {iconMap[link.icon]}
              <span className="text-sm text-(--color-text-secondary)">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
