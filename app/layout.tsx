import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://csos-nu.vercel.app"),
  title: "Департамент социальной политики ҚТЖ",
  description: "Спорт, волонтерство, молодежная политика и поддержка ветеранов ҚТЖ.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Департамент социальной политики ҚТЖ",
    description: "Люди. Движение. Возможности.",
    type: "website",
    images: [{ url: "/ktz-hero.png", width: 1672, height: 941, alt: "Люди. Движение. Возможности. Департамент социальной политики ҚТЖ" }],
  },
  twitter: { card: "summary_large_image", images: ["/ktz-hero.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
