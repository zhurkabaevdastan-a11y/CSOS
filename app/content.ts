import { programPages } from './program-content.ts';
import { youngFacesPages } from './young-faces-content.ts';
import { resultEvents, resultsPages } from './results-content.ts';

export type Instructor = {
  id: number;
  name: string;
  region: string;
  phone: string | null;
};

export const instructors: Instructor[] = [
  { id: 1, name: "Подгатец Роман Викторович", region: "Астана", phone: "8-701-683-00-93" },
  { id: 2, name: "Утебаева Асем Алимжановна", region: "Астана", phone: "8-702-445-50-00" },
  { id: 3, name: "Бекеев Азамат Кабдрашитович", region: "Кокшетау", phone: "8-775-292-90-07" },
  { id: 4, name: "Рахимбаев Талгат Зияданович", region: "Курорт-Боровое", phone: "8-701-479-68-35" },
  { id: 5, name: "Кажаев Болатбек Шахмуратович", region: "Атбасар", phone: "8-701-448-59-27" },
  { id: 6, name: "Вакансия", region: "Жана-Есиль", phone: null },
  { id: 7, name: "Ахтаханов Ислам Шараниевич", region: "Костанай", phone: "8-707-372-29-65" },
  { id: 8, name: "Ахтаханов Шарани Юнусович", region: "Кушмурун", phone: "8-775-303-46-67" },
  { id: 9, name: "Шевцов Сергей Сергеевич", region: "Тобол", phone: "8-747-601-38-14" },
  { id: 10, name: "Мартынова Наталья Михайловна", region: "Павлодар", phone: "8-701-599-93-59" },
  { id: 11, name: "Атымжанова Томирис", region: "Экибастуз", phone: "8-747-679-53-09" },
  { id: 12, name: "Айманбетов Тагат Куркельдинович", region: "Караганда", phone: "8-701-431-09-24" },
  { id: 13, name: "Абикен Мадет Кайыржанович", region: "Караганда", phone: "8-778-628-17-38" },
  { id: 14, name: "Игитаев Куаныш Тусупович", region: "Агадырь", phone: "8-708-143-17-97" },
  { id: 15, name: "Вакансия", region: "Жанаарка", phone: null },
  { id: 16, name: "Мешкова Наталья Александровна", region: "Семей", phone: "8-747-477-38-39" },
  { id: 17, name: "Аккожаев Елдос", region: "Семей", phone: "8-747-700-60-75" },
  { id: 18, name: "Кокенов Серик Кусманович", region: "Аягоз", phone: "8-702-944-28-18" },
  { id: 19, name: "Жайлаубаева Айгуль Жайлаубаевна", region: "Өскемен", phone: "8-777-318-22-12" },
  { id: 20, name: "Бекенов Жалгас", region: "Өскемен", phone: "8-771-411-06-77" },
  { id: 21, name: "Ынтыкбаев Фархат", region: "Өскемен", phone: "8-777-065-66-63" },
  { id: 22, name: "Колдасбаев Альберт Мелисович", region: "Алматы", phone: "8-777-666-70-98" },
  { id: 23, name: "Серкбаева Лязим Алимовна", region: "Алматы", phone: "8-777-295-41-18" },
  { id: 24, name: "Кыдырбеков Асхат Асетович", region: "Достык", phone: "8-702-648-13-31" },
  { id: 25, name: "Айдарбеков Нурлугалий Аликенович", region: "Достык", phone: "8-701-268-93-78" },
  { id: 26, name: "Әлмұратұлы Талгат", region: "Алтынколь", phone: "8-747-665-08-09" },
  { id: 27, name: "Жарылкасымов Нурбол Ержанович", region: "Актогай", phone: "8-702-664-40-39" },
  { id: 28, name: "Тян Евгений Вячеславович", region: "Жамбыл", phone: "8-701-544-85-63" },
  { id: 29, name: "Мамбеткулов Бахит Нашанович", region: "Жамбыл", phone: "8-701-655-89-62" },
  { id: 30, name: "Байходжаев Амангельды Аманжолович", region: "Жамбыл", phone: "8-705-737-84-13" },
  { id: 31, name: "Маньшина Елена Николаевна", region: "Шымкент", phone: "8-701-629-81-05" },
  { id: 32, name: "Асанов Комек Барзуович", region: "Шымкент", phone: "7-7778-237-70-66" },
  { id: 33, name: "Имбергенов Бахытжан Жетписбаевич", region: "Кызылорда", phone: "8-775-423-23-30" },
  { id: 34, name: "Медеуова Фатима Райбековна", region: "Кызылорда", phone: "8-708-519-53-02" },
  { id: 35, name: "Акшолаков Амангельды Жумашевич", region: "Актобе", phone: "8-707-577-31-29" },
  { id: 36, name: "Жанасов Марат Амангельдиевич", region: "Актобе", phone: "8-771-783-57-19" },
  { id: 37, name: "Батырхан Нургуль Багжанкызы", region: "Шалкар", phone: "8-705-383-81-02" },
  { id: 38, name: "Кушкаров Азиз Мажитович", region: "Кандыагаш", phone: "8-705-676-83-57" },
  { id: 39, name: "Гилманов Бекзат Ундасынович", region: "Уральск", phone: "8-701-636-16-68" },
  { id: 40, name: "Карлибаев Болат Куттыбаевич", region: "Уральск", phone: "8-701-740-11-92" },
  { id: 41, name: "Жартыбаев Мадихан Жанатулы", region: "Илецк", phone: "8-702-827-63-07" },
  { id: 42, name: "Имангазиев Ринат Камалиевич", region: "Атырау", phone: "8-701-400-54-70" },
  { id: 43, name: "Кубландиев Жанибек Аскарович", region: "Макат", phone: "8-775-346-15-77" },
  { id: 44, name: "Кадырова Нурайна Есимовна", region: "Мангистау", phone: "8-771-772-44-41" },
  { id: 45, name: "Нуралиев Бекзад Максетулы", region: "Бейнеу", phone: "8-771-513-90-55" },
];

