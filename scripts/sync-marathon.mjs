// Synchronize the 2026 marathon update with the separately hosted static site.
import { readFileSync, writeFileSync } from 'node:fs';

const path = 'vercel-static/sport/marathon-registration/index.html';
let html = readFileSync(path, 'utf8');
const replacements = [
  ['К участию допускаются не более 600 человек.', 'Общий лимит — 500 участников, в том числе не более 100 иногородних'],
  ['https://chat.whatsapp.com/B5InlZWFveAFozbG4cojZz', 'https://chat.whatsapp.com/CWZZEGUEsre9SwFCeRYVNr?s=cl&amp;p=i&amp;mlu=4'],
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
writeFileSync(path, html);
for (const [source, destination] of [['app/globals.css', 'vercel-static/app.css'], ['public/language.js', 'vercel-static/language.js']]) {
  writeFileSync(destination, readFileSync(source));
}
console.log('Marathon details and download synchronized');
