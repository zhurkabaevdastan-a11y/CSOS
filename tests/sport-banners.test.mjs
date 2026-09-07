import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import vm from 'node:vm';
import { sitePages, photoAlbums } from '../app/content.ts';
import { getSportBanner, sportBannerPhotos } from '../app/sport-banners.ts';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Every sports page has one archive banner, unrelated pages are unchanged', () => {
  for (const key of Object.keys(sitePages)) {
    const photo = getSportBanner(key);
    if (key !== 'sport' && !key.startsWith('sport/')) {
      assert.equal(photo, undefined, key);
      continue;
    }
    assert.ok(photo, key);
    const html = read(`vercel-static/${key}/index.html`);
    assert.equal((html.match(/<figure class="kpSportPhoto">/g) ?? []).length, 1, key);
    assert.ok(!html.includes('class="kpHeroVisual kpHeroVisual--sport"'), key);
    assert.ok(html.includes(photo.src), key);
    assert.ok(html.includes('sizes="(max-width: 760px) 100vw, 92vw"'), key);
    assert.ok(html.includes('Фото из спортивного архива'), key);
    assert.ok(html.includes(photo.album), key);
  }
});

test('Optimized local photos retain provenance from supplied albums', () => {
  const allowedAlbums = new Set(Object.values(photoAlbums).flat().map((album) => album.href));
  for (const photo of Object.values(sportBannerPhotos)) {
    assert.ok(allowedAlbums.has(photo.album), photo.album);
    assert.ok(photo.resourcePath);
    assert.ok(photo.alt);
    for (const src of [photo.src, photo.mobileSrc]) {
      assert.ok(src.startsWith('/sports/banners/'));
      const source = new URL(`../public${src}`, import.meta.url);
      const staticCopy = new URL(`../vercel-static${src}`, import.meta.url);
      const bytes = readFileSync(source);
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
      assert.ok(statSync(source).size < 240_000, src);
      assert.deepEqual(bytes, readFileSync(staticCopy));
    }
  }
});

test('New photo descriptions and links have Kazakh translations', () => {
  const dict = vm.runInNewContext(`(${read('public/language.js').match(/  const kk = (\{[\s\S]*?\n  \});/)[1]})`);
  for (const label of ['Фото из спортивного архива', 'Открыть фотоальбом', ...Object.values(sportBannerPhotos).map((photo) => photo.alt)]) assert.ok(dict[label], label);
  assert.equal(read('public/language.js'), read('vercel-static/language.js'));
  assert.equal(read('app/globals.css'), read('vercel-static/app.css'));
  assert.match(read('app/globals.css'), /@media\(max-width:480px\).*kpSportPhoto/);
});
