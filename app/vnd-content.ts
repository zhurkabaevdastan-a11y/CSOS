// Original documents supplied for publication on 8 September 2026.
export const vndTranslations: Record<string, string> = {};
const t = (ru: string, kk: string) => { vndTranslations[ru] = kk; return ru; };
const esc = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const vndDocuments = [
  {
    id: 'corporate-volunteer-2025', file: '/documents/vnd/corporate-volunteer-2025.pdf',
    category: t('Корпоративное волонтёрство', 'Корпоративтік волонтерлік'),
    title: t('Положение конкурса «Корпоративный волонтер АО «НК «ҚТЖ»', '«ҚТЖ» ҰК» АҚ корпоративтік волонтері» байқауының ережесі'),
    detail: t('Условия участия, номинации и порядок проведения конкурса', 'Байқауға қатысу шарттары, номинациялары және өткізу тәртібі'),
    edition: t('2025 год', '2025 жыл'), pages: 7, size: '197 КБ',
  },
  {
    id: 'children-holidays-487-cz-2020', file: '/documents/vnd/children-holidays-487-cz-2020.pdf',
    category: t('Детский отдых', 'Балалар демалысы'),
    title: t('Правила распределения, выдачи и оплаты путёвок в детские оздоровительные центры', 'Балаларды сауықтыру орталықтарына жолдамаларды бөлу, беру және төлеу қағидасы'),
    detail: t('Порядок предоставления путёвок в АО «НК «ҚТЖ», редакция 3.0', '«ҚТЖ» ҰК» АҚ-да жолдамалар беру тәртібі, 3.0 редакциясы'),
    edition: t('Приказ № 487-ЦЗ от 14 августа 2020 года', '2020 жылғы 14 тамыздағы № 487-ЦЗ бұйрық'), pages: 27, size: '1,75 МБ',
  },
  {
    id: 'young-specialist-498-cz-2024', file: '/documents/vnd/young-specialist-498-cz-2024.pdf',
    category: t('Молодёжная политика', 'Жастар саясаты'),
    title: t('Положение по организации и проведению профессионального конкурса «Жас үздік маман»', '«Жас үздік маман» кәсіби байқауын ұйымдастыру және өткізу бойынша ереже'),
    detail: t('Организация конкурса в АО «НК «ҚТЖ» и его дочерних организациях, редакция 1.0', '«ҚТЖ» ҰК» АҚ мен оның еншілес ұйымдарында байқауды ұйымдастыру, 1.0 редакциясы'),
    edition: t('Приказ № 498-ЦЗ от 11 июля 2024 года', '2024 жылғы 11 шілдедегі № 498-ЦЗ бұйрық'), pages: 22, size: '1,03 МБ',
  },
];
const copy = {
  intro: t('Документы можно открыть в новой вкладке или скачать в исходном формате PDF', 'Құжаттарды жаңа қойындыда ашуға немесе бастапқы PDF форматында жүктеп алуға болады'),
  open: t('Открыть PDF', 'PDF ашу'), download: t('Скачать PDF', 'PDF жүктеп алу'), pages: t('страниц', 'бет'),
};

export function renderVndContent(key: string): string {
  if (key !== 'vnd') return '';
  return `<section class="kpContentSection kpVndContent"><p>${esc(copy.intro)}</p><div class="kpVndDocuments">${vndDocuments.map(doc => `<article id="${doc.id}"><span class="kpEyebrow">${esc(doc.category)}</span><h2>${esc(doc.title)}</h2><p>${esc(doc.detail)}</p><p class="kpVndEdition">${esc(doc.edition)}</p><p class="kpVndMeta"><span>PDF</span><span>${doc.pages} <span>${esc(copy.pages)}</span></span><span>${esc(doc.size)}</span></p><div class="kpVndActions"><a href="${doc.file}" target="_blank" rel="noopener noreferrer"><span>${esc(copy.open)}</span><span aria-hidden="true">↗</span></a><a href="${doc.file}" download="${doc.file.split('/').pop()}"><span>${esc(copy.download)}</span><span aria-hidden="true">↓</span></a></div></article>`).join('')}</div></section>`;
}
