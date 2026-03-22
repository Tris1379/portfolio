"use client";

export function LanguageSwitcher() {
  return (
    <button
      className="glass px-3 py-1 rounded-full text-sm"
      aria-label="Switch language"
    >
      <span className="text-(--color-text-secondary)">VI</span>
      <span className="mx-1 text-(--color-text-secondary)">|</span>
      <span className="font-semibold text-(--color-text)">EN</span>
    </button>
  );
}
