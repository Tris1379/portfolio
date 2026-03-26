import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { ParticlesLazy } from "@/components/ParticlesLazy";
import { SlashIntro } from "@/components/SlashIntro";
import { MusicPlayer } from "@/components/MusicPlayer";
import { getConfig } from "@/config/i18n";
import type { Locale } from "@/config/i18n";
import { routing } from "@/i18n/routing";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const config = getConfig(locale as Locale);
  return {
    title: `${config.name} — Portfolio`,
    description: `${config.title}`,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="bg-(--color-bg) text-(--color-text) antialiased font-[family-name:var(--font-body)]">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SlashIntro locale={locale as Locale} />
            <ParticlesLazy />
            <Navbar />
            <MusicPlayer />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
