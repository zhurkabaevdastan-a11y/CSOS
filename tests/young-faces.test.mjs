import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { getPageAncestors, sitePages, youngFacesApplicationUrl } from '../app/content.ts';
import { cohortKey, cohortPath, candidatesKey, youngFacesPages, selectionStages, youngFacesTranslations, renderYoungFacesContent as renderContent } from '../app/young-faces-content.ts';
import { youngFacesCandidates } from '../app/young-faces-candidates.ts';
const read = path => readFileSync(new URL(`../${path}`, import.meta.url),'utf8');
const renderYoungFacesContent = key => renderContent(key,youngFacesCandidates);
const dictionary = vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);

test('All eight stages are real pages and preserve the cohort hierarchy', () => {
  assert.equal(selectionStages.length,8);
  const html = renderYoungFacesContent(cohortKey);
  for(const stage of selectionStages) {
    assert.ok(html.includes(`href="${stage.path}/"`));
    assert.deepEqual(sitePages[stage.key],youngFacesPages[stage.key]);
    assert.equal(getPageAncestors(stage.key).at(-1).path,cohortPath);
  }
  assert.equal(getPageAncestors(candidatesKey).at(-1).path,`${cohortPath}/stage-2`);
  assert.ok(!html.includes('<article'));
  assert.ok(!html.includes('Подать заявку'));
  assert.equal(youngFacesApplicationUrl,'https://forms.cloud.microsoft/r/mXpaWCRuek');
  assert.ok(renderYoungFacesContent(`${cohortKey}/stage-1`).includes('завершено'));
});

test('Stage 2 preserves the supplied instructions and organizer contacts', () => {
  const html = renderYoungFacesContent(`${cohortKey}/stage-2`);
  for(const value of ['8 сентября 2026 года','12:00','noreply@shl.tools','вербальный и логический','только по одной из ссылок','«Спам»','https://wa.me/77057502739','tel:+77019510693','Мулдакулов Жаксылык','Жаналиев Ержан',`href="/${candidatesKey}/"`]) assert.ok(html.includes(value),value);
  for(const value of ['Осознанность и мотивация','Масштаб достижений','Глубина и аргументация']) assert.ok(html.includes(value));
  assert.ok(!html.includes('<iframe'));
  assert.ok(!html.includes('Подать заявку'));
  assert.equal((html.match(/data-candidate=/g)??[]).length,0,'Roster belongs on its own page');
});

test('Programme background uses the user-requested word потока', () => {
  const html = renderYoungFacesContent(`${cohortKey}/about`);
  assert.ok(html.includes('До четвёртого потока программа объединила три потока: 2020–2022, 2023–2024 и 2025–2026'));
  assert.ok(!html.includes('когорты'));
});

test('All 1517 source rows and both outcomes are present without changed spelling', () => {
  assert.deepEqual(youngFacesCandidates.map(row=>row.number),Array.from({length:1517},(_,i)=>i+1));
  assert.equal(youngFacesCandidates.filter(row=>row.status==='admitted').length,1427);
  assert.equal(youngFacesCandidates.filter(row=>row.status==='not-selected').length,90);
  assert.equal(youngFacesCandidates[0].name,'Абаева Мөлдңр Абайқызы');
  assert.equal(youngFacesCandidates.at(-1).name,'Шералиев Мейрбек Скендерович');
  const html = renderYoungFacesContent(candidatesKey);
  assert.equal((html.match(/<tr data-candidate="/g)??[]).length,1517);
  assert.equal((html.match(/translate="no"/g)??[]).length,1517);
  assert.equal((html.match(/<td>Допущен на 2 этап<\/td>/g)??[]).length,1427);
  assert.equal((html.match(/<td>Не прошел 1 этап<\/td>/g)??[]).length,90);
  assert.ok(read('public/language.js').includes("[translate='no']"),'Do not translate or strip punctuation from names');
});

test('All new copy is translated and all static pages match the shared content', () => {
  for (const [ru,kk] of Object.entries(youngFacesTranslations)) assert.equal(dictionary[ru],kk,ru);
  for (const [key,page] of Object.entries(youngFacesPages)) {
    const html = read(`vercel-static/${key}/index.html`);
    assert.ok(html.includes(renderYoungFacesContent(key)),key);
    assert.ok(html.includes(page.path === cohortPath ? '4 поток' : page.title.replaceAll('&','&amp;')),key);
    for (const removed of ['kpHeroVisual','kpFooter','Раздел наполняется','Заявки принимаются до']) assert.ok(!html.includes(removed),`${key}: ${removed}`);
  }
  assert.equal(read('public/language.js'),read('vercel-static/language.js'));
  assert.equal(read('app/globals.css'),read('vercel-static/app.css'));
});
