"use client";

import { useEffect } from "react";
import { marathonRegistrationPath, sectionNavigation, topNavigation } from "./content";

const directions = [
  { number: "01", href: "/corporate-culture", title: "Корпоративная культура", text: "Ценности, традиции и инициативы единой команды ҚТЖ.", mark: "КК" },
  { number: "02", href: "/vnd", title: "ВНД", text: "Внутренние нормативные документы, регламенты и методические материалы", mark: "ВНД" },
  { number: "03", href: "/social-stability", title: "Социальная стабильность", text: "Исследования и опросы, информация по жалобам и обращениям", mark: "СС" },
  { number: "04", href: "/youth", title: "Молодёжная политика", text: "Развитие, форум, конкурсы и истории успеха молодых работников", mark: "МП" },
  { number: "05", href: "/children", title: "Работа с детьми", text: "Образовательные, спортивные и семейные инициативы", mark: "ДТ" },
  { number: "06", href: "/pensioners", title: "Ветераны отрасли", text: "Поддержка ветеранов, встречи поколений и сохранение истории", mark: "ВО" },
  { number: "07", href: "/social-projects", title: "Социальные проекты", text: "Волонтёрство и социальные инициативы работников ҚТЖ", mark: "СЦ" },
  { number: "08", href: "/sport", title: "Спортивная жизнь", text: "Инструкторы, календарь событий, результаты сборной и фотоархив", mark: "СП" },
  { number: "09", href: "/achievements", title: "Наши достижения", text: "Проекты, инициативы и результаты социальной политики ҚТЖ", mark: "НД" },
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const redirectLegacyAdminLink = () => {
      if (["#admin", "#login"].includes(window.location.hash)) window.location.replace("/admin/");
    };
    redirectLegacyAdminLink();
    window.addEventListener("hashchange", redirectLegacyAdminLink);
    return () => window.removeEventListener("hashchange", redirectLegacyAdminLink);
  }, []);
  return (
    <main className="kpHome">
      <header className="kpHeader">
        <a className="kpBrand" href="/" aria-label="ҚТЖ — главная">
          <img src="/ktz-logo.png" alt="Қазақстан темір жолы" />
          <span><b>Все о социальной</b><small>политике ҚТЖ</small></span>
        </a>
        <nav>{topNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <button className="kpLanguage" type="button" data-language-toggle aria-label="Қазақ тіліне ауысу" title="Қазақша">ҚАЗ</button>
        <details className="kpMobileNav"><summary aria-label="Открыть меню">☰</summary><nav>{sectionNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></details>
      </header>

      <section className="kpHomeHero" aria-label="Люди. Движение. Возможности.">
        <img className="kpHeroDesktop" src="/ktz-hero-clean.png" alt="Световые линии и железнодорожные пути ҚТЖ" />
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
        <article><strong>17 + 2</strong><span>17 регионов Казахстана и 2 участка в РФ: Илецкий и Восточный</span></article>
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
        <div className="kpFeaturedCopy"><span className="kpEyebrow">02 / Главное событие</span><time>19 сентября 2026 · Астана</time><h2>Марафон ҚТЖ</h2><p>Главный массовый старт для работников, семей и друзей железной дороги. Регистрация участников проходит в официальной форме Microsoft прямо на сайте.</p><div><a href={marathonRegistrationPath}>Регистрация на марафон <span>↗</span></a><a className="kpFeaturedSecondary" href="/sport/calendar">Календарь спорта</a></div></div>
      </section>

    </main>
  );
}
