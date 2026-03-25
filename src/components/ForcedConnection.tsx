"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";
import { usePage } from "@/components/PageContext";
import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import type { ISourceOptions } from "@tsparticles/engine";

type Stage = "question" | "celebrating";

function WindParticle({ index, origin }: { index: number; origin: { x: number; y: number } }) {
  const angle = (index / 6) * 360 + Math.random() * 60;
  const dist = 40 + Math.random() * 60;
  const tx = Math.cos((angle * Math.PI) / 180) * dist;
  const ty = Math.sin((angle * Math.PI) / 180) * dist;
  const rot = Math.random() * 720 - 360;

  return (
    <motion.div
      className="wind-particle"
      initial={{ opacity: 1, x: origin.x, y: origin.y, scale: 1, rotate: 0 }}
      animate={{ opacity: 0, x: origin.x + tx, y: origin.y + ty, scale: 0.3, rotate: rot }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ position: "absolute", pointerEvents: "none", zIndex: 10 }}
    >
      <Leaf className="w-4 h-4 text-(--color-primary)" />
    </motion.div>
  );
}

function GoldenShower({ onComplete }: { onComplete: () => void }) {
  const [ParticlesComp, setParticlesComp] = useState<React.ComponentType<{
    id: string;
    options: ISourceOptions;
    className: string;
  }> | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("@tsparticles/react"),
      import("@tsparticles/slim"),
    ]).then(([reactModule, slimModule]) => {
      if (cancelled) return;
      const { initParticlesEngine } = reactModule;
      const { loadSlim } = slimModule;
      initParticlesEngine(async (engine) => {
        await loadSlim(engine);
      }).then(() => {
        if (cancelled) return;
        setParticlesComp(() => reactModule.Particles);
      });
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!ParticlesComp) return null;

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    emitters: {
      position: { x: 50, y: 0 },
      rate: { quantity: 80, delay: 0 },
      life: { count: 1, duration: 0.5 },
    },
    particles: {
      number: { value: 0 },
      color: {
        value: ["#FFD700", "#FFA500", "#daa520", "#a8e6cf"],
      },
      shape: {
        type: "image",
        options: {
          image: [
            { src: "/leaf1.png", width: 40, height: 40 },
            { src: "/leaf2.png", width: 40, height: 40 },
          ],
        },
      },
      opacity: {
        value: { min: 0.7, max: 1 },
        animation: {
          enable: true,
          speed: 0.5,
          sync: false,
          startValue: "random",
        },
      },
      size: {
        value: { min: 15, max: 40 },
      },
      move: {
        enable: true,
        direction: "bottom",
        speed: { min: 3, max: 8 },
        straight: false,
        outModes: { default: "out" },
        random: true,
      },
      rotate: {
        value: { min: 0, max: 360 },
        animation: {
          enable: true,
          speed: { min: 10, max: 30 },
          sync: false,
        },
        direction: "random",
      },
      tilt: {
        enable: true,
        value: { min: 0, max: 360 },
        animation: {
          enable: true,
          speed: { min: 10, max: 20 },
          sync: false,
        },
        direction: "random",
      },
      life: {
        duration: { value: 2 },
        count: 1,
      },
    },
    detectRetina: true,
  };

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 100 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ParticlesComp
        id="golden-shower"
        options={options}
        className="w-full h-full pointer-events-none"
      />
    </motion.div>
  );
}

export function ForcedConnectionPage({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const { navigateTo } = usePage();
  const [stage, setStage] = useState<Stage>("question");
  const [noPos, setNoPos] = useState({ x: 50, y: 50 });
  const [yesPos, setYesPos] = useState<{ x: number; y: number } | null>(null);
  const [windParticles, setWindParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIdRef = useRef(0);

  const handleNoMouseEnter = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const prevX = (noPos.x / 100) * rect.width;
    const prevY = (noPos.y / 100) * rect.height;

    const newX = 10 + Math.random() * 80;
    const newY = 10 + Math.random() * 80;
    setNoPos({ x: newX, y: newY });
    setYesPos({ x: 50, y: 50 });

    setWindParticles((prev) => [
      ...prev,
      ...Array.from({ length: 6 }, () => ({
        id: particleIdRef.current++,
        x: prevX,
        y: prevY,
      })),
    ]);
  }, [noPos.x, noPos.y]);

  useEffect(() => {
    if (windParticles.length > 0) {
      const timer = setTimeout(() => setWindParticles([]), 700);
      return () => clearTimeout(timer);
    }
  }, [windParticles]);

  const handleYesClick = useCallback(() => {
    setStage("celebrating");
  }, []);

  const handleCelebrationComplete = useCallback(() => {
    navigateTo("companion");
  }, [navigateTo]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center atmosphere-section atmosphere-journey">
      <div className="atmosphere-bg" style={{ backgroundImage: "url('/journey.png')" }} />
      <AnimatePresence mode="wait">
        {stage === "question" && (
          <motion.div
            key="question-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center w-full px-4"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-[family-name:var(--font-display)] text-2xl md:text-4xl text-center text-white mb-16"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
            >
              {config.sections.forcedConnection.question}
            </motion.h2>

            <div
              ref={containerRef}
              className="relative w-full max-w-lg h-[300px] mx-auto"
            >
              {/* Yes button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                onClick={handleYesClick}
                className="glass px-8 py-3 rounded-full text-(--color-text-secondary) hover:text-(--color-primary) transition-colors cursor-pointer"
                style={
                  yesPos
                    ? {
                        position: "absolute",
                        left: `${yesPos.x}%`,
                        top: `${yesPos.y}%`,
                        transform: "translate(-50%, -50%)",
                        transition: "left 0.3s ease-out, top 0.3s ease-out",
                        zIndex: 5,
                      }
                    : {
                        position: "absolute",
                        left: "35%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 5,
                      }
                }
              >
                <span className="text-sm font-light">{config.sections.forcedConnection.yesLabel}</span>
              </motion.button>

              {/* No button — dodges cursor */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                onMouseEnter={handleNoMouseEnter}
                className="glass px-8 py-3 rounded-full text-(--color-text-secondary) transition-colors cursor-pointer"
                style={{
                  position: "absolute",
                  left: `${noPos.x}%`,
                  top: `${noPos.y}%`,
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.3s ease-out, top 0.3s ease-out",
                  zIndex: 5,
                }}
              >
                <span className="text-sm font-light">{config.sections.forcedConnection.noLabel}</span>
              </motion.button>

              {/* Wind particles */}
              {windParticles.map((p) => (
                <WindParticle key={p.id} index={p.id % 6} origin={{ x: p.x, y: p.y }} />
              ))}
            </div>
          </motion.div>
        )}

        {stage === "celebrating" && (
          <GoldenShower key="golden" onComplete={handleCelebrationComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}
