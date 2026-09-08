import { notFound, permanentRedirect } from "next/navigation";
import Script from "next/script";
import { getSportBanner } from "../sport-banners";
import { renderSocialStabilityContent } from "../social-stability-content";
import { renderVndContent } from "../vnd-content";
import { programPages, renderProgramContent } from "../program-content";
import { candidatesKey, youngFacesPages, renderYoungFacesContent } from "../young-faces-content";
import { resultsPages, renderResultsIndex, renderResultDetail } from "../results-content";
import { getPageAncestors, pageRedirects, instructorRegions, instructors, marathonEmbedUrl, marathonRegistrationPath, marathonRegistrationUrl, samruk2026Nominations, samruk2026Placements, sectionNavigation, sitePages, sportCalendar, sportResults, topNavigation, veteranAgeGroups, veteranGallery, veteranRegions, veteranStats } from "../content";

export function generateStaticParams() {
  return [...Object.keys(sitePages), ...Object.keys(pageRedirects)].map((key) => ({ slug: key.split("/") }));
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
      <a className="kpCabinet" href="/#admin">Админ-панель</a>
      <details className="kpMobileNav"><summary aria-label="Открыть меню">☰</summary><nav>{sectionNavigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav></details>
    </header>
  );
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const key = slug.join("/");
  if (pageRedirects[key]) permanentRedirect(pageRedirects[key]);
  const page = sitePages[key];
  if (!page) notFound();
  const ancestors = getPageAncestors(key);
  const sportPhoto = getSportBanner(key);
  const socialContent = renderSocialStabilityContent(key);
  const vndContent = renderVndContent(key);
  const programContent = renderProgramContent(key);
  const candidates = key === candidatesKey ? (await import("../young-faces-candidates")).youngFacesCandidates : [];
  const youngFacesContent = renderYoungFacesContent(key, candidates);
  const resultsContent = key === "sport/results" ? renderResultsIndex() : renderResultDetail(key, { placements: samruk2026Placements, nominations: samruk2026Nominations });
  const panelsIntro = page.panelsIntro ?? { label: "Главное", title: "Работа по направлению", text: "Основные задачи и приоритеты социальной политики." };
  const cardsIntro = page.cardsIntro ?? (key.startsWith("sport/photos/")
    ? { label: "Фотоальбомы", title: "Откройте альбом события", text: "Фотографии откроются в новой вкладке на Яндекс Диске." }
    : { label: "Направления", title: "Выберите подраздел", text: "Каждый подраздел открывается на отдельной странице." });

  return (
    <main className="kpPage">
      <SiteHeader />
      <section className={`kpPageHero${socialContent || vndContent ? " kpPageHero--social" : ""}${programPages[key] || youngFacesPages[key] ? " kpPageHero--program" : ""}${youngFacesPages[key] ? " kpPageHero--young" : ""}${resultsPages[key] ? " kpPageHero--results" : ""}`}>
        <div className="kpBreadcrumbs"><a href="/">Главная</a><span>•</span>{ancestors.map((ancestor) => <span className="kpBreadcrumbItem" key={ancestor.path}><a href={ancestor.path}>{ancestor.title}</a><span>•</span></span>)}<b>{page.title}</b></div>
        <span className="kpEyebrow">{page.eyebrow}</span>
        <h1>{page.title}</h1>
        {page.lead && <p>{page.lead}</p>}
        {sportPhoto ? (
          <figure className="kpSportPhoto">
            <picture><img src={sportPhoto.src} srcSet={sportPhoto.srcSet} sizes="(max-width: 760px) 100vw, 92vw" width={sportPhoto.width} height={sportPhoto.height} alt={sportPhoto.alt} style={{ objectPosition: sportPhoto.position }} decoding="async" /></picture>
            <figcaption><span><span>Фото из спортивного архива</span> · {sportPhoto.year}</span><a href={sportPhoto.album} target="_blank" rel="noreferrer"><span>Открыть фотоальбом</span> ↗</a></figcaption>
          </figure>
        ) : socialContent || vndContent || programPages[key] || youngFacesPages[key] || resultsPages[key] ? null : <div className={`kpHeroVisual kpHeroVisual--${slug[0]}`}><span>ҚТЖ</span><i /></div>}
      </section>

      {programContent && <div dangerouslySetInnerHTML={{ __html: programContent }} />}
      {vndContent && <div dangerouslySetInnerHTML={{ __html: vndContent }} />}
      {youngFacesContent && <div dangerouslySetInnerHTML={{ __html: youngFacesContent }} />}

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
            <figure className="kpVeteranCouncilPhoto"><img src="/veterans/council-meeting.jpg" alt="Заседание консультативного совета ҚТЖ" /></figure>
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
            <div className="kpMarathonRoute"><article><span>Место сбора</span><h2>Ботанический сад, Астана</h2><p>Стартовый городок располагается в парковочной зоне на пересечении улиц Акмешит и Бухар жырау. Участникам рекомендуется прибыть к 07:50.</p></article><article><span>Маршрут</span><h2>Круг — 2,5 км</h2><p>1 круг — 2,5 км, 2 круга — 5 км, 4 круга — 10 км</p></article></div>
          </section>
          <section className="kpContentSection kpMarathonMap" id="marathon-route-map" aria-labelledby="marathon-map-title">
            <h2 id="marathon-map-title">Карта забега</h2>
            <a className="kpMarathonMapImage" href="/sports/marathon-2026-route.jpg" target="_blank" rel="noopener noreferrer" aria-label="Открыть карту забега в полном размере">
              <img src="/sports/marathon-2026-route.jpg" width="1280" height="824" alt="Карта марафона ҚТЖ 2026: круг 2,5 км, направление движения, старт, финиш и стартовый городок" loading="lazy" decoding="async" />
            </a>
            <div className="kpMarathonMapActions">
              <a href="/sports/marathon-2026-route.jpg" target="_blank" rel="noopener noreferrer"><span>Открыть карту крупнее</span><span aria-hidden="true">↗</span></a>
              <a href="/sports/marathon-2026-route.jpg" download="marathon-qtj-2026-route.jpg"><span>Скачать карту</span><span aria-hidden="true">↓</span></a>
            </div>
          </section>
          <section className="kpContentSection kpMarathonConditions">
            <div className="kpSectionTitle"><span>Условия участия</span><h2>Здоровье и безопасность</h2><p>Пожалуйста, ознакомьтесь с требованиями до подачи заявки.</p></div>
            <div><article><span>01</span><h3>Возраст</h3><p>Основные участники — от 18 лет. Дети работников, дислоцированных в Астане, допускаются в категориях 10–13 и 14–17 лет.</p></article><article><span>02</span><h3>Здоровье</h3><p>При получении стартового номера необходимо предоставить расписку о личной ответственности за состояние здоровья.</p><a className="kpMarathonDownload" href="/documents/marathon-2026-waiver-kz-ru.docx" download="Расписка каз-рус.docx"><span>Скачать расписку</span><span aria-hidden="true">↓</span><small>DOCX · қазақша / русский</small></a></article><article><span>03</span><h3>Лимит</h3><p>Общий лимит — 500 участников, в том числе не более 100 иногородних</p></article></div>
          </section>
          <section className="kpContentSection kpMarathonContact"><div><span>Связь с организаторами</span><h2>Есть вопрос о старте?</h2><p>Телефон: <a href="tel:+77784812821">+7 778 481 28 21</a><br />Электронная почта: <a href="mailto:Zhurkabayev_D@railways.kz">Zhurkabayev_D@railways.kz</a></p></div><nav><a href="https://chat.whatsapp.com/CWZZEGUEsre9SwFCeRYVNr?s=cl&p=i&mlu=4" target="_blank" rel="noreferrer">WhatsApp <i>↗</i></a><a href="https://www.instagram.com/sport.railways.kz" target="_blank" rel="noreferrer">Instagram <i>↗</i></a></nav></section>
          <section className="kpContentSection kpMarathonFormSection" id="marathon-registration">
            <div className="kpSectionTitle"><span>Форма участника</span><h2>Регистрация на марафон</h2><p>Ответы сохраняются в официальной форме Microsoft Forms.</p></div>
            <div className="kpFormPanel"><iframe title="Регистрация на Марафон ҚТЖ" src={marathonEmbedUrl} allowFullScreen /></div>
            <p className="kpFormFallback">Если форма не загрузилась, <a href={marathonRegistrationUrl} target="_blank" rel="noreferrer">откройте её в новой вкладке</a>.</p>
          </section>
        </>
      )}

      {resultsContent && <div dangerouslySetInnerHTML={{ __html: resultsContent }} />}
      {key === "sport/results" && <Script src="/results-filters.js" strategy="afterInteractive" />}


      {page.panels && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>{panelsIntro.label}</span><h2>{panelsIntro.title}</h2><p>{panelsIntro.text}</p></div>
          <div className={`kpInfoGrid${page.panels.length === 2 ? " kpInfoGrid--two" : ""}`}>{page.panels.map((panel, index) => <article key={panel.title}><span>{panel.label}</span><strong>0{index + 1}</strong><h3>{panel.title}</h3><p>{panel.text}</p>{panel.notice && <p className="kpDataNotice">{panel.notice}</p>}</article>)}</div>
          {page.source && <p className="kpContentSource"><a href={page.source.href} target="_blank" rel="noreferrer">{page.source.label} ↗</a></p>}
        </section>
      )}

      {page.cards && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>{cardsIntro.label}</span><h2>{cardsIntro.title}</h2><p>{cardsIntro.text}</p></div>
          <div className={`kpPageCards${key === "youth" ? " kpPageCards--four" : ""}${page.cards.length === 2 ? " kpPageCards--two" : ""}`}>{page.cards.map((card, index) => <a key={`${card.title}-${index}`} href={card.href} target={card.external ? "_blank" : undefined} rel={card.external ? "noreferrer" : undefined}><span>{card.tag ?? `0${index + 1}`}</span><h3>{card.title}</h3><p>{card.text}</p><i>↗</i></a>)}</div>
        </section>
      )}

      {page.steps && (
        <section className="kpContentSection kpProcessSection">
          <div className="kpSectionTitle"><span>{key === "volunteering/school" ? "Программа" : "Как участвовать"}</span><h2>{key === "volunteering/school" ? "От знаний к социальному проекту" : "Простой путь от идеи к результату"}</h2><p>{key === "volunteering/school" ? "Три тематических блока." : "Три последовательных шага."}</p></div>
          <div className="kpSteps">{page.steps.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </section>
      )}

      {socialContent && <div className="kpSocialSections" dangerouslySetInnerHTML={{ __html: socialContent }} />}

      {!socialContent && !programContent && !youngFacesContent && !resultsContent && !page.cards && !page.steps && !page.panels && !["sport/instructors", "sport/calendar", "sport/marathon-registration", "sport/results", "sport/results/samruk-2026", "pensioners/portrait", "pensioners/support", "pensioners/generations", "pensioners/stories", "pensioners/active-longevity", "pensioners/gallery"].includes(key) && (
        <section className="kpContentSection">
          <div className="kpSectionTitle"><span>Информация</span><h2>Раздел наполняется</h2><p>Материалы, контакты и новости будут добавляться по мере обновления программы.</p></div>
          <a className="kpAction" href="mailto:social@railways.kz">Связаться с командой <span>↗</span></a>
        </section>
      )}

    </main>
  );
}
