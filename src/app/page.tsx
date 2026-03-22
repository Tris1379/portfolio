import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <section className="max-w-4xl mx-auto text-center py-20">
        <h1 className="font-[family-name:var(--font-display)] text-5xl mb-4">
          {siteConfig.name}
        </h1>
        <p className="text-xl text-gray-300 mb-2">{siteConfig.title}</p>
        <p className="text-gray-400">{siteConfig.bio}</p>
      </section>
    </main>
  );
}
