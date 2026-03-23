"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { motion } from "framer-motion";
import { usePage } from "@/components/PageContext";
import { Home } from "lucide-react";

export function VisionSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  return (
    <div className="min-h-screen pt-16 pb-8 atmosphere-section atmosphere-vision">
      <div className="atmosphere-bg" style={{ backgroundImage: "url('/vision.png')" }} />
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
            {config.sections.vision.title}
          </h2>
          <p className="text-center text-white/60 text-lg mb-10">
            {config.sections.vision.subtitle}
          </p>
        </motion.div>
        <div className="space-y-6">
          {config.sections.vision.paragraphs.map((paragraph, index) => (
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
      </div>
    </div>
  );
}
