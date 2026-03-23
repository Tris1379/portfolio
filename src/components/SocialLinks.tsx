"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { Github, Facebook, Mail, MessageCircle } from "lucide-react";
import { FadeInUp } from "@/components/FadeInUp";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  discord: <MessageCircle className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export function SocialLinks({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <FadeInUp>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-center mb-8 text-(--color-text)">
            Connect
          </h2>
        </FadeInUp>
        <FadeInUp delay={0.1}>
          <div className="flex justify-center gap-4">
            {config.social.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform === "email" ? undefined : "_blank"}
                rel={link.platform === "email" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="group flex flex-col items-center gap-2 glass p-3 rounded-xl transition-all duration-300 hover:border-(--color-primary)/50 hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.25)]"
              >
                <span className="text-(--color-text-secondary) transition-all duration-300 group-hover:text-(--color-primary) group-hover:scale-110">
                  {iconMap[link.icon]}
                </span>
                <span className="text-xs text-(--color-text-secondary) transition-colors duration-300 group-hover:text-(--color-text)">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
