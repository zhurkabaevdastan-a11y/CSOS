import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import VisitTracker from "./VisitTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://csos-nu.vercel.app"),
  title: "Все о социальной политике ҚТЖ",
  description: "Корпоративная культура, социальная стабильность, молодёжные, волонтёрские и спортивные инициативы ҚТЖ.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Все о социальной политике ҚТЖ",
    description: "Люди. Движение. Возможности.",
    type: "website",
    images: [{ url: "/ktz-hero.png", width: 1672, height: 941, alt: "Люди. Движение. Возможности. Всё о социальной политике ҚТЖ" }],
  },
  twitter: { card: "summary_large_image", images: ["/ktz-hero.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}<VisitTracker /><Analytics /><script src="/language.js" defer /></body></html>;
}
