"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: "en" | "vi") {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <button
      className="glass px-3 py-1 rounded-full text-sm"
      aria-label="Switch language"
      onClick={() => switchLocale(locale === "en" ? "vi" : "en")}
    >
      <span
        className={locale === "vi"
          ? "font-semibold text-(--color-text)"
          : "text-(--color-text-secondary)"}
      >
        VI
      </span>
      <span className="mx-1 text-(--color-text-secondary)">|</span>
      <span
        className={locale === "en"
          ? "font-semibold text-(--color-text)"
          : "text-(--color-text-secondary)"}
      >
        EN
      </span>
    </button>
  );
}