export type InstructorRegion = {
  name: string;
  instructorIds: number[];
};

export const instructorRegions: InstructorRegion[] = [
  { name: "Астана", instructorIds: [1, 2] },
  { name: "Акмолинский регион", instructorIds: [3, 4, 5, 6] },
  { name: "Костанайский регион", instructorIds: [7, 8, 9] },
  { name: "Павлодарский регион", instructorIds: [10, 11] },
  { name: "Карагандинский регион", instructorIds: [12, 13, 14, 15] },
  { name: "Семейский регион", instructorIds: [16, 17, 18] },
  { name: "Станция Өскемен", instructorIds: [19, 20, 21] },
  { name: "Алматинский регион", instructorIds: [22, 23, 24, 25, 26, 27] },
  { name: "Жамбылский регион", instructorIds: [28, 29, 30] },
  { name: "Шымкентский регион", instructorIds: [31, 32] },
  { name: "Кызылординский регион", instructorIds: [33, 34] },
  { name: "Актобинский регион", instructorIds: [35, 36, 37, 38] },
  { name: "Станция Орал", instructorIds: [39, 40] },
  { name: "Станция Илецк", instructorIds: [41] },
  { name: "Атырауский регион", instructorIds: [42, 43] },
  { name: "Мангистауский регион", instructorIds: [44, 45] },
];

export const sportCalendar = [
  {
    year: 2026,
    events: [
      { date: "19 сентября", title: "Марафон ҚТЖ", registration: true },
      { date: "Ноябрь", title: "Спартакиада АО «НК «ҚТЖ» для работников, дислоцированных в Астане" },
    ],
  },
  {
    year: 2027,
    events: [
      { date: "1–4 апреля", title: "Чемпионат АО «НК «ҚТЖ» по волейболу" },
      { date: "27–30 апреля", title: "Чемпионат АО «НК «ҚТЖ» по футзалу" },
      { date: "27–30 мая", title: "Спартакиада: тоғызқұмалақ, асық ату, настольный теннис, армрестлинг, шахматы и лёгкая атлетика" },
      { date: "1 июня", title: "Турнир по мини-футболу среди детей" },
      { date: "13 июня", title: "Отборочный турнир по плаванию" },
      { date: "Дата уточняется", title: "Участие в XII Спартакиаде АО «Самрук-Қазына»" },
      { date: "20 сентября", title: "Марафон ҚТЖ" },
      { date: "27–30 октября", title: "Чемпионат АО «НК «ҚТЖ» по баскетболу" },
      { date: "Выходные ноября", title: "Спартакиада для работников, дислоцированных в Астане" },
    ],
  },
] as const;

export const sportResults = resultEvents.map(event => ({ label: String(event.year), title: event.title, text: event.summary, href: `/sport/results/${event.slug}` }));

export const samruk2026Placements = [
  { place: "1-е место", disciplines: "Настольный теннис (мужчины); тоғызқұмалақ (мужчины); шахматы (мужчины); армрестлинг (женщины до 65 кг); лёгкая атлетика — мужчины 35+; плавание — мужчины 30–34 и 40–44; плавательная эстафета MIX; киберспорт." },
  { place: "2-е место", disciplines: "Настольный теннис (женщины); армрестлинг (мужчины до 80 кг); асық ату; лёгкая атлетика — женщины 18–34 и мужчины 18–34; плавание — женщины 25–29, 40–44 и 50+, мужчины 50+; легкоатлетическая эстафета; арқан тарту; женский волейбол; баскетбол." },
  { place: "3-е место", disciplines: "Тоғызқұмалақ (женщины); шахматы (женщины); армрестлинг (женщины свыше 65 кг); лёгкая атлетика — женщины 35+; футзал." },
] as const;

