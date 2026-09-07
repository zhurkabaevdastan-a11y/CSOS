import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { getPageAncestors, pageRedirects, sectionNavigation, sitePages, topNavigation } from '../app/content.ts';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Social projects replaces volunteering in main menus and on the homepage', () => {
  for (const menu of [topNavigation, sectionNavigation]) {
    assert.equal(menu.filter((link) => link.href === '/social-projects').length, 1);
    assert.ok(!menu.some((link) => link.href === '/volunteering'));
  }
  assert.ok(read('vercel-static/route.js').includes('["/social-projects/", "Социальные проекты"]'));
  assert.ok(read('vercel-static/index.html').includes('<a href="/social-projects/"><span>07</span><strong>Социальные проекты</strong>'));
  assert.deepEqual(sitePages['social-projects'].cards.map((card) => card.href), ['/volunteering']);
});

test('Volunteering keeps its three subsections and adds ESG last', () => {
  assert.deepEqual(sitePages.volunteering.cards.map((card) => card.href), [
    '/volunteering/school', '/volunteering/best-2026', '/volunteering/clean-kazakhstan', '/volunteering/esg',
  ]);
  assert.equal(sitePages['volunteering/esg'].panels.length, 3);
  assert.equal(pageRedirects['social-stability/esg'], '/volunteering/esg');
  assert.ok(!sitePages['social-stability/esg']);
  assert.equal(sitePages['social-stability'].cards.length, 2);
  assert.ok(read('vercel-static/social-stability/esg/index.html').includes('content="0;url=/volunteering/esg/"'));
});

test('All volunteering pages retain their URLs and have complete parent navigation', () => {
  for (const key of Object.keys(sitePages).filter((key) => key === 'volunteering' || key.startsWith('volunteering/'))) {
    const ancestors = getPageAncestors(key);
    assert.equal(ancestors[0].path, '/social-projects');
    const html = read(`vercel-static/${key}/index.html`);
    const breadcrumbs = html.split('<div class="kpBreadcrumbs">')[1].split('</div>')[0];
    for (const parent of ancestors) assert.ok(breadcrumbs.includes(`href="${parent.path}/">${parent.title}</a>`), key);
    assert.ok(html.includes(sitePages[key].title));
  }
  assert.deepEqual(getPageAncestors('volunteering/best-2026/community').map((page) => page.path), ['/social-projects', '/volunteering', '/volunteering/best-2026']);
  assert.deepEqual(getPageAncestors('social-stability/research').map((page) => page.path), ['/social-stability']);
});

test('New social projects and relocated ESG content have Kazakh translations', () => {
  const literal = read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1];
  const dict = vm.runInNewContext(`(${literal})`);
  for (const key of ['social-projects', 'volunteering/esg']) {
    const page = sitePages[key];
    const texts = [page.title, page.eyebrow, page.lead];
    for (const entry of page.cards ?? page.panels) texts.push(entry.title, entry.text, entry.label, entry.tag);
    for (const text of texts.filter(Boolean)) if (!['ESG', 'Social'].includes(text)) assert.ok(dict[text], `Missing translation: ${text}`);
  }
  assert.equal(read('public/language.js'), read('vercel-static/language.js'));
});
