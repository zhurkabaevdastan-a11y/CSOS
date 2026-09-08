import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {resultEvents,resultsPages,resultsTranslations,resultsPhoto,renderResultsIndex,renderResultDetail,ski2026Rows,marathon2026Rows,marathon2025Rows,swim2025Rows,samruk2026Results} from '../app/results-content.ts';
import {sitePages,getPageAncestors,samruk2026Placements,samruk2026Nominations} from '../app/content.ts';
const read=path=>readFileSync(new URL(`../${path}`,import.meta.url),'utf8');
const event=slug=>resultEvents.find(item=>item.slug===slug);
const tally=(rows,col)=>[1,2,3].map(place=>rows.filter(row=>row[col]===place).length);
const legacy={placements:samruk2026Placements,nominations:samruk2026Nominations};

test('The supplied team photo appears once above the index filters, without cropping or repetition on details',()=>{
  const index=renderResultsIndex();
  assert.equal(index.split(`src="${resultsPhoto.src}"`).length-1,1);
  assert.ok(index.indexOf('kpResultsHeroPhoto')<index.indexOf('kpResultsFilters'));
  assert.match(index,/width="1280" height="853"/);
  assert.ok(index.includes(`alt="${resultsPhoto.alt}"`));
  assert.equal(resultsTranslations[resultsPhoto.alt],'Марапаттау рәсімінде кубокпен тұрған ҚТЖ құрамасы');
  for(const e of resultEvents)assert.ok(!renderResultDetail(`sport/results/${e.slug}`,legacy).includes(resultsPhoto.src));
  assert.match(read('app/globals.css'),/\.kpResultsHeroPhoto img\{[^}]*height:auto;object-fit:contain/);
  const original=readFileSync(new URL(`../public${resultsPhoto.src}`,import.meta.url));
  assert.equal(original.length,332331);
  assert.deepEqual(original.subarray(0,3),Buffer.from([0xff,0xd8,0xff]));
  assert.deepEqual(original,readFileSync(new URL(`../vercel-static${resultsPhoto.src}`,import.meta.url)));
});

