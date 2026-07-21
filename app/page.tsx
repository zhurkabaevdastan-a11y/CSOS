"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient, type Session } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bowvuafbszouqimilytd.supabase.co",
  "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG",
);

type Item = {
  id: number;
  section: string;
  subsection: string;
  title: string;
  summary: string;
  year: number;
  featured: boolean;
  sort_order: number;
};

const sections = ["Спорт", "Волонтерство", "Молодежная политика", "Пенсионеры"];

const fallback: Item[] = [
  { id: 1, section: "Спорт", subsection: "Спортивные инструкторы", title: "Команда инструкторов ҚТЖ", summary: "Контакты и направления работы корпоративных спортивных инструкторов.", year: 2026, featured: false, sort_order: 10 },
  { id: 2, section: "Спорт", subsection: "События", title: "Календарь спортивных событий", summary: "Турниры, спартакиады и командные старты работников компании.", year: 2026, featured: true, sort_order: 20 },
  { id: 3, section: "Спорт", subsection: "Результаты ҚТЖ", title: "Результаты сборных ҚТЖ", summary: "Достижения команд и сотрудников на отраслевых соревнованиях.", year: 2026, featured: false, sort_order: 30 },
  { id: 4, section: "Спорт", subsection: "Фото по годам", title: "Фотоархив спорта", summary: "Фотографии спортивных событий с удобной навигацией по годам.", year: 2026, featured: false, sort_order: 40 },
  { id: 5, section: "Волонтерство", subsection: "Школа корпоративного волонтерства", title: "Школа корпоративного волонтерства", summary: "Главное событие года: обучение, обмен опытом и запуск социальных инициатив.", year: 2026, featured: true, sort_order: 10 },
  { id: 6, section: "Волонтерство", subsection: "Лучшие волонтеры 2026", title: "Люди, которые меняют мир рядом", summary: "Истории лучших корпоративных волонтеров ҚТЖ 2026 года.", year: 2026, featured: false, sort_order: 20 },
  { id: 7, section: "Молодежная политика", subsection: "КВН", title: "Лига КВН ҚТЖ", summary: "Юмор, командный дух и новые имена из регионов железной дороги.", year: 2026, featured: false, sort_order: 10 },
  { id: 8, section: "Молодежная политика", subsection: "Региональные представители", title: "Совет по делам молодежи", summary: "Карта региональных представителей и направления их работы.", year: 2026, featured: true, sort_order: 20 },
  { id: 9, section: "Молодежная политика", subsection: "Жас үздік маман", title: "Жас үздік маман", summary: "Конкурс профессионального мастерства молодых специалистов.", year: 2026, featured: false, sort_order: 30 },
  { id: 10, section: "Пенсионеры", subsection: "Поддержка ветеранов", title: "Забота о ветеранах отрасли", summary: "Программы поддержки, встречи поколений и полезные контакты.", year: 2026, featured: false, sort_order: 10 },
];

const icons: Record<string, string> = { "Спорт": "⚡", "Волонтерство": "♡", "Молодежная политика": "✦", "Пенсионеры": "∞" };

