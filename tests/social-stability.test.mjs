import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { sitePages } from '../app/content.ts';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const paths = ['social-stability', 'social-stability/research', 'social-stability/appeals'];

test('Social stability has exactly the two requested subsections, in order', () => {
  const cards = sitePages['social-stability'].cards;
  assert.deepEqual(cards.map(({ title }) => title), ['Исследования и опросы', 'Информация по жалобам и обращениям']);
  for (const card of cards) assert.ok(sitePages[card.href.slice(1)]);
  const html = read('vercel-static/social-stability/index.html');
  const content = html.split('<div class="kpPageCards kpPageCards--two">')[1].split('</div>')[0];
  assert.equal((content.match(/<a /g) ?? []).length, 2);
  assert.ok(!content.includes('/esg/') && !content.includes('/srs/'));
});

test('Research explains SRS and Industrial Relations without inventing indicator values', () => {
  const panels = sitePages['social-stability/research'].panels;
  assert.equal(panels.length, 2);
  assert.equal(panels[0].title, 'SRS — динамика показателей');
  assert.match(panels[0].notice, /после получения подтверждённых результатов/);
  assert.equal(panels[1].label, 'Industrial Relations (IR)');
  assert.equal(panels[1].title, 'Мониторинг производственных отношений');
});

test('Both official appeal channels are accessible links, not embedded forms', () => {
  const cards = sitePages['social-stability/appeals'].cards;
  assert.deepEqual(cards.map(({ href }) => href), ['https://nysana.cscc.kz/', 'https://eotinish.kz/']);
  const html = read('vercel-static/social-stability/appeals/index.html');
  for (const card of cards) {
    assert.equal(card.external, true);
    assert.ok(html.includes(`href="${card.href}" target="_blank" rel="noreferrer"`));
  }
  assert.ok(!html.includes('<iframe'));
});

test('Static pages match the app content and retain parent navigation', () => {
  for (const path of paths) {
    const page = sitePages[path];
    const html = read(`vercel-static/${path}/index.html`);
    assert.ok(html.includes(`<h1>${page.title}</h1>`));
    for (const entry of page.cards ?? page.panels ?? []) {
      assert.ok(html.includes(entry.title));
      assert.ok(html.includes(entry.text));
    }
    if (path.includes('/')) assert.ok(html.includes('href="/social-stability/">Социальная стабильность</a>'));
    assert.ok(html.includes('<script src="/route.js"></script>'));
  }
  assert.equal(read('public/language.js'), read('vercel-static/language.js'));
  assert.equal(read('app/globals.css'), read('vercel-static/app.css'));
});

test('Every new research and appeal text has a Kazakh translation', () => {
  const dictionaryLiteral = read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1];
  const dictionary = vm.runInNewContext(`(${dictionaryLiteral})`);
  const languageNeutral = new Set(['Samruk Research Services', 'Industrial Relations (IR)', 'Нысана', 'e-Otinish / Е-Өтініш']);
  for (const key of paths) {
    const page = sitePages[key];
    const texts = [page.title, page.lead, ...Object.values(page.cardsIntro ?? page.panelsIntro ?? {})];
    for (const entry of page.cards ?? page.panels ?? []) texts.push(entry.title, entry.text, entry.notice, entry.label, entry.tag);
    if (page.source) texts.push(page.source.label);
    for (const text of texts.filter(Boolean)) {
      if (!languageNeutral.has(text)) assert.ok(dictionary[text], `Missing translation: ${text}`);
    }
  }
});
