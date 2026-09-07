// Source: the three documents supplied for website publication on 7 September 2026.
// Chart values were read against the rendered PDF pages, not PDF text order.
export const socialStabilityTranslations: Record<string, string> = {};
const t = (ru: string, kk: string) => { socialStabilityTranslations[ru] = kk; return ru; };
const esc = (value: string | number) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const srsYears = [2020, 2021, 2022, 2023, 2024, 2025];
export const srsSeries = [
  { id: 'srs', title: t('Индекс SRS', 'SRS индексі'), values: [75, 72, 65, 66, 69, 73],
    description: t('Совокупный показатель социальной стабильности, включающий вовлечённость, социальное благополучие и социальное спокойствие', 'Қызметкерлердің тартылуын, әлеуметтік әл-ауқатын және әлеуметтік тыныштығын қамтитын әлеуметтік тұрақтылықтың жиынтық көрсеткіші'),
    insight: t('В 2025 году индекс SRS составил 73% — на 4 процентных пункта выше результата 2024 года', '2025 жылы SRS индексі 73% болды — 2024 жылғы нәтижеден 4 пайыздық тармаққа жоғары') },
  // 2025 corrected to 74% by the user on 7 September 2026.
  { id: 'engagement', title: t('Индекс вовлечённости', 'Тартылу индексі'), values: [79, 77, 67, 62, 66, 74],
    description: t('Удовлетворённость условиями и безопасностью труда, взаимоотношениями и коммуникациями в компании, а также лояльность работников', 'Еңбек жағдайлары мен қауіпсіздігіне, компаниядағы қарым-қатынас пен коммуникацияларға қанағаттану және қызметкерлердің компанияға бейілділігі'),
    insight: t('В 2025 году — 74%, на 8 процентных пунктов выше 2024 года', '2025 жылы — 74%, 2024 жылмен салыстырғанда 8 пайыздық тармаққа жоғары') },
  { id: 'wellbeing', title: t('Индекс социального благополучия', 'Әлеуметтік әл-ауқат индексі'), values: [50, 44, 40, 55, 59, 58],
    description: t('Удовлетворённость условиями и качеством жизни, материальным благосостоянием и самочувствием в коллективе', 'Өмір сүру жағдайлары мен сапасына, материалдық әл-ауқатқа және ұжымдағы көңіл күйге қанағаттану'),
    insight: t('В 2025 году — 58%, на 1 процентный пункт ниже 2024 года и на 3 пункта выше 2023 года', '2025 жылы — 58%, 2024 жылмен салыстырғанда 1 пайыздық тармаққа төмен, ал 2023 жылдан 3 тармаққа жоғары') },
  { id: 'calm', title: t('Индекс социального спокойствия', 'Әлеуметтік тыныштық индексі'), values: [88, 83, 82, 78, 83, 87],
    description: t('Напряжённость отношений между руководством и работниками, а также уровень протестного потенциала в трудовых коллективах', 'Басшылық пен қызметкерлер арасындағы қарым-қатынас шиеленісі және еңбек ұжымдарындағы наразылық әлеуетінің деңгейі'),
    insight: t('В 2025 году — 87%, на 4 процентных пункта выше 2024 года', '2025 жылы — 87%, 2024 жылмен салыстырғанда 4 пайыздық тармаққа жоғары') },
];

