"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePage } from "@/components/PageContext";

export function MapleLeafStorm() {
  const { showLeafStorm, windDirection } = usePage();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spawnLeaves = useCallback((count: number) => {
    if (!containerRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dir = windDirection;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      const size = 30 + Math.random() * 150;

      // Enter from the leading edge (left for forward, right for backward)
      const startX = dir === 1
        ? -50 - Math.random() * 100
        : vw + 50 + Math.random() * 100;
      const startY = Math.random() * vh;

      // Velocity: enough to fully exit the opposite side
      const travelDist = vw + 600;
      const dur = 1.5 + Math.random() * 1.0;
      const vx = dir * (travelDist / dur);
      const vy = (Math.random() - 0.5) * 200;
      const rot = (Math.random() - 0.5) * 1080;

      const leafSrc = Math.random() > 0.5 ? "/leaf1.png" : "/leaf2.png";
      el.style.cssText = `
        position:absolute;
        left:${startX}px;top:${startY}px;
        width:${size}px;height:${size}px;
        background-image:url('${leafSrc}');
        background-size:contain;
        background-repeat:no-repeat;
        pointer-events:none;opacity:0.85;
        will-change:transform;
        transition:transform ${dur}s linear;
      `;
      containerRef.current.appendChild(el);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transform = `translate(${vx * dur}px, ${vy * dur}px) rotate(${rot}deg)`;
        });
      });

      // Remove only after fully off-screen
      setTimeout(() => el.remove(), dur * 1000 + 50);
    }
  }, [windDirection]);

  useEffect(() => {
    if (showLeafStorm) {
      // Burst first, then stream
      spawnLeaves(40);
      intervalRef.current = setInterval(() => {
        spawnLeaves(6);
      }, 35);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [showLeafStorm, spawnLeaves]);

  // Container always mounted — leaves remove themselves after exiting viewport
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: "var(--z-transition-particles)" }}
    />
  );
}