export const samruk2026Nominations = [
  "Кумаров Әбдіғали — лучший игрок в киберспорте.",
  "Смагулова Гульжанат — лучшая связующая в женском волейболе.",
  "Абилсейтұлы Нурислам — лучший связующий в баскетболе.",
  "Орынбай Мағжан — лучший защитник в футзале.",
] as const;

export type SiteCard = { href: string; title: string; text: string; tag?: string; external?: boolean };
export type InfoPanel = { label: string; title: string; text: string; notice?: string };
export type SitePage = {
  path: string;
  parentPath?: string;
  title: string;
  eyebrow: string;
  lead: string;
  cards?: SiteCard[];
  cardsIntro?: { label: string; title: string; text: string };
  steps?: { number: string; title: string; text: string }[];
  panels?: InfoPanel[];
  panelsIntro?: { label: string; title: string; text: string };
  source?: { href: string; label: string };
};

export const marathonRegistrationUrl = "https://forms.cloud.microsoft/r/watNzKnHrC";
export const marathonRegistrationPath = "/sport/marathon-registration";
export const marathonEmbedUrl = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=2MJCyM5Rt0uv4xiUtpk2kB6fSDF9afpGrlMkPIqa7aNUMUpHTFA3T05KRE5ZSFhOQ0U5OUNFRkJEVi4u&embed=true";
export const youngFacesApplicationUrl = "https://forms.cloud.microsoft/r/mXpaWCRuek";

export const photoAlbums: Record<string, SiteCard[]> = {
  "2023": [
    { href: "https://disk.yandex.kz/d/eV5VRBIJozH49Q", title: "Марафон ҚТЖ 2023", text: "Фотографии участников и ярких моментов марафона.", tag: "Яндекс Диск", external: true },
  ],
  "2024": [
    { href: "https://disk.yandex.kz/d/Op7crl_IQFuuJQ", title: "Баскетбол 2024", text: "Фотоальбом баскетбольного турнира.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/pQMVpXXPHCDggw", title: "Футбол 2024 — Шымкент", text: "Фотографии футбольных встреч в Шымкенте.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/-UBSzXA3iqC0YQ", title: "Зимняя спартакиада ҚТЖ 2024", text: "Фото зимних соревнований команды ҚТЖ.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/GKTgW2oo-6gOZA", title: "Летняя спартакиада 2024", text: "Фотоальбом летнего спортивного сезона.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/Br5RLZO_rhckkA", title: "Марафон ҚТЖ 2024", text: "Фотографии марафона ҚТЖ 2024 года.", tag: "Яндекс Диск", external: true },
  ],
  "2025": [
    { href: "https://disk.yandex.kz/d/4Df-19C9LPsQ2Q", title: "Волейбол 2025", text: "Фотоальбом чемпионата по волейболу.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/HpDG4-q_WFiLVw", title: "Зимняя спартакиада ҚТЖ 2025", text: "Фото зимней спартакиады ҚТЖ.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/MRfn-wEoChs1PA", title: "Зимняя спартакиада Самрук-Қазына 2025", text: "Фотоальбом отраслевой зимней спартакиады.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/oJRP3NjV7psEBA", title: "Лыжные гонки 2025", text: "Фотографии участников лыжных стартов.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/h8GjngcSflKBEQ", title: "Марафон ҚТЖ 2025", text: "Фотоальбом марафона ҚТЖ.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/WYlBR74XkT20Vw", title: "Марафон Самрук-Қазына 2025", text: "Фотографии команды на корпоративном марафоне.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/HDbR4i_rnm_jTg", title: "X Спартакиада Самрук-Қазына 2025", text: "Фото главных стартов и побед сборной ҚТЖ.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/J753Zs_nsVIIsg", title: "УмтылФест 2025", text: "Фотографии спортивного фестиваля.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/yfRgfaRXmvAQcg", title: "Чемпионат по национальным видам спорта 2025", text: "Фото соревнований по национальным видам спорта.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/FwiMTWWdMnxiKA", title: "Спартакиада ҚТЖ 2025 — Астана", text: "Фотоальбом соревнований в Астане.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/tFeCSSrWbbtwow", title: "Футзал 2025", text: "Фотографии матчей и команды по футзалу.", tag: "Яндекс Диск", external: true },
  ],
  "2026": [
    { href: "https://disk.yandex.kz/d/nedznmrNR_LH9Q", title: "II Зимняя спартакиада Самрук-Қазына", text: "Фотоальбом зимней отраслевой спартакиады.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/-vunVSK2fL-8Aw", title: "Баскетбол 2026", text: "Фотографии баскетбольного сезона.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/E49gPa61vqDsaw", title: "Волейбол 2026", text: "Фотоальбом волейбольного чемпионата.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/QgO0GBMyqgc2xA", title: "Детский турнир 2026", text: "Фотографии детского спортивного турнира.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/n18nYKMu_mRfGg", title: "Наурыз 2026", text: "Фото праздничных спортивных мероприятий.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/s5QdRg1ZzBPKdw", title: "Футзал 2026", text: "Фотографии матчей и участников чемпионата.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/R3wJvmpCa6fWhg", title: "Летняя спартакиада 2026", text: "Фотоальбом летних соревнований.", tag: "Яндекс Диск", external: true },
    { href: "https://disk.yandex.kz/d/3ItqQEa3kPCCjw", title: "IV Charity Samruk Marathon 2026", text: "Фотографии благотворительного марафона.", tag: "Яндекс Диск", external: true },
  ],
};

