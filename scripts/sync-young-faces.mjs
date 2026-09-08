// Generate the same fourth-cohort pages for the Vercel mirror and the Sites runtime.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { getPageAncestors } from '../app/content.ts';
import { youngFacesPages, youngFacesTranslations, renderYoungFacesContent } from '../app/young-faces-content.ts';
import { youngFacesCandidates } from '../app/young-faces-candidates.ts';
const esc = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const template = readFileSync('vercel-static/social-stability/index.html', 'utf8');
const heroIndex = template.search(/<section class="kpPageHero(?:\s|"|$)/);
const endIndex = template.lastIndexOf('</main>');
if (heroIndex < 0 || endIndex < 0) throw new Error('Missing shared page shell');
for (const [key,page] of Object.entries(youngFacesPages)) {
  const head = template.slice(0,heroIndex).replace(/<title>.*?<\/title>/, `<title>${esc(page.title)} — Все о социальной политике ҚТЖ</title>`).replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(page.lead)}">`);
  const crumbs = `<div class="kpBreadcrumbs"><a href="/">Главная</a><span>•</span>${getPageAncestors(key).map(parent => `<span class="kpBreadcrumbItem"><a href="${parent.path}/">${esc(parent.title)}</a><span>•</span></span>`).join('')}<b>${esc(page.title)}</b></div>`;
  const body = `<section class="kpPageHero kpPageHero--program kpPageHero--young">${crumbs}<span class="kpEyebrow">${esc(page.eyebrow)}</span><h1>${esc(page.title)}</h1><p>${esc(page.lead)}</p></section>${renderYoungFacesContent(key,youngFacesCandidates)}`;
  mkdirSync(`vercel-static/${key}`, {recursive:true});
  writeFileSync(`vercel-static/${key}/index.html`,head+body+template.slice(endIndex));
}
let language = readFileSync('public/language.js','utf8').replace(/    \/\/ Young faces stage translations start\n[\s\S]*?    \/\/ Young faces stage translations end\n/, '');
const dictionary = /  const kk = \{[\s\S]*?\n  \};/;
if (!dictionary.test(language)) throw new Error('Missing Kazakh dictionary');
const entries = Object.entries(youngFacesTranslations).map(([ru,kk])=>`    ${JSON.stringify(ru)}: ${JSON.stringify(kk)},`).join('\n');
language = language.replace(dictionary,match=>{
  const prefix = match.replace(/\n  \};$/,'').trimEnd();
  return `${prefix}${prefix.endsWith(',')?'':','}\n    // Young faces stage translations start\n${entries}\n    // Young faces stage translations end\n  };`;
});
writeFileSync('public/language.js',language);
writeFileSync('vercel-static/language.js',language);
writeFileSync('vercel-static/app.css',readFileSync('app/globals.css'));
console.log(`Fourth cohort synchronized: ${Object.keys(youngFacesPages).length} pages, Russian and Kazakh`);
