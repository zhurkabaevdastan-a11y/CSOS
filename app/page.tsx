"use client";

import { useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { marathonRegistrationPath, topNavigation } from "./content";

const supabase = createClient(
  "https://bowvuafbszouqimilytd.supabase.co",
  "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG",
);

const directions = [
  { number: "01", href: "/corporate-culture", title: "Корпоративная культура", text: "Ценности, традиции и инициативы единой команды ҚТЖ.", mark: "КК" },
  { number: "02", href: "/social-stability", title: "Социальная стабильность", text: "Благополучие сотрудников, открытый диалог и профилактика социальных рисков.", mark: "СС" },
  { number: "03", href: "/appeals", title: "Информация по жалобам и обращениям", text: "Раздел готовится к наполнению.", mark: "ОБ" },
  { number: "04", href: "/youth", title: "Молодёжная политика", text: "КВН, региональный совет и конкурс «Жас үздік маман».", mark: "МП" },
  { number: "05", href: "/children", title: "Работа с детьми", text: "Образовательные, спортивные и семейные инициативы.", mark: "ДТ" },
  { number: "06", href: "/pensioners", title: "Ветераны отрасли", text: "Поддержка ветеранов, встречи поколений и сохранение истории.", mark: "ВО" },
  { number: "07", href: "/volunteering", title: "Волонтёрство", text: "Школа корпоративного волонтёрства и лучшие волонтёры 2026 года.", mark: "ВЛ" },
  { number: "08", href: "/sport", title: "Спортивная жизнь", text: "Инструкторы, календарь событий, результаты сборной и фотоархив.", mark: "СП" },
  { number: "09", href: "/team", title: "Наша команда", text: "Люди, которые развивают социальные программы и региональные инициативы.", mark: "НК" },
];

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

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<"auth" | "account" | "admin" | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<SiteAnalytics>(emptyAnalytics);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setRole(null); return; }
    supabase.from("profiles").select("role").eq("id", session.user.id).single()
      .then(({ data }) => setRole(data?.role ?? "participant"));
  }, [session]);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#login") setPanel("auth");
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [session]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const authenticate = async (create = false) => {
    setMessage("Проверяем данные…");
    const result = create
      ? await supabase.auth.signUp({ email: authEmail, password: authPassword })
      : await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (result.error) return setMessage(result.error.message);
    if (result.data.session) {
      setMessage("");
      setPanel(null);
      if (window.location.hash) window.history.replaceState(null, "", window.location.pathname);
      return;
    }
    setMessage(create && !result.data.session ? "Подтвердите адрес по ссылке в письме, затем войдите." : "Вход выполнен.");
  };

  const openCabinet = async () => {
    setMessage("");
    if (!session) return setPanel("auth");
    if (role === "admin") {
      setPanel("admin");
      setAdminLoading(true);
      setAdminError("");
      const [registrationResult, analyticsResult] = await Promise.all([
        supabase.from("registrations")
          .select("id,event_id,discipline,team_name,status,created_at,user_id,profiles(first_name,last_name,email,department,region,phone)")
          .order("created_at", { ascending: false }),
        supabase.rpc("get_site_analytics"),
      ]);
      setRegistrations(registrationResult.data ?? []);
      setAnalytics((analyticsResult.data as SiteAnalytics | null) ?? emptyAnalytics);
      if (registrationResult.error || analyticsResult.error) setAdminError("Не удалось загрузить часть данных. Обновите панель чуть позже.");
      setAdminLoading(false);
    } else setPanel("account");
  };

  const maxDailyViews = Math.max(1, ...analytics.daily.map((item) => Number(item.views)));
  const maxPageViews = Math.max(1, ...analytics.pages.map((item) => Number(item.views)));

  return (
    <main className="kpHome">
      <header className="kpHeader">
        <a className="kpBrand" href="/" aria-label="ҚТЖ — главная">
          <img src="/ktz-logo.png" alt="Қазақстан темір жолы" />
          <span><b>Все о социальной</b><small>политике ҚТЖ</small></span>
        </a>
        <nav className={menu ? "open" : ""}>{topNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <button className="kpCabinet" onClick={openCabinet}>{session ? (role === "admin" ? "Админ-панель" : "Мой аккаунт") : "Вход / регистрация"}</button>
        <button className="kpMenu" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Открыть меню">{menu ? "×" : "☰"}</button>
      </header>

      <section className="kpHomeHero" aria-label="Люди. Движение. Возможности.">
        <img className="kpHeroDesktop" src="/ktz-hero.png" alt="Люди. Движение. Возможности. Всё о социальной политике ҚТЖ" />
        <span className="kpHeroBrandLine">Все о социальной политике ҚТЖ</span>
        <div className="kpHeroMobile"><span>Все о социальной политике ҚТЖ</span><h1>Люди.<br />Движение.<br />Возможности.</h1><i /></div>
        <a href="#mission" className="kpScroll">Смотреть направления <span>↓</span></a>
      </section>

      <section className="kpMission reveal" id="mission">
        <span className="kpEyebrow">О социальной политике</span>
        <h2>Социальная политика, которая <em>объединяет большую команду.</em></h2>
        <p>Создаём среду для движения, добрых дел, профессионального роста и уважения к опыту железнодорожников.</p>
      </section>

      <section className="kpHomeFacts reveal" aria-label="Социальная политика в цифрах">
        <article><strong>120 000+</strong><span>сотрудников</span></article>
        <article><strong>9</strong><span>ключевых направлений</span></article>
        <article><strong>17</strong><span>регионов присутствия</span></article>
        <article><strong>45</strong><span>позиций спортивных инструкторов</span></article>
      </section>

      <section className="kpDirections reveal">
        <div className="kpSectionTitle"><span>01 / Направления</span><h2>Выберите свой маршрут</h2><p>Каждое направление и каждый подраздел открываются на отдельной странице.</p></div>
        <div className="kpDirectionList">{directions.map((item) => (
          <a href={item.href} key={item.href}><span>{item.number}</span><strong>{item.title}</strong><p>{item.text}</p><i>{item.mark}</i><b>↗</b></a>
        ))}</div>
      </section>

      <section className="kpFeatured reveal">
        <div className="kpFeaturedVisual"><span>Один<br />ритм.<br />Одна<br />команда.</span></div>
        <div className="kpFeaturedCopy"><span className="kpEyebrow">02 / Главное событие</span><time>20 сентября 2027 · Астана</time><h2>Марафон ҚТЖ</h2><p>Главный массовый старт для работников, семей и друзей железной дороги. Регистрация участников проходит в официальной форме Microsoft прямо на сайте.</p><div><a href={marathonRegistrationPath}>Регистрация на марафон <span>↗</span></a><a className="kpFeaturedSecondary" href="/sport/calendar">Календарь спорта</a></div></div>
      </section>

      <section className="kpUpdates reveal">
        <div className="kpSectionTitle"><span>03 / Актуальное</span><h2>Сейчас в центре внимания</h2></div>
        <div className="kpUpdateGrid">
          <a href="/sport/calendar"><span>СПОРТ · 2027</span><h3>Календарь спортивного сезона</h3><i>↗</i></a>
          <a href="/sport/results"><span>СПОРТ · РЕЗУЛЬТАТЫ</span><h3>Победы сборной команды ҚТЖ</h3><i>↗</i></a>
          <a href="/youth/young-specialist"><span>МОЛОДЁЖЬ</span><h3>Жас үздік маман</h3><i>↗</i></a>
        </div>
      </section>

      <footer className="kpFooter">
        <div><img src="/ktz-logo.png" alt="ҚТЖ" /><p>Все о социальной политике<br />АО «НК «Қазақстан темір жолы»</p></div>
        <nav>{topNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div><a href="mailto:social@railways.kz">social@railways.kz</a><p>Астана, ул. Д. Кунаева, 6</p></div>
        <small>© 2026 АО «НК «ҚТЖ»</small>
      </footer>

      {panel && <div className="modalBackdrop" onMouseDown={(event) => event.target === event.currentTarget && setPanel(null)}><section className={panel === "admin" ? "modal adminModal" : "modal"}>
        <button className="modalClose" onClick={() => setPanel(null)} aria-label="Закрыть">×</button>
        {panel === "auth" && <>
          <span className="kpEyebrow">Личный кабинет</span><h2>Вход в систему</h2>
          <p className="modalLead">Используйте корпоративную или личную электронную почту.</p>
          <label>Электронная почта<input type="email" value={authEmail} onChange={(event) => setAuthEmail(event.target.value)} placeholder="name@example.com" /></label>
          <label>Пароль<input type="password" value={authPassword} onChange={(event) => setAuthPassword(event.target.value)} placeholder="Не менее 6 символов" /></label>
          <div className="formActions"><button className="primary" onClick={() => authenticate(false)}>Войти</button><button className="secondary" onClick={() => authenticate(true)}>Зарегистрироваться на сайте</button></div>
          {message && <p className="formMessage">{message}</p>}
        </>}
        {panel === "account" && <>
          <span className="kpEyebrow">Личный кабинет</span><h2>Мой аккаунт</h2>
          <p className="modalLead">Вы вошли как <b>{session?.user.email}</b>.</p>
          <div className="formActions"><button type="button" className="secondary" onClick={() => { supabase.auth.signOut(); setPanel(null); }}>Выйти</button></div>
        </>}
        {panel === "admin" && <>
          <div className="adminHead"><div><span className="kpEyebrow">Быстрая панель</span><h2>Управление сайтом</h2><p>Посещения страниц и регистрации собраны в одном месте.</p></div><button className="secondary" onClick={() => { supabase.auth.signOut(); setPanel(null); }}>Выйти</button></div>
          {adminLoading && <p className="adminNotice">Загружаем актуальную статистику…</p>}
          {adminError && <p className="adminNotice adminNotice--error">{adminError}</p>}

          <section className="adminSection">
            <div className="adminSectionTitle"><div><span>Посещаемость</span><h3>Статистика сайта</h3></div><small>Время: Астана</small></div>
            <div className="adminStats adminStats--analytics">
              <div><strong>{numberFormat.format(analytics.summary.total_views)}</strong><span>просмотров</span></div>
              <div><strong>{numberFormat.format(analytics.summary.unique_visitors)}</strong><span>посетителей</span></div>
              <div><strong>{numberFormat.format(analytics.summary.today_views)}</strong><span>сегодня</span></div>
              <div><strong>{numberFormat.format(analytics.summary.seven_day_views)}</strong><span>за 7 дней</span></div>
            </div>

            <div className="analyticsChart" aria-label="Просмотры за последние 14 дней">
              <div className="analyticsChartHead"><h4>Динамика за 14 дней</h4><span>{numberFormat.format(analytics.summary.sessions)} сессий всего</span></div>
              <div className="analyticsBars">{analytics.daily.map((item) => <div key={item.day} title={`${item.day}: ${item.views} просмотров`}><span style={{ height: `${Math.max(4, (Number(item.views) / maxDailyViews) * 100)}%` }} /><small>{new Date(`${item.day}T00:00:00+05:00`).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" })}</small></div>)}</div>
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
            <div className="tableWrap"><table><thead><tr><th>Участник</th><th>Контакты</th><th>Подразделение</th><th>Направление</th><th>Статус</th></tr></thead><tbody>{registrations.map((row) => <tr key={row.id}><td><b>{row.profiles?.last_name} {row.profiles?.first_name}</b><small>{row.profiles?.region}</small></td><td>{row.profiles?.email}<small>{row.profiles?.phone}</small></td><td>{row.profiles?.department || "—"}</td><td>{row.discipline || "—"}<small>{row.team_name}</small></td><td><span className="status">{["new", "submitted"].includes(row.status) ? "Новая" : row.status}</span></td></tr>)}</tbody></table>{!registrations.length && <p className="emptyState">Пока нет регистраций.</p>}</div>
          </section>
        </>}
      </section></div>}
    </main>
  );
}