export const sitePages: Record<string, SitePage> = {
  "corporate-culture": {
    path: "/corporate-culture", title: "Корпоративная культура", eyebrow: "Единая команда ҚТЖ",
    lead: "Ценности, традиции и инициативы, которые объединяют железнодорожников по всей стране.",
    panels: [
      { label: "Ценности", title: "Уважение и ответственность", text: "Поддерживаем культуру открытого диалога, взаимного уважения и личной ответственности за общий результат." },
      { label: "Традиции", title: "Профессиональная гордость", text: "Сохраняем отраслевые традиции и рассказываем о людях, чья работа двигает железную дорогу вперёд." },
      { label: "Команда", title: "Вовлечённость сотрудников", text: "Создаём возможности для участия в корпоративных, социальных и общественных инициативах." },
    ],
  },
  "vnd": {
    path: "/vnd", title: "ВНД", eyebrow: "Внутренние нормативные документы",
    lead: "Единое пространство внутренних документов, регламентов и методических материалов по направлениям социальной политики ҚТЖ",
  },
  "social-stability": {
    path: "/social-stability", title: "Социальная стабильность", eyebrow: "Благополучие сотрудников",
    lead: "Системная работа с обратной связью, социальным самочувствием и условиями для устойчивой командной среды",
    cards: [
      { href: "/social-stability/research", title: "Исследования и опросы", text: "SRS — динамика показателей и Industrial Relations — мониторинг производственных отношений", tag: "Исследования" },
      { href: "/social-stability/appeals", title: "Информация по жалобам и обращениям", text: "Обратная связь и подача обращений через Нысана и e-Otinish", tag: "Обратная связь" },
    ],
  },
  "social-stability/research": {
    path: "/social-stability/research", title: "Исследования и опросы", eyebrow: "Социальная стабильность",
    lead: "SRS — динамика показателей и Industrial Relations — мониторинг производственных отношений",
  },
  "social-stability/srs": {
    path: "/social-stability/srs", title: "SRS", eyebrow: "2020–2025 годы",
    lead: "Динамика показателей SRS",
    parentPath: "/social-stability/research",
  },
  "volunteering/esg": {
    path: "/volunteering/esg", title: "ESG", eyebrow: "Устойчивое развитие",
    lead: "Социальные инициативы ҚТЖ в системе экологической, социальной и корпоративной ответственности",
    panels: [
      { label: "Social", title: "Благополучие работников", text: "Безопасная, справедливая и развивающая рабочая среда для большой команды ҚТЖ" },
      { label: "Диалог", title: "Вовлечённость", text: "Регулярная обратная связь, участие работников и поддержка социальных инициатив" },
      { label: "Результат", title: "Измеримый эффект", text: "Оценка эффективности программ и их вклада в устойчивое развитие Компании" },
    ],
  },
  "social-stability/appeals": {
    path: "/social-stability/appeals", title: "Информация по жалобам и обращениям", eyebrow: "Слышащая компания",
    lead: "ҚТЖ развивает открытую систему обратной связи и использует несколько каналов для оперативной работы с вопросами работников",
    cardsIntro: { label: "Обратная связь", title: "Выберите канал обращения", text: "Официальные сервисы откроются в новой вкладке" },
    cards: [
      { href: "https://nysana.cscc.kz/", title: "Нысана", text: "Вопросы социально-трудовых отношений, жалобы и предложения по улучшению условий труда", tag: "Перейти на портал", external: true },
      { href: "https://eotinish.kz/", title: "e-Otinish / Е-Өтініш", text: "Подача официальных обращений и отслеживание их рассмотрения через систему Е-Өтініш", tag: "Подать обращение", external: true },
    ],
  },
  "appeals": {
    path: "/appeals", title: "Информация по жалобам и обращениям", eyebrow: "Обратная связь",
    lead: "ҚТЖ развивает открытую систему обратной связи через Е-Өтініш, Нысана, горячую линию и другие доступные каналы",
    panels: [
      { label: "Е-Өтініш", title: "Официальные обращения", text: "Подача и отслеживание официальных обращений через государственную информационную систему Е-Өтініш" },
      { label: "Нысана", title: "Внутренняя обратная связь", text: "Корпоративный канал для обращений, предложений и сигналов работников" },
      { label: "Горячая линия", title: "Оперативная поддержка", text: "Приём обращений по телефону и передача вопросов ответственным подразделениям" },
    ],
  },
  "children": programPages["children"],
  "children/summer-holidays": programPages["children/summer-holidays"],
  "children/events": programPages["children/events"],
  "achievements": {
    path: "/achievements", title: "Наши достижения", eyebrow: "Результаты социальной политики",
    lead: "Проекты, инициативы и командные результаты, которыми гордится социальная политика ҚТЖ",
    panels: [
      { label: "Проекты", title: "Отраслевые инициативы", text: "Программы, которые объединяют работников и развивают корпоративную социальную среду" },
      { label: "Признание", title: "Общественный эффект", text: "Результаты социальных, молодёжных, волонтёрских и ветеранских инициатив" },
      { label: "Команда", title: "Общие победы", text: "Достижения работников ҚТЖ в корпоративных и отраслевых проектах" },
    ],
  },
  "sport": {
    path: "/sport", title: "Спортивная жизнь ҚТЖ", eyebrow: "Энергия движения",
    lead: "Корпоративный спорт объединяет железнодорожников, укрепляет командный дух и создаёт культуру активной жизни.",
    cards: [
      { href: "/sport/instructors", title: "Спортивные инструкторы", text: "43 действующих инструктора в 16 основных регионах.", tag: "Команда" },
      { href: "/sport/calendar", title: "Календарь событий", text: "Спортивные мероприятия ҚТЖ на 2026 и 2027 годы.", tag: "2026–2027" },
      { href: "/sport/results", title: "Результаты ҚТЖ", text: "Спартакиады 2024–2026 и победа в QAZAQSTAN QYZMET CUP.", tag: "Достижения" },
      { href: "/sport/photos", title: "Фото по годам", text: "Архив ярких моментов корпоративного спорта.", tag: "Фотоархив" },
    ],
  },
  "sport/instructors": {
    path: "/sport/instructors", title: "Спортивные инструкторы", eyebrow: "Команда по всей стране",
    lead: "Контакты спортивных инструкторов ҚТЖ по городам и регионам. Данные обновлены по предоставленному реестру.",
  },
  "sport/calendar": {
    path: "/sport/calendar", title: "Календарь спортивных событий", eyebrow: "Сезоны 2026–2027",
    lead: "Чемпионаты, турниры, спартакиады и массовые старты АО «НК «ҚТЖ» в едином календаре.",
  },
  "sport/marathon-registration": {
    path: marathonRegistrationPath, title: "Марафон ҚТЖ", eyebrow: "19 сентября 2026 · Астана",
    lead: "Корпоративный старт, который объединяет работников, семьи и друзей железной дороги со всех регионов страны.",
  },
  ...resultsPages,
  "sport/photos": {
    path: "/sport/photos", title: "Фотоархив спорта", eyebrow: "История в кадрах",
    lead: "Фото спортивных событий, команд и побед ҚТЖ с навигацией по годам.",
    cards: [2023, 2024, 2025, 2026].map((year) => ({ href: `/sport/photos/${year}`, title: String(year), text: `${photoAlbums[String(year)].length} ${photoAlbums[String(year)].length === 1 ? "фотоальбом" : "фотоальбомов"} спортивных событий`, tag: "Фото" })),
  },
  ...Object.fromEntries([2023, 2024, 2025, 2026].map((year) => [`sport/photos/${year}`, {
    path: `/sport/photos/${year}`, title: `Спортивный фотоархив ${year}`, eyebrow: "Фото по годам",
    lead: `Фотографии команд, соревнований и ярких моментов спортивного сезона ${year} года.`,
    cards: photoAlbums[String(year)],
  }])),
  "social-projects": {
    path: "/social-projects", title: "Социальные проекты", eyebrow: "Инициативы, которые объединяют",
    lead: "Волонтёрство и социальные инициативы работников ҚТЖ",
    cards: [
      { href: "/volunteering", title: "Волонтёрство", text: "Школа корпоративного волонтёрства, лучший волонтёр, акция «Таза Қазақстан» и ESG", tag: "Социальные инициативы" },
    ],
  },
  "volunteering": {
    path: "/volunteering", title: "Корпоративное волонтёрство", eyebrow: "Добрые дела объединяют",
    parentPath: "/social-projects",
    lead: "Поддерживаем инициативы сотрудников, развиваем культуру взаимопомощи и создаём устойчивые социальные проекты.",
    cards: [
      { href: "/volunteering/school", title: "Школа корпоративного волонтёрства", text: "Главное событие года: обучение, практика и запуск социальных инициатив.", tag: "Главное событие" },
      { href: "/volunteering/best-2026", title: "Лучший волонтёр", text: "Ежегодный конкурс «Корпоративный волонтёр»: цели и пять номинаций", tag: "Конкурс" },
      { href: "/volunteering/clean-kazakhstan", title: "Акция «Таза Қазақстан»", text: "Экологические инициативы, благоустройство и забота о территориях", tag: "Экология" },
      { href: "/volunteering/esg", title: "ESG", text: "Социальные инициативы ҚТЖ в системе экологической, социальной и корпоративной ответственности", tag: "Устойчивое развитие" },
    ],
  },
  "volunteering/school": {
    path: "/volunteering/school", title: "Школа корпоративного волонтёрства", eyebrow: "12–14 сентября · Астана",
    lead: "Три дня практики, живых кейсов и командной работы для сотрудников, готовых запускать полезные инициативы.",
    steps: [
      { number: "01", title: "Основы волонтёрства", text: "Знакомство с принципами устойчивых социальных инициатив и корпоративной взаимопомощи." },
      { number: "02", title: "Работа над кейсами", text: "Практические задания, командная работа и разбор реальных социальных задач." },
      { number: "03", title: "Социальный проект", text: "Разработка инициативы, которую команда сможет реализовать в своём регионе." },
    ],
  },
  "volunteering/best-2026": programPages["volunteering/best-2026"],
  "volunteering/best-2026/community": { path: "/volunteering/best-2026/community", title: "Помощь сообществам", eyebrow: "Лучшие волонтёры 2026", lead: "Проекты корпоративных волонтёров по поддержке семей, детей и местных сообществ." },
  "volunteering/best-2026/ecology": { path: "/volunteering/best-2026/ecology", title: "Экологические инициативы", eyebrow: "Лучшие волонтёры 2026", lead: "Добровольческие проекты по благоустройству и бережному отношению к природе." },
  "volunteering/best-2026/mentoring": { path: "/volunteering/best-2026/mentoring", title: "Наставничество", eyebrow: "Лучшие волонтёры 2026", lead: "Передача профессионального опыта и поддержка молодого поколения железнодорожников." },
  "volunteering/clean-kazakhstan": {
    path: "/volunteering/clean-kazakhstan", title: "Акция «Таза Қазақстан»", eyebrow: "Чистая страна начинается с нас",
    lead: "Корпоративные экологические инициативы работников ҚТЖ по благоустройству, озеленению и бережному отношению к окружающей среде",
    panels: [
      { label: "Чистота", title: "Благоустройство территорий", text: "Общие субботники и уход за территориями предприятий и населённых пунктов" },
      { label: "Зелёный курс", title: "Озеленение", text: "Посадка деревьев и участие работников в региональных экологических акциях" },
      { label: "Команда", title: "Личный вклад", text: "Вовлечение сотрудников и семей в культуру экологической ответственности" },
    ],
  },
  "youth": {
    path: "/youth", title: "Молодёжная политика", eyebrow: "Инициативы нового поколения",
    lead: "Создаём возможности для профессионального роста, лидерства, творчества и участия молодых специалистов в жизни компании.",
    cards: [
      { href: "/youth/representatives", title: "Региональные представители", text: "Совет по делам молодёжи и его представители в регионах.", tag: "Совет" },
      { href: "/youth/young-faces", title: "100 молодых лиц ҚТЖ", text: "Программа выявления, развития и продвижения талантливых молодых работников.", tag: "Развитие" },
      { href: "/youth/young-specialist", title: "Жас үздік маман", text: "Конкурс профессионального мастерства молодых специалистов.", tag: "Конкурс" },
      { href: "/youth/kvn", title: "КВН ҚТЖ", text: "Юмор, командный дух и новые имена из регионов железной дороги.", tag: "Творчество" },
      { href: "/youth/forum", title: "Республиканский форум молодёжи", text: "Площадка для диалога, обмена опытом и новых инициатив молодых работников", tag: "Форум" },
      { href: "/youth/success-stories", title: "Истории успеха", text: "Личные истории профессионального роста и достижений молодых железнодорожников", tag: "Люди" },
    ],
  },
  "youth/kvn": programPages["youth/kvn"],
  "youth/representatives": programPages["youth/representatives"],
  "youth/young-specialist": programPages["youth/young-specialist"],
  "youth/young-faces": programPages["youth/young-faces"],
  ...youngFacesPages,
  "youth/forum": programPages["youth/forum"],
  "youth/success-stories": {
    path: "/youth/success-stories", title: "Истории успеха", eyebrow: "Люди и возможности",
    lead: "Истории молодых работников ҚТЖ, которые развиваются, реализуют идеи и достигают профессиональных результатов",
    panels: [
      { label: "Карьера", title: "Профессиональный рост", text: "Путь молодых специалистов от первых задач к ответственным проектам" },
      { label: "Инициатива", title: "Идеи в действии", text: "Примеры проектов, которые получили поддержку и принесли пользу Компании" },
      { label: "Вдохновение", title: "Опыт для коллег", text: "Личные выводы, советы и мотивация для нового поколения железнодорожников" },
    ],
  },
  "pensioners": {
    path: "/pensioners", title: "Ветераны отрасли", eyebrow: "Золотой фонд железнодорожного транспорта",
    lead: "Забота о ветеранах, признание их вклада, социальная поддержка и сохранение преемственности поколений в ҚТЖ.",
    cards: [
      { href: "/pensioners/portrait", title: "Социальный портрет", text: "Численность, возрастной состав, награды и региональное представительство ветеранов.", tag: "В цифрах" },
      { href: "/pensioners/generations", title: "Советы ветеранов", text: "Структура, задачи и роль консультативных и региональных советов.", tag: "Преемственность" },
      { href: "/pensioners/support", title: "Социальная поддержка", text: "Финансовая помощь, льготы, медицинское сопровождение и поддержка на местах.", tag: "Забота" },
      { href: "/pensioners/stories", title: "Общественная жизнь", text: "Участие ветеранов в государственных, корпоративных и памятных мероприятиях.", tag: "Участие" },
      { href: "/pensioners/active-longevity", title: "Активное долголетие", text: "Спорт, оздоровительные мероприятия и совместные инициативы с молодёжью.", tag: "Здоровье" },
      { href: "/pensioners/gallery", title: "Фотоархив", text: "Встречи, награждения, поддержка и спортивная жизнь ветеранов ҚТЖ.", tag: "Фотографии" },
    ],
  },
  "pensioners/portrait": { path: "/pensioners/portrait", title: "Социальный портрет ветеранов", eyebrow: "Ветераны ҚТЖ в цифрах", lead: "Ключевые показатели 2025 года: численность, возрастной состав, награды и региональные советы ветеранов." },
  "pensioners/support": { path: "/pensioners/support", title: "Социальная поддержка", eyebrow: "Забота о ветеранах", lead: "Система материальной помощи, льгот, медицинского сопровождения и адресной поддержки ветеранов железнодорожной отрасли." },
  "pensioners/generations": { path: "/pensioners/generations", title: "Советы ветеранов", eyebrow: "Опыт и преемственность", lead: "Консультативные и ветеранские советы сохраняют профессиональный опыт, защищают интересы ветеранов и помогают молодым специалистам." },
  "pensioners/stories": { path: "/pensioners/stories", title: "Общественная жизнь ветеранов", eyebrow: "Признание и участие", lead: "Участие ветеранов ҚТЖ в государственных, отраслевых, патриотических и корпоративных мероприятиях." },
  "pensioners/active-longevity": { path: "/pensioners/active-longevity", title: "Активное долголетие", eyebrow: "Здоровье и движение", lead: "Спортивные и оздоровительные инициативы, которые поддерживают физическое и моральное здоровье ветеранов отрасли." },
  "pensioners/gallery": { path: "/pensioners/gallery", title: "Фотоархив ветеранов", eyebrow: "История в кадрах", lead: "Фотографии встреч, награждений, адресной поддержки, общественных и спортивных мероприятий ветеранов ҚТЖ." },
};

