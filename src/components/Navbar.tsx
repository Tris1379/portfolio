"use client";

import { getConfig } from "@/config/i18n";
import { useLocale } from "next-intl";
import { usePage, type PageId } from "@/components/PageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems: { id: PageId; label: { en: string; vi: string } }[] = [
  { id: "vision", label: { en: "Vision", vi: "Tầm nhìn" } },
  { id: "personality", label: { en: "Personality", vi: "Tính cách" } },
  { id: "journey", label: { en: "Journey", vi: "Hành trình" } },
  { id: "companion", label: { en: "Companion", vi: "Đồng hành" } },
  { id: "personal", label: { en: "Gallery", vi: "Bộ sưu tập" } },
];

export function Navbar() {
  const locale = useLocale() as "en" | "vi";
  const config = getConfig(locale);
  const { currentPage, navigateTo } = usePage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-(--z-navbar)">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4 md:px-8 h-14">
        <button
          onClick={() => { navigateTo("home"); setMenuOpen(false); }}
          className="font-[family-name:var(--font-display)] text-lg text-(--color-text) hover:text-(--color-primary) transition-colors"
        >
          {config.name}
        </button>

        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`relative text-sm transition-colors duration-200 py-1 ${
                currentPage === item.id
                  ? "text-(--color-primary)"
                  : "text-(--color-text-secondary) hover:text-(--color-text)"
              }`}
            >
              {item.label[locale]}
              {currentPage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--color-primary) rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-3 items-center">
          <ThemeToggle />
          <LanguageSwitcher />
          <button
            className="md:hidden text-(--color-text-secondary) hover:text-(--color-text)"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-(--color-text)/10 px-4 py-3 flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { navigateTo(item.id); setMenuOpen(false); }}
              className={`text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? "text-(--color-primary) bg-(--color-text)/5"
                  : "text-(--color-text-secondary) hover:text-(--color-text) hover:bg-(--color-text)/5"
              }`}
            >
              {item.label[locale]}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