test('Nine handoff events and the previous QYZMET CUP remain unique and newest first',()=>{
  assert.equal(resultEvents.length,10);
  assert.equal(new Set(resultEvents.map(e=>e.slug)).size,10);
  assert.deepEqual(resultEvents.filter(e=>e.sourceSection!==null).map(e=>e.sourceSection).sort((a,b)=>a-b),[1,2,3,4,5,6,7,8,9]);
  assert.deepEqual(resultEvents.map(e=>e.year),[2026,2026,2026,2026,2025,2025,2025,2025,2025,2024]);
  assert.ok(event('qyzmet-cup-2025'));
  assert.ok(!resultEvents.some(e=>e.slug==='marathon-registration'));
  for(const e of resultEvents){
    const key=`sport/results/${e.slug}`;
    assert.deepEqual(sitePages[key],resultsPages[key]);
    assert.equal(getPageAncestors(key).at(-1).path,'/sport/results');
    assert.ok(e.sources.length>0);
    for(const source of e.sources)assert.equal(new URL(source.href).protocol,'https:');
  }
});
test('The Antalya tournament uses the user-confirmed International Corporate Cup 2025 name and year',()=>{
  const cup=event('corporate-football-cup-2025');
  assert.equal(cup.title,'International Corporate Cup 2025');
  assert.equal(cup.year,2025);
  assert.equal(cup.location,'Анталья');
  assert.equal(cup.teamPlace,1);
  assert.equal(resultsTranslations[cup.title],cup.title);
  const key=`sport/results/${cup.slug}`;
  assert.equal(resultsPages[key].title,cup.title);
  assert.equal(resultsPages[key].eyebrow,'2025 · Анталья');
  assert.match(renderResultsIndex(),/href="\/sport\/results\/corporate-football-cup-2025\/" data-result-year="2025"/);
  assert.match(renderResultDetail(key),/International Corporate Cup 2025 в Анталье/);
  assert.match(read(`vercel-static/${key}/index.html`),/<h1>International Corporate Cup 2025<\/h1>/);
  assert.doesNotMatch(read(`vercel-static/${key}/index.html`),/International Corporate Cup 2026/);
  assert.equal(event('iron-friendship-2026').title,'Международный турнир «Железная дружба»');
});
test('Participant tables, category places and medal totals reconcile',()=>{
  assert.equal(ski2026Rows.length,15);assert.deepEqual(tally(ski2026Rows,3),[6,5,4]);
  assert.equal(marathon2026Rows.length,14);assert.deepEqual(tally(marathon2026Rows,3),[7,4,3]);
  assert.equal(marathon2025Rows.length,10);assert.deepEqual(tally(marathon2025Rows,3),[4,2,4]);
  assert.equal(swim2025Rows.length,8);assert.deepEqual(tally(swim2025Rows,2),[7,0,1]);
  for(const [slug,total]of[['samruk-2026',27],['samruk-2025',28],['samruk-2024',20],['charity-marathon-2025',10]]){
    const medals=event(slug).medals;assert.equal(medals.gold+medals.silver+medals.bronze,total);assert.equal(medals.scope,'reported-total');
  }
  assert.equal(event('charity-marathon-2026').medals.scope,'listed-results');
  assert.equal(event('swimming-masters-2025').teamPlace,null);
  assert.equal(event('winter-samruk-2026').teamPlace,null);
  assert.equal(event('winter-samruk-2026').medals,undefined);
});
test('Corrected names, missing times and category labels retain the supplied meaning',()=>{
  assert.ok(ski2026Rows.some(row=>row[0]==='Бекешов Руслан'));
  assert.ok(ski2026Rows.some(row=>row[0]==='Бадртдинова Лилия'));
  assert.ok(marathon2026Rows.some(row=>row[0]==='Бекешов Руслан'));
  assert.equal(marathon2026Rows.find(row=>row[0]==='Жамашова Роза')[4],null);
  assert.equal(marathon2026Rows.filter(row=>row[2]==='Абсолютная').length,2);
  assert.equal(ski2026Rows[0][4],'03:24,3');
  const marathon=renderResultDetail('sport/results/charity-marathon-2026');
  assert.match(marathon,/Не указано/);assert.match(marathon,/не полный протокол/);
  assert.doesNotMatch(marathon,/Бекешев|4 мая|19 сентября|<iframe|<img|00:00:00/);
  assert.match(renderResultDetail('sport/results/swimming-masters-2025'),/а не отдельной сборной/);
});
test('Static output matches shared renderers, with readable tables and consolidated XI awards',()=>{
  for(const key of Object.keys(resultsPages)){
    const html=read(`vercel-static/${key}/index.html`);
    const content=key==='sport/results'?renderResultsIndex():renderResultDetail(key,legacy);
    assert.ok(html.includes(content),key);
    assert.doesNotMatch(html,/kpFooter|kpRelated|kpHeroVisual|kpSportPhoto|Раздел наполняется/);
    if(content.includes('<table>')){
      assert.match(content,/<caption>/);assert.match(content,/scope="col"/);assert.match(content,/scope="row"/);assert.match(content,/tabindex="0"/);
    }
  }
  const xi=renderResultDetail('sport/results/samruk-2026',legacy);
  assert.doesNotMatch(xi,/Отдельные результаты команды|Распределение призовых мест по дисциплинам/);
  for(const row of samruk2026Results)assert.ok(xi.includes(row.participant));
  for(const nomination of samruk2026Nominations)assert.ok(xi.includes(nomination));
  assert.match(read('app/globals.css'),/\.kpResultsTable\{[^}]*overflow-x:auto/);
  assert.match(read('app/globals.css'),/\.kpResultsIndex \[hidden\]\{display:none!important\}/);
});
test('All 27 supplied XI Instagram posts map once to 9 gold, 13 silver and 5 bronze awards',()=>{
  const supplied=['Db23e8SK0H2','Db23EgIq3HM','Db2xVokKnXk','Db2vqDOqncG','Db2q62rKEya','Db2WXvIKC7W','Db0QNboqkON','Db0gxX0qZ2l','Db0NBkVqiPG','Db0A1kjqgiq','Db0AkphKFd5','Dbz8jRDqYs6','Dbz5QWnquZM','DbzzBYzqK-O','Dbzywgnq4U3','DbzyRmkqmpo','DbzyDUUKuFg','Dbx6iRCK_db','Dbx3fZBqKtV','DbxkUJlKU_m','DbxehuyK1O3','DbxbAS5q-A2','DbxZu2pqX2i','DbxSpgQKsTn','DbxRVw7K77D','DbxDPmwK61L','Dbw6e-LKHs9'];
  assert.equal(samruk2026Results.length,27);
  assert.deepEqual([1,2,3].map(place=>samruk2026Results.filter(row=>row.place===place).length),[9,13,5]);
  assert.deepEqual(samruk2026Results.map(row=>new URL(row.source).pathname.split('/')[2]).sort(),supplied.sort());
  assert.equal(new Set(samruk2026Results.map(row=>row.source)).size,27);
  assert.equal(event('samruk-2026').blocks.flatMap(block=>block.awards??[]).length,27);
  const html=renderResultDetail('sport/results/samruk-2026',legacy);
  assert.equal((html.match(/data-samruk-place=/g)||[]).length,27);
  assert.equal((html.match(/class="kpResultsTable kpSamrukTable"/g)||[]).length,3);
  assert.match(html,/Сымбат Нәсіп/);assert.match(html,/Әли Исабеков/);assert.match(html,/Әнел Жеңісқызы/);
  assert.match(html,/победа над KEGOC — 5:0/);
  assert.match(html,/4 × 50 м/);
  assert.equal(samruk2026Results.find(row=>row.source.includes('Dbw6e-LKHs9')).organization.split(', ').length,4);
  assert.match(read('app/globals.css'),/\.kpSamrukTable table\{min-width:0;table-layout:fixed\}/);
  for(const row of samruk2026Results){
    assert.equal(new URL(row.source).hostname,'www.instagram.com');
    assert.ok(!row.source.includes('?'));
    assert.ok(html.includes(`href="${row.source}" target="_blank" rel="noopener noreferrer"`));
  }
});
test('Filters combine independent criteria, support empty state and reset without reloads',()=>{
  const values={year:{value:''},sport:{value:''},category:{value:''}};
  const listeners={};const count={textContent:''},empty={hidden:true};
  const cards=resultEvents.map(e=>({dataset:{resultYear:String(e.year),resultSports:e.sports.join(' '),resultCategory:e.category},hidden:false}));
  const form={elements:{namedItem:name=>values[name]},hidden:true,addEventListener:(name,fn)=>listeners[name]=fn};
  const root={dataset:{},querySelector:selector=>({'form':form,'[data-results-count]':count,'[data-results-empty]':empty}[selector]),querySelectorAll:()=>cards};
  vm.runInNewContext(read('public/results-filters.js'),{document:{readyState:'complete',querySelector:()=>root},setTimeout:fn=>fn()});
  assert.equal(form.hidden,false);assert.equal(count.textContent,'10');
  values.year.value='2025';listeners.change();assert.equal(count.textContent,'5');
  assert.equal(cards[resultEvents.findIndex(e=>e.slug==='corporate-football-cup-2025')].hidden,false);
  values.year.value='2026';listeners.change();assert.equal(count.textContent,'4');
  assert.equal(cards[resultEvents.findIndex(e=>e.slug==='corporate-football-cup-2025')].hidden,true);
  values.sport.value='skiing';listeners.change();assert.equal(count.textContent,'1');
  values.category.value='charity';listeners.change();assert.equal(count.textContent,'0');assert.equal(empty.hidden,false);
  for(const input of Object.values(values))input.value='';listeners.reset();assert.equal(count.textContent,'10');assert.equal(empty.hidden,true);
  values.sport.value='swimming';listeners.change();assert.ok(cards.some(c=>c.dataset.resultSports.includes('multisport')&&!c.hidden));
  let prevented=false;listeners.submit({preventDefault:()=>prevented=true});assert.equal(prevented,true);
});
test('Results translations and browser assets are identical for both site variants',()=>{
  const dict=vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  for(const [ru,kk]of Object.entries(resultsTranslations))assert.equal(dict[ru],kk,ru);
  assert.equal(read('public/language.js'),read('vercel-static/language.js'));
  assert.equal(read('public/results-filters.js'),read('vercel-static/results-filters.js'));
  assert.equal(read('app/globals.css'),read('vercel-static/app.css'));
  assert.doesNotMatch(read('public/results-filters.js'),/fetch\(|localStorage|innerHTML/);
});
