import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { vndDocuments, vndTranslations, renderVndContent } from '../app/vnd-content.ts';
import { irFunding, renderSocialStabilityContent } from '../app/social-stability-content.ts';
const read = p => readFileSync(new URL(`../${p}`, import.meta.url));

test('The three downloadable PDFs are byte-identical to the supplied originals on both sites', () => {
  const hashes = [
    'eb3f5ea21e6da7af5b4a2c9adaea579c2b7736fa781c608a466b1d4e73a076f6',
    '9ae03fd98373c9e2a966a7d64020f8121460b718215ac4aeaf2bc7987dac049e',
    'c67ab3eaf4be07b23af34c560cdbfdb5580477ccee5f561d6b7cf5df532329ae',
  ];
  assert.equal(vndDocuments.length, 3);
  assert.deepEqual(vndDocuments.map(d => d.pages), [7, 27, 22]);
  for (const [i, doc] of vndDocuments.entries()) {
    const original = read(`public${doc.file}`);
    assert.equal(createHash('sha256').update(original).digest('hex'), hashes[i]);
    assert.deepEqual(read(`vercel-static${doc.file}`), original);
    assert.equal(original.subarray(0, 5).toString(), '%PDF-');
  }
});

test('VND has accessible view/download links, verified order dates and Kazakh copy', () => {
  const html = renderVndContent('vnd');
  assert.ok(read('vercel-static/vnd/index.html').toString().includes(html));
  assert.equal((html.match(/target="_blank"/g) || []).length, 3);
  assert.equal((html.match(/ download=/g) || []).length, 3);
  assert.match(html, /14 августа 2020/);
  assert.match(html, /11 июля 2024/);
  assert.doesNotMatch(html, /<iframe|<object|<embed/);
  assert.equal(renderVndContent('sport/calendar'), '');
  const dict = vm.runInNewContext(`(${read('public/language.js').toString().match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  for (const [ru, kk] of Object.entries(vndTranslations)) assert.equal(dict[ru], kk, ru);
});

test('Updated IR preserves allocated versus planned funding, survey frequency and topics', () => {
  assert.deepEqual(irFunding.map(i => [i.year, i.amount, i.status]), [[2024, '14,2', 'Выделено'], [2025, '19,3', 'Выделено'], [2026, '18,5', 'Запланировано порядка']]);
  const html = renderSocialStabilityContent('social-stability/research');
  for (const text of ['С 2023 года', 'Корпоративным стандартом', 'нематериальной мотивации', 'два раза в год', 'по 40 тысяч работников в каждом', 'не менее 25%', 'блок «Цель»', 'блок «Счастье»', 'В 2025 году опрос дополнен блоком «Права человека»', '23 642', '40 218']) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /80 000|80 тысяч|израсходовано/);
  assert.ok(read('vercel-static/social-stability/research/index.html').toString().includes(html));
});
