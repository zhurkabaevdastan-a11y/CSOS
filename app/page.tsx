"use client";

import { useEffect, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";
import { marathonRegistrationUrl, topNavigation } from "./content";

const supabase = createClient(
  "https://bowvuafbszouqimilytd.supabase.co",
  "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG",
);

const directions = [
  { number: "01", href: "/corporate-culture", title: "Корпоративная культура", text: "Ценности, традиции и инициативы единой команды ҚТЖ.", mark: "КК" },
  { number: "02", href: "/social-stability", title: "Социальная стабильность", text: "Благополучие сотрудников, открытый диалог и профилактика социальных рисков.", mark: "СС" },
  { number: "03", href: "/appeals", title: "Информация по жалобам и обращениям", text: "Защищённый дашборд Power BI и работа с обратной связью.", mark: "ОБ" },
  { number: "04", href: "/youth", title: "Молодёжная политика", text: "КВН, региональный совет и конкурс «Жас үздік маман».", mark: "МП" },
  { number: "05", href: "/children", title: "Работа с детьми", text: "Образовательные, спортивные и семейные инициативы.", mark: "ДТ" },
  { number: "06", href: "/pensioners", title: "Ветераны отрасли", text: "Поддержка ветеранов, встречи поколений и сохранение истории.", mark: "ВО" },
  { number: "07", href: "/volunteering", title: "Волонтёрство", text: "Школа корпоративного волонтёрства и лучшие волонтёры 2026 года.", mark: "ВЛ" },
  { number: "08", href: "/sport", title: "Спортивная жизнь", text: "Инструкторы, календарь событий, результаты сборной и фотоархив.", mark: "СП" },
  { number: "09", href: "/team", title: "Наша команда", text: "Люди, которые развивают социальные программы и региональные инициативы.", mark: "НК" },
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<"auth" | "account" | "admin" | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);

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
    setMessage(create && !result.data.session ? "Подтвердите адрес по ссылке в письме, затем войдите." : "Вход выполнен.");
  };

  const openCabinet = async () => {
    setMessage("");
    if (!session) return setPanel("auth");
    if (role === "admin") {
      setPanel("admin");
      const { data } = await supabase.from("registrations")
        .select("id,event_id,discipline,team_name,status,created_at,user_id,profiles(first_name,last_name,email,department,region,phone)")
        .order("created_at", { ascending: false });
      setRegistrations(data ?? []);
    } else setPanel("account");
  };

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
        <div className="kpFeaturedCopy"><span className="kpEyebrow">02 / Главное событие</span><time>20 сентября 2027 · Астана</time><h2>Марафон ҚТЖ</h2><p>Главный массовый старт для работников, семей и друзей железной дороги. Регистрация участников проходит в официальной форме Microsoft.</p><div><a href={marathonRegistrationUrl} target="_blank" rel="noreferrer">Регистрация на марафон <span>↗</span></a><a className="kpFeaturedSecondary" href="/sport/calendar">Календарь спорта</a></div></div>
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
          <p className="modalLead">Вы вошли как <b>{session?.user.email}</b>. Регистрация на мероприятия доступна только для Марафона ҚТЖ.</p>
          <div className="formActions"><a className="primary" href={marathonRegistrationUrl} target="_blank" rel="noreferrer">Регистрация на марафон</a><button type="button" className="secondary" onClick={() => { supabase.auth.signOut(); setPanel(null); }}>Выйти</button></div>
        </>}
        {panel === "admin" && <>
          <div className="adminHead"><div><span className="kpEyebrow">Быстрая панель</span><h2>Регистрации на события</h2></div><button className="secondary" onClick={() => { supabase.auth.signOut(); setPanel(null); }}>Выйти</button></div>
          <div className="adminStats"><div><strong>{registrations.length}</strong><span>всего заявок</span></div><div><strong>{registrations.filter((row) => row.status === "submitted").length}</strong><span>новых</span></div><div><strong>{new Set(registrations.map((row) => row.profiles?.region).filter(Boolean)).size}</strong><span>регионов</span></div></div>
          <div className="tableWrap"><table><thead><tr><th>Участник</th><th>Контакты</th><th>Подразделение</th><th>Направление</th><th>Статус</th></tr></thead><tbody>{registrations.map((row) => <tr key={row.id}><td><b>{row.profiles?.last_name} {row.profiles?.first_name}</b><small>{row.profiles?.region}</small></td><td>{row.profiles?.email}<small>{row.profiles?.phone}</small></td><td>{row.profiles?.department || "—"}</td><td>{row.discipline || "—"}<small>{row.team_name}</small></td><td><span className="status">{row.status === "submitted" ? "Новая" : row.status}</span></td></tr>)}</tbody></table>{!registrations.length && <p className="emptyState">Пока нет регистраций.</p>}</div>
        </>}
      </section></div>}
    </main>
  );
}
