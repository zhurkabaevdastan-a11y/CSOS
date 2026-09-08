import type { Metadata } from "next";
import AdminPanel from "./admin-panel";

export const metadata: Metadata = {
  title: "Админ-панель — ҚТЖ",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="kpAdminPage">
      <header className="kpHeader kpAdminHeader">
        <a className="kpBrand" href="/" aria-label="ҚТЖ — главная">
          <img src="/ktz-logo.png" alt="Қазақстан темір жолы" />
          <span><b>Все о социальной</b><small>политике ҚТЖ</small></span>
        </a>
        <a className="kpAdminBack" href="/">На главную</a>
        <button className="kpLanguage" type="button" data-language-toggle aria-label="Қазақ тіліне ауысу" title="Қазақша">ҚАЗ</button>
      </header>
      <AdminPanel />
    </main>
  );
}
