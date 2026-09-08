import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resultEvents,resultSports,resultsTranslations,samruk2024Results,samruk2024Nominations,samruk2025Results,renderResultDetail} from '../app/results-content.ts';

const event=year=>resultEvents.find(item=>item.slug===`samruk-${year}`);
const tally=rows=>[1,2,3].map(place=>rows.filter(row=>row.place===place).length);

test('2024 presentation contributes all 20 KTZ awards and four separate nominations',()=>{
  assert.equal(samruk2024Results.length,20);
  assert.deepEqual(tally(samruk2024Results),[11,6,3]);
  assert.deepEqual(event(2024).medals,{gold:11,silver:6,bronze:3,scope:'reported-total'});
  const tables=event(2024).blocks.filter(block=>block.rows);
  assert.deepEqual(tables.map(block=>block.rows.length),[11,6,3,4]);
  assert.deepEqual(samruk2024Nominations.map(row=>row[0]),['Даулетов Диас','Смагулова Гульжанат','Наурызгазинов Нурым','Аханов Кайраш']);
  assert.equal(samruk2024Results.filter(row=>row.participant==='Сборная ҚТЖ').length,5);
  assert.equal(samruk2024Results.find(row=>row.participant==='Тагыбергенов Еркебулан').place,2);
  assert.equal(samruk2024Results.find(row=>row.participant==='Алимина Татьяна').place,3);
  assert.match(renderResultDetail('sport/results/samruk-2024'),/20:00 24 ноября/);
});

test('2025 includes only the 37 filled KTZ protocol results without inventing missing team placements',()=>{
  assert.equal(samruk2025Results.length,37);
  assert.deepEqual(tally(samruk2025Results),[11,5,7]);
  assert.equal(samruk2025Results.filter(row=>row.place>3).length,14);
  assert.deepEqual(event(2025).medals,{gold:11,silver:8,bronze:9,scope:'reported-total'});
  assert.equal(event(2025).location,'Астана');
  assert.deepEqual(event(2025).blocks.filter(block=>block.rows).map(block=>block.rows.length),[4,4,4,2,2,4,15,2]);
  assert.deepEqual(samruk2025Results.filter(row=>row.discipline===resultSports.tug).map(row=>row.place),[4]);
  assert.deepEqual(samruk2025Results.filter(row=>row.discipline===resultSports.asyk).map(row=>row.place),[2]);
  for(const sport of ['esports','volleyball','basketball','futsal'])assert.ok(!samruk2025Results.some(row=>row.discipline===resultSports[sport]));
  const html=renderResultDetail('sport/results/samruk-2025');
  assert.match(html,/7–10 августа 2025 года/);
  assert.match(html,/не полная расшифровка общекомандных 28 медалей/);
  assert.doesNotMatch(html,/КазМунайГаз|ҚазМұнайГаз|KEGOC|Казатомпром|Қазатомөнеркәсіп|Казахтелеком|\.docx["<]/i);
});

test('Historical names, categories and swimming times retain their own year’s source values',()=>{
  const oldNames=samruk2024Results.map(row=>row.participant);
  const newNames=samruk2025Results.map(row=>row.participant);
  for(const name of ['Лимеренко Константин','Гордиенко Геннадий','Штрошеррер Алла','Насип Сымбат','Женискызы Анель'])assert.ok(oldNames.includes(name));
  for(const name of ['Лимаренко Константин','Гордиенко Генадий','Штрошерер Алла','Нәсіп Сымбат','Жеңісқызы Әнел'])assert.ok(newNames.includes(name));
  const swimmers=samruk2025Results.filter(row=>row.discipline===resultSports.swimming);
  assert.equal(swimmers.filter(row=>row.category.includes('400 м')).length,7);
  assert.equal(swimmers.filter(row=>row.category.includes('200 м')).length,7);
  assert.deepEqual(swimmers.map(row=>row.result),['11:56,48','05:02,56','06:26,31','07:00,91','06:36,10','07:36,33','06:03,65','06:44,82','02:57,58','05:39,85','05:06,34','05:54,75','04:21,70','03:30,18','02:07,83']);
  assert.equal(swimmers.at(-1).category,'Смешанная эстафета MIX');
  assert.doesNotMatch(renderResultDetail('sport/results/samruk-2025'),/4 × 50/);
  assert.deepEqual(samruk2025Results.filter(row=>row.discipline===resultSports.darts).map(row=>row.result),['280','40']);
});

test('Both historical pages share the translated, accessible table renderer on Sites and Vercel',()=>{
  for(const year of [2024,2025]){
    const e=event(year), html=renderResultDetail(`sport/results/samruk-${year}`);
    const staticHtml=readFileSync(new URL(`../vercel-static/sport/results/samruk-${year}/index.html`,import.meta.url),'utf8');
    assert.ok(staticHtml.includes(html));
    for(const block of e.blocks){
      assert.ok(resultsTranslations[block.title]||['Тоғызқұмалақ','Садақ ату'].includes(block.title),block.title);
      for(const paragraph of block.paragraphs??[])assert.ok(resultsTranslations[paragraph],paragraph);
      for(const column of block.columns??[])assert.ok(resultsTranslations[column],column);
      for(const row of block.rows??[])assert.equal(row.length,block.columns.length);
    }
    assert.match(html,/<caption>/);assert.match(html,/scope="col"/);assert.match(html,/scope="row"/);assert.match(html,/tabindex="0"/);
  }
  for(const row of [...samruk2024Results,...samruk2025Results])assert.ok(resultsTranslations[row.category],row.category);
  assert.ok(event(2025).sports.includes('darts'));assert.ok(event(2025).sports.includes('archery'));
});
