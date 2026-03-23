"use client";

import dynamic from "next/dynamic";

const ParticlesClient = dynamic(
  () => import("@/components/ParticlesBackground").then((m) => m.ParticlesBackground),
  { ssr: false }
);

export function ParticlesLazy() {
  return <ParticlesClient />;
}
