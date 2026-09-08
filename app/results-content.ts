// Source: user-supplied KTZ_RESULTS_CODEX_HANDOFF.md, sections 1–9.
// Counts from Instagram carousels are a selection, never an overall team total.
export const resultsTranslations: Record<string, string> = {};
const t = (ru: string, kk: string) => { resultsTranslations[ru] = kk; return ru; };
const esc = (value: unknown) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
type Cell = string | number | null;
type MedalResult = { place: 1 | 2 | 3; participant: string; discipline: string; category?: string; organization?: string; source: string };
type Block = { title: string; paragraphs?: string[]; items?: string[]; columns?: string[]; rows?: Cell[][]; awards?: MedalResult[] };
type ResultEvent = {
  slug: string; year: number; title: string; location: string | null;
  category: string; sports: string[]; summary: string; teamPlace: number | null;
  sourceSection: number | null; medals?: { gold: number; silver: number; bronze: number; scope: 'reported-total' | 'listed-results' };
  blocks: Block[]; sources: { label: string; href: string }[];
};
export const resultLabels = {
  title: t('Результаты ҚТЖ', 'ҚТЖ нәтижелері'),
  eyebrow: t('На внешних соревнованиях', 'Сыртқы жарыстарда'),
  lead: t('Спартакиады «Самрук-Қазына», открытые и международные турниры, благотворительные забеги', '«Самұрық-Қазына» спартакиадалары, ашық және халықаралық турнирлер, қайырымдылық жүгірулер'),
  year: t('Год', 'Жыл'), sport: t('Вид спорта', 'Спорт түрі'), category: t('Категория соревнований', 'Жарыс санаты'),
  allYears: t('Все годы', 'Барлық жылдар'), allSports: t('Все виды спорта', 'Барлық спорт түрлері'), allCategories: t('Все категории', 'Барлық санаттар'),
  reset: t('Сбросить фильтры', 'Сүзгілерді тазарту'), shown: t('Показано событий', 'Көрсетілген жарыстар'),
  empty: t('По выбранным фильтрам событий нет', 'Таңдалған сүзгілер бойынша жарыстар жоқ'),
  details: t('Подробнее о результатах', 'Нәтижелер туралы толығырақ'), sources: t('Источники', 'Дереккөздер'),
  back: t('Все результаты ҚТЖ', 'ҚТЖ-ның барлық нәтижелері'), unknown: t('Не указано', 'Көрсетілмеген'),
  total: t('Медали по итогам соревнования', 'Жарыс қорытындысындағы медальдар'),
  selected: t('Награды в опубликованной подборке', 'Жарияланған топтамадағы жүлделер'),
  gold: t('Золото', 'Алтын'), silver: t('Серебро', 'Күміс'), bronze: t('Бронза', 'Қола'),
  name: t('Участник', 'Қатысушы'), age: t('Возрастная категория', 'Жас санаты'),
  distance: t('Дистанция', 'Қашықтық'), place: t('Место', 'Орын'), time: t('Время', 'Уақыт'),
  discipline: t('Дисциплина', 'Спорт түрі'), result: t('Результат', 'Нәтиже'), team: t('Команда', 'Команда'),
  scroll: t('Таблица результатов — при необходимости прокрутите по горизонтали', 'Нәтижелер кестесі — қажет болса, көлденеңінен айналдырыңыз'),
};
export const resultCategories = {
  spartakiad: t('Спартакиады', 'Спартакиадалар'),
  international: t('Международные турниры', 'Халықаралық турнирлер'),
  open: t('Открытые чемпионаты', 'Ашық чемпионаттар'),
  charity: t('Благотворительные забеги', 'Қайырымдылық жүгірулер'),
  national: t('Республиканские турниры', 'Республикалық турнирлер'),
};
export const resultSports = {
  multisport: t('Несколько видов спорта', 'Бірнеше спорт түрі'), football: t('Футбол', 'Футбол'), futsal: t('Футзал и мини-футбол', 'Футзал және шағын футбол'),
  hockey: t('Хоккей', 'Хоккей'), skiing: t('Лыжные гонки', 'Шаңғы жарысы'), running: t('Бег', 'Жүгіру'), swimming: t('Плавание', 'Жүзу'),
  tennis: t('Настольный теннис', 'Үстел теннисі'), togyz: 'Тоғызқұмалақ', arm: t('Армрестлинг', 'Қол күресі'),
  basketball: t('Баскетбол', 'Баскетбол'), volleyball: t('Волейбол', 'Волейбол'), chess: t('Шахматы', 'Шахмат'),
  asyk: 'Асық ату', tug: 'Арқан тарту', esports: t('Киберспорт', 'Киберспорт'),
  darts: t('Дартс', 'Дартс'), archery: 'Садақ ату',
};
const individual = t('Личные результаты', 'Жеке нәтижелер');
const overall = t('Общекомандный результат', 'Жалпыкомандалық нәтиже');
const rank1 = t('1-е место', '1-орын');
const rank2 = t('2-е место', '2-орын');
const rank3 = t('3-е место', '3-орын');
const sourceSelection = t('Указаны результаты опубликованных карточек, а не полный протокол соревнования', 'Жарыстың толық хаттамасы емес, жарияланған карточкалардың нәтижелері берілген');
const skiColumns = [resultLabels.name, resultLabels.age, resultLabels.distance, resultLabels.place, resultLabels.time];
const runColumns = [resultLabels.name, resultLabels.distance, resultLabels.age, resultLabels.place, resultLabels.time];
// User-supplied 2024 presentation and 2025 final protocol: KTZ entries only.
// Keep names as written in each year's source; a team award is one result.
type HistoricalResult = { participant: string; discipline: string; category: string; place: number; result?: string };
const men = t('Мужчины', 'Ерлер');
const women = t('Женщины', 'Әйелдер');
const personal = t('Личный зачёт', 'Жеке есеп');
const teamStanding = t('Командный зачёт', 'Командалық есеп');
const ktzTeam = t('Сборная ҚТЖ', 'ҚТЖ құрамасы');
export const samruk2024Results: HistoricalResult[] = [
  {participant:'Лимеренко Константин',discipline:resultSports.swimming,category:t('Мужчины до 40 лет','40 жасқа дейінгі ерлер'),place:1},
  {participant:'Гордиенко Геннадий',discipline:resultSports.swimming,category:t('Мужчины старше 40 лет','40 жастан асқан ерлер'),place:1},
  {participant:'Сурабалдинов Даурен',discipline:resultSports.chess,category:personal,place:1},
  {participant:'Аманова Гульжан',discipline:resultSports.chess,category:personal,place:1},
  {participant:'Насип Сымбат',discipline:resultSports.arm,category:t('Женщины до 65 кг','65 кг-ға дейінгі әйелдер'),place:1},
  {participant:'Кенжебаев Жанибек',discipline:resultSports.arm,category:t('Мужчины свыше 80 кг','80 кг-нан жоғары ерлер'),place:1},
  {participant:ktzTeam,discipline:resultSports.asyk,category:teamStanding,place:1},
  {participant:'Исабеков Али',discipline:resultSports.togyz,category:personal,place:1},
  {participant:'Халилов Роман',discipline:resultSports.tennis,category:men,place:1},
  {participant:ktzTeam,discipline:resultSports.esports,category:teamStanding,place:1},
  {participant:ktzTeam,discipline:resultSports.volleyball,category:women,place:1},
  {participant:'Штрошеррер Алла',discipline:resultSports.arm,category:t('Женщины свыше 65 кг','65 кг-нан жоғары әйелдер'),place:2},
  {participant:'Сагидоллинов Нуржан',discipline:resultSports.arm,category:t('Мужчины до 80 кг','80 кг-ға дейінгі ерлер'),place:2},
  {participant:'Женискызы Анель',discipline:resultSports.swimming,category:t('Женщины до 40 лет','40 жасқа дейінгі әйелдер'),place:2},
  {participant:'Смайлова Ленара',discipline:resultSports.tennis,category:women,place:2},
  {participant:ktzTeam,discipline:resultSports.basketball,category:teamStanding,place:2},
  {participant:'Тагыбергенов Еркебулан',discipline:resultSports.togyz,category:personal,place:2},
  {participant:'Алимина Татьяна',discipline:resultSports.swimming,category:t('Женщины старше 40 лет','40 жастан асқан әйелдер'),place:3},
  {participant:'Жанпеисова Алия',discipline:resultSports.tennis,category:women,place:3},
  {participant:ktzTeam,discipline:resultSports.volleyball,category:men,place:3},
];
export const samruk2024Nominations: Cell[][] = [
  ['Даулетов Диас',resultSports.esports,t('Лучший капитан турнира','Турнирдің үздік капитаны')],
  ['Смагулова Гульжанат',t('Волейбол · женщины','Волейбол · әйелдер'),t('Лучший разыгрывающий','Үздік байланыстырушы')],
  ['Наурызгазинов Нурым',t('Волейбол · мужчины','Волейбол · ерлер'),t('Лучший блокирующий','Үздік тосқауыл қоюшы')],
  ['Аханов Кайраш',resultSports.asyk,t('Лучший снайпер','Үздік мерген')],
];
export const samruk2025Results: HistoricalResult[] = [
  {participant:'Халилов Роман',discipline:resultSports.tennis,category:men,place:1},
  {participant:'Биятов Ахметбек',discipline:resultSports.tennis,category:men,place:4},
  {participant:'Жанпеисова Алия',discipline:resultSports.tennis,category:women,place:1},
  {participant:'Смайлова Ленара',discipline:resultSports.tennis,category:women,place:2},
  {participant:'Исабеков Али',discipline:resultSports.togyz,category:men,place:1},
  {participant:'Тагыбергенов Еркебулан',discipline:resultSports.togyz,category:men,place:3},
  {participant:'Серікова Айжан',discipline:resultSports.togyz,category:women,place:3},
  {participant:'Икласова Ботагоз',discipline:resultSports.togyz,category:women,place:15},
  {participant:'Степанцов Андрей',discipline:resultSports.chess,category:men,place:3},
  {participant:'Сурабалдинов Даурен',discipline:resultSports.chess,category:men,place:5},
  {participant:'Калдыбаева Жанар',discipline:resultSports.chess,category:women,place:3},
  {participant:'Аманова Гульжан',discipline:resultSports.chess,category:women,place:9},
  {participant:'Альмухаметов Рустам',discipline:resultSports.darts,category:men,place:2,result:'280'},
  {participant:'Сапашева Айнур',discipline:resultSports.darts,category:women,place:5,result:'40'},
  {participant:ktzTeam,discipline:resultSports.tug,category:teamStanding,place:4},
  {participant:'Зулпыхаров Самал',discipline:resultSports.archery,category:men,place:1},
  {participant:'Назарова Махаббат',discipline:resultSports.archery,category:women,place:2},
  {participant:'Сагидоллинов Нуржан',discipline:resultSports.arm,category:t('Мужчины до 80 кг','80 кг-ға дейінгі ерлер'),place:3},
  {participant:'Кенжебаев Жанибек',discipline:resultSports.arm,category:t('Мужчины свыше 80 кг','80 кг-нан жоғары ерлер'),place:3},
  {participant:'Нәсіп Сымбат',discipline:resultSports.arm,category:t('Женщины до 65 кг','65 кг-ға дейінгі әйелдер'),place:1},
  {participant:'Штрошерер Алла',discipline:resultSports.arm,category:t('Женщины свыше 65 кг','65 кг-нан жоғары әйелдер'),place:1},
  {participant:ktzTeam,discipline:resultSports.asyk,category:teamStanding,place:2},
  {participant:'Куанышев Айдос',discipline:resultSports.swimming,category:t('Мужчины 18–24 · 400 м','Ерлер 18–24 · 400 м'),place:5,result:'11:56,48'},
  {participant:'Лимаренко Константин',discipline:resultSports.swimming,category:t('Мужчины 25–29 · 400 м','Ерлер 25–29 · 400 м'),place:1,result:'05:02,56'},
  {participant:'Турысмаганбетов Еркин',discipline:resultSports.swimming,category:t('Мужчины 30–34 · 400 м','Ерлер 30–34 · 400 м'),place:3,result:'06:26,31'},
  {participant:'Барлыбаев Ербол',discipline:resultSports.swimming,category:t('Мужчины 35–39 · 400 м','Ерлер 35–39 · 400 м'),place:4,result:'07:00,91'},
  {participant:'Кабиев Сагат',discipline:resultSports.swimming,category:t('Мужчины 40–44 · 400 м','Ерлер 40–44 · 400 м'),place:1,result:'06:36,10'},
  {participant:'Төлендіұлы Ғазиз',discipline:resultSports.swimming,category:t('Мужчины 45–49 · 400 м','Ерлер 45–49 · 400 м'),place:5,result:'07:36,33'},
  {participant:'Гордиенко Генадий',discipline:resultSports.swimming,category:t('Мужчины 50+ · 400 м','Ерлер 50+ · 400 м'),place:2,result:'06:03,65'},
  {participant:'Аманбай Ақтілек',discipline:resultSports.swimming,category:t('Женщины 18–24 · 200 м','Әйелдер 18–24 · 200 м'),place:7,result:'06:44,82'},
  {participant:'Жеңісқызы Әнел',discipline:resultSports.swimming,category:t('Женщины 25–29 · 200 м','Әйелдер 25–29 · 200 м'),place:1,result:'02:57,58'},
  {participant:'Кичатова Юлия',discipline:resultSports.swimming,category:t('Женщины 30–34 · 200 м','Әйелдер 30–34 · 200 м'),place:6,result:'05:39,85'},
  {participant:'Балтабаева Жанаргуль',discipline:resultSports.swimming,category:t('Женщины 35–39 · 200 м','Әйелдер 35–39 · 200 м'),place:6,result:'05:06,34'},
  {participant:'Жамашова Роза',discipline:resultSports.swimming,category:t('Женщины 40–44 · 200 м','Әйелдер 40–44 · 200 м'),place:6,result:'05:54,75'},
  {participant:'Актамбаева Нургуль',discipline:resultSports.swimming,category:t('Женщины 45–49 · 200 м','Әйелдер 45–49 · 200 м'),place:4,result:'04:21,70'},
  {participant:'Алимина Татьяна',discipline:resultSports.swimming,category:t('Женщины 50+ · 200 м','Әйелдер 50+ · 200 м'),place:1,result:'03:30,18'},
  {participant:ktzTeam,discipline:resultSports.swimming,category:t('Смешанная эстафета MIX','MIX аралас эстафетасы'),place:1,result:'02:07,83'},
];
const historyCategory = t('Категория', 'Санат');
const historyName = t('Участник / команда', 'Қатысушы / команда');
const samruk2024Blocks: Block[] = [
  ...[resultLabels.gold,resultLabels.silver,resultLabels.bronze].map((title,index)=>({
    title,columns:[historyName,resultLabels.discipline,historyCategory],
    rows:samruk2024Results.filter(row=>row.place===index+1).map(row=>[row.participant,row.discipline,row.category]),
  })),
  {title:t('Индивидуальные номинации','Жеке номинациялар'),columns:[resultLabels.name,resultLabels.discipline,t('Номинация','Номинация')],rows:samruk2024Nominations},
];
const samruk2025Blocks: Block[] = [
  ...[resultSports.tennis,resultSports.togyz,resultSports.chess,resultSports.darts,resultSports.archery,resultSports.arm,resultSports.swimming].map(discipline=>{
    const timed=discipline===resultSports.swimming;
    const scored=discipline===resultSports.darts;
    return {
      title:discipline,
      paragraphs:timed?[t('Время указано в формате минуты:секунды,сотые; дистанция эстафеты в документе не указана','Уақыт минут:секунд,жүздік үлес форматында берілген; құжатта эстафетаның қашықтығы көрсетілмеген')]:undefined,
      columns:[historyName,historyCategory,resultLabels.place,...(timed?[resultLabels.time]:scored?[resultLabels.result]:[])],
      rows:samruk2025Results.filter(row=>row.discipline===discipline).map(row=>[row.participant,row.category,row.place,...(timed||scored?[row.result??null]:[])]),
    };
  }),
  {title:t('Национальные командные виды спорта','Ұлттық командалық спорт түрлері'),columns:[resultLabels.team,resultLabels.discipline,resultLabels.place],
    rows:samruk2025Results.filter(row=>[resultSports.asyk,resultSports.tug].includes(row.discipline)).map(row=>[row.participant,row.discipline,row.place])},
];
export const ski2026Rows: Cell[][] = [
  ['Рахимбаева Малика','18–30','1 км',1,'03:24,3'],
  ['Золотухина Галина','31–40','1 км',1,'02:59,5'],
  ['Бадртдинова Лилия','31–40','1 км',2,'03:28,9'],
  ['Макалкина Ольга','41–50','1 км',3,'04:27,4'],
  ['Дощанова Марьяна','51–60','1 км',1,'04:05,6'],
  ['Даукенова Шахизада','61–80','1 км',2,'12:26,6'],
  ['Куяниченко Владимир','18–30','2,5 км',1,'07:12,6'],
  ['Бекешов Руслан','18–30','2,5 км',2,'07:58,2'],
  ['Скажутин Илья','18–30','2,5 км',3,'07:59,8'],
  ['Абикен Мадет','31–40','2,5 км',3,'07:00,3'],
  ['Бекмагамбетов Мурат','41–50','2,5 км',1,'06:46,8'],
  ['Куяниченко Николай','51–60','2,5 км',1,'07:29,4'],
  ['Бегадилов Нурлан','51–60','2,5 км',2,'09:16,9'],
  ['Рахимбаев Талгат','61–80','2,5 км',2,'09:57,0'],
  ['Антонов Леонид','61–80','2,5 км',3,'14:04,9'],
];
const absolute = t('Абсолютная', 'Абсолюттік');
export const marathon2026Rows: Cell[][] = [
  ['Шулькебаев Данияр','5 км','18–29',2,'00:18:31'],
  ['Бегадилов Нурлан','5 км','50–59',1,'00:20:16'],
  ['Назаров Рамазан','5 км','50–59',3,'00:22:12'],
  ['Рахимбаев Талгат','5 км','60+',2,'00:22:03'],
  ['Караханова Эльмира','5 км','40–49',1,'00:24:23'],
  ['Бекешов Руслан','10 км','18–29',1,'00:33:56'],
  ['Ахмадиев Еркебулан','10 км','30–39',1,'00:33:59'],
  ['Тураров Нурсултан','10 км','30–39',2,'00:38:17'],
  ['Куяниченко Николай','10 км','50–59',1,'00:40:34'],
  ['Халилова Рамия','10 км','18–29',2,'00:46:34'],
  ['Кусаинова Алмагуль','10 км','40–49',3,'00:53:36'],
  ['Шаймерденова Динара','10 км','50–59',1,'00:51:25'],
  ['Максимов Ержан','2,5 км',absolute,1,'00:09:30'],
  ['Жамашова Роза','2,5 км',absolute,3,null],
];
export const marathon2025Rows: Cell[][] = [
  ['Шулькебаев Данияр','10 км',t('Мужчины 18–29','Ерлер 18–29'),1],
  ['Ахмадиев Еркебулан','10 км',t('Мужчины 30–39','Ерлер 30–39'),1],
  ['Молдахметова Рината','5 км',t('Женщины 40–49','Әйелдер 40–49'),1],
  ['Шаймерденова Динара','5 км',t('Женщины 50–59','Әйелдер 50–59'),1],
  ['Дузбаев Бауржан','5 км',t('Мужчины 30–39','Ерлер 30–39'),2],
  ['Михина Лариса','5 км',t('Женщины 40–49','Әйелдер 40–49'),2],
  ['Куяниченко Владимир','5 км',t('Мужчины 18–29','Ерлер 18–29'),3],
  ['Исин Даулет','5 км',t('Мужчины 50–59','Ерлер 50–59'),3],
  ['Рахимбаева Малика','5 км',t('Женщины 18–29','Әйелдер 18–29'),3],
  ['Рахимбаев Талгат','10 км',t('Мужчины 60+','Ерлер 60+'),3],
];
export const swim2025Rows: Cell[][] = [
  ['Сагат Кабиев',t('200 м, вольный стиль','200 м, еркін стиль'),1],
  ['Сагат Кабиев',t('1500 м, вольный стиль','1500 м, еркін стиль'),1],
  ['Константин Лимаренко',t('50 м, вольный стиль','50 м, еркін стиль'),1],
  ['Константин Лимаренко',t('100 м, вольный стиль','100 м, еркін стиль'),1],
  ['Константин Лимаренко',t('50 м, баттерфляй','50 м, баттерфляй'),1],
  ['Анел Жеңісқызы',t('50 м, на спине','50 м, шалқалап жүзу'),1],
  ['Анел Жеңісқызы',t('100 м, брасс','100 м, брасс'),1],
  ['Анел Жеңісқызы',t('50 м, баттерфляй','50 м, баттерфляй'),3],
];
// All 27 supplied Instagram publications were read on 2026-09-08.
// Categories not repeated in captions retain the user's earlier prize-distribution document.
// A team/relay award counts once, not once per member. Live medal counts in captions are not final totals.
export const samruk2026Results: MedalResult[] = [
  {place:1,participant:'Роман Халилов',discipline:resultSports.tennis,category:t('Мужчины','Ерлер'),organization:t('ТОО «Теміржолсу-Караганда», станция Жана-Арка — ведущий специалист АВР','«Теміржолсу-Караганда» ЖШС, Жаңаарқа станциясы — АВР жетекші маманы'),source:'https://www.instagram.com/reel/Db0A1kjqgiq/'},
  {place:1,participant:'Әли Исабеков',discipline:resultSports.togyz,category:t('Мужчины · трёхкратный чемпион Спартакиады','Ерлер · Спартакиаданың үш дүркін чемпионы'),organization:t('АО «Пассажирские перевозки», «Пригородные перевозки», Карагандинский участок — помощник машиниста','«Жолаушылар тасымалы» АҚ, «Қала маңы тасымалы», Қарағанды учаскесі — машинист көмекшісі'),source:'https://www.instagram.com/reel/Db0NBkVqiPG/'},
  {place:1,participant:'Даурен Сурабалдинов',discipline:resultSports.chess,category:t('Мужчины','Ерлер'),organization:t('АО «Қазтеміртранс», агентство «Алтынколь» — начальник отдела по обеспечению погрузки и выгрузки','«Қазтеміртранс» АҚ, «Алтынкөл» агенттігі — тиеу мен түсіруді қамтамасыз ету бөлімінің бастығы'),source:'https://www.instagram.com/reel/Dbx3fZBqKtV/'},
  {place:1,participant:'Сымбат Нәсіп',discipline:resultSports.arm,category:t('Женщины до 65 кг','65 кг-ға дейінгі әйелдер'),organization:t('Корпоративный фонд ҚТЖ — менеджер','ҚТЖ корпоративтік қоры — менеджер'),source:'https://www.instagram.com/reel/Db2q62rKEya/'},
  {place:1,participant:'Алтынбек Шахметов',discipline:t('Лёгкая атлетика · 800 м','Жеңіл атлетика · 800 м'),category:t('Мужчины 35+','Ерлер 35+'),organization:t('АО «KTZ Express» — управляющий директор по правовым вопросам','«KTZ Express» АҚ — құқықтық мәселелер жөніндегі басқарушы директор'),source:'https://www.instagram.com/reel/DbzzBYzqK-O/'},
  {place:1,participant:'Константин Лимаренко',discipline:resultSports.swimming,category:t('Мужчины 30–34','Ерлер 30–34'),organization:t('АО «KTZ Express», «KTZE Южный», агентство Достык — диспетчер','«KTZ Express» АҚ, «KTZE Оңтүстік», Достық агенттігі — диспетчер'),source:'https://www.instagram.com/reel/DbxSpgQKsTn/'},
  {place:1,participant:'Сағат Кабиев',discipline:resultSports.swimming,category:t('Мужчины 40–44','Ерлер 40–44'),source:'https://www.instagram.com/reel/DbxRVw7K77D/'},
  {place:1,participant:t('Сборная ҚТЖ по плаванию','ҚТЖ жүзу құрамасы'),discipline:resultSports.swimming,category:t('Смешанная эстафета MIX · 4 × 50 м вольным стилем','MIX аралас эстафетасы · 4 × 50 м еркін әдіс'),organization:'Әнел Жеңісқызы, Татьяна Алимина, Константин Лимаренко, Геннадий Гордиенко',source:'https://www.instagram.com/reel/Dbw6e-LKHs9/'},
  {place:1,participant:t('Сборная ҚТЖ по киберспорту','ҚТЖ киберспорт құрамасы'),discipline:resultSports.esports,category:t('Командный зачёт','Командалық есеп'),source:'https://www.instagram.com/reel/Db0gxX0qZ2l/'},
  {place:2,participant:'Ленара Смайылова',discipline:resultSports.tennis,category:t('Женщины','Әйелдер'),organization:t('ТОО «Теміржолсу-Көкшетау», станция Кокшетау — специалист отдела документооборота','«Теміржолсу-Көкшетау» ЖШС, Көкшетау станциясы — құжат айналымы бөлімінің маманы'),source:'https://www.instagram.com/p/Dbz8jRDqYs6/'},
  {place:2,participant:'Нуржан Сагидоллинов',discipline:resultSports.arm,category:t('Мужчины до 80 кг','80 кг-ға дейінгі ерлер'),organization:t('Корпоративный фонд ҚТЖ — менеджер','ҚТЖ корпоративтік қоры — менеджер'),source:'https://www.instagram.com/p/Db23e8SK0H2/'},
  {place:2,participant:'Кайраш Аханов',discipline:resultSports.asyk,organization:t('Дирекция перевозочного процесса, ВЧД Экибастуз — осмотрщик вагонов','Тасымалдау процесінің дирекциясы, Екібастұз ВЧД — вагон қараушы'),source:'https://www.instagram.com/p/Db0AkphKFd5/'},
  {place:2,participant:'Томирис Атымжанова',discipline:t('Лёгкая атлетика · 400 м','Жеңіл атлетика · 400 м'),category:t('Женщины 18–34','Әйелдер 18–34'),organization:t('Станция Экибастуз','Екібастұз станциясы'),source:'https://www.instagram.com/p/DbzyRmkqmpo/'},
  {place:2,participant:'Еркебулан Ахмадиев',discipline:t('Лёгкая атлетика · 800 м','Жеңіл атлетика · 800 м'),category:t('Мужчины 18–34','Ерлер 18–34'),organization:t('НЖС Семей','Семей НЖС'),source:'https://www.instagram.com/p/DbzyDUUKuFg/'},
  {place:2,participant:'Әнел Жеңісқызы',discipline:resultSports.swimming,category:t('Женщины 25–29','Әйелдер 25–29'),organization:t('АО «KTZ Express», «KTZE Западный», агентство Актобе — диспетчер','«KTZ Express» АҚ, «KTZE Батыс», Ақтөбе агенттігі — диспетчер'),source:'https://www.instagram.com/p/DbxehuyK1O3/'},
  {place:2,participant:'Ирина Радзевич',discipline:resultSports.swimming,category:t('Женщины 40–44','Әйелдер 40–44'),organization:t('Карагандинское ТЧЭ — инженер 1-й категории ПТО','Қарағанды ТЧЭ — ПТО-ның 1-санатты инженері'),source:'https://www.instagram.com/p/DbxbAS5q-A2/'},
  {place:2,participant:'Татьяна Алимина',discipline:resultSports.swimming,category:t('Женщины 50+','Әйелдер 50+'),organization:t('Дирекция автоматизации и цифровизации — главный менеджер Департамента аналитики и разработки','Автоматтандыру және цифрландыру дирекциясы — Аналитика және әзірлемелер департаментінің бас менеджері'),source:'https://www.instagram.com/p/DbxZu2pqX2i/'},
  {place:2,participant:'Геннадий Гордиенко',discipline:resultSports.swimming,category:t('Мужчины 50+','Ерлер 50+'),organization:t('АО «Пассажирские перевозки», «Экспресс», Астанинский участок — экипировщик','«Жолаушылар тасымалы» АҚ, «Экспресс», Астана учаскесі — жабдықтаушы'),source:'https://www.instagram.com/p/DbxDPmwK61L/'},
  {place:2,participant:t('Сборная ҚТЖ по лёгкой атлетике','ҚТЖ жеңіл атлетика құрамасы'),discipline:t('Лёгкая атлетика · эстафета','Жеңіл атлетика · эстафета'),category:t('Командный зачёт','Командалық есеп'),source:'https://www.instagram.com/p/Dbz5QWnquZM/'},
  {place:2,participant:t('Сборная ҚТЖ по арқан тарту','ҚТЖ арқан тарту құрамасы'),discipline:resultSports.tug,category:t('Первая медаль команды в этой дисциплине','Команданың осы спорт түріндегі алғашқы медалі'),source:'https://www.instagram.com/p/DbxkUJlKU_m/'},
  {place:2,participant:t('Женская сборная ҚТЖ','ҚТЖ әйелдер құрамасы'),discipline:resultSports.volleyball,source:'https://www.instagram.com/p/Db2xVokKnXk/'},
  {place:2,participant:t('Мужская сборная ҚТЖ','ҚТЖ ерлер құрамасы'),discipline:resultSports.basketball,source:'https://www.instagram.com/reel/Db2vqDOqncG/'},
  {place:3,participant:'Айжан Серікова',discipline:resultSports.togyz,category:t('Женщины','Әйелдер'),organization:t('АО «Кедентранссервис», филиал по Астане и Акмолинской области — приёмосдатчик груза и багажа','«Кедентранссервис» АҚ, Астана және Ақмола облысы бойынша филиалы — жүк пен багажды қабылдап-тапсырушы'),source:'https://www.instagram.com/p/Db0QNboqkON/'},
  {place:3,participant:'Гульжан Аманова',discipline:resultSports.chess,category:t('Женщины','Әйелдер'),organization:t('ТОО «КТЖ-Грузовые перевозки», филиал «Ақтөбе» (Уральск) — менеджер по персоналу','«ҚТЖ-Жүк тасымалы» ЖШС, «Ақтөбе» филиалы (Орал) — персонал жөніндегі менеджер'),source:'https://www.instagram.com/p/Dbx6iRCK_db/'},
  {place:3,participant:'Алла Штрошерер',discipline:resultSports.arm,category:t('Женщины свыше 65 кг','65 кг-нан жоғары әйелдер'),organization:t('АО «НК «ҚТЖ»','«ҚТЖ» ҰК» АҚ'),source:'https://www.instagram.com/p/Db23EgIq3HM/'},
  {place:3,participant:'Галина Золотухина',discipline:t('Лёгкая атлетика · 400 м','Жеңіл атлетика · 400 м'),category:t('Женщины 35+','Әйелдер 35+'),organization:t('ТОО «КТЖ-Грузовые перевозки», Карагандинское ТЧЭ-14 — оператор ЦОТУ','«ҚТЖ-Жүк тасымалы» ЖШС, Қарағанды ТЧЭ-14 — ЖТЕО операторы'),source:'https://www.instagram.com/p/Dbzywgnq4U3/'},
  {place:3,participant:t('Сборная ҚТЖ по футзалу','ҚТЖ футзал құрамасы'),discipline:t('Футзал','Футзал'),category:t('Матч за бронзу: победа над KEGOC — 5:0','Қола үшін матч: KEGOC командасын 5:0 есебімен жеңді'),source:'https://www.instagram.com/p/Db2WXvIKC7W/'},
];
const samruk2026Source = 'https://rail-news.kz/ru/sport/24547-sbornaia-ktz-stala-obladatelem-kubka-spartakiady-samruk-qazyna.html';
export const resultEvents: ResultEvent[] = [
  {
    slug: 'samruk-2026', sourceSection: 1, year: 2026, location: t('Астана','Астана'), category: 'spartakiad',
    title: t('XI Спартакиада АО «Самрук-Қазына»','«Самұрық-Қазына» АҚ XI спартакиадасы'),
    sports: ['multisport','tennis','togyz','chess','arm','running','swimming','esports','asyk','tug','volleyball','basketball','futsal'], teamPlace: 1,
    summary: t('1-е общекомандное место третий год подряд — 27 медалей','Үшінші жыл қатарынан жалпыкомандалық 1-орын — 27 медаль'),
    medals: { gold: 9, silver: 13, bronze: 5, scope: 'reported-total' },
    blocks: [{title:overall,paragraphs:[
      t('8–10 августа 2026 года в Астане сборная ҚТЖ завоевала Кубок XI Спартакиады группы компаний АО «Самрук-Қазына» и третий год подряд заняла первое общекомандное место','2026 жылғы 8–10 тамызда Астанада ҚТЖ құрамасы «Самұрық-Қазына» АҚ компаниялар тобының XI спартакиадасының кубогын жеңіп алып, үшінші жыл қатарынан жалпыкомандалық бірінші орын иеленді'),
      t('Все 27 наград представлены ниже — каждая командная победа и эстафета учтена как один призовой результат','Барлық 27 жүлде төменде берілген — әр командалық жеңіс пен эстафета бір жүлделі нәтиже ретінде есептелген'),
    ]},
    {title:t('Золотые медали · 9','Алтын медальдар · 9'),awards:samruk2026Results.filter(row=>row.place===1)},
    {title:t('Серебряные медали · 13','Күміс медальдар · 13'),awards:samruk2026Results.filter(row=>row.place===2)},
    {title:t('Бронзовые медали · 5','Қола медальдар · 5'),awards:samruk2026Results.filter(row=>row.place===3)}],
    sources: [{label:'Rail-news — XI Спартакиада',href:samruk2026Source},
      {label:t('Rail-news — состав плавательной эстафеты','Rail-news — жүзу эстафетасының құрамы'),href:'https://rail-news.kz/index.php/ru/sport/24508-pervoe-zoloto-ktz-na-spartakiade-samruk-qazyna-zavoevali-plovcy.html'}],
  },
  {
    slug:'winter-samruk-2026',sourceSection:2,year:2026,location:null,category:'spartakiad',sports:['hockey','skiing'],teamPlace:null,
    title:t('II зимняя Спартакиада «Самрук-Қазына»','«Самұрық-Қазына» II қысқы спартакиадасы'),
    summary:t('Хоккей — командное серебро; лыжные гонки — 15 призовых результатов в подборке','Хоккей — командалық күміс; шаңғы жарысы — топтамада 15 жүлделі нәтиже'),
    blocks:[{title:resultSports.hockey,paragraphs:[t('Команда ҚТЖ заняла 2-е место в хоккейном турнире','ҚТЖ командасы хоккей турнирінде 2-орын алды')]},
      {title:resultSports.skiing,paragraphs:[t('По 15 опубликованным карточкам: 6 первых, 5 вторых и 4 третьих места в возрастных категориях','Жарияланған 15 карточка бойынша: жас санаттарында 6 бірінші, 5 екінші және 4 үшінші орын'), sourceSelection,
        t('Время указано в формате минуты:секунды,десятые','Уақыт минут:секунд,ондық үлес форматында берілген')], columns:skiColumns,rows:ski2026Rows}],
    sources:[{label:'Instagram — хоккей',href:'https://www.instagram.com/reel/DUf3amiiqE4/'},{label:'Instagram — лыжные гонки',href:'https://www.instagram.com/p/DUsnxYZCoGz/'}],
  },
  {
    slug:'charity-marathon-2026',sourceSection:3,year:2026,location:null,category:'charity',sports:['running'],teamPlace:null,
    title:'IV Charity Samruk Marathon',summary:t('14 призовых результатов в подборке: 7 первых, 4 вторых и 3 третьих места','Топтамада 14 жүлделі нәтиже: 7 бірінші, 4 екінші және 3 үшінші орын'),
    medals:{gold:7,silver:4,bronze:3,scope:'listed-results'},
    blocks:[{title:individual,paragraphs:[sourceSelection,t('Место относится к указанной категории; абсолютный зачёт отмечен отдельно','Орын көрсетілген санатқа қатысты; абсолюттік есеп бөлек белгіленген'),t('Общее число участников ҚТЖ и точная дата забега в подборке не указаны','Топтамада ҚТЖ қатысушыларының жалпы саны мен жүгірудің нақты күні көрсетілмеген')],columns:runColumns,rows:marathon2026Rows}],
    sources:[{label:'Instagram — IV Charity Samruk Marathon',href:'https://www.instagram.com/p/DX6gUXwCtkO/'}],
  },
  {
    slug:'iron-friendship-2026',sourceSection:4,year:2026,location:t('Тбилиси','Тбилиси'),category:'international',sports:['football'],teamPlace:1,
    title:t('Международный турнир «Железная дружба»','«Железная дружба» халықаралық турнирі'),
    summary:t('Победа команды карагандинских железнодорожников ТЧЭ-14','Қарағанды теміржолшыларының ТЧЭ-14 командасы жеңіске жетті'),
    blocks:[{title:t('Три победы на пути к кубку','Кубокқа апарған үш жеңіс'),columns:[t('Соперник','Қарсылас'),t('Счёт в пользу ТЧЭ-14','ТЧЭ-14 пайдасына есеп')],rows:[[t('Команда Грузии','Грузия командасы'),'8:5'],[t('Команда Армении','Армения командасы'),'9:0'],['РОСПРОФЖЕЛ','5:1']]}],
    sources:[{label:'Rail-news — «Железная дружба»',href:'https://rail-news.kz/ru/sport/24182-kazaxstanskie-zeleznodorozniki-vyigrali-mezdunarodnyi-turnir-po-futbolu-v-tbilisi.html'},{label:'Instagram — «Железная дружба»',href:'https://www.instagram.com/p/DZ9upsPCoP4/'}],
  },
  {
    slug:'samruk-2025',sourceSection:5,year:2025,location:'Астана',category:'spartakiad',sports:['multisport','tennis','togyz','chess','darts','archery','arm','swimming','asyk','tug'],teamPlace:1,
    title:t('X Спартакиада «Самрук-Қазына»','«Самұрық-Қазына» X спартакиадасы'),
    summary:t('1-е общекомандное место — 28 медалей','Жалпыкомандалық 1-орын — 28 медаль'),
    medals:{gold:11,silver:8,bronze:9,scope:'reported-total'},
    blocks:[{title:overall,paragraphs:[t('Сборная ҚТЖ стала победителем X Спартакиады группы компаний «Самрук-Қазына»','ҚТЖ құрамасы «Самұрық-Қазына» компаниялар тобының X спартакиадасында жеңіске жетті'),
      t('7–10 августа 2025 года · Астана','2025 жылғы 7–10 тамыз · Астана'),
      t('Ниже — 37 заполненных результатов работников и сборной ҚТЖ из итогового распределения мест: призовые и остальные места по видам спорта','Төменде қорытынды орындар тізіміндегі ҚТЖ қызметкерлері мен құрамасының толтырылған 37 нәтижесі берілген: спорт түрлері бойынша жүлделі және өзге орындар'),
      t('В этих строках указаны 23 призовых результата: 11 первых, 5 вторых и 7 третьих мест; это не полная расшифровка общекомандных 28 медалей','Бұл жолдарда 23 жүлделі нәтиже көрсетілген: 11 бірінші, 5 екінші және 7 үшінші орын; бұл команданың 28 медалінің толық тізімі емес'),
      t('Строки ҚТЖ по киберспорту, мужскому и женскому волейболу, баскетболу и футзалу в предоставленном документе не заполнены — места по ним не добавлены','Берілген құжатта ҚТЖ-ның киберспорт, ерлер және әйелдер волейболы, баскетбол және футзал бойынша жолдары толтырылмаған — олар бойынша орындар қосылмады')
    ]},...samruk2025Blocks],
    sources:[{label:'Rail-news — X Спартакиада',href:'https://rail-news.kz/ru/sport/21357-pobeditelei-x-spartakiady-samruk-qazyna-pozdravili-v-ktz.html'}],
  },
  {
    // Tournament name and 2025 year confirmed by the user.
    slug:'corporate-football-cup-2025',sourceSection:6,year:2025,location:t('Анталья','Анталия'),category:'international',sports:['football'],teamPlace:1,
    title:t('International Corporate Cup 2025','International Corporate Cup 2025'),
    summary:t('Футбольная команда ҚТЖ — победитель кубка','ҚТЖ футбол командасы — кубок жеңімпазы'),
    blocks:[{title:overall,paragraphs:[t('Команда ҚТЖ выиграла International Corporate Cup 2025 в Анталье','ҚТЖ командасы Анталияда өткен International Corporate Cup 2025 турнирін жеңіп алды')]}],
    sources:[{label:'Rail-news — Международный корпоративный кубок',href:'https://rail-news.kz/ru/news/22099-glava-ktz-nagradil-futbolnuiu-komandu-pobeditelia-mezdunarodnogo-korporativnogo-kubka.html'},{label:'Instagram — Международный корпоративный кубок',href:'https://www.instagram.com/p/DQRCFzBCk4Y/'}],
  },
  {
    slug:'swimming-masters-2025',sourceSection:7,year:2025,location:t('Алматы','Алматы'),category:'open',sports:['swimming'],teamPlace:null,
    title:t('VII открытый чемпионат Казахстана по плаванию Masters','Жүзуден Қазақстанның VII ашық Masters чемпионаты'),
    summary:t('Представители ҚТЖ: 7 золотых и 1 бронзовая награда в личном зачёте','ҚТЖ өкілдері: жеке есепте 7 алтын және 1 қола жүлде'),
    medals:{gold:7,silver:0,bronze:1,scope:'listed-results'},
    blocks:[{title:individual,paragraphs:[t('Спортсмены ҚТЖ выступили в составе объединённой Samruk Swim Team','ҚТЖ спортшылары біріккен Samruk Swim Team құрамында өнер көрсетті'),t('Общекомандное 3-е место принадлежит Samruk Swim Team, а не отдельной сборной ҚТЖ','Жалпыкомандалық 3-орын ҚТЖ-ның жеке құрамасына емес, Samruk Swim Team командасына тиесілі'),t('В таблице — перечисленные личные награды представителей ҚТЖ; возрастные категории и время не указаны','Кестеде ҚТЖ өкілдерінің аталған жеке жүлделері берілген; жас санаттары мен уақыт көрсетілмеген')],columns:[resultLabels.name,t('Дистанция и стиль','Қашықтық пен стиль'),resultLabels.place],rows:swim2025Rows}],
    sources:[{label:'SK NEWS — Masters',href:'https://sknews.kz/news/view/sbornaya-samruk-swim-team-blestyasche-vystupila-na-chempionate-po-plavaniyu'},{label:'Самрук-Қазына — Samruk Swim Team',href:'https://sk.kz/press-center/news/78484/?lang=ru'}],
  },
  {
    slug:'charity-marathon-2025',sourceSection:8,year:2025,location:'Астана',category:'charity',sports:['running'],teamPlace:null,
    title:'III Charity Samruk Marathon',summary:t('405 сотрудников ҚТЖ — 10 медалей','ҚТЖ-ның 405 қызметкері — 10 медаль'),
    medals:{gold:4,silver:2,bronze:4,scope:'reported-total'},
    blocks:[{title:individual,paragraphs:[t('405 сотрудников ҚТЖ приняли участие в благотворительном забеге; места приведены по возрастным категориям','ҚТЖ-ның 405 қызметкері қайырымдылық жүгіруге қатысты; орындар жас санаттары бойынша берілген')],columns:runColumns.slice(0,4),rows:marathon2025Rows}],
    sources:[{label:'Rail-news — III Charity Samruk Marathon',href:'https://rail-news.kz/ru/sport/20517-bolee-400-sotrudnikov-ktz-priniali-ucastie-v-iii-charity-samruk-marathon.html'}],
  },
  // Preserve the previously published result; it is not one of the nine handoff events.
  {
    slug:'qyzmet-cup-2025',sourceSection:null,year:2025,location:null,category:'national',sports:['futsal'],teamPlace:1,
    title:'QAZAQSTAN QYZMET CUP: BIRLIK',summary:t('Сборная ҚТЖ — победитель QAZAQSTAN QYZMET CUP: BIRLIK 2025','ҚТЖ құрамасы — QAZAQSTAN QYZMET CUP: BIRLIK 2025 жеңімпазы'),
    blocks:[{title:overall,paragraphs:[t('Команда ҚТЖ выиграла кубок QAZAQSTAN QYZMET CUP: BIRLIK в 2025 году','ҚТЖ командасы 2025 жылы QAZAQSTAN QYZMET CUP: BIRLIK кубогын жеңіп алды')]}],
    sources:[{label:'Rail-news — QYZMET CUP: BIRLIK 2025',href:'https://rail-news.kz/ru/news/22099-glava-ktz-nagradil-futbolnuiu-komandu-pobeditelia-mezdunarodnogo-korporativnogo-kubka.html'}],
  },
  {
    slug:'samruk-2024',sourceSection:9,year:2024,location:null,category:'spartakiad',sports:['multisport','swimming','chess','arm','tennis','asyk','togyz','volleyball','esports','basketball','futsal'],teamPlace:1,
    title:t('IX Спартакиада «Самрук-Қазына»','«Самұрық-Қазына» IX спартакиадасы'),
    summary:t('1-е общекомандное место — 20 медалей','Жалпыкомандалық 1-орын — 20 медаль'),
    medals:{gold:11,silver:6,bronze:3,scope:'reported-total'},
    blocks:[{title:overall,paragraphs:[t('Команда ҚТЖ заняла 1-е место в общекомандном зачёте IX Спартакиады «Самрук-Қазына»','ҚТЖ командасы «Самұрық-Қазына» IX спартакиадасының жалпыкомандалық есебінде 1-орын алды'),
      t('Призёры и победители номинаций приведены по презентации результатов команды ҚТЖ за 2024 год; данные на 20:00 24 ноября','Жүлдегерлер мен номинация жеңімпаздары ҚТЖ командасының 2024 жылғы нәтижелер таныстырылымынан алынды; деректер 24 қараша, сағат 20:00 жағдайы бойынша')
    ]},...samruk2024Blocks],
    sources:[{label:'SK NEWS — IX Спартакиада',href:'https://sknews.kz/news/view/ix-spartakiada-samruk-kazyna-komanda-ktgh-zanyala-i-mesto-zavoevav-20-medaley'}],
  },
];
// Translate source labels without translating personal names or changing source URLs.
for (const event of resultEvents) for (const source of event.sources) {
  if (source.label.includes('Спартакиада')) resultsTranslations[source.label] = source.label.replace('Спартакиада','спартакиада');
}
for (const event of resultEvents) if (event.location) {
  resultsTranslations[`${event.year} · ${event.location}`] = `${event.year} · ${resultsTranslations[event.location] ?? event.location}`;
}
Object.assign(resultsTranslations, {
  'Футзал':'Футзал', 'Rail-news — футзал':'Rail-news — футзал',
  'Instagram — киберспорт':'Instagram — киберспорт', 'Instagram — настольный теннис':'Instagram — үстел теннисі',
  'Instagram — баскетбол':'Instagram — баскетбол', 'Instagram — волейбол':'Instagram — волейбол',
  'Instagram — хоккей':'Instagram — хоккей', 'Instagram — лыжные гонки':'Instagram — шаңғы жарысы',
  'Rail-news — Международный корпоративный кубок':'Rail-news — Халықаралық корпоративтік кубок',
  'Instagram — Международный корпоративный кубок':'Instagram — Халықаралық корпоративтік кубок',
});
export const resultsPages = Object.fromEntries([
  ['sport/results', {path:'/sport/results',title:resultLabels.title,eyebrow:resultLabels.eyebrow,lead:resultLabels.lead}],
  ...resultEvents.map(event => [`sport/results/${event.slug}`, {path:`/sport/results/${event.slug}`,parentPath:'/sport/results',title:event.title,eyebrow:[event.year,event.location].filter(Boolean).join(' · '),lead:event.summary}]),
]);
export const resultsPhoto = {
  src: '/sports/results-team-2026.jpg',
  width: 1280,
  height: 853,
  alt: t('Сборная ҚТЖ с кубком на церемонии награждения', 'Марапаттау рәсімінде кубокпен тұрған ҚТЖ құрамасы'),
};
export function renderResultsIndex() {
  const options = (items: Record<string,string>) => Object.entries(items).sort(([a],[b]) => /^\d+$/.test(a) ? Number(b)-Number(a) : 0).map(([value,label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
  const select = (name: string, label: string, all: string, items: Record<string,string>) => `<label><span>${esc(label)}</span><select name="${name}"><option value="">${esc(all)}</option>${options(items)}</select></label>`;
  return `<section class="kpContentSection kpResultsIndex" data-results-index>
    <figure class="kpResultsHeroPhoto"><img src="${resultsPhoto.src}" width="${resultsPhoto.width}" height="${resultsPhoto.height}" alt="${esc(resultsPhoto.alt)}" decoding="async"></figure>
    <form class="kpResultsFilters" hidden>${select('year',resultLabels.year,resultLabels.allYears,{'2026':'2026','2025':'2025','2024':'2024'})}${select('sport',resultLabels.sport,resultLabels.allSports,resultSports)}${select('category',resultLabels.category,resultLabels.allCategories,resultCategories)}<button type="reset">${esc(resultLabels.reset)}</button></form>
    <p class="kpResultsCount" role="status" aria-live="polite"><span>${esc(resultLabels.shown)}</span>: <b data-results-count>${resultEvents.length}</b></p>
    <div class="kpResultsCards">${resultEvents.map(event => `<a class="kpResultsEvent" href="/sport/results/${event.slug}/" data-result-year="${event.year}" data-result-sports="${event.sports.join(' ')}" data-result-category="${event.category}"><div class="kpResultsMeta"><span>${event.year}</span><span>${esc(resultCategories[event.category as keyof typeof resultCategories])}</span>${event.location ? `<span>${esc(event.location)}</span>` : ''}</div><h2>${esc(event.title)}</h2><p>${esc(event.summary)}</p><span class="kpResultsMore">${esc(resultLabels.details)} <i aria-hidden="true">↗</i></span></a>`).join('')}</div>
    <p class="kpResultsEmpty" data-results-empty hidden>${esc(resultLabels.empty)}</p>
  </section>`;
}
type LegacyResults = {placements: readonly {place:string;disciplines:string}[];nominations:readonly string[]};
const legacyNote = t('Сохранено из ранее предоставленного распределения призовых мест ҚТЖ','ҚТЖ-ның бұрын берілген жүлделі орындар тізімінен сақталған');
const nominationsTitle = t('Индивидуальные номинации','Жеке номинациялар');
const awardParticipant = t('Участник / команда','Қатысушы / команда');
const awardDiscipline = t('Дисциплина и категория','Спорт түрі мен санаты');
const awardSources = t('Ссылки в именах участников и названиях команд ведут к публикациям о соответствующих наградах','Қатысушылардың есімдері мен команда атауларындағы сілтемелер тиісті жүлделер туралы жарияланымдарға апарады');
function renderMedalTable(block: Block) {
  return `<div class="kpResultsTable kpSamrukTable" role="region" tabindex="0" aria-label="${esc(resultLabels.scroll)}"><table><caption>${esc(block.title)}</caption><thead><tr><th scope="col">${esc(awardParticipant)}</th><th scope="col">${esc(awardDiscipline)}</th></tr></thead><tbody>${block.awards!.map(row=>`<tr data-samruk-place="${row.place}"><th scope="row"><a href="${esc(row.source)}" target="_blank" rel="noopener noreferrer"><span>${esc(row.participant)}</span><span aria-hidden="true"> ↗</span></a>${row.organization?`<span class="kpAwardNote">${esc(row.organization)}</span>`:''}</th><td><span>${esc(row.discipline)}</span>${row.category?`<span class="kpAwardNote">${esc(row.category)}</span>`:''}</td></tr>`).join('')}</tbody></table></div>`;
}
export function renderResultDetail(key: string, legacy?: LegacyResults) {
  const event = resultEvents.find(event => `sport/results/${event.slug}` === key);
  if (!event) return '';
  const medals = event.medals;
  const retained = event.slug === 'samruk-2026' && legacy ? `<section class="kpContentSection kpResultsBlock kpResultsLegacy"><h2>${esc(nominationsTitle)}</h2><p>${esc(legacyNote)}</p><ul>${legacy.nominations.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section>` : '';
  const medalSummary = medals ? `<section class="kpContentSection kpResultsMedals"><h2>${esc(medals.scope === 'reported-total' ? resultLabels.total : resultLabels.selected)}</h2><div>${[['gold',resultLabels.gold],['silver',resultLabels.silver],['bronze',resultLabels.bronze]].map(([metal,label])=>`<article data-medal="${metal}"><strong>${medals[metal as 'gold'|'silver'|'bronze']}</strong><span>${esc(label)}</span></article>`).join('')}</div></section>` : '';
  const blocks = event.blocks.map((block,index) => {
    const table = block.awards ? renderMedalTable(block) : block.rows && block.columns ? `<div class="kpResultsTable" role="region" tabindex="0" aria-label="${esc(resultLabels.scroll)}"><table><caption>${esc(block.title)}</caption><thead><tr>${block.columns.map(column=>`<th scope="col">${esc(column)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row=>`<tr>${row.map((cell,i)=> i===0?`<th scope="row">${esc(cell??resultLabels.unknown)}</th>`:`<td data-label="${esc(block.columns![i])}">${esc(cell??resultLabels.unknown)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
    return `<section class="kpContentSection kpResultsBlock" aria-labelledby="result-block-${index}"><h2 id="result-block-${index}">${esc(block.title)}</h2>${(block.paragraphs??[]).map(p=>`<p>${esc(p)}</p>`).join('')}${block.items?`<ul>${block.items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:''}${table}</section>`;
  }).join('');
  const sources = event.sources.length ? `<section class="kpContentSection kpResultsSources"><h2>${esc(resultLabels.sources)}</h2>${event.slug==='samruk-2026'?`<p>${esc(awardSources)}</p>`:''}<ul>${event.sources.map(source=>`<li><a href="${esc(source.href)}" target="_blank" rel="noopener noreferrer"><span>${esc(source.label)}</span> <span aria-hidden="true">↗</span></a></li>`).join('')}</ul></section>` : '';
  return `<div class="kpResultsDetail">${medalSummary}${blocks}${retained}${sources}<div class="kpResultsBack"><a href="/sport/results/">← <span>${esc(resultLabels.back)}</span></a></div></div>`;
}
