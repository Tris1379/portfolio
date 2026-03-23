import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { ArsenalSection } from "@/components/ArsenalSection";
import { GallerySection } from "@/components/GallerySection";
import { ValuesSection } from "@/components/ValuesSection";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <ArsenalSection />
      <GallerySection />
      <ValuesSection />
      <SocialLinks />
    </main>
  );
}
