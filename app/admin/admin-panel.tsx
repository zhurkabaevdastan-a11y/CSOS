"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin, adminMessages, adminErrorMessage } from "../../public/admin-access.js";

const supabase = createClient(
  "https://bowvuafbszouqimilytd.supabase.co",
  "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG",
);

type SiteAnalytics = {
  summary: {
    total_views: number;
    unique_visitors: number;
    sessions: number;
    today_views: number;
    seven_day_views: number;
  };
  pages: Array<{ path: string; page_title: string; views: number; visitors: number; last_visit: string }>;
  daily: Array<{ day: string; views: number; visitors: number }>;
  recent: Array<{ path: string; page_title: string; visited_at: string }>;
};

const numberFormat = new Intl.NumberFormat("ru-RU");
const visitDateFormat = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Asia/Almaty",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const emptyAnalytics: SiteAnalytics = {
  summary: { total_views: 0, unique_visitors: 0, sessions: 0, today_views: 0, seven_day_views: 0 },
  pages: [],
  daily: [],
  recent: [],
};

const pageLabel = (title: string, path: string) => title || (path === "/" ? "Главная" : path);

export default function AdminPanel() {
  const [panel, setPanel] = useState<"auth" | "admin">("auth");
  const requestId = useRef(0);
  const [authLoading, setAuthLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<SiteAnalytics>(emptyAnalytics);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");


  const closePanel = useCallback(() => {
    requestId.current += 1;
    setPanel("auth");
    setAuthLoading(false);
    setAuthPassword("");
    setAnalytics(emptyAnalytics);
    setRegistrations([]);
  }, []);

  const openCabinet = useCallback(async () => {
    const id = ++requestId.current;
    setMessage("");
    setPanel("auth");
    setAuthLoading(true);
    setAnalytics(emptyAnalytics);
    setRegistrations([]);
    try {
      await requireAdmin(supabase);
      if (id !== requestId.current) return;
      setPanel("admin");
      setAdminLoading(true);
      setAdminError("");
      const [registrationResult, analyticsResult] = await Promise.all([
        supabase.from("registrations")
          .select("id,event_id,discipline,team_name,status,created_at,user_id,profiles(first_name,last_name,email,department,region,phone)")
          .order("created_at", { ascending: false }),
        supabase.rpc("get_site_analytics"),
      ]);
      if (id !== requestId.current) return;
      if (registrationResult.error || analyticsResult.error) {
        setAdminError(adminMessages.unavailable);
      } else {
        setRegistrations(registrationResult.data ?? []);
        setAnalytics((analyticsResult.data as SiteAnalytics | null) ?? emptyAnalytics);
      }
    } catch (error) {
      if (id !== requestId.current) return;
      setPanel("auth");
      setMessage(adminErrorMessage(error));
    } finally {
      if (id === requestId.current) { setAdminLoading(false); setAuthLoading(false); }
    }
  }, []);

  const authenticate = async () => {
    if (authLoading) return;
    const id = ++requestId.current;
    setAuthLoading(true);
    setMessage("");
    try {
      const result = await supabase.auth.signInWithPassword({ email: authEmail.trim(), password: authPassword });
      if (id !== requestId.current) return;
      if (result.error || !result.data.session) throw new Error(adminMessages.credentials);
      setAuthPassword("");
      await openCabinet();
    } catch (error) {
      if (id === requestId.current) setMessage(adminErrorMessage(error));
    } finally {
      if (id === requestId.current) setAuthLoading(false);
    }
  };

  useEffect(() => {
    void openCabinet();
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") closePanel();
    });
    return () => {
      requestId.current += 1;
      listener.subscription.unsubscribe();
    };
  }, [openCabinet, closePanel]);

  const signOut = () => { closePanel(); void supabase.auth.signOut({ scope: "local" }); };

  const maxDailyViews = Math.max(1, ...analytics.daily.map((item) => Number(item.views)));
  const maxPageViews = Math.max(1, ...analytics.pages.map((item) => Number(item.views)));

  return (
    <div className="kpAdminSurface">
      <section aria-label="Админ-панель" className={panel === "admin" ? "modal adminModal" : "modal"}>
        {panel === "auth" && <>
          <span className="kpEyebrow">Админ-панель</span><h2>Вход для администратора</h2>
          <p className="modalLead">Доступ к статистике сайта</p>
          <form onSubmit={(event) => { event.preventDefault(); void authenticate(); }}>
            <label>Электронная почта<input type="email" autoComplete="username" required value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="name@example.com" /></label>
            <label>Пароль<input type="password" autoComplete="current-password" required value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} /></label>
            <div className="formActions"><button className="primary" type="submit" disabled={authLoading}>{authLoading ? "Проверяем данные…" : "Войти"}</button></div>
          </form>
          {message && <p className="formMessage" role="alert">{message}</p>}
        </>}
        {panel === "admin" && <>
          <div className="adminHead"><div><span className="kpEyebrow">Быстрая панель</span><h2>Управление сайтом</h2><p>Посещения страниц и регистрации собраны в одном месте.</p></div><button className="secondary" onClick={signOut}>Выйти</button></div>
          {adminLoading && <p className="adminNotice">Загружаем актуальную статистику…</p>}
          {adminError && <p className="adminNotice adminNotice--error">{adminError}</p>}

          {!adminLoading && !adminError && <><section className="adminSection">
            <div className="adminSectionTitle"><div><span>Посещаемость</span><h3>Статистика сайта</h3></div><small>Время: Астана</small></div>
            <div className="adminStats adminStats--analytics">
              <div><strong>{numberFormat.format(analytics.summary.total_views)}</strong><span>просмотров</span></div>
              <div><strong>{numberFormat.format(analytics.summary.unique_visitors)}</strong><span>посетителей</span></div>
              <div><strong>{numberFormat.format(analytics.summary.today_views)}</strong><span>сегодня</span></div>
              <div><strong>{numberFormat.format(analytics.summary.seven_day_views)}</strong><span>за 7 дней</span></div>
            </div>

            <div className="analyticsChart" aria-label="Просмотры за последние 14 дней">
              <div className="analyticsChartHead"><h4>Динамика за 14 дней</h4><span>{numberFormat.format(analytics.summary.sessions)} сессий всего</span></div>
              <div className="adminChartScroll" tabIndex={0} role="region" aria-label="Просмотры за последние 14 дней"><div className="analyticsBars">{analytics.daily.map((item) => <div key={item.day} title={`${item.day}: ${item.views} просмотров`}><span style={{ height: `${Math.max(4, (Number(item.views) / maxDailyViews) * 100)}%` }} /><small>{new Date(`${item.day}T00:00:00+05:00`).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" })}</small></div>)}</div></div>
            </div>

            <div className="analyticsGrid">
              <div className="analyticsPanel"><div className="analyticsPanelHead"><h4>Просмотры по страницам</h4><span>{analytics.pages.length} страниц</span></div>
                <div className="pageAnalytics">{analytics.pages.map((item) => <article key={item.path}><div><b>{pageLabel(item.page_title, item.path)}</b><small>{item.path}</small></div><div className="pageAnalyticsNumbers"><strong>{numberFormat.format(item.views)}</strong><span>{numberFormat.format(item.visitors)} чел.</span></div><i style={{ width: `${Math.max(3, (Number(item.views) / maxPageViews) * 100)}%` }} /></article>)}{!analytics.pages.length && <p className="emptyState">Статистика начнёт появляться после новых посещений сайта.</p>}</div>
              </div>
              <div className="analyticsPanel"><div className="analyticsPanelHead"><h4>Последние посещения</h4><span>20 последних</span></div>
                <div className="recentVisits">{analytics.recent.map((item, index) => <article key={`${item.visited_at}-${index}`}><div><b>{pageLabel(item.page_title, item.path)}</b><small>{item.path}</small></div><time>{visitDateFormat.format(new Date(item.visited_at))}</time></article>)}{!analytics.recent.length && <p className="emptyState">Пока нет посещений.</p>}</div>
              </div>
            </div>
          </section>

          <section className="adminSection">
            <div className="adminSectionTitle"><div><span>Участники</span><h3>Регистрации на события</h3></div></div>
            <div className="adminStats"><div><strong>{registrations.length}</strong><span>всего заявок</span></div><div><strong>{registrations.filter((row) => ["new", "submitted"].includes(row.status)).length}</strong><span>новых</span></div><div><strong>{new Set(registrations.map((row) => row.profiles?.region).filter(Boolean)).size}</strong><span>регионов</span></div></div>
            <div className="tableWrap" tabIndex={0} role="region" aria-label="Регистрации на события"><table><thead><tr><th>Участник</th><th>Контакты</th><th>Подразделение</th><th>Направление</th><th>Статус</th></tr></thead><tbody>{registrations.map((row) => <tr key={row.id}><td><b>{row.profiles?.last_name} {row.profiles?.first_name}</b><small>{row.profiles?.region}</small></td><td>{row.profiles?.email}<small>{row.profiles?.phone}</small></td><td>{row.profiles?.department || "—"}</td><td>{row.discipline || "—"}<small>{row.team_name}</small></td><td><span className="status">{["new", "submitted"].includes(row.status) ? "Новая" : row.status}</span></td></tr>)}</tbody></table>{!registrations.length && <p className="emptyState">Пока нет регистраций.</p>}</div>
          </section></>}
        </>}
      </section>
    </div>
  );
}
