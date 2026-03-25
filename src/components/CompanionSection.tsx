"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { motion } from "framer-motion";
import { usePage } from "@/components/PageContext";
import { Home, Mail, Github, Facebook, MessageCircle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  discord: <MessageCircle className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
};

export function CompanionSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  return (
    <div className="min-h-screen flex flex-col pt-16 pb-8 atmosphere-section atmosphere-companion">
      <div className="atmosphere-bg" style={{ backgroundImage: "url('/companion.png')" }} />
      {/* Lighthouse light beam */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute left-1/2 bottom-[18%] w-[600px] h-[600px] -ml-[300px]"
          style={{
            background: "conic-gradient(from 250deg at 50% 100%, transparent 0%, transparent 38%, rgba(255,240,180,0.05) 42%, rgba(255,240,180,0.1) 48%, rgba(255,240,180,0.05) 54%, transparent 58%, transparent 100%)",
            animation: "lighthouseBeam 8s ease-in-out infinite",
            transformOrigin: "50% 100%",
          }}
        />
      </div>
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-2xl mx-auto px-4 md:px-8 py-12 w-full text-center">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-(--color-primary) transition-colors mb-6 relative z-[9999] self-start"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl mb-2 text-white"
        >
          {config.sections.companion.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-(--color-primary) text-lg mb-6"
        >
          {config.sections.companion.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="glass p-6 md:p-8 mb-6"
          style={{ minHeight: "100px" }}
        >
          <p className="text-(--color-text-secondary) text-base md:text-lg leading-loose font-light tracking-wide">
            {config.sections.companion.message}
          </p>
        </motion.div>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
          href={config.sections.companion.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 glass px-6 py-3 rounded-xl text-(--color-primary) hover:border-(--color-primary)/50 hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.3),0_0_60px_rgba(var(--color-primary-rgb),0.12)] transition-all duration-300 hover:scale-105 mb-8"
        >
          <Facebook className="w-5 h-5" />
          <span className="font-medium">{config.sections.companion.cta}</span>
        </motion.a>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          {config.social.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target={link.platform === "email" ? undefined : "_blank"}
              rel={link.platform === "email" ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="group flex flex-col items-center gap-1.5 glass p-3 rounded-xl transition-all duration-300 hover:border-(--color-primary)/50 hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.25)]"
            >
              <span className="text-(--color-text-secondary) transition-all duration-300 group-hover:text-(--color-primary) group-hover:scale-110">
                {iconMap[link.icon]}
              </span>
              <span className="text-xs text-(--color-text-secondary) transition-colors duration-300 group-hover:text-(--color-text)">
                {link.label}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
