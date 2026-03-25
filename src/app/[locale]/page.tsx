"use client";

import { useLocale } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { usePage, type PageId } from "@/components/PageContext";
import { HeroSection } from "@/components/HeroSection";
import { VisionSection } from "@/components/VisionSection";
import { AboutMeSection } from "@/components/AboutMeSection";
import { JourneySection } from "@/components/JourneySection";
import { ForcedConnectionPage } from "@/components/ForcedConnection";
import { CompanionSection } from "@/components/CompanionSection";
import { PersonalSideSection } from "@/components/PersonalSideSection";
import { MapleLeafStorm } from "@/components/MapleLeafStorm";
import type { Locale } from "@/config/i18n";

const WIND_DURATION = 0.6;

function makeVariants(dir: 1 | -1) {
  return {
    initial: {
      x: dir === 1 ? -100 : 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: WIND_DURATION,
        ease: "circOut" as const,
      },
    },
    exit: {
      x: dir === 1 ? 100 : -100,
      opacity: 0,
      transition: {
        duration: WIND_DURATION * 0.85,
        ease: "circIn" as const,
      },
    },
  };
}

export default function Home() {
  const locale = useLocale() as Locale;
  const { currentPage, windDirection } = usePage();
  const variants = makeVariants(windDirection);

  function renderPage(page: PageId) {
    switch (page) {
      case "home":
        return <HeroSection locale={locale} />;
      case "vision":
        return <VisionSection locale={locale} />;
      case "about":
        return <AboutMeSection locale={locale} />;
      case "journey":
        return <JourneySection locale={locale} />;
      case "forcedConnection":
        return <ForcedConnectionPage locale={locale} />;
      case "companion":
        return <CompanionSection locale={locale} />;
      case "personal":
        return <PersonalSideSection locale={locale} />;
    }
  }

  return (
    <main className="min-h-screen relative">
      <MapleLeafStorm />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={variants}
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
