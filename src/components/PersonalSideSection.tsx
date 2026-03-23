"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { usePage } from "@/components/PageContext";
import { Home } from "lucide-react";
import { useState } from "react";

export function PersonalSideSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  const data = config.sections.personalSide;
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems =
    activeFilter === "all"
      ? data.items
      : data.items.filter((item) => item.category === activeFilter);

  const spanClasses: Record<string, string> = {
    tall: "row-span-2",
    wide: "col-span-2",
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <button
          onClick={() => navigateTo("home")}
          className="flex items-center gap-2 text-sm text-(--color-text-secondary) hover:text-(--color-primary) transition-colors mb-6 relative z-[9999]"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-center mb-2 text-(--color-text)">
            {data.title}
          </h2>
          <p className="text-center text-(--color-text-secondary) text-lg mb-8">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex justify-center gap-2 mb-10 flex-wrap"
        >
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`relative z-[9999] px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeFilter === cat.id
                  ? "bg-(--color-primary) text-(--color-surface) font-medium shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)]"
                  : "glass text-(--color-text-secondary) hover:text-(--color-text) hover:border-(--color-primary)/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:balance]"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${item.category}-${item.image}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent backdrop-blur-[2px] translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
