import { notFound } from "next/navigation";
import { instructorRegions, instructors, marathonEmbedUrl, marathonRegistrationPath, marathonRegistrationUrl, samruk2026Nominations, samruk2026Placements, sectionNavigation, sitePages, sportCalendar, sportResults, teamMembers, topNavigation, veteranAgeGroups, veteranGallery, veteranRegions, veteranStats, youngFacesApplicationUrl } from "../content";

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
      <details className="kpMobileNav"><summary aria-label="Открыть меню">☰</summary><nav>{sectionNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></details>
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

      {key === "pensioners" && (
        <section className="kpContentSection kpVeteransIntro">
          <div className="kpVeteransLead">
            <div><span className="kpEyebrow">Забота о ветеранах</span><h2>Ветераны — золотой фонд железнодорожного транспорта</h2><p>Их труд, мудрость и любовь к профессии вдохновляют новые поколения железнодорожников. Работа с ветеранами носит постоянный характер и ежегодно дополняется новыми программами и мероприятиями.</p><p>Главная цель — повысить качество жизни неработающих пенсионеров Компании, обеспечить социальную поддержку и признать их вклад в развитие отрасли.</p></div>
            <figure><img src="/veterans/hero.jpg" alt="Работники ҚТЖ навещают ветерана железнодорожной отрасли" /><figcaption>Забота, уважение и связь поколений</figcaption></figure>
          </div>
          <div className="kpVeteranStats">{veteranStats.map((item) => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div>
        </section>
      )}

      {key === "pensioners/portrait" && (
        <>
          <section className="kpContentSection kpVeteranPortrait">
            <div className="kpSectionTitle"><span>2025 год</span><h2>Социальный портрет ветеранов</h2><p>Общая численность — 45 883 человека: 22 798 мужчин и 23 085 женщин.</p></div>
            <div className="kpVeteranStats">{veteranStats.map((item) => <article key={item.label}><strong>{item.value}</strong><span>{item.label}</span></article>)}</div>
            <div className="kpVeteranSplit"><figure><img src="/veterans/portrait.jpg" alt="Забота о старшем поколении" /></figure><div><h3>Возрастной состав</h3>{veteranAgeGroups.map((group) => <article key={group.label}><span>{group.label}</span><strong>{group.value}</strong></article>)}</div><aside><span>Заслуги ветеранов</span><strong>64</strong><p>награды в 2025 году</p><ul><li>5 государственных</li><li>2 ведомственные</li><li>57 отраслевых</li></ul></aside></div>
          </section>
          <section className="kpContentSection kpVeteranRegions">
            <div className="kpSectionTitle"><span>География</span><h2>Региональные советы ветеранов</h2><p>Представительство ветеранов железнодорожной отрасли по регионам и участкам.</p></div>
            <div>{veteranRegions.map(([region, count]) => <article key={region}><span>{region}</span><strong>{count}</strong><small>человек</small></article>)}</div>
          </section>
        </>
      )}

      {key === "pensioners/generations" && (
        <>
          <section className="kpContentSection kpVeteranCouncil">
            <div className="kpSectionTitle"><span>Опыт и преемственность</span><h2>Роль консультативного совета ҚТЖ</h2><p>Опытные ветераны готовят рекомендации, участвуют в обсуждении решений, анализируют деятельность Компании и сопровождают проекты.</p></div>
            <div className="kpVeteranPhotoPair"><img src="/veterans/council-group.jpg" alt="Участники консультативного совета ҚТЖ" /><img src="/veterans/council-meeting.jpg" alt="Заседание консультативного совета ҚТЖ" /></div>
            <div className="kpVeteranFunctions"><article><span>01</span><h3>Экспертные рекомендации</h3><p>Подготовка предложений с опорой на профессиональный опыт ветеранов.</p></article><article><span>02</span><h3>Обсуждение решений</h3><p>Участие в заседаниях и рассмотрении важных вопросов развития отрасли.</p></article><article><span>03</span><h3>Наставничество</h3><p>Передача знаний молодым специалистам и сохранение корпоративных традиций.</p></article><article><span>04</span><h3>Сохранение истории</h3><p>Участие в создании музеев, архивов, мемориалов и публикаций.</p></article></div>
          </section>
          <section className="kpContentSection kpVeteranStructure"><div className="kpSectionTitle"><span>Организация работы</span><h2>Структура советов ветеранов</h2><p>От центрального совета до региональных, узловых и цеховых советов.</p></div><div><article><span>01</span><h3>Президиум Центрального совета</h3></article><article><span>02</span><h3>Центральный совет ветеранов</h3></article><article><span>03</span><h3>Региональные и участковые советы</h3></article><article><span>04</span><h3>Узловые и цеховые советы</h3></article></div><img src="/veterans/regional-council.jpg" alt="Заседание регионального совета ветеранов" /></section>
        </>
      )}

      {key === "pensioners/support" && (
        <>
          <section className="kpContentSection kpVeteranSupport">
            <div className="kpSectionTitle"><span>Система помощи</span><h2>Поддержка на каждом этапе</h2><p>Признание заслуг дополняется финансовой, медицинской и адресной помощью.</p></div>
            <div className="kpVeteranSupportGrid"><article><span>01</span><h3>Признание и награды</h3><p>Государственные и ведомственные награды, почётные звания и публичное признание.</p></article><article><span>02</span><h3>Материальная помощь</h3><p>Единовременные выплаты, продуктовые корзины и помощь в трудных жизненных ситуациях.</p></article><article><span>03</span><h3>Льготы и гарантии</h3><p>Бесплатный проезд, медицинское сопровождение и санаторно-курортное лечение.</p></article><article><span>04</span><h3>Поддержка на местах</h3><p>Поздравления на дому, посещения и персональная адресная помощь ветеранам и их семьям.</p></article><article><span>05</span><h3>Информационная поддержка</h3><p>Публикации, интервью, выставки и сохранение исторической памяти.</p></article></div>
          </section>
          <section className="kpContentSection"><div className="kpVeteranPhotoStory"><img src="/veterans/award.jpg" alt="Вручение награды ветерану" /><img src="/veterans/medical-support.jpg" alt="Медицинское сопровождение ветеранов" /><img src="/veterans/home-visit.jpg" alt="Адресная поддержка ветерана" /></div></section>
        </>
      )}

      {key === "pensioners/stories" && (
        <>
          <section className="kpContentSection kpVeteranParticipation">
            <div className="kpSectionTitle"><span>Признание вклада</span><h2>Ветераны представляют отрасль</h2><p>Ветераны участвуют в государственных и официальных мероприятиях, телемостах, запусках инфраструктурных проектов и церемониях награждения.</p></div>
            <div className="kpVeteranPhotoPair"><img src="/veterans/president-event.jpg" alt="Ветераны на мероприятии с участием Президента Республики Казахстан" /><img src="/veterans/president-meeting.jpg" alt="Встреча с ветеранами железнодорожной отрасли" /></div>
            <div className="kpVeteranFunctions"><article><span>01</span><h3>Патриотические акции</h3><p>Участие в парадах, памятных мероприятиях и общественных инициативах.</p></article><article><span>02</span><h3>Форумы и конференции</h3><p>Диалог по вопросам социальной политики и развития транспортной системы.</p></article><article><span>03</span><h3>Корпоративная жизнь</h3><p>Торжественные встречи, концерты, экскурсии и вечера памяти.</p></article><article><span>04</span><h3>Связь поколений</h3><p>Совместные программы с молодыми сотрудниками и наставничество.</p></article></div>
          </section>
          <section className="kpContentSection"><div className="kpVeteranPhotoStory"><img src="/veterans/memorial-action.jpg" alt="Памятная акция с участием ветеранов" /><img src="/veterans/national-event.jpg" alt="Мероприятие странового масштаба" /><img src="/veterans/media-interview.jpg" alt="Интервью с ветераном ҚТЖ" /></div></section>
        </>
      )}

      {key === "pensioners/active-longevity" && (
        <>
          <section className="kpContentSection kpVeteranActive">
            <div className="kpSectionTitle"><span>Здоровье и движение</span><h2>Поддержка активного долголетия</h2><p>ҚТЖ помогает ветеранам сохранять физическое и моральное здоровье и участвовать в спортивной жизни.</p></div>
            <div className="kpVeteranFunctions"><article><span>01</span><h3>Спортивные мероприятия</h3><p>Корпоративные старты, шахматы и фестивали для ветеранов.</p></article><article><span>02</span><h3>Участие в соревнованиях</h3><p>Поддержка ветеранов труда и спорта на республиканском и международном уровне.</p></article><article><span>03</span><h3>Оздоровительные программы</h3><p>Содействие в проведении мероприятий для активного и здорового образа жизни.</p></article><article><span>04</span><h3>Совместные старты</h3><p>Спортивные события ветеранов вместе с молодыми сотрудниками.</p></article></div>
          </section>
          <section className="kpContentSection"><div className="kpVeteranSportsGallery"><img src="/veterans/chess.jpg" alt="Ветеран играет в шахматы" /><img src="/veterans/sports-festival.jpg" alt="Спортивный фестиваль ветеранов" /><img src="/veterans/veteran-team.jpg" alt="Команда ветеранов на соревнованиях" /><img src="/veterans/medalist.jpg" alt="Ветеран с наградой спортивного соревнования" /><img src="/veterans/marathon-team.jpg" alt="Команда ветеранов ҚТЖ" /></div></section>
        </>
      )}

      {key === "pensioners/gallery" && (
        <section className="kpContentSection kpVeteranGallery">
          <div className="kpSectionTitle"><span>История в кадрах</span><h2>Люди, встречи и события</h2><p>Фотографии из материалов Департамента социальной политики ҚТЖ.</p></div>
          <div>{veteranGallery.map((photo) => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy" /><figcaption>{photo.caption}</figcaption></figure>)}</div>
        </section>
      )}

      {key === "team" && (
        <section className="kpContentSection kpTeamStructure">
          <div className="kpSectionTitle"><span>Структура Департамента</span><h2>Команда социальной политики</h2><p>Сотрудники Департамента и направления работы по основному и приписному штату.</p></div>
          {teamMembers.filter((member) => member.staff === "Руководитель").map((member) => <article className="kpTeamDirector" key={member.name}><img src={member.image} alt={member.name} /><div><span>{member.role}</span><h3>{member.name}</h3><p>Руководит работой Департамента социальной политики ҚТЖ.</p></div></article>)}
          <div className="kpTeamGroups">
            {["Основной штат", "Приписной штат"].map((group) => <section key={group}><div className="kpTeamGroupTitle"><span>{group}</span><strong>{teamMembers.filter((member) => member.staff === group).length}</strong></div><div className="kpTeamGrid">{teamMembers.filter((member) => member.staff === group).map((member) => <article className="kpTeamCard" key={member.name}><img src={member.image} alt={member.name} loading="lazy" /><div><span>{member.role}</span><h3>{member.name}</h3><h4>Функционал</h4><ul>{member.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}</ul></div></article>)}</div></section>)}
          </div>
        </section>
      )}

      {key === "sport/instructors" && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Команда</span><h2>Инструкторы по основным регионам</h2><p>Выберите регион, чтобы посмотреть города, инструкторов и контакты.</p></div>
          <div className="kpStats"><article><strong>16</strong><span>основных регионов</span></article><article><strong>43</strong><span>инструктора</span></article><article><strong>32</strong><span>города и станции</span></article><article><strong>2</strong><span>вакансии</span></article></div>
          <div className="instructorRegions">
            {instructorRegions.map((region, regionIndex) => {
              const people = region.instructorIds.map((id) => instructors.find((person) => person.id === id)).filter((person): person is (typeof instructors)[number] => Boolean(person));
              return (
                <details className="instructorRegion" key={region.name} open={regionIndex === 0}>
                  <summary><span>{String(regionIndex + 1).padStart(2, "0")}</span><strong>{region.name}</strong><small><b>{people.length}</b> <span>{people.length === 1 ? "позиция" : people.length < 5 ? "позиции" : "позиций"}</span></small><i aria-hidden="true">+</i></summary>
                  <div className="instructorRegionPeople">
                    {people.map((person) => <article className={person.name === "Вакансия" ? "vacancy" : ""} key={person.id}><span>{person.region}</span><h3>{person.name}</h3>{person.phone ? <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`}>{person.phone}</a> : <b>Открытая позиция</b>}</article>)}
                  </div>
                </details>
              );
            })}
          </div>
        </section>
      )}

      {key === "sport/calendar" && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Расписание</span><h2>Спортивные сезоны 2026–2027</h2><p>Даты могут уточняться организационным комитетом.</p></div>
          <div className="kpCalendarYears">{sportCalendar.map((season) => <section className="kpCalendarYear" key={season.year}><h3>{season.year} год</h3><div className="kpTimeline">{season.events.map((event, index) => <article key={`${season.year}-${event.title}`}><span>{String(index + 1).padStart(2, "0")}</span><time>{event.date}</time><h3>{event.title}</h3>{"registration" in event && event.registration && <a className="kpEventRegistration" href={marathonRegistrationPath}>Подробнее и регистрация <i>↗</i></a>}</article>)}</div></section>)}</div>
        </section>
      )}

      {key === "sport/marathon-registration" && (
        <>
          <section className="kpContentSection kpMarathonIntro">
            <div className="kpSectionTitle"><span>О событии</span><h2>Один старт — одна команда</h2><p>Марафон развивает корпоративную культуру, поддерживает здоровый образ жизни и объединяет железнодорожников по всей стране.</p></div>
            <div className="kpMarathonLead"><div><p>Марафон ҚТЖ — спортивное событие для работников Компании, их семей и друзей железной дороги. Участники встречаются в Астане, чтобы вместе пройти выбранную дистанцию и поддержать культуру активной жизни.</p><p>Мы ждём вас на старте. Верьте в себя, поддерживайте коллег и двигайтесь к финишу в едином ритме ҚТЖ.</p><a href="#marathon-registration">Зарегистрироваться <i>↗</i></a></div><aside><span>Дата старта</span><strong>19 сентября</strong><small>2026 · Астана</small></aside></div>
          </section>
          <section className="kpContentSection kpMarathonDistances">
            <div className="kpSectionTitle"><span>Дистанции</span><h2>Выберите свой темп</h2><p>Маршрут состоит из кругов протяжённостью 2,5 км.</p></div>
            <div><article><strong>2,5</strong><span>км</span><p>Короткая дистанция для уверенного старта.</p></article><article><strong>5</strong><span>км</span><p>Один из самых доступных форматов массового забега.</p></article><article><strong>10</strong><span>км</span><p>Дистанция для подготовленных участников.</p></article></div>
          </section>
          <section className="kpContentSection kpMarathonProgram">
            <div className="kpSectionTitle"><span>Предварительная программа</span><h2>День марафона</h2><p>Время отдельных этапов может уточняться организационным комитетом.</p></div>
            <div className="kpMarathonSchedule"><article><time>07:50</time><h3>Сбор участников</h3><p>Начало работы камеры хранения.</p></article><article><time>08:30</time><h3>Открытие стартового городка</h3><p>Подготовка участников к забегу.</p></article><article><time>08:40</time><h3>Инструктаж и разминка</h3><p>Общий инструктаж перед стартами.</p></article><article><time>09:00–11:00</time><h3>Старты забегов</h3><p>Дистанции 10 км, 5 км и 2,5 км.</p></article><article><time>11:30</time><h3>Награждение участников</h3><p>Подведение спортивных итогов.</p></article><article><time>12:30</time><h3>Развлекательная программа</h3><p>Завершение общего марафонского дня.</p></article></div>
          </section>
          <section className="kpContentSection kpMarathonDetails">
            <div className="kpMarathonRoute"><article><span>Место сбора</span><h2>Ботанический сад, Астана</h2><p>Стартовый городок располагается в парковочной зоне на пересечении улиц Акмешит и Бухар жырау. Участникам рекомендуется прибыть к 07:50.</p></article><article><span>Маршрут</span><h2>Круг — 2,5 км</h2><p>Забеги проходят на дистанциях 2,5 км, 5 км и 10 км. Точная схема движения будет опубликована организаторами перед стартом.</p></article></div>
          </section>
          <section className="kpContentSection kpMarathonConditions">
            <div className="kpSectionTitle"><span>Условия участия</span><h2>Здоровье и безопасность</h2><p>Пожалуйста, ознакомьтесь с требованиями до подачи заявки.</p></div>
            <div><article><span>01</span><h3>Возраст</h3><p>Основные участники — от 18 лет. Дети работников, дислоцированных в Астане, допускаются в категориях 10–13 и 14–17 лет.</p></article><article><span>02</span><h3>Здоровье</h3><p>При получении стартового номера необходимо предоставить расписку о личной ответственности за состояние здоровья.</p></article><article><span>03</span><h3>Лимит</h3><p>К участию допускаются не более 600 человек.</p></article></div>
          </section>
          <section className="kpContentSection kpMarathonContact"><div><span>Связь с организаторами</span><h2>Есть вопрос о старте?</h2><p>Телефон: <a href="tel:+77784812821">+7 778 481 28 21</a><br />Электронная почта: <a href="mailto:Zhurkabayev_D@railways.kz">Zhurkabayev_D@railways.kz</a></p></div><nav><a href="https://chat.whatsapp.com/B5InlZWFveAFozbG4cojZz" target="_blank" rel="noreferrer">WhatsApp <i>↗</i></a><a href="https://www.instagram.com/sport.railways.kz" target="_blank" rel="noreferrer">Instagram <i>↗</i></a></nav></section>
          <section className="kpContentSection kpMarathonFormSection" id="marathon-registration">
            <div className="kpSectionTitle"><span>Форма участника</span><h2>Регистрация на марафон</h2><p>Ответы сохраняются в официальной форме Microsoft Forms.</p></div>
            <div className="kpFormPanel"><iframe title="Регистрация на Марафон ҚТЖ" src={marathonEmbedUrl} allowFullScreen /></div>
            <p className="kpFormFallback">Если форма не загрузилась, <a href={marathonRegistrationUrl} target="_blank" rel="noreferrer">откройте её в новой вкладке</a>.</p>
          </section>
        </>
      )}

      {key === "sport/results" && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Победы</span><h2>Достижения сборной</h2><p>Результаты корпоративных и отраслевых соревнований.</p></div>
          <div className="kpResultGrid">{sportResults.map((result, index) => "href" in result ? <a className="kpResultCard" href={result.href} key={result.title}><span>{result.label}</span><strong>0{index + 1}</strong><h3>{result.title}</h3><p>{result.text}</p><i>Открыть результаты ↗</i></a> : <article key={result.title}><span>{result.label}</span><strong>0{index + 1}</strong><h3>{result.title}</h3><p>{result.text}</p></article>)}</div>
        </section>
      )}

      {key === "sport/results/samruk-2026" && (
        <section className="kpContentSection kpSamrukResults"><div className="kpSectionTitle"><span>Итоги соревнований</span><h2>Призовые места сборной ҚТЖ</h2><p>Результаты по дисциплинам из официального распределения призовых мест.</p></div><div className="kpSamrukSummary"><article><strong>27</strong><span>призовых мест</span></article><article><strong>9</strong><span>первых мест</span></article><article><strong>13</strong><span>вторых мест</span></article><article><strong>5</strong><span>третьих мест</span></article></div><div className="kpSamrukPlacements">{samruk2026Placements.map((item) => <article key={item.place}><h3>{item.place}</h3><p>{item.disciplines}</p></article>)}</div><div className="kpSamrukNominations"><h3>Индивидуальные номинации</h3><ul>{samruk2026Nominations.map((nomination) => <li key={nomination}>{nomination}</li>)}</ul></div></section>
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

      {!page.cards && !page.steps && !page.panels && !["team", "sport/instructors", "sport/calendar", "sport/marathon-registration", "sport/results", "sport/results/samruk-2026", "appeals", "youth/young-faces/fourth-cohort", "pensioners/portrait", "pensioners/support", "pensioners/generations", "pensioners/stories", "pensioners/active-longevity", "pensioners/gallery"].includes(key) && (
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
