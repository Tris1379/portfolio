"use client";

import { useEffect, useState } from "react";
import type { ISourceOptions } from "@tsparticles/engine";
import { usePage } from "@/components/PageContext";

const leafColors = ["#d64d2e", "#c86432", "#e08a4a", "#a8e6cf", "#7bc8a4"];
const leafImages = [
  { src: "/leaf1.png", width: 32, height: 32 },
  { src: "/leaf2.png", width: 32, height: 32 },
];

// Small leaves — sharp, slower, many
const smallLeafOptions: ISourceOptions = {
  fullScreen: { enable: false },
  particles: {
    number: {
      value: 100,
      density: { enable: false },
    },
    color: { value: leafColors },
    shape: {
      type: "image",
      options: { image: leafImages },
    },
    opacity: {
      value: { min: 0.8, max: 1 },
    },
    size: {
      value: { min: 10, max: 30 },
    },
    move: {
      enable: true,
      speed: { min: 3, max: 8 },
      direction: "none",
      outModes: { default: "out" },
      random: true,
      straight: false,
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: {
        enable: true,
        speed: { min: 15, max: 40 },
        sync: false,
      },
      direction: "random",
    },
    tilt: {
      enable: true,
      value: { min: 0, max: 360 },
      animation: {
        enable: true,
        speed: { min: 10, max: 25 },
        sync: false,
      },
      direction: "random",
    },
    life: {
      duration: { min: 0.6, max: 1.0 },
      delay: { min: 0, max: 0.15 },
    },
  },
  detectRetina: true,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: { value: 40 },
        },
      },
    },
  ],
};

// Large leaves — fast, dramatic, blurred
const largeLeafOptions: ISourceOptions = {
  fullScreen: { enable: false },
  particles: {
    number: {
      value: 12,
      density: { enable: false },
    },
    color: { value: leafColors },
    shape: {
      type: "image",
      options: { image: leafImages },
    },
    opacity: {
      value: { min: 0.9, max: 1 },
    },
    size: {
      value: { min: 35, max: 50 },
    },
    move: {
      enable: true,
      speed: { min: 5, max: 12 },
      direction: "none",
      outModes: { default: "out" },
      random: true,
      straight: false,
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: {
        enable: true,
        speed: { min: 20, max: 50 },
        sync: false,
      },
      direction: "random",
    },
    tilt: {
      enable: true,
      value: { min: 0, max: 360 },
      animation: {
        enable: true,
        speed: { min: 10, max: 25 },
        sync: false,
      },
      direction: "random",
    },
    life: {
      duration: { min: 0.7, max: 1.0 },
      delay: { min: 0, max: 0.1 },
    },
  },
  detectRetina: true,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: { value: 5 },
        },
      },
    },
  ],
};

export function MapleLeafStorm() {
  const { isTransitioning } = usePage();
  const [ParticlesComp, setParticlesComp] = useState<React.ComponentType<{
    id: string;
    options: ISourceOptions;
    className: string;
  }> | null>(null);

  // Lazy-load tsParticles engine (shares global engine with ParticlesBackground)
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
    return () => {
      cancelled = true;
    };
  }, []);

  // Only render during transitions — unmounting disposes all particles
  if (!isTransitioning || !ParticlesComp) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: "var(--z-transition-particles)" }}
    >
      {/* Small leaves layer — sharp */}
      <ParticlesComp
        id="leaf-storm-small"
        options={smallLeafOptions}
        className="w-full h-full pointer-events-none"
      />

      {/* Large leaves layer — blurred for depth-of-field */}
      <div style={{ filter: "blur(2.5px)" }}>
        <ParticlesComp
          id="leaf-storm-close"
          options={largeLeafOptions}
          className="w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
