// Synchronize the 2026 marathon update with the separately hosted static site.
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'vercel-static/sport/marathon-registration/index.html';
let html = readFileSync(path, 'utf8');
const replacements = [
  ['К участию допускаются не более 600 человек.', 'Общий лимит — 500 участников, в том числе не более 100 иногородних'],
  ['https://chat.whatsapp.com/B5InlZWFveAFozbG4cojZz', 'https://chat.whatsapp.com/CWZZEGUEsre9SwFCeRYVNr?s=cl&amp;p=i&amp;mlu=4'],
  ['Забеги проходят на дистанциях 2,5 км, 5 км и 10 км. Точная схема движения будет опубликована организаторами перед стартом.', '1 круг — 2,5 км, 2 круга — 5 км, 4 круга — 10 км'],
];
for (const [before, after] of replacements) {
  if (!html.includes(before) && !html.includes(after)) throw new Error(`Missing marathon content: ${before}`);
  html = html.replaceAll(before, after);
}
const anchor = '<p>При получении стартового номера необходимо предоставить расписку о личной ответственности за состояние здоровья.</p>';
const download = '<a class="kpMarathonDownload" href="/documents/marathon-2026-waiver-kz-ru.docx" download="Расписка каз-рус.docx"><span>Скачать расписку</span><span aria-hidden="true">↓</span><small>DOCX · қазақша / русский</small></a>';
if (!html.includes('class="kpMarathonDownload"')) {
  if (!html.includes(anchor)) throw new Error('Missing marathon health section');
  html = html.replace(anchor, anchor + download);
}
const map = '<section class="kpContentSection kpMarathonMap" id="marathon-route-map" aria-labelledby="marathon-map-title"><h2 id="marathon-map-title">Карта забега</h2><a class="kpMarathonMapImage" href="/sports/marathon-2026-route.jpg" target="_blank" rel="noopener noreferrer" aria-label="Открыть карту забега в полном размере"><img src="/sports/marathon-2026-route.jpg" width="1280" height="824" alt="Карта марафона ҚТЖ 2026: круг 2,5 км, направление движения, старт, финиш и стартовый городок" loading="lazy" decoding="async" /></a><div class="kpMarathonMapActions"><a href="/sports/marathon-2026-route.jpg" target="_blank" rel="noopener noreferrer"><span>Открыть карту крупнее</span><span aria-hidden="true">↗</span></a><a href="/sports/marathon-2026-route.jpg" download="marathon-qtj-2026-route.jpg"><span>Скачать карту</span><span aria-hidden="true">↓</span></a></div></section>';
if (html.includes('id="marathon-route-map"')) {
  html = html.replace(/<section class="kpContentSection kpMarathonMap"[\s\S]*?<\/section>/, map);
} else {
  const conditions = '<section class="kpContentSection kpMarathonConditions">';
  if (!html.includes(conditions)) throw new Error('Missing marathon conditions section');
  html = html.replace(conditions, map + conditions);
}
writeFileSync(path, html);
for (const [source, destination] of [['app/globals.css', 'vercel-static/app.css'], ['public/language.js', 'vercel-static/language.js']]) {
  writeFileSync(destination, readFileSync(source));
}
console.log('Marathon details, route map and downloads synchronized');
