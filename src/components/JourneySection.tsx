"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { motion } from "framer-motion";
import { usePage } from "@/components/PageContext";
import { Home, Leaf } from "lucide-react";
import { ForcedConnection } from "@/components/ForcedConnection";

export function JourneySection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  return (
    <div className="min-h-screen flex flex-col pt-16 pb-8 atmosphere-section atmosphere-journey">
      <div className="atmosphere-bg" style={{ backgroundImage: "url('/journey.png')" }} />
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-12 w-full">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-(--color-primary) transition-colors mb-6 relative z-[9999]"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-center mb-8 text-white"
        >
          {config.sections.journey.title}
        </motion.h2>
        <div className="space-y-5 mb-8">
          {config.sections.journey.paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.15 }}
              className="glass p-6 md:p-8"
              style={{ minHeight: "100px" }}
            >
              <p className="text-(--color-text-secondary) text-base md:text-lg leading-loose font-light tracking-wide">
                {paragraph}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {config.sections.journey.lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="flex items-center gap-2 glass px-4 py-2.5 rounded-full"
            >
              <Leaf className="w-4 h-4 text-(--color-primary)" />
              <span className="text-sm text-(--color-text-secondary) font-light">
                {lesson}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <ForcedConnection locale={locale} />
      </div>
    </div>
  );
}