export default function Home() {
  const [active, setActive] = useState("Спорт");
  const [items, setItems] = useState<Item[]>(fallback);
  const [menu, setMenu] = useState(false);
  const [panel, setPanel] = useState<"auth" | "register" | "admin" | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", department: "", region: "", discipline: "Корпоративное волонтерство", team_name: "", comment: "" });

  useEffect(() => {
    const url = "https://bowvuafbszouqimilytd.supabase.co/rest/v1/social_policy_content?select=*&order=sort_order.asc";
    fetch(url, { headers: { apikey: "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG" } })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => Array.isArray(data) && data.length && setItems(data))
      .catch(() => undefined);
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setRole(null); return; }
    supabase.from("profiles").select("role").eq("id", session.user.id).single()
      .then(({ data }) => setRole(data?.role ?? "participant"));
  }, [session]);

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
    } else setPanel("register");
  };

  const submitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return setPanel("auth");
    setMessage("Сохраняем заявку…");
    const { error: profileError } = await supabase.from("profiles").update({
      first_name: form.first_name, last_name: form.last_name, phone: form.phone,
      department: form.department, region: form.region, email: session.user.email,
    }).eq("id", session.user.id);
    if (profileError) return setMessage(profileError.message);
    const { error } = await supabase.from("registrations").insert({
      user_id: session.user.id, event_id: "volunteer-school-2026", discipline: form.discipline,
      team_name: form.team_name || null, comment: form.comment || null, health_confirmed: true, status: "submitted",
    });
    setMessage(error ? error.message : "Готово! Ваша заявка принята.");
  };

  const current = useMemo(() => items.filter((item) => item.section === active), [active, items]);
  const featured = items.find((item) => item.section === "Волонтерство" && item.featured) ?? fallback[4];

  const go = (section: string) => {
    setActive(section);
    setMenu(false);
    document.getElementById("directions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <header className="header">
        <a className="brand" href="#top" aria-label="ҚТЖ — главная">
          <img src="/ktz-logo.png" alt="Логотип Қазақстан темір жолы" />
          <span><b>Департамент</b><small>социальной политики</small></span>
        </a>
        <button className="menuButton" onClick={() => setMenu(!menu)} aria-label="Открыть меню">{menu ? "×" : "☰"}</button>
        <nav className={menu ? "nav open" : "nav"}>
          {sections.map((section) => <button key={section} onClick={() => go(section)}>{section}</button>)}
        </nav>
        <button className="cabinetButton" onClick={openCabinet}>{session ? (role === "admin" ? "Админ-панель" : "Мои заявки") : "Войти"}</button>
        <div className="language"><span>RU</span><span>ҚАЗ</span></div>
      </header>

      <section className="hero" id="top">
        <div className="rail railOne" /><div className="rail railTwo" />
        <div className="heroContent">
          <span className="eyebrow">АО «НК «Қазақстан темір жолы»</span>
          <h1>Вместе создаём<br /><em>сильное сообщество</em></h1>
          <p>Забота о людях, развитие талантов и поддержка инициатив, которые объединяют железнодорожников по всей стране.</p>
          <div className="heroActions">
            <button className="primary" onClick={() => go("Спорт")}>Наши направления <span>→</span></button>
            <a href="#event" className="textLink">Событие месяца ↘</a>
          </div>
        </div>
        <div className="heroStat"><strong>120 000+</strong><span>сотрудников<br />в большой команде ҚТЖ</span></div>
        <div className="yearMark">20<span>26</span></div>
      </section>

      <section className="directionSection" id="directions">
        <div className="sectionHead">
          <div><span className="kicker">01 / НАПРАВЛЕНИЯ</span><h2>Социальная политика<br />в действии</h2></div>
          <p>Выберите направление, чтобы увидеть актуальные проекты, события и контакты.</p>
        </div>
        <div className="tabs" role="tablist">
          {sections.map((section, i) => (
            <button key={section} className={active === section ? "active" : ""} onClick={() => setActive(section)} role="tab">
              <span>0{i + 1}</span>{section}<i>{icons[section]}</i>
            </button>
          ))}
        </div>
        <div className="contentGrid">
          <div className="sectionIntro"><span className="bigIcon">{icons[active]}</span><h3>{active}</h3><p>{active === "Спорт" ? "Энергия движения и командный дух" : active === "Волонтерство" ? "Добрые дела объединяют" : active === "Молодежная политика" ? "Инициативы нового поколения" : "Уважение к опыту и истории"}</p></div>
          <div className="cards">
            {current.map((item, index) => (
              <article className={item.featured ? "card featured" : "card"} key={item.id}>
                <span className="cardNumber">{String(index + 1).padStart(2, "0")}</span>
                <span className="cardLabel">{item.subsection}</span>
                <h4>{item.title}</h4><p>{item.summary}</p>
                <button aria-label={`Подробнее: ${item.title}`}>Подробнее <span>↗</span></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="event" id="event">
        <div className="eventPhoto" role="img" aria-label="Корпоративные волонтеры ҚТЖ"><span>БОЛЬШЕ<br />ДОБРЫХ<br />ДЕЛ</span></div>
        <div className="eventCopy">
          <span className="kicker light">02 / ГЛАВНОЕ СОБЫТИЕ</span><span className="date">12–14<br /><small>СЕНТЯБРЯ</small></span>
          <h2>{featured.title}</h2><p>{featured.summary} Три дня практики, живых кейсов и командной работы.</p>
          <div className="eventMeta"><span>Астана</span><span>Корпоративный университет</span><button onClick={() => setPanel(session ? "register" : "auth")}>Зарегистрироваться →</button></div>
        </div>
      </section>

      <section className="news">
        <span className="kicker">03 / ПУЛЬС КОМАНДЫ</span><h2>В центре внимания</h2>
        <div className="newsGrid">
          <article><span>СПОРТ · 18 ИЮЛЯ</span><h3>Сборная ҚТЖ готовится к отраслевой спартакиаде</h3><a href="#directions">Читать →</a></article>
          <article><span>МОЛОДЁЖЬ · 10 ИЮЛЯ</span><h3>Открыт приём заявок на «Жас үздік маман»</h3><a href="#directions">Читать →</a></article>
          <article><span>ВЕТЕРАНЫ · 02 ИЮЛЯ</span><h3>Встреча поколений: истории, которые нас объединяют</h3><a href="#directions">Читать →</a></article>
        </div>
      </section>

      <footer><div className="footerBrand"><img src="/ktz-logo.png" alt="ҚТЖ" /><p>Департамент социальной политики<br />АО «НК «Қазақстан темір жолы»</p></div><div><span>НАВИГАЦИЯ</span>{sections.map(s => <button key={s} onClick={() => go(s)}>{s}</button>)}</div><div><span>КОНТАКТЫ</span><a href="mailto:social@railways.kz">social@railways.kz</a><p>Астана, ул. Д. Кунаева, 6</p></div><small>© 2026 АО «НК «ҚТЖ»</small></footer>

      {panel && <div className="modalBackdrop" onMouseDown={(e) => e.target === e.currentTarget && setPanel(null)}>
        <section className={panel === "admin" ? "modal adminModal" : "modal"} role="dialog" aria-modal="true" aria-label="Личный кабинет">
          <button className="modalClose" onClick={() => setPanel(null)} aria-label="Закрыть">×</button>
          {panel === "auth" && <>
            <span className="kicker">ЛИЧНЫЙ КАБИНЕТ</span><h2>Вход в систему</h2>
            <p className="modalLead">Используйте корпоративную или личную почту. Для администратора: zhurkabaevdastan@gmail.com</p>
            <label>Электронная почта<input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="name@example.com" /></label>
            <label>Пароль<input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="Не менее 6 символов" /></label>
            <div className="formActions"><button className="primary" onClick={() => authenticate(false)}>Войти</button><button className="secondary" onClick={() => authenticate(true)}>Создать доступ</button></div>
            {message && <p className="formMessage">{message}</p>}
          </>}
          {panel === "register" && <form onSubmit={submitRegistration}>
            <span className="kicker">РЕГИСТРАЦИЯ</span><h2>Школа корпоративного волонтерства</h2>
            <div className="formGrid">
              <label>Имя<input required value={form.first_name} onChange={e => setForm({...form,first_name:e.target.value})} /></label>
              <label>Фамилия<input required value={form.last_name} onChange={e => setForm({...form,last_name:e.target.value})} /></label>
              <label>Телефон<input required value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} /></label>
              <label>Подразделение<input required value={form.department} onChange={e => setForm({...form,department:e.target.value})} /></label>
              <label>Регион<input required value={form.region} onChange={e => setForm({...form,region:e.target.value})} /></label>
              <label>Команда<input value={form.team_name} onChange={e => setForm({...form,team_name:e.target.value})} /></label>
            </div>
            <label>Комментарий<textarea value={form.comment} onChange={e => setForm({...form,comment:e.target.value})} /></label>
            <div className="formActions"><button className="primary" type="submit">Отправить заявку</button><button type="button" className="secondary" onClick={() => supabase.auth.signOut()}>Выйти</button></div>
            {message && <p className="formMessage">{message}</p>}
          </form>}
          {panel === "admin" && <>
            <div className="adminHead"><div><span className="kicker">БЫСТРАЯ ПАНЕЛЬ</span><h2>Регистрации на события</h2></div><button className="secondary" onClick={() => { supabase.auth.signOut(); setPanel(null); }}>Выйти</button></div>
            <div className="adminStats"><div><strong>{registrations.length}</strong><span>всего заявок</span></div><div><strong>{registrations.filter(r => r.status === "submitted").length}</strong><span>новых</span></div><div><strong>{new Set(registrations.map(r => r.profiles?.region).filter(Boolean)).size}</strong><span>регионов</span></div></div>
            <div className="tableWrap"><table><thead><tr><th>Участник</th><th>Контакты</th><th>Подразделение</th><th>Направление</th><th>Статус</th></tr></thead><tbody>{registrations.map(r => <tr key={r.id}><td><b>{r.profiles?.last_name} {r.profiles?.first_name}</b><small>{r.profiles?.region}</small></td><td>{r.profiles?.email}<small>{r.profiles?.phone}</small></td><td>{r.profiles?.department || "—"}</td><td>{r.discipline || "—"}<small>{r.team_name}</small></td><td><span className="status">{r.status === "submitted" ? "Новая" : r.status}</span></td></tr>)}</tbody></table>{!registrations.length && <p className="emptyState">Пока нет регистраций.</p>}</div>
          </>}
        </section>
      </div>}
    </main>
  );
}
