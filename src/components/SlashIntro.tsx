"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";

const QUOTE = "Listen to the wind\u2026";
const LEAF_COLORS = ["#d64d2e", "#c86432", "#e08a4a", "#a8e6cf", "#7bc8a4"];

export function SlashIntro({ locale }: { locale: Locale }) {
  const config = getConfig(locale);
  const [phase, setPhase] = useState<"text" | "slash" | "fracture" | "done">("text");
  const [hidden, setHidden] = useState(false);
  const leafRef = useRef<HTMLDivElement>(null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; };
  }, []);

  // Leaf burst from the cut path — leaves fly off screen, not fade out
  const burstLeaves = useCallback(() => {
    if (!alive.current || !leafRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    for (let i = 0; i < (window.innerWidth < 768 ? 25 : 60); i++) {
      setTimeout(() => {
        if (!alive.current || !leafRef.current) return;
        const el = document.createElement("div");
        // Leaves spawn along the diagonal cut
        const t = Math.random();
        const sx = vw * 0.7 - t * vw * 0.55;
        const sy = vh * 0.35 + t * vh * 0.3;
        // Burst outward — must travel far enough to exit viewport
        const angle = (Math.random() - 0.5) * Math.PI * 2;
        const dist = Math.max(vw, vh) + 200;
        const speed = dist + Math.random() * dist;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const size = 4 + Math.random() * 12;
        const rot = (Math.random() - 0.5) * 1440;
        const dur = 1.2 + Math.random() * 1.0;
        const color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];

        el.style.cssText = `
          position:absolute;left:${sx}px;top:${sy}px;
          width:${size}px;height:${size * 0.45}px;
          border-radius:50%;
          background:${color};
          pointer-events:none;z-index:250;opacity:0.9;
          will-change:transform;
          transition:transform ${dur}s cubic-bezier(.22,.61,.36,1);
        `;
        leafRef.current.appendChild(el);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transform = `translate(${vx}px,${vy}px) rotate(${rot}deg)`;
          });
        });

        // Remove only after fully off-screen
        setTimeout(() => el.remove(), dur * 1000 + 50);
      }, i * 10);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("slash-intro-seen")) {
      setHidden(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const push = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    // 1200ms: slash fires
    push(() => setPhase("slash"), 1200);

    // 1300ms: fracture + leaf burst
    push(() => {
      setPhase("fracture");
      burstLeaves();
    }, 1300);

    // 3000ms: done
    push(() => {
      setPhase("done");
      sessionStorage.setItem("slash-intro-seen", "true");
    }, 3000);

    // 3600ms: unmount
    push(() => setHidden(true), 3600);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [burstLeaves]);

  if (hidden) return null;

  const isFractured = phase === "fracture" || phase === "done";
  const isDone = phase === "done";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 9999,
        background: "var(--color-bg)",
        opacity: isDone ? 0 : 1,
        transition: "opacity 0.6s ease-out",
        pointerEvents: isDone ? "none" : "auto",
      }}
    >
      {/* Leaf burst container */}
      <div ref={leafRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Flash at impact point */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          width: "300px",
          height: "8px",
          transform: "translate(-50%, -50%) rotate(-10deg)",
          background: "radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, transparent 70%)",
          filter: "blur(4px)",
          opacity: phase === "fracture" ? 1 : 0,
          transition: "opacity 0.08s ease-out",
          zIndex: 30,
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="0 0 800 200"
        className="w-[90vw] max-w-[800px] h-auto"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Upper-left half of the diagonal cut */}
          <clipPath id="kz-upper">
            <rect x="0" y="0" width="800" height="100" />
          </clipPath>
          {/* Lower-right half of the diagonal cut */}
          <clipPath id="kz-lower">
            <rect x="0" y="100" width="800" height="100" />
          </clipPath>
          <filter id="blade-glow" x="-50%" y="-300%" width="200%" height="700%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="motion-blur" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0,2" />
          </filter>
          <linearGradient id="blade-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#a8e6cf" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#a8e6cf" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Quote */}
        <text
          x="400" y="65"
          textAnchor="middle" dominantBaseline="middle"
          fill="var(--color-text-secondary)"
          fontSize="18" fontFamily="Inter, sans-serif"
          fontWeight="300" letterSpacing="3"
          opacity={isDone ? 0 : 1}
          style={{ transition: "opacity 0.4s ease-out" }}
        >
          {QUOTE}
        </text>

        {/* Kazuha — UPPER-LEFT half */}
        <g
          clipPath="url(#kz-upper)"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center center",
            transform: isFractured
              ? "rotate(-15deg) translate(-35px, -30px)"
              : "rotate(0deg) translate(0, 0)",
            opacity: isFractured ? 0.4 : 1,
            filter: isFractured ? "blur(1.5px)" : "blur(0)",
            transition: "transform 0.5s cubic-bezier(.25,.46,.45,.94), opacity 0.4s ease-out, filter 0.3s ease-out",
          }}
        >
          <text
            x="400" y="130"
            textAnchor="middle" dominantBaseline="middle"
            fill="var(--color-text)"
            fontSize="72" fontFamily="Playfair Display, serif" fontWeight="400"
          >
            {config.name}
          </text>
        </g>

        {/* Kazuha — LOWER-RIGHT half */}
        <g
          clipPath="url(#kz-lower)"
          style={{
            transformBox: "fill-box",
            transformOrigin: "center center",
            transform: isFractured
              ? "rotate(15deg) translate(35px, 30px)"
              : "rotate(0deg) translate(0, 0)",
            opacity: isFractured ? 0.4 : 1,
            filter: isFractured ? "blur(1.5px)" : "blur(0)",
            transition: "transform 0.5s cubic-bezier(.25,.46,.45,.94), opacity 0.4s ease-out, filter 0.3s ease-out",
          }}
        >
          <text
            x="400" y="130"
            textAnchor="middle" dominantBaseline="middle"
            fill="var(--color-text)"
            fontSize="72" fontFamily="Playfair Display, serif" fontWeight="400"
          >
            {config.name}
          </text>
        </g>

        {/* Diagonal slash line */}
        <line
          x1="120" y1="55" x2="680" y2="145"
          stroke="url(#blade-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#blade-glow)"
          pathLength="1"
          style={{
            strokeDasharray: "1",
            strokeDashoffset: phase === "slash" || isFractured || isDone ? "0" : "1",
            transition: "stroke-dashoffset 0.1s cubic-bezier(0.16,1,0.3,1)",
            opacity: isDone ? 0 : 1,
          }}
        />

        {/* Slash tip — bright point */}
        <circle r="5" fill="#ffffff" filter="url(#blade-glow)">
          {(phase === "slash" || isFractured || isDone) && (
            <animateMotion dur="0.1s" fill="freeze" path="M 120,55 L 680,145" />
          )}
        </circle>
      </svg>
    </div>
  );
}
