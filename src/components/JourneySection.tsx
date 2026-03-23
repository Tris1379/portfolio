"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { motion } from "framer-motion";
import { usePage } from "@/components/PageContext";
import { Home, Leaf } from "lucide-react";

export function JourneySection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  return (
    <div className="min-h-screen pt-16 pb-8 atmosphere-section atmosphere-journey">
      <div className="atmosphere-bg" style={{ backgroundImage: "url('/journey.png')" }} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-16">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-(--color-primary) transition-colors mb-6"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-center mb-10 text-white"
        >
          {config.sections.journey.title}
        </motion.h2>
        <div className="space-y-6 mb-10">
          {config.sections.journey.paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.15 }}
              className="glass p-6 md:p-8"
            >
              <p className="text-(--color-text-secondary) text-lg leading-relaxed">
                {paragraph}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {config.sections.journey.lessons.map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 glass px-4 py-2 rounded-full"
            >
              <Leaf className="w-4 h-4 text-(--color-primary)" />
              <span className="text-sm text-(--color-text-secondary)">
                {lesson}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
