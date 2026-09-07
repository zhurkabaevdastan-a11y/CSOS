import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sitePages } from '../app/content.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = (path) => readFileSync(join(root, path), 'utf8');

test('No static page contains the retired footer or next-step block', () => {
  function check(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) check(path);
      else if (entry.name.endsWith('.html')) {
        const html = readFileSync(path, 'utf8');
        assert.doesNotMatch(html, /<(?:footer|section)\b[^>]*class="[^"]*\b(?:kpFooter|kpRelated)\b/, path);
        assert.ok(html.includes('</body>') && html.includes('</html>'), path);
      }
    }
  }
  check(join(root, 'vercel-static'));
});

test('All current pages retain the header, mobile menu and language switch', () => {
  for (const key of ['', ...Object.keys(sitePages)]) {
    const path = key ? `vercel-static/${key}/index.html` : 'vercel-static/index.html';
    let html = read(path);
    const redirect = html.match(/http-equiv="refresh" content="0;url=(\/[^"?]*)"/);
    if (redirect) html = read(`vercel-static${redirect[1].replace(/\/$/, '')}/index.html`);
    assert.equal((html.match(/<header class="kpHeader">/g) ?? []).length, 1, path);
    assert.match(html, /class="kpMobileNav"/, path);
    // Older static pages add the language control through the shared route script.
    assert.ok(html.includes('data-language-toggle') || html.includes('src="/route.js"'), path);
  }
  assert.match(read('vercel-static/route.js'), /languageScript.src = "\/language.js"/);
  assert.match(read('vercel-static/language.js'), /button.setAttribute\("data-language-toggle", ""\)/);
});

test('React routes and static generation cannot restore the retired blocks', () => {
  for (const path of ['app/page.tsx', 'app/[...slug]/page.tsx']) {
    assert.doesNotMatch(read(path), /kpFooter|kpRelated|SiteFooter/, path);
    assert.match(read(path), /className="kpHeader"/, path);
  }
  const sync = read('scripts/sync-social-stability.mjs');
  assert.doesNotMatch(sync, /kpFooter|kpRelated/);
  assert.match(sync, /lastIndexOf\('<\/main>'\)/);
});
