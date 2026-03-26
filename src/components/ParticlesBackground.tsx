"use client";

import { useEffect, useState } from "react";
import type { ISourceOptions } from "@tsparticles/engine";
import { asset } from "@/lib/asset";

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: false },
  particles: {
    number: {
      value: 30,
      density: { enable: true, width: 1200, height: 1200 },
    },
    color: {
      value: ["#c86432", "#d4763c", "#e08a4a", "#a85028"],
    },
    shape: {
      type: "image",
      options: {
        image: [
          { src: asset("/leaf1.png"), width: 60, height: 60 },
          { src: asset("/leaf2.png"), width: 60, height: 60 },
        ],
      },
    },
    opacity: {
      value: { min: 0.7, max: 1 },
      animation: {
        enable: true,
        speed: 0.3,
        sync: false,
        startValue: "random",
      },
    },
    size: {
      value: { min: 20, max: 50 },
    },
    move: {
      enable: true,
      direction: "bottom",
      speed: { min: 0.3, max: 0.8 },
      straight: false,
      outModes: { default: "out" },
      random: true,
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: {
        enable: true,
        speed: { min: 5, max: 20 },
        sync: false,
      },
      direction: "random",
    },
    tilt: {
      enable: true,
      value: { min: 0, max: 360 },
      animation: {
        enable: true,
        speed: { min: 5, max: 15 },
        sync: false,
      },
      direction: "random",
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      repulse: {
        distance: 120,
        duration: 0.6,
        speed: 1,
        factor: 80,
        easing: "ease-out-quad",
      },
    },
  },
  detectRetina: false,
  responsive: [
    {
      maxWidth: 768,
      options: {
        particles: {
          number: { value: 8 },
          size: { value: { min: 15, max: 30 } },
        },
        interactivity: {
          events: {
            onHover: { enable: false },
          },
        },
      },
    },
  ],
};

export function ParticlesBackground() {
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
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ParticlesComp) return null;

  return (
      <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      <ParticlesComp
        id="kazuha-leaves"
        options={particlesOptions}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}
