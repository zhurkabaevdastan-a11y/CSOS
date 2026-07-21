import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Департамент социальной политики ҚТЖ",
  description: "Спорт, волонтерство, молодежная политика и поддержка ветеранов ҚТЖ.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Департамент социальной политики ҚТЖ",
    description: "Вместе создаём сильное сообщество.",
    type: "website",
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
