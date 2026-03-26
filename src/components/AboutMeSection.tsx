"use client";

import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { motion } from "framer-motion";
import { usePage } from "@/components/PageContext";
import { Home, User, Calendar, MapPin, Sparkles, Heart, Ban, Target, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

function GlitchMBTI({ mbti }: { mbti: string }) {
  const [phase, setPhase] = useState<'idle_I' | 'toE' | 'idle_E' | 'backToI'>('idle_I');

  useEffect(() => {
    const stableDuration = 2000;
    const glitchDuration = 400;
    const totalCycle = (stableDuration + glitchDuration) * 2;

    const cycle = () => {
      setPhase('toE');
      setTimeout(() => setPhase('idle_E'), glitchDuration);
      setTimeout(() => setPhase('backToI'), stableDuration + glitchDuration);
      setTimeout(() => setPhase('idle_I'), stableDuration + glitchDuration * 2);
    };

    const interval = setInterval(cycle, totalCycle);
    const timeout = setTimeout(cycle, stableDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const isGlitching = phase === 'toE' || phase === 'backToI';
  const firstChar = phase === 'toE' || phase === 'idle_E' ? 'E' : mbti[0];
  const restOfString = mbti.slice(1);

  return (
    <span>
      <span
        className={`glitch-char ${isGlitching ? 'glitching' : ''}`}
        data-char={firstChar}
        data-phase={phase}
        style={{ display: 'inline-block', width: '0.6em', textAlign: 'center' }}
      >
        {firstChar}
      </span>
      {restOfString}
    </span>
  );
}

const infoIcons: Record<string, React.ReactNode> = {
  name: <User className="w-4 h-4" />,
  nickname: <Sparkles className="w-4 h-4" />,
  dob: <Calendar className="w-4 h-4" />,
  nationality: <MapPin className="w-4 h-4" />,
  school: <GraduationCap className="w-4 h-4" />,
  personality: <Sparkles className="w-4 h-4" />,
};

const infoLabels: Record<string, { en: string; vi: string }> = {
  name: { en: "Name", vi: "Tên" },
  nickname: { en: "Nickname", vi: "Biệt danh" },
  dob: { en: "Date of Birth", vi: "Ngày sinh" },
  nationality: { en: "Nationality", vi: "Quốc tịch" },
  school: { en: "School / Workplace", vi: "Trường học / Nơi làm việc" },
  personality: { en: "Personality", vi: "Tính cách" },
};

export function AboutMeSection({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  const aboutMe = config.sections.aboutMe;

  return (
    <div className="min-h-screen flex flex-col pt-16 pb-8 atmosphere-section atmosphere-personality">
      <div className="atmosphere-bg" style={{ backgroundImage: "url('/personality.png')" }} />
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-12 w-full">
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
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-center mb-8 text-white">
            {aboutMe.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="glass p-6 flex flex-col md:col-span-2"
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg mb-4 text-(--color-primary)">
              <User className="w-5 h-5 inline-block mr-2" />
              {locale === "vi" ? "Thông tin" : "Info"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(aboutMe.info).map(([key, value]) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="text-(--color-primary) mt-0.5">{infoIcons[key]}</span>
                  <div>
                    <p className="text-xs text-(--color-text-secondary) uppercase tracking-wider">
                      {infoLabels[key][locale]}
                    </p>
                    {key === "personality" ? (
                      <p className="text-(--color-text) font-light">
                        <GlitchMBTI mbti={typeof value === "string" ? value.split(" ")[0] : ""} />
                        {" "}{typeof value === "string" ? value.split(" ").slice(1).join(" ") : ""}
                      </p>
                    ) : (
                      <p className="text-(--color-text) font-light">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="glass p-6 flex flex-col"
            style={{ minHeight: "120px" }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg mb-3 text-(--color-primary)">
              <Heart className="w-5 h-5 inline-block mr-2" />
              {locale === "vi" ? "Sở thích" : "Likes"}
            </h3>
            <ul className="space-y-1">
              {aboutMe.likes.map((item) => (
                <li key={item} className="text-(--color-text-secondary) font-light flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary) shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="glass p-6 flex flex-col"
            style={{ minHeight: "120px" }}
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg mb-3 text-(--color-primary)">
              <Ban className="w-5 h-5 inline-block mr-2" />
              {locale === "vi" ? "Không thích" : "Dislikes"}
            </h3>
            <ul className="space-y-1">
              {aboutMe.dislikes.map((item) => (
                <li key={item} className="text-(--color-text-secondary) font-light flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-(--color-primary) shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
            className="glass p-6 flex flex-col md:col-span-2"
          >
            <h3 className="font-[family-name:var(--font-display)] text-lg mb-3 text-(--color-primary)">
              <Target className="w-5 h-5 inline-block mr-2" />
              {locale === "vi" ? "Mục tiêu" : "Aspiration"}
            </h3>
            <p className="text-(--color-text-secondary) leading-relaxed font-light">
              {aboutMe.aspiration}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
