import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kazuha — Portfolio",
  description: "Information Security Professional Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
