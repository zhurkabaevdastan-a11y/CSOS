// Run with Node's TypeScript stripping: node --experimental-strip-types scripts/sync-social-stability.mjs
// Keep the public static site in sync with the same content used by the app.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { getPageAncestors, pageRedirects, sitePages } from '../app/content.ts';
import { renderSocialStabilityContent, socialStabilityTranslations } from '../app/social-stability-content.ts';
import { renderVndContent, vndTranslations } from '../app/vnd-content.ts';

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const internalHref = (href) => href.startsWith('/') && !href.endsWith('/') ? `${href}/` : href;
const template = readFileSync('vercel-static/social-stability/index.html', 'utf8');
const heroIndex = template.search(/<section class="kpPageHero(?:\s|"|$)/);
if (heroIndex < 0) throw new Error('Missing page hero in social stability template');
const start = template.slice(0, heroIndex);
// Keep the document closing tags and scripts, without the retired bottom navigation.
const endIndex = template.lastIndexOf('</main>');
if (endIndex < 0) throw new Error('Missing closing main tag in social stability template');
const end = template.slice(endIndex);
const intro = (copy) => `<div class="kpSectionTitle"><span>${esc(copy.label)}</span><h2>${esc(copy.title)}</h2><p>${esc(copy.text)}</p></div>`;
const breadcrumbs = (key) => `<div class="kpBreadcrumbs"><a href="/">Главная</a><span>•</span>${getPageAncestors(key).map((parent) => `<span class="kpBreadcrumbItem"><a href="${internalHref(parent.path)}">${esc(parent.title)}</a><span>•</span></span>`).join('')}<b>${esc(sitePages[key].title)}</b></div>`;

const generatedPages = ['vnd', 'social-stability', 'social-stability/research', 'social-stability/srs', 'social-stability/appeals', 'social-projects', 'volunteering', 'volunteering/esg'];
for (const key of generatedPages) {
  const page = sitePages[key];
  const head = start.replace(/<title>.*?<\/title>/, `<title>${esc(page.title)} — Все о социальной политике ҚТЖ</title>`).replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.lead)}">`);
  const socialContent = renderSocialStabilityContent(key) || renderVndContent(key);
  let body = `<section class="kpPageHero${socialContent ? ' kpPageHero--social' : ''}">${breadcrumbs(key)}<span class="kpEyebrow">${esc(page.eyebrow)}</span><h1>${esc(page.title)}</h1><p>${esc(page.lead)}</p>${socialContent ? '' : `<div class="kpHeroVisual kpHeroVisual--${key.split('/')[0]}"><span>ҚТЖ</span><i></i></div>`}</section>`;
  if (page.panels) {
    body += `<section class="kpContentSection">${intro(page.panelsIntro ?? { label: 'Главное', title: 'Работа по направлению', text: 'Основные задачи и приоритеты социальной политики' })}<div class="kpInfoGrid${page.panels.length === 2 ? ' kpInfoGrid--two' : ''}">`;
    body += page.panels.map((panel, index) => `<article><span>${esc(panel.label)}</span><strong>0${index + 1}</strong><h3>${esc(panel.title)}</h3><p>${esc(panel.text)}</p>${panel.notice ? `<p class="kpDataNotice">${esc(panel.notice)}</p>` : ''}</article>`).join('');
    body += `</div>${page.source ? `<p class="kpContentSource"><a href="${esc(page.source.href)}" target="_blank" rel="noreferrer"><span>${esc(page.source.label)}</span> ↗</a></p>` : ''}</section>`;
  }
  if (page.cards) {
    body += `<section class="kpContentSection">${intro(page.cardsIntro ?? { label: 'Направления', title: 'Выберите подраздел', text: 'Каждый подраздел открывается на отдельной странице' })}<div class="kpPageCards${page.cards.length === 2 ? ' kpPageCards--two' : ''}">`;
    body += page.cards.map((card) => `<a href="${esc(internalHref(card.href))}"${card.external ? ' target="_blank" rel="noreferrer"' : ''}><span>${esc(card.tag)}</span><h3>${esc(card.title)}</h3><p>${esc(card.text)}</p><i>↗</i></a>`).join('');
    body += '</div></section>';
  }
  mkdirSync(`vercel-static/${key}`, { recursive: true });
  writeFileSync(`vercel-static/${key}/index.html`, head + body + socialContent + end);
}
// Preserve existing event content while updating its logical parent trail.
for (const key of Object.keys(sitePages).filter((key) => key.startsWith('volunteering/') && !generatedPages.includes(key))) {
  const path = `vercel-static/${key}/index.html`;
  const html = readFileSync(path, 'utf8');
  if (!html.includes('<div class="kpBreadcrumbs">')) throw new Error(`Missing breadcrumbs: ${key}`);
  writeFileSync(path, html.replace(/<div class="kpBreadcrumbs">[\s\S]*?<\/div>/, breadcrumbs(key)));
}
for (const [from, to] of Object.entries(pageRedirects)) {
  mkdirSync(`vercel-static/${from}`, { recursive: true });
  const target = internalHref(to);
  writeFileSync(`vercel-static/${from}/index.html`, `<!doctype html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ESG — Все о социальной политике ҚТЖ</title><meta http-equiv="refresh" content="0;url=${esc(target)}"><link rel="canonical" href="${esc(target)}"></head><body><a href="${esc(target)}">ESG →</a></body></html>`);
}
// Keep this bounded content dictionary in both language bundles, without touching the translator.
const languagePath = 'public/language.js';
let language = readFileSync(languagePath, 'utf8').replace(/    \/\/ Social stability data translations start\n[\s\S]*?    \/\/ Social stability data translations end\n/, '');
if (!language.includes('  const kk = {\n')) throw new Error('Missing Kazakh language dictionary');
const translationLines = Object.entries({...socialStabilityTranslations, ...vndTranslations}).map(([ru, kk]) => `    ${JSON.stringify(ru)}: ${JSON.stringify(kk)},`).join('\n');
language = language.replace('  const kk = {\n', `  const kk = {\n    // Social stability data translations start\n${translationLines}\n    // Social stability data translations end\n`);
writeFileSync(languagePath, language);
for (const [source, destination] of [['app/globals.css', 'vercel-static/app.css'], ['public/language.js', 'vercel-static/language.js']]) {
  writeFileSync(destination, readFileSync(source));
}
const homePath = 'vercel-static/index.html';
writeFileSync(homePath, readFileSync(homePath, 'utf8')
  .replace('SRS, ESG и система работы с жалобами и обращениями', 'Исследования и опросы, информация по жалобам и обращениям')
  .replace('<a href="/volunteering/"><span>07</span><strong>Волонтёрство</strong><p>Школа волонтёрства, лучшие волонтёры и акция «Таза Қазақстан»</p><i>ВЛ</i>', '<a href="/social-projects/"><span>07</span><strong>Социальные проекты</strong><p>Волонтёрство и социальные инициативы работников ҚТЖ</p><i>СЦ</i>'));
console.log('Social sections: pages, parent navigation, legacy links and translations synchronized');
