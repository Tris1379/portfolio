"use client";

import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePage, type PageId } from "@/components/PageContext";
import { HeroSection } from "@/components/HeroSection";
import { VisionSection } from "@/components/VisionSection";
import { PersonalitySection } from "@/components/PersonalitySection";
import { JourneySection } from "@/components/JourneySection";
import { CompanionSection } from "@/components/CompanionSection";
import { PersonalSideSection } from "@/components/PersonalSideSection";
import type { Locale } from "@/config/i18n";

const pageVariants = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
    y: 20,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    filter: "blur(12px)",
    y: -10,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const pageOrder: PageId[] = ["home", "vision", "personality", "journey", "companion", "personal"];

export default function Home() {
  const locale = useLocale() as Locale;
  const { currentPage } = usePage();
  const [direction, setDirection] = useState(0);
  const [prevPage, setPrevPage] = useState<PageId>("home");

  useEffect(() => {
    const prevIdx = pageOrder.indexOf(prevPage);
    const currIdx = pageOrder.indexOf(currentPage);
    setDirection(currIdx > prevIdx ? 1 : currIdx < prevIdx ? -1 : 0);
    setPrevPage(currentPage);
  }, [currentPage]);

  function renderPage(page: PageId) {
    switch (page) {
      case "home":
        return <HeroSection locale={locale} />;
      case "vision":
        return <VisionSection locale={locale} />;
      case "personality":
        return <PersonalitySection locale={locale} />;
      case "journey":
        return <JourneySection locale={locale} />;
      case "companion":
        return <CompanionSection locale={locale} />;
      case "personal":
        return <PersonalSideSection locale={locale} />;
    }
  }

  return (
    <main className="min-h-screen relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative min-h-screen"
        >
          {renderPage(currentPage)}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
