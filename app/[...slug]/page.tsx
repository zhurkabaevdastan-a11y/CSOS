import { notFound } from "next/navigation";
import { calendar2027, instructors, marathonEmbedUrl, marathonRegistrationPath, marathonRegistrationUrl, sitePages, sportResults, topNavigation, youngFacesApplicationUrl } from "../content";

export function generateStaticParams() {
  return Object.keys(sitePages).map((key) => ({ slug: key.split("/") }));
}

function SiteHeader() {
  return (
    <header className="kpHeader">
      <a className="kpBrand" href="/" aria-label="ҚТЖ — главная">
        <img src="/ktz-logo.png" alt="Қазақстан темір жолы" />
        <span><b>Все о социальной</b><small>политике ҚТЖ</small></span>
      </a>
      <nav>{topNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <button className="kpLanguage" type="button" data-language-toggle aria-label="Қазақ тіліне ауысу" title="Қазақша">ҚАЗ</button>
      <a className="kpCabinet" href="/#login">Личный кабинет</a>
      <details className="kpMobileNav"><summary aria-label="Открыть меню">☰</summary><nav>{topNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></details>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="kpFooter">
      <div><img src="/ktz-logo.png" alt="ҚТЖ" /><p>Все о социальной политике<br />АО «НК «Қазақстан темір жолы»</p></div>
      <nav>{topNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <div><a href="mailto:social@railways.kz">social@railways.kz</a><p>Астана, ул. Д. Кунаева, 6</p></div>
      <small>© 2026 АО «НК «ҚТЖ»</small>
    </footer>
  );
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  const page = sitePages[key];
  if (!page) notFound();
  const ancestors = slug.slice(0, -1).map((_, index) => sitePages[slug.slice(0, index + 1).join("/")]).filter(Boolean);

  return (
    <main className="kpPage">
      <SiteHeader />
      <section className="kpPageHero">
        <div className="kpBreadcrumbs"><a href="/">Главная</a><span>•</span>{ancestors.map((ancestor) => <span className="kpBreadcrumbItem" key={ancestor.path}><a href={ancestor.path}>{ancestor.title}</a><span>•</span></span>)}<b>{page.title}</b></div>
        <span className="kpEyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        {page.lead && <p>{page.lead}</p>}
        <div className={`kpHeroVisual kpHeroVisual--${slug[0]}`}><span>ҚТЖ</span><i /></div>
      </section>

      {key === "sport/instructors" && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Команда</span><h2>Инструкторы по городам и регионам</h2><p>42 действующих специалиста и 3 открытые вакансии.</p></div>
          <div className="kpStats"><article><strong>45</strong><span>позиций</span></article><article><strong>42</strong><span>инструктора</span></article><article><strong>32</strong><span>города и региона</span></article><article><strong>3</strong><span>вакансии</span></article></div>
          <div className="instructorTableWrap">
            <table className="instructorTable">
              <thead><tr><th>№</th><th>ФИО</th><th>Город / регион</th><th>Телефон</th></tr></thead>
              <tbody>{instructors.map((person) => (
                <tr key={person.id} className={person.name === "Вакансия" ? "vacancy" : ""}>
                  <td data-label="№">{person.id}</td><td data-label="ФИО"><b>{person.name}</b></td><td data-label="Город / регион">{person.region}</td>
                  <td data-label="Телефон">{person.phone ? <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}>{person.phone}</a> : <span>Открытая позиция</span>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </section>
      )}

      {key === "sport/calendar" && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Расписание</span><h2>Спортивный сезон 2027</h2><p>Даты могут уточняться организационным комитетом.</p></div>
          <div className="kpTimeline">{calendar2027.map(([date, title], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><time>{date}</time><h3>{title}</h3>{title === "Марафон ҚТЖ" && <a className="kpEventRegistration" href={marathonRegistrationPath}>Регистрация <i>↗</i></a>}</article>)}</div>
        </section>
      )}

      {key === "sport/marathon-registration" && (
        <section className="kpContentSection kpMarathonFormSection">
          <div className="kpSectionTitle"><span>Форма участника</span><h2>Регистрация на марафон</h2><p>Ответы сохраняются в официальной форме Microsoft Forms.</p></div>
          <div className="kpFormPanel">
            <iframe title="Регистрация на Марафон ҚТЖ" src={marathonEmbedUrl} allowFullScreen />
          </div>
          <p className="kpFormFallback">Если форма не загрузилась, <a href={marathonRegistrationUrl} target="_blank" rel="noreferrer">откройте её в новой вкладке</a>.</p>
        </section>
      )}

      {key === "sport/results" && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Победы</span><h2>Достижения сборной</h2><p>Результаты корпоративных и отраслевых соревнований.</p></div>
          <div className="kpResultGrid">{sportResults.map((result, index) => <article key={result.title}><span>{result.label}</span><strong>0{index + 1}</strong><h3>{result.title}</h3><p>{result.text}</p></article>)}</div>
        </section>
      )}

      {key === "youth/young-faces/fourth-cohort" && (
        <>
          <section className="kpContentSection kpYoungFacesIntro">
            <div className="kpSectionTitle"><span>О программе</span><h2>Стартовал отбор в четвёртый поток</h2><p>Заявки принимаются до 31 августа 2026 года.</p></div>
            <div className="kpYoungFacesLead">
              <div>
                <p>Программа «100 молодых лиц ҚТЖ» запущена в 2019 году и направлена на выявление, развитие и продвижение талантливых молодых работников.</p>
                <p>До четвёртого потока программа объединила три когорты: 2020–2022, 2023–2024 и 2025–2026.</p>
                <p>Четвёртый поток ориентирован на развитие участников как экспертов и проектных лидеров. Ключевой акцент — разработка и реализация проектов, повышающих эффективность Компании.</p>
              </div>
              <aside><span>Приём заявок</span><strong>3–31 августа</strong><small>2026 года</small><a className="kpYoungFacesApply" href={youngFacesApplicationUrl} target="_blank" rel="noreferrer">Подать заявку <i>↗</i></a></aside>
            </div>
          </section>

          <section className="kpContentSection">
            <div className="kpSectionTitle"><span>Участники</span><h2>Кто может принять участие</h2><p>Отбор проводится среди работников группы компаний ҚТЖ.</p></div>
            <div className="kpYoungFacesEligibility">
              <article><span>Можно участвовать</span><h3>Работники до 35 лет</h3><p>Кандидаты с высоким профессиональным потенциалом и стремлением к развитию. Ключевые качества: инициативность, вовлечённость, лидерство, добросовестность и профессионализм.</p></article>
              <article><span>Не допускаются</span><h3>Ограничения программы</h3><ul><li>Выпускники предыдущих потоков.</li><li>Работники по договорам ГПХ и аутстаффинга.</li></ul></article>
            </div>
          </section>

          <section className="kpContentSection kpYoungFacesSelection">
            <div className="kpSectionTitle"><span>Этапы отбора</span><h2>Путь кандидата</h2><p>От подачи заявки до объявления победителей.</p></div>
            <div className="kpSelectionTimeline">
              {[
                ["01", "Сбор заявок", "3–31 августа 2026"],
                ["02", "Тестирование SHL", "до 13 сентября 2026"],
                ["03", "Опросники мотивации и компетенций", "до 1 октября 2026"],
                ["04", "Ассессмент-центр", "до 15 октября 2026"],
                ["05", "Интервью по компетенциям", "до 15 ноября 2026"],
                ["06", "Комплексная проверка", "до 18 ноября 2026"],
                ["07", "Экспертный отбор", "до 25 ноября 2026"],
                ["08", "Объявление победителей", "до 1 декабря 2026"],
              ].map(([number, title, date]) => <article key={number}><span>{number}</span><h3>{title}</h3><time>{date}</time></article>)}
            </div>
          </section>

          <section className="kpContentSection kpYoungFacesDevelopment">
            <div className="kpSectionTitle"><span>Два года развития</span><h2>Что ждёт победителей</h2><p>Обучение, экспертиза и практическое внедрение проектов.</p></div>
            <div className="kpYoungFacesFeatures">
              {[
                ["01", "Модульное обучение", "Проектное управление, бизнес-мышление, hard skills и навыки внедрения улучшений."],
                ["02", "Работа с экспертами", "Гостевые встречи, диагностика зон развития и взаимодействие с руководителями."],
                ["03", "Корпоративные инициативы", "Участие во внешних молодёжных мероприятиях и ключевых проектах Компании."],
                ["04", "Реализация проектов", "Второй год посвящён практической работе с трекерами Astana Hub и стейкхолдерами ҚТЖ."],
              ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
            </div>
            <div className="kpYoungFacesCta"><div><span>Готовы заявить о себе?</span><h3>Начните свой путь в четвёртом потоке.</h3></div><a href={youngFacesApplicationUrl} target="_blank" rel="noreferrer">Подать заявку <i>↗</i></a></div>
          </section>
        </>
      )}

      {page.panels && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Главное</span><h2>Работа по направлению</h2><p>Основные задачи и приоритеты социальной политики.</p></div>
          <div className="kpInfoGrid">{page.panels.map((panel, index) => <article key={panel.title}><span>{panel.label}</span><strong>0{index + 1}</strong><h3>{panel.title}</h3><p>{panel.text}</p></article>)}</div>
        </section>
      )}

      {page.cards && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>{key.startsWith("sport/photos/") ? "Фотоальбомы" : "Направления"}</span><h2>{key.startsWith("sport/photos/") ? "Откройте альбом события" : "Выберите подраздел"}</h2><p>{key.startsWith("sport/photos/") ? "Фотографии откроются в новой вкладке на Яндекс Диске." : "Каждый подраздел открывается на отдельной странице."}</p></div>
          <div className={`kpPageCards${key === "youth" ? " kpPageCards--four" : ""}`}>{page.cards.map((card, index) => <a key={`${card.title}-${index}`} href={card.href} target={card.external ? "_blank" : undefined} rel={card.external ? "noreferrer" : undefined}><span>{card.tag ?? `0${index + 1}`}</span><h3>{card.title}</h3><p>{card.text}</p><i>↗</i></a>)}</div>
        </section>
      )}

      {page.steps && (
        <section className="kpContentSection kpProcessSection">
          <div className="kpSectionTitle"><span>{key === "volunteering/school" ? "Программа" : "Как участвовать"}</span><h2>{key === "volunteering/school" ? "От знаний к социальному проекту" : "Простой путь от идеи к результату"}</h2><p>{key === "volunteering/school" ? "Три тематических блока." : "Три последовательных шага."}</p></div>
          <div className="kpSteps">{page.steps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </section>
      )}

      {!page.cards && !page.steps && !page.panels && !["sport/instructors", "sport/calendar", "sport/marathon-registration", "sport/results", "appeals", "youth/young-faces/fourth-cohort"].includes(key) && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Информация</span><h2>Раздел наполняется</h2><p>Материалы, контакты и новости будут добавляться по мере обновления программы.</p></div>
          <a className="kpAction" href="mailto:social@railways.kz">Связаться с командой <span>↗</span></a>
        </section>
      )}

      <section className="kpRelated"><span>Следующий шаг</span><h2>Люди. Движение.<br />Возможности.</h2><a href="/">Вернуться на главную <i>↗</i></a></section>
      <SiteFooter />
    </main>
  );
}