export const srsParticipation = [
  { year: 2024, respondents: 17478, share: 16 },
  { year: 2025, respondents: 15562, share: 10 },
];
export const irParticipation = [{ year: 2024, respondents: 23642 }, { year: 2025, respondents: 40218 }];
export const irResults = [
  { label: t('Безопасность и охрана труда', 'Еңбек қауіпсіздігі және еңбекті қорғау'), values: [86, 86] },
  { label: t('Санитарно-бытовые условия', 'Санитариялық-тұрмыстық жағдайлар'), values: [80, 81] },
  { label: t('Внутренние коммуникации', 'Ішкі коммуникациялар'), values: [91, 92] },
  { label: t('Удовлетворённость и счастье', 'Қанағаттану және бақыт'), values: [null, 90] },
  { label: t('Права человека', 'Адам құқықтары'), values: [null, 84] },
];
export const appealTotals = [{ year: 2024, total: 307, laborRights: 136 }, { year: 2025, total: 246, laborRights: 163 }];
export const appealOutcomes = [
  { label: t('Решены в пользу работников', 'Қызметкерлердің пайдасына шешілді'), values: [29, 25] },
  { label: t('Решены соглашением сторон', 'Тараптардың келісімімен шешілді'), values: [7, 7] },
  { label: t('Решены в пользу работодателя', 'Жұмыс берушінің пайдасына шешілді'), values: [11, 26] },
  { label: t('Факты не подтвердились', 'Фактілер расталмады'), values: [103, 74] },
  { label: t('Даны разъяснения заявителям', 'Өтініш берушілерге түсініктеме берілді'), values: [135, 107] },
  { label: t('Отозваны заявителем', 'Өтініш беруші кері қайтарып алды'), values: [22, null] },
  // The user assigned the remaining seven 2025 appeals to Other.
  { label: t('Другое', 'Басқа'), values: [null, 7] },
];
export const socialActivities = [
  { label: t('Встречи с работниками', 'Қызметкерлермен кездесулер'), values: ['219', '1 621'] },
  { label: t('Охват работников встречами', 'Кездесулермен қамтылған қызметкерлер'), values: ['16 585', t('49 тыс', '49 мың')] },
  { label: t('Публикации в СМИ и социальных сетях', 'БАҚ пен әлеуметтік желілердегі жарияланымдар'), values: ['621', '1 136'] },
  { label: t('Обучение членов согласительных комиссий', 'Келісу комиссиялары мүшелерін оқыту'), values: ['676', '576'] },
  { label: t('В том числе работники ҚТЖ', 'Оның ішінде ҚТЖ қызметкерлері'), values: ['456', '384'] },
  { label: t('В том числе профсоюзные активисты', 'Оның ішінде кәсіподақ белсенділері'), values: ['220', '192'] },
];