export const teamMembers = [
  {
    name: "Байгабулова Акмарал Жарасовна",
    role: "Директор Департамента",
    staff: "Руководитель",
    image: "/team-members/akmaral-baigabulova.jpg",
    responsibilities: [],
  },
  {
    name: "Сериков Замир",
    role: "Главный менеджер",
    staff: "Основной штат",
    image: "/team-members/zamir-serikov.jpg",
    responsibilities: [
      "Мониторинг социальной обстановки",
      "Развитие производственных отношений",
      "Организация исследований и опросов",
      "Взаимодействие с профсоюзом",
    ],
  },
  {
    name: "Журкабаев Дастан",
    role: "Главный менеджер",
    staff: "Основной штат",
    image: "/team-members/dastan-zhurkabaev.jpg",
    responsibilities: [
      "Анализ жалоб и обращений",
      "Развитие внутренних коммуникаций",
      "Организация спортивных мероприятий",
      "Пропаганда ЗОЖ",
    ],
  },
  {
    name: "Нұрғали Дархан",
    role: "Менеджер",
    staff: "Основной штат",
    image: "/team-members/darkhan-nurgali.jpg",
    responsibilities: [
      "Курирование Консультативного Совета",
      "Курирование Совета ветеранов",
      "Взаимодействие с МИО и Партиями",
      "Координация отраслевых музеев",
    ],
  },
  {
    name: "Жаналиев Ержан",
    role: "Менеджер",
    staff: "Основной штат",
    image: "/team-members/erzhan-zhanaliev.jpg",
    responsibilities: [
      "Организация корпоративных мероприятий",
      "Организация летнего отдыха детей",
      "Организация детских мероприятий",
      "Молодёжная политика",
      "Организация закупочной деятельности",
    ],
  },
  {
    name: "Турлин Аскар",
    role: "Главный менеджер",
    staff: "Приписной штат",
    image: "/team-members/askar-turlin.png",
    responsibilities: [
      "Организация и проведение служебных расследований по жалобам работников",
      "Формирование отчётов по результатам проверок",
    ],
  },
];

