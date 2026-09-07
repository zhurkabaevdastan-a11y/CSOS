// node --experimental-strip-types scripts/sync-program-content.mjs
// Synchronize only the routes affected by the supplied programme workbook.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { getPageAncestors, sitePages } from '../app/content.ts';
import { programPages, programTranslations, renderProgramContent } from '../app/program-content.ts';
const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const href = (path) => path === '/' || path.endsWith('/') ? path : path + '/';
const template = readFileSync('vercel-static/social-stability/index.html', 'utf8');
const heroIndex = template.search(/<section class="kpPageHero(?:\s|"|$)/);
const endIndex = template.lastIndexOf('</main>');
if (heroIndex < 0 || endIndex < 0) throw new Error('Missing shared page shell');
const start = template.slice(0, heroIndex);
const end = template.slice(endIndex);
const breadcrumbs = (key) => `<div class="kpBreadcrumbs"><a href="/">Главная</a><span>•</span>${getPageAncestors(key).map(parent => `<span class="kpBreadcrumbItem"><a href="${href(parent.path)}">${esc(parent.title)}</a><span>•</span></span>`).join('')}<b>${esc(sitePages[key].title)}</b></div>`;
for (const [key, page] of Object.entries(programPages)) {
  const head = start.replace(/<title>.*?<\/title>/, `<title>${esc(page.title)} — Все о социальной политике ҚТЖ</title>`).replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.lead)}">`);
  let body = `<section class="kpPageHero kpPageHero--program">${breadcrumbs(key)}<span class="kpEyebrow">${esc(page.eyebrow)}</span><h1>${esc(page.title)}</h1><p>${esc(page.lead)}</p></section>${renderProgramContent(key)}`;
  if (page.cards) {
    body += `<section class="kpContentSection"><div class="kpSectionTitle"><span>Направления</span><h2>Выберите подраздел</h2><p>Каждый подраздел открывается на отдельной странице</p></div><div class="kpPageCards${page.cards.length === 2 ? ' kpPageCards--two' : ''}">${page.cards.map(card => `<a href="${href(card.href)}"><span>${esc(card.tag)}</span><h3>${esc(card.title)}</h3><p>${esc(card.text)}</p><i>↗</i></a>`).join('')}</div></section>`;
  }
  mkdirSync(`vercel-static/${key}`, { recursive: true });
  writeFileSync(`vercel-static/${key}/index.html`, head + body + end);
}
const volunteeringPath = 'vercel-static/volunteering/index.html';
const oldCard = 'Истории сотрудников, которые меняют мир рядом';
const newCard = 'Ежегодный конкурс «Корпоративный волонтёр»: цели и пять номинаций';
let volunteering = readFileSync(volunteeringPath, 'utf8');
if (!volunteering.includes(oldCard) && !volunteering.includes(newCard)) throw new Error('Missing volunteer contest card');
volunteering = volunteering.replace(oldCard, newCard).replace('<span>Люди</span><h3>Лучший волонтёр</h3>', '<span>Конкурс</span><h3>Лучший волонтёр</h3>');
writeFileSync(volunteeringPath, volunteering);
// Preserve old detail URLs, updating only their parent breadcrumbs.
for (const key of Object.keys(sitePages).filter(key => key.startsWith('volunteering/best-2026/'))) {
  const path = `vercel-static/${key}/index.html`;
  const html = readFileSync(path, 'utf8');
  writeFileSync(path, html.replace(/<div class="kpBreadcrumbs">[\s\S]*?<\/div>/, breadcrumbs(key)));
}
let language = readFileSync('public/language.js', 'utf8').replace(/    \/\/ Programme workbook translations start\n[\s\S]*?    \/\/ Programme workbook translations end\n/, '');
const dictionary = /  const kk = \{[\s\S]*?\n  \};/;
if (!dictionary.test(language)) throw new Error('Missing Kazakh dictionary');
const entries = Object.entries(programTranslations).map(([ru, kk]) => `    ${JSON.stringify(ru)}: ${JSON.stringify(kk)},`).join('\n');
language = language.replace(dictionary, match => {
  const prefix = match.replace(/\n  \};$/, '').trimEnd();
  return `${prefix}${prefix.endsWith(',') ? '' : ','}\n    // Programme workbook translations start\n${entries}\n    // Programme workbook translations end\n  };`;
});
writeFileSync('public/language.js', language);
for (const [source, destination] of [['app/globals.css', 'vercel-static/app.css'], ['public/language.js', 'vercel-static/language.js']]) writeFileSync(destination, readFileSync(source));
console.log('Programme content synchronized: nine routes, parent links and Kazakh copy');