const copy = {
  overview: t('Исследования и инструменты обеспечения', 'Зерттеулер және қамтамасыз ету құралдары'),
  overviewText: t('Для мониторинга социальной обстановки ҚТЖ использует исследования SRS, опросы по производственным отношениям и анализ жалоб и обращений работников', 'Әлеуметтік ахуалды бақылау үшін ҚТЖ SRS зерттеулерін, өндірістік қатынастар жөніндегі сауалнамаларды және қызметкерлердің шағымдары мен өтініштерін талдауды қолданады'),
  regulations: t('Нормативная основа', 'Нормативтік негіз'),
  coverage: t('Охват работников Коллективным договором', 'Қызметкерлерді Ұжымдық шартпен қамту'),
  coverageNote: t('По материалам о социальной стабильности за 2025 год', '2025 жылғы әлеуметтік тұрақтылық туралы материалдар бойынша'),
  activities: t('Мероприятия по социальной стабильности', 'Әлеуметтік тұрақтылық жөніндегі іс-шаралар'),
  activitiesText: t('Компания ежегодно утверждает план мероприятий по улучшению трудовых прав и условий труда работников', 'Компания жыл сайын қызметкерлердің еңбек құқықтары мен еңбек жағдайларын жақсарту жөніндегі іс-шаралар жоспарын бекітеді'),
  meetings: t('Встречи руководителей всех уровней с персоналом, разъяснение Коллективного договора и прав работников, обучение членов согласительных комиссий, в том числе по правам человека', 'Барлық деңгейдегі басшылардың қызметкерлермен кездесулері, Ұжымдық шарт пен еңбек құқықтарын түсіндіру, келісу комиссиялары мүшелерін, соның ішінде адам құқықтары бойынша оқыту'),
  indicator: t('Показатель', 'Көрсеткіш'),
  srsTitle: t('Исследование Samruk Research Services', 'Samruk Research Services зерттеуі'),
  srsIntro: t('С 2013 года Центр социального взаимодействия и коммуникаций проводит комплексное исследование SRS во всех компаниях холдинга «Самрук-Қазына»', '2013 жылдан бері Әлеуметтік өзара ықпалдастық және коммуникация орталығы «Самұрық-Қазына» холдингінің барлық компанияларында кешенді SRS зерттеуін жүргізеді'),
  srsPurpose: t('Исследование помогает выявлять проблемные зоны в трудовых взаимоотношениях и принимать корректирующие и профилактические меры', 'Зерттеу еңбек қатынастарындағы проблемалық тұстарды анықтауға, түзету және алдын алу шараларын қабылдауға көмектеседі'),
  srsPlan: t('По результатам SRS ҚТЖ ежегодно разрабатывает и утверждает план мероприятий по повышению уровня социальной стабильности', 'SRS нәтижелері бойынша ҚТЖ жыл сайын әлеуметтік тұрақтылық деңгейін арттыру жөніндегі іс-шаралар жоспарын әзірлеп, бекітеді'),
  dynamics: t('Динамика показателей SRS', 'SRS көрсеткіштерінің динамикасы'),
  period: t('2020–2025 годы', '2020–2025 жылдар'),
  scale: t('Шкала: 0–100%', 'Шкала: 0–100%'),
  pending: t('Уточняется', 'Нақтылануда'),
  surveyed: t('Опрошено работников', 'Сауалнамаға қатысқан қызметкерлер'),
  share: t('Доля от общей численности', 'Жалпы қызметкерлер санындағы үлесі'),
  sample: t('Охват исследования SRS', 'SRS зерттеуімен қамту'),
  year: t('Год', 'Жыл'),
  srsSource: t('Источник: данные Департамента социальной политики за 2020–2025 годы и описание исследования SRS', 'Дереккөз: Әлеуметтік саясат департаментінің 2020–2025 жылдардағы деректері және SRS зерттеуінің сипаттамасы'),
  irTitle: t('Industrial Relations — мониторинг производственных отношений', 'Industrial Relations — өндірістік қатынастар мониторингі'),
  irIntro: t('Анкетирование определяет удовлетворённость работников состоянием производственных отношений и помогает выявлять вопросы, требующие внимания', 'Сауалнама қызметкерлердің өндірістік қатынастарға қанағаттануын анықтап, назар аударуды қажет ететін мәселелерді табуға көмектеседі'),
  irTopics: t('Темы анкетирования', 'Сауалнама тақырыптары'),
  irResults: t('Результаты мониторинга IR', 'IR мониторингінің нәтижелері'),
  missing: t('Не указано', 'Көрсетілмеген'),
  irNote: t('Прочерк означает, что значение за этот год в материалах не указано; показатель прав человека впервые измерен в 2025 году', 'Сызықша осы жылға қатысты мән материалдарда көрсетілмегенін білдіреді; адам құқықтары көрсеткіші алғаш рет 2025 жылы өлшенген'),
  appealChannels: t('Как компания работает с обращениями', 'Компания өтініштермен қалай жұмыс істейді'),
  appealText: t('Помимо порталов Нысана и Е-Өтініш, работники могут обращаться по горячей линии «Комплаенс», письменно к руководству, к корпоративному омбудсмену и через профсоюз', 'Нысана және Е-Өтініш порталдарынан бөлек, қызметкерлер «Комплаенс» жедел желісіне, басшылыққа жазбаша түрде, корпоративтік омбудсменге және кәсіподақ арқылы жүгіне алады'),
  appealResponse: t('Результаты анализа отражаются в интегрированном годовом отчёте; Совет директоров, комплаенс-служба и корпоративные омбудсмены ҚТЖ и АО «Самрук-Қазына» ежеквартально информируются о жалобах и принимаемых мерах', 'Талдау нәтижелері интеграцияланған жылдық есепте көрсетіледі; Директорлар кеңесі, комплаенс-қызмет және ҚТЖ мен «Самұрық-Қазына» АҚ корпоративтік омбудсмендері шағымдар мен қабылданған шаралар туралы тоқсан сайын хабардар етіледі'),
  appealAnalytics: t('Обращения работников в цифрах', 'Қызметкерлердің өтініштері сандармен'),
  appealTotal: t('Всего обращений', 'Барлық өтініштер'),
  appealLabor: t('Из них по вопросам нарушения трудовых прав', 'Оның ішінде еңбек құқықтарының бұзылуы туралы'),
  outcomes: t('Результаты рассмотрения обращений', 'Өтініштерді қарау нәтижелері'),
  outcomesNote: t('Прочерк означает, что отдельное значение для этой категории в материалах не указано', 'Сызықша осы санат бойынша жеке мән материалдарда көрсетілмегенін білдіреді'),
  source: t('Источник: материалы Департамента социальной политики «Социальная стабильность», 2025 год', 'Дереккөз: Әлеуметтік саясат департаментінің «Социальная стабильность» материалдары, 2025 жыл'),
};