export const veteranStats = [
  { value: "45 883", label: "ветерана в 2025 году" },
  { value: "902", label: "почётных железнодорожника" },
  { value: "6", label: "ветеранов Великой Отечественной войны" },
  { value: "1 092", label: "труженика тыла" },
];

export const veteranAgeGroups = [
  { label: "До 70 лет", value: "24 608" },
  { label: "70–80 лет", value: "13 663" },
  { label: "80–90 лет", value: "6 729" },
  { label: "Старше 90 лет", value: "883" },
];

export const veteranRegions = [
  ["Астана", "1 194"], ["Кокшетау", "6 200"], ["Костанай", "3 419"], ["Павлодар", "3 575"],
  ["Караганда", "4 529"], ["Усть-Каменогорск", "1 102"], ["Семей", "1 941"], ["Алматы", "4 575"],
  ["Тараз", "3 948"], ["Шымкент", "3 206"], ["Кызылорда", "2 893"], ["Актобе", "4 114"],
  ["Уральск", "1 050"], ["Атырау", "2 416"], ["Актау", "1 104"], ["Илецк", "445"], ["Неверовская", "172"],
];

export const veteranGallery = [
  { src: "/veterans/council-group.jpg", alt: "Участники заседания консультативного совета ҚТЖ", caption: "Консультативный совет ҚТЖ" },
  { src: "/veterans/council-meeting.jpg", alt: "Ветераны обсуждают вопросы на заседании", caption: "Экспертное обсуждение" },
  { src: "/veterans/president-event.jpg", alt: "Ветераны железнодорожной отрасли на официальном мероприятии", caption: "Участие в официальных мероприятиях" },
  { src: "/veterans/president-meeting.jpg", alt: "Встреча Президента Казахстана с ветеранами железнодорожной отрасли", caption: "Признание вклада ветеранов" },
  { src: "/veterans/memorial-action.jpg", alt: "Ветераны и работники ҚТЖ на памятной акции", caption: "Патриотические и памятные акции" },
  { src: "/veterans/award.jpg", alt: "Вручение награды ветерану железнодорожной отрасли", caption: "Награды и общественное признание" },
  { src: "/veterans/local-support.jpg", alt: "Поздравление ветеранов на дому", caption: "Поддержка на местах" },
  { src: "/veterans/home-visit.jpg", alt: "Работники ҚТЖ навещают ветерана", caption: "Адресная помощь" },
  { src: "/veterans/media-interview.jpg", alt: "Запись интервью с ветераном", caption: "Сохранение профессиональной памяти" },
  { src: "/veterans/chess.jpg", alt: "Ветеран играет в шахматы", caption: "Активное долголетие" },
  { src: "/veterans/sports-festival.jpg", alt: "Участники спортивного фестиваля ветеранов", caption: "Спортивные мероприятия" },
  { src: "/veterans/marathon-team.jpg", alt: "Команда ветеранов на спортивном соревновании", caption: "Команда ветеранов ҚТЖ" },
];

