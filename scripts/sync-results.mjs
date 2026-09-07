// Generate the same results content for Vercel's static output and Sites.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {getPageAncestors,samruk2026Placements,samruk2026Nominations} from '../app/content.ts';
import {resultsPages,resultsTranslations,resultsPhoto,renderResultsIndex,renderResultDetail} from '../app/results-content.ts';
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const template=readFileSync('vercel-static/social-stability/index.html','utf8');
const heroIndex=template.search(/<section class="kpPageHero(?:\s|"|$)/);
const endIndex=template.lastIndexOf('</main>');
if(heroIndex<0||endIndex<0) throw new Error('Missing shared page shell');
const start=template.slice(0,heroIndex),end=template.slice(endIndex);
for(const [key,page] of Object.entries(resultsPages)){
  const head=start.replace(/<title>.*?<\/title>/,`<title>${esc(page.title)} — Все о социальной политике ҚТЖ</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(page.lead)}">`);
  const ancestors=getPageAncestors(key).map(parent=>`<span class="kpBreadcrumbItem"><a href="${parent.path}/">${esc(parent.title)}</a><span>•</span></span>`).join('');
  const hero=`<section class="kpPageHero kpPageHero--results"><div class="kpBreadcrumbs"><a href="/">Главная</a><span>•</span>${ancestors}<b>${esc(page.title)}</b></div><span class="kpEyebrow">${esc(page.eyebrow)}</span><h1>${esc(page.title)}</h1><p>${esc(page.lead)}</p></section>`;
  const content=key==='sport/results'?renderResultsIndex():renderResultDetail(key,{placements:samruk2026Placements,nominations:samruk2026Nominations});
  const scripts=key==='sport/results'?'<script defer src="/results-filters.js"></script>':'';
  mkdirSync(`vercel-static/${key}`,{recursive:true});
  writeFileSync(`vercel-static/${key}/index.html`,head+hero+content+scripts+end);
}
let language=readFileSync('public/language.js','utf8').replace(/    \/\/ Results translations start\n[\s\S]*?    \/\/ Results translations end\n/,'');
const dictionary=/  const kk = \{[\s\S]*?\n  \};/;
if(!dictionary.test(language)) throw new Error('Missing Kazakh dictionary');
const entries=Object.entries(resultsTranslations).map(([ru,kk])=>`    ${JSON.stringify(ru)}: ${JSON.stringify(kk)},`).join('\n');
language=language.replace(dictionary,match=>{
  const prefix=match.replace(/\n  \};$/,'').trimEnd();
  return `${prefix}${prefix.endsWith(',')?'':','}\n    // Results translations start\n${entries}\n    // Results translations end\n  };`;
});
writeFileSync('public/language.js',language);
mkdirSync('vercel-static/sports',{recursive:true});
writeFileSync(`vercel-static${resultsPhoto.src}`,readFileSync(`public${resultsPhoto.src}`));
for(const [source,target] of [['public/language.js','vercel-static/language.js'],['public/results-filters.js','vercel-static/results-filters.js'],['app/globals.css','vercel-static/app.css']])writeFileSync(target,readFileSync(source));
console.log(`Results synchronized: ${Object.keys(resultsPages).length} pages`);