const regulations = [
  [t('Трудовой кодекс', 'Еңбек кодексі'), t('Основные нормы о правах человека, трудовых правах и социально-трудовых отношениях', 'Адам құқықтары, еңбек құқықтары және әлеуметтік-еңбек қатынастары туралы негізгі нормалар')],
  [t('Отраслевое соглашение', 'Салалық келісім'), t('Принципы согласованной социально-трудовой политики в рамках социального партнёрства', 'Әлеуметтік әріптестік аясындағы келісілген әлеуметтік-еңбек саясатының қағидаттары')],
  [t('Коллективный договор', 'Ұжымдық шарт'), t('Трудовые права, условия труда и социальные льготы работников', 'Қызметкерлердің еңбек құқықтары, еңбек жағдайлары және әлеуметтік жеңілдіктері')],
  [t('Политика по правам человека', 'Адам құқықтары саясаты'), t('Уважение прав человека, включая право на труд, гендерное равенство и благоприятную окружающую среду', 'Еңбек ету, гендерлік теңдік және қолайлы қоршаған орта құқықтарын қоса алғанда, адам құқықтарын құрметтеу')],
];
const irTopics = [irResults[0].label,
  t('Санитарно-бытовые условия и качество медицинских осмотров', 'Санитариялық-тұрмыстық жағдайлар және медициналық тексерулердің сапасы'),
  t('Специальная и форменная одежда, средства индивидуальной защиты', 'Арнайы және нысанды киім, жеке қорғаныш құралдары'),
  irResults[2].label, irResults[4].label,
  t('Социальный пакет', 'Әлеуметтік пакет'),
  t('Обучение и корпоративные мероприятия', 'Оқыту және корпоративтік іс-шаралар'), irResults[3].label];

