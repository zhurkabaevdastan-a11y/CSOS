// Source: user-supplied KTZ_RESULTS_CODEX_HANDOFF.md, sections 1–9.
// Counts from Instagram carousels are a selection, never an overall team total.
export const resultsTranslations: Record<string, string> = {};
const t = (ru: string, kk: string) => { resultsTranslations[ru] = kk; return ru; };
const esc = (value: unknown) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
type Cell = string | number | null;
type Block = { title: string; paragraphs?: string[]; items?: string[]; columns?: string[]; rows?: Cell[][] };
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
};
const individual = t('Личные результаты', 'Жеке нәтижелер');
const overall = t('Общекомандный результат', 'Жалпыкомандалық нәтиже');
const rank1 = t('1-е место', '1-орын');
const rank2 = t('2-е место', '2-орын');
const rank3 = t('3-е место', '3-орын');
const sourceSelection = t('Указаны результаты опубликованных карточек, а не полный протокол соревнования', 'Жарыстың толық хаттамасы емес, жарияланған карточкалардың нәтижелері берілген');
const skiColumns = [resultLabels.name, resultLabels.age, resultLabels.distance, resultLabels.place, resultLabels.time];
const runColumns = [resultLabels.name, resultLabels.distance, resultLabels.age, resultLabels.place, resultLabels.time];
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
const samruk2026Source = 'https://rail-news.kz/ru/sport/24547-sbornaia-ktz-stala-obladatelem-kubka-spartakiady-samruk-qazyna.html';
export const resultEvents: ResultEvent[] = [
  {
    slug: 'samruk-2026', sourceSection: 1, year: 2026, location: t('Астана','Астана'), category: 'spartakiad',
    title: t('XI Спартакиада АО «Самрук-Қазына»','«Самұрық-Қазына» АҚ XI спартакиадасы'),
    sports: ['multisport','tennis','togyz','chess','arm','running','swimming','esports','asyk','tug','volleyball','basketball','futsal'], teamPlace: 1,
    summary: t('1-е общекомандное место третий год подряд — 27 медалей','Үшінші жыл қатарынан жалпыкомандалық 1-орын — 27 медаль'),
    medals: { gold: 9, silver: 13, bronze: 5, scope: 'reported-total' },
    blocks: [{ title: t('Отдельные результаты команды','Команданың жекелеген нәтижелері'),
      paragraphs: [t('Ниже — отдельные известные результаты, а не полный личный протокол всех 27 медалей','Төменде барлық 27 медальдың толық жеке хаттамасы емес, белгілі жекелеген нәтижелер берілген')],
      columns: [resultLabels.name, resultLabels.discipline, resultLabels.result], rows: [
        [t('Команда ҚТЖ','ҚТЖ командасы'),resultSports.esports,rank1],
        ['Роман Халилов',resultSports.tennis,rank1], ['Али Исабеков',resultSports.togyz,rank1],
        ['Сымбат Насип',resultSports.arm,rank1], ['Алла Штрошерер',resultSports.arm,rank3],
        [t('Мужская сборная ҚТЖ','ҚТЖ ерлер құрамасы'),resultSports.basketball,rank2],
        [t('Женская сборная ҚТЖ','ҚТЖ әйелдер құрамасы'),resultSports.volleyball,rank2],
        [t('Сборная ҚТЖ','ҚТЖ құрамасы'),'Футзал',t('3-е место, матч с KEGOC — 5:0','3-орын, KEGOC командасымен матч — 5:0')],
      ] }],
    sources: [{label:'Rail-news — XI Спартакиада',href:samruk2026Source},{label:'Rail-news — футзал',href:'https://rail-news.kz/ru/sport/24540-futzal-prines-sbornoi-ktz-bronzu-na-spartakiade.html'},
      {label:'Instagram — XI Спартакиада',href:'https://www.instagram.com/reel/Db5AeHoKUTP/'},
      {label:'Instagram — киберспорт',href:'https://www.instagram.com/reel/Db0gxX0qZ2l/'},
      {label:'Instagram — настольный теннис',href:'https://www.instagram.com/reel/Db0A1kjqgiq/'},
      {label:'Instagram — баскетбол',href:'https://www.instagram.com/reel/Db2vqDOqncG/'},
      {label:'Instagram — волейбол',href:'https://www.instagram.com/reel/Db2xgzQqmhL/'}],
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
    slug:'samruk-2025',sourceSection:5,year:2025,location:null,category:'spartakiad',sports:['multisport'],teamPlace:1,
    title:t('X Спартакиада «Самрук-Қазына»','«Самұрық-Қазына» X спартакиадасы'),
    summary:t('1-е общекомандное место — 28 медалей','Жалпыкомандалық 1-орын — 28 медаль'),
    medals:{gold:11,silver:8,bronze:9,scope:'reported-total'},
    blocks:[{title:overall,paragraphs:[t('Сборная ҚТЖ стала победителем X Спартакиады группы компаний «Самрук-Қазына»','ҚТЖ құрамасы «Самұрық-Қазына» компаниялар тобының X спартакиадасында жеңіске жетті')]}],
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
    blocks:[{title:overall,paragraphs:[t('Команда ҚТЖ заняла 1-е место в общекомандном зачёте IX Спартакиады «Самрук-Қазына»','ҚТЖ командасы «Самұрық-Қазына» IX спартакиадасының жалпыкомандалық есебінде 1-орын алды')]}],
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
const legacyTitle = t('Распределение призовых мест по дисциплинам','Спорт түрлері бойынша жүлделі орындардың бөлінуі');
const legacyNote = t('Сохранено из ранее предоставленного распределения призовых мест ҚТЖ','ҚТЖ-ның бұрын берілген жүлделі орындар тізімінен сақталған');
const nominationsTitle = t('Индивидуальные номинации','Жеке номинациялар');
export function renderResultDetail(key: string, legacy?: LegacyResults) {
  const event = resultEvents.find(event => `sport/results/${event.slug}` === key);
  if (!event) return '';
  const medals = event.medals;
  const retained = event.slug === 'samruk-2026' && legacy ? `<section class="kpContentSection kpResultsBlock kpResultsLegacy"><h2>${esc(legacyTitle)}</h2><p>${esc(legacyNote)}</p>${legacy.placements.map(item=>`<article><h3>${esc(item.place)}</h3><p>${esc(item.disciplines)}</p></article>`).join('')}<h3>${esc(nominationsTitle)}</h3><ul>${legacy.nominations.map(item=>`<li>${esc(item)}</li>`).join('')}</ul></section>` : '';
  const medalSummary = medals ? `<section class="kpContentSection kpResultsMedals"><h2>${esc(medals.scope === 'reported-total' ? resultLabels.total : resultLabels.selected)}</h2><div>${[['gold',resultLabels.gold],['silver',resultLabels.silver],['bronze',resultLabels.bronze]].map(([metal,label])=>`<article data-medal="${metal}"><strong>${medals[metal as 'gold'|'silver'|'bronze']}</strong><span>${esc(label)}</span></article>`).join('')}</div></section>` : '';
  const blocks = event.blocks.map((block,index) => {
    const table = block.rows && block.columns ? `<div class="kpResultsTable" role="region" tabindex="0" aria-label="${esc(resultLabels.scroll)}"><table><caption>${esc(block.title)}</caption><thead><tr>${block.columns.map(column=>`<th scope="col">${esc(column)}</th>`).join('')}</tr></thead><tbody>${block.rows.map(row=>`<tr>${row.map((cell,i)=> i===0?`<th scope="row">${esc(cell??resultLabels.unknown)}</th>`:`<td data-label="${esc(block.columns![i])}">${esc(cell??resultLabels.unknown)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
    return `<section class="kpContentSection kpResultsBlock" aria-labelledby="result-block-${index}"><h2 id="result-block-${index}">${esc(block.title)}</h2>${(block.paragraphs??[]).map(p=>`<p>${esc(p)}</p>`).join('')}${block.items?`<ul>${block.items.map(item=>`<li>${esc(item)}</li>`).join('')}</ul>`:''}${table}</section>`;
  }).join('');
  const sources = event.sources.length ? `<section class="kpContentSection kpResultsSources"><h2>${esc(resultLabels.sources)}</h2><ul>${event.sources.map(source=>`<li><a href="${esc(source.href)}" target="_blank" rel="noopener noreferrer"><span>${esc(source.label)}</span> <span aria-hidden="true">↗</span></a></li>`).join('')}</ul></section>` : '';
  return `<div class="kpResultsDetail">${medalSummary}${blocks}${retained}${sources}<div class="kpResultsBack"><a href="/sport/results/">← <span>${esc(resultLabels.back)}</span></a></div></div>`;
}
