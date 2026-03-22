"use client";

import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  return (
    <nav className="glass fixed top-0 left-0 right-0 z-(--z-navbar)">
      <div className="flex justify-between items-center max-w-4xl mx-auto px-4 md:px-8 h-14">
        <span className="font-[family-name:var(--font-display)] text-lg text-(--color-text)">
          {siteConfig.name}
        </span>
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
