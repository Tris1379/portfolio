import { getLocale } from "next-intl/server";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { ArsenalSection } from "@/components/ArsenalSection";
import { GallerySection } from "@/components/GallerySection";
import { ValuesSection } from "@/components/ValuesSection";
import { SocialLinks } from "@/components/SocialLinks";
import type { Locale } from "@/config/i18n";

export default async function Home() {
  const locale = (await getLocale()) as Locale;
  return (
    <main>
      <HeroSection locale={locale} />
      <StorySection locale={locale} />
      <ArsenalSection locale={locale} />
      <GallerySection locale={locale} />
      <ValuesSection locale={locale} />
      <SocialLinks locale={locale} />
    </main>
  );
}
