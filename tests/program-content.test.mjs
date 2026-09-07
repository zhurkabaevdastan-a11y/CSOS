import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { getPageAncestors, sitePages, youngFacesApplicationUrl } from '../app/content.ts';
import { programPages, programContent, programTranslations, renderProgramContent } from '../app/program-content.ts';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const combined = key => programPages[key].lead + renderProgramContent(key);

test('All eight source rows are mapped to their designated pages', () => {
  assert.deepEqual(Object.values(programContent).map(item => item.sourceCell), ['D5','D6','D7','D8','D9','D10','D11','D12']);
  for (const key of Object.keys(programPages)) {
    assert.deepEqual(sitePages[key], programPages[key]);
    const html = read(`vercel-static/${key}/index.html`);
    assert.ok(html.includes(renderProgramContent(key)), key);
    assert.ok(!html.includes('Раздел наполняется'), key);
    assert.ok(!html.includes('Прикрепить Положение'), key);
    assert.ok(!html.includes('kpHeroVisual'), key);
    assert.ok(!html.includes('kpFooter'), key);
  }
});
test('Participation conditions, dates and counts preserve the supplied meaning', () => {
  assert.ok(combined('youth/representatives').includes('до 35 лет включительно'));
  const specialist = combined('youth/young-specialist');
  for (const value of ['до 35 лет', 'не менее 1 года', 'Отсутствие действующих дисциплинарных взысканий', 'Региональный этап', 'Республиканский этап', 'ежегодно']) assert.ok(specialist.includes(value), value);
  assert.ok(combined('youth/young-faces').includes('2019'));
  assert.ok(combined('youth/kvn').includes('2010'));
  assert.ok(combined('youth/forum').includes('более 200'));
  const summer = combined('children/summer-holidays');
  for (const value of ['от 7 до 13 лет включительно', '90%', '10%', 'заработной платы', 'обратно', 'медицинское сопровождение']) assert.ok(summer.includes(value), value);
  assert.equal(programContent['children/events'].sections[0].items.length, 5);
  assert.equal(programContent['volunteering/best-2026'].sections[1].items.length, 5);
});
test('Child subsections and existing programme navigation remain available', () => {
  assert.deepEqual(sitePages.children.cards.map(card => card.href), ['/children/summer-holidays','/children/events']);
  for (const key of ['children/summer-holidays','children/events']) assert.deepEqual(getPageAncestors(key).map(page => page.path), ['/children']);
  assert.equal(sitePages['youth/young-faces'].cards[0].href, '/youth/young-faces/fourth-cohort');
  assert.ok(youngFacesApplicationUrl.startsWith('https://'));
  assert.ok(sitePages['volunteering/esg']);
  for (const key of ['community','ecology','mentoring']) assert.ok(sitePages[`volunteering/best-2026/${key}`]);
  assert.equal(sitePages.youth.cards.length, 6);
});
test('All new copy has Kazakh translations and bundles are synchronized', () => {
  const dictionary = vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  for (const [ru, kk] of Object.entries(programTranslations)) assert.equal(dictionary[ru], kk, ru);
  assert.equal(read('public/language.js'), read('vercel-static/language.js'));
  assert.equal(read('app/globals.css'), read('vercel-static/app.css'));
});
