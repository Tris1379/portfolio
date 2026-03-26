"use client";

import { motion } from "framer-motion";
import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { usePage, type PageId } from "@/components/PageContext";
import { Eye, User, Route, Handshake, Image } from "lucide-react";
import { useLocale } from "next-intl";
import { asset } from "@/lib/asset";

const navCards: { id: PageId; icon: React.ReactNode; label: { en: string; vi: string } }[] = [
  { id: "vision", icon: <Eye className="w-5 h-5" />, label: { en: "Vision", vi: "Tầm nhìn" } },
  { id: "about", icon: <User className="w-5 h-5" />, label: { en: "About Me", vi: "Về tôi" } },
  { id: "journey", icon: <Route className="w-5 h-5" />, label: { en: "Journey", vi: "Hành trình" } },
  { id: "companion", icon: <Handshake className="w-5 h-5" />, label: { en: "Companion", vi: "Đồng hành" } },
  { id: "personal", icon: <Image className="w-5 h-5" />, label: { en: "Gallery", vi: "Bộ sưu tập" } },
];

export function HeroSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  const activeLocale = useLocale() as "en" | "vi";

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-8 atmosphere-section atmosphere-hero">
      <div className="atmosphere-bg" style={{ backgroundImage: `url('${asset("/hero.png")}')` }} />
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] text-5xl md:text-7xl mb-4 text-white"
          style={{ textShadow: '0 2px 12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.3)' }}
        >
          {config.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-xl md:text-2xl text-white/60 mb-2"
          style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}
        >
          {config.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-base md:text-lg text-white/60 mb-12 max-w-2xl mx-auto"
          style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}
        >
          {config.bio}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {navCards.map((card) => (
            <button
              key={card.id}
              onClick={() => navigateTo(card.id)}
              className="glass p-4 rounded-xl flex flex-col items-center gap-2 group transition-all duration-300 hover:border-(--color-primary)/50 hover:shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.25),0_0_60px_rgba(var(--color-primary-rgb),0.1)] hover:scale-105"
            >
              <span className="text-(--color-text-secondary) group-hover:text-(--color-primary) transition-colors duration-300">
                {card.icon}
              </span>
              <span className="text-sm text-(--color-text-secondary) group-hover:text-(--color-text) transition-colors duration-300">
                {card.label[activeLocale]}
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