export const pageRedirects: Record<string, string> = {
  "social-stability/esg": "/volunteering/esg",
};

// Content hierarchy can differ from URLs, so existing shared links stay valid.
export function getPageAncestors(key: string): SitePage[] {
  const ancestors: SitePage[] = [];
  const visited = new Set<string>([key]);
  let current = sitePages[key];
  while (current) {
    const parentPath = current.parentPath ?? current.path.slice(0, current.path.lastIndexOf("/"));
    const parentKey = parentPath.replace(/^\//, "");
    if (!parentKey || visited.has(parentKey)) break;
    visited.add(parentKey);
    current = sitePages[parentKey];
    if (current) ancestors.unshift(current);
  }
  return ancestors;
}

export const topNavigation = [
  { href: "/corporate-culture", label: "Корпоративная культура" },
  { href: "/pensioners", label: "Ветераны отрасли" },
  { href: "/social-stability", label: "Социальная стабильность" },
  { href: "/youth", label: "Молодёжная политика" },
  { href: "/social-projects", label: "Социальные проекты" },
  { href: "/sport", label: "Спортивная жизнь" },
];

export const sectionNavigation = [
  { href: "/corporate-culture", label: "Корпоративная культура" },
  { href: "/vnd", label: "ВНД" },
  { href: "/social-stability", label: "Социальная стабильность" },
  { href: "/youth", label: "Молодёжная политика" },
  { href: "/children", label: "Работа с детьми" },
  { href: "/pensioners", label: "Ветераны отрасли" },
  { href: "/social-projects", label: "Социальные проекты" },
  { href: "/sport", label: "Спортивная жизнь" },
  { href: "/achievements", label: "Наши достижения" },
];
