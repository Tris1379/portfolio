"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { motion } from "framer-motion";
import { usePage } from "@/components/PageContext";
import { Home } from "lucide-react";

export function PersonalitySection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  return (
    <div className="min-h-screen pt-16 pb-8 atmosphere-section atmosphere-personality">
      <div className="atmosphere-bg" style={{ backgroundImage: "url('/personality.png')" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-16">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors mb-6"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-center mb-2 text-white">
            {config.sections.personality.title}
          </h2>
          <div className="text-center mb-10">
            <span className="inline-block glass px-6 py-2 text-(--color-primary) font-[family-name:var(--font-display)] text-2xl tracking-widest">
              {config.sections.personality.mbti}
            </span>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {config.sections.personality.traits.map((trait, index) => (
            <motion.div
              key={trait.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.1 }}
              className="glass p-6"
            >
              <h3 className="font-[family-name:var(--font-display)] text-lg mb-2 text-(--color-text)">
                {trait.name}
              </h3>
              <p className="text-(--color-text-secondary) leading-relaxed">
                {trait.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