const num = (value: number) => new Intl.NumberFormat('ru-RU').format(value).replaceAll('\u00a0', ' ');
const heading = (title: string, label = '') => `${label ? `<span class="kpEyebrow">${esc(label)}</span>` : ''}<h2>${esc(title)}</h2>`;
const section = (content: string, id: string) => `<section class="kpContentSection kpSocialContent" id="${esc(id)}">${content}</section>`;
const table = (caption: string, rows: {label: string; values: (number | string | null)[]}[], percentage = false) => `<div class="kpSocialTableWrap"><table class="kpSocialTable"><caption>${esc(caption)}</caption><thead><tr><th scope="col">${esc(copy.indicator)}</th><th scope="col">2024</th><th scope="col">2025</th></tr></thead><tbody>${rows.map(row => `<tr><th scope="row">${esc(row.label)}</th>${row.values.map(value => `<td>${value === null ? `<span title="${esc(copy.missing)}">—</span>` : esc(value) + (percentage ? '%' : '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

function renderSrs() {
  return section(`${heading(copy.srsTitle, 'SRS')}<div class="kpSocialProse"><p>${esc(copy.srsIntro)}</p><p>${esc(copy.srsPurpose)}</p><p>${esc(copy.srsPlan)}</p></div>
    <h3>${esc(copy.sample)}</h3><div class="kpSocialStats">${srsParticipation.map(item => `<article><span>${item.year}</span><strong>${num(item.respondents)}</strong><span>${esc(copy.surveyed)}</span><small><span>${esc(copy.share)}</span>: ${item.share}%</small></article>`).join('')}</div><p class="kpSocialSource">${esc(copy.source)}</p>`, 'srs')
    + section(`${heading(copy.dynamics, copy.period)}<p>${esc(copy.scale)}</p><div class="kpSrsCharts">${srsSeries.map(series => `<article class="kpSrsChart" data-series="${series.id}"><h3>${esc(series.title)}</h3><p>${esc(series.description)}</p><ol class="kpSrsBars">${series.values.map((value, index) => `<li><strong>${value === null ? '—' : value + '%'}</strong><span class="kpSrsTrack">${value === null ? `<span class="kpSrsPending" title="${esc(copy.pending)}">…</span>` : `<i style="height:${value}%" aria-hidden="true"></i>`}</span><span>${srsYears[index]}</span></li>`).join('')}</ol><p class="kpSrsInsight">${esc(series.insight)}</p></article>`).join('')}</div><p class="kpSocialSource">${esc(copy.srsSource)}</p>`, 'srs-dynamics');
}

function renderIr() {
  return section(`${heading(copy.irTitle, 'IR')}<p>${esc(copy.irIntro)}</p><div class="kpSocialStats">${irParticipation.map(item => `<article><span>${item.year}</span><strong>${num(item.respondents)}</strong><span>${esc(copy.surveyed)}</span></article>`).join('')}</div><h3>${esc(copy.irTopics)}</h3><ul class="kpSocialList">${irTopics.map(topic => `<li>${esc(topic)}</li>`).join('')}</ul>${table(copy.irResults, irResults, true)}<p class="kpSocialNote">${esc(copy.irNote)}</p><p class="kpSocialSource">${esc(copy.source)}</p>`, 'industrial-relations');
}

export function renderSocialStabilityContent(key: string): string {
  if (key === 'social-stability/research') return renderSrs() + renderIr();
  if (key === 'social-stability/srs') return renderSrs();
  if (key === 'social-stability') return section(`${heading(copy.overview)}<p>${esc(copy.overviewText)}</p><h3>${esc(copy.regulations)}</h3><dl class="kpSocialDefinitions">${regulations.map(([title, text]) => `<div><dt>${esc(title)}</dt><dd>${esc(text)}</dd></div>`).join('')}</dl><p class="kpSocialCoverage"><strong>100%</strong><span>${esc(copy.coverage)}</span></p><p class="kpSocialSource">${esc(copy.coverageNote)}</p>`, 'social-foundation')
    + section(`${heading(copy.activities, '2024–2025')}<p>${esc(copy.activitiesText)}</p>${table(copy.activities, socialActivities)}<p>${esc(copy.meetings)}</p><p class="kpSocialSource">${esc(copy.source)}</p>`, 'social-activities');
  if (key === 'social-stability/appeals') return section(`${heading(copy.appealChannels)}<p>${esc(copy.appealText)}</p><p>${esc(copy.appealResponse)}</p>`, 'appeal-process')
    + section(`${heading(copy.appealAnalytics, '2024–2025')}<div class="kpSocialStats">${appealTotals.map(item => `<article><span>${item.year}</span><strong>${item.total}</strong><span>${esc(copy.appealTotal)}</span><small><span>${esc(copy.appealLabor)}</span>: <b>${item.laborRights}</b></small></article>`).join('')}</div>${table(copy.outcomes, appealOutcomes)}<p class="kpSocialNote">${esc(copy.outcomesNote)}</p><p class="kpSocialSource">${esc(copy.source)}</p>`, 'appeal-statistics');
  return '';
}
