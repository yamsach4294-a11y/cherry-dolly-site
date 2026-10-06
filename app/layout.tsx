import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "@fontsource-variable/noto-sans-jp";
import "@fontsource/lobster";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cherry Dolly — 甘くて、ごきげん。",
  description: "毎日に、ちいさなごきげんを。1950年代のアメリカンダイナーから生まれた、レトロでポップな架空のカップケーキブランド Cherry Dolly。",
  applicationName: "Cherry Dolly",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/icon.svg` },
};

export const viewport: Viewport = { themeColor: "#f9cbd4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
