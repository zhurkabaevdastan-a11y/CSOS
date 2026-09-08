import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync('app/globals.css', 'utf8');
const panel = fs.readFileSync('app/admin/admin-panel.tsx', 'utf8');
const bundle = fs.readFileSync('vercel-static/app.js', 'utf8');

test('admin page constrains wide content instead of stretching the viewport', () => {
  assert.match(css, /\.kpAdminSurface\{[^}]*grid-template-columns:minmax\(0,1fr\)[^}]*min-width:0/);
  assert.match(css, /\.kpAdminSurface>\.modal\{[^}]*width:100%;max-width:560px;min-width:0;max-height:none/);
  assert.match(css, /\.kpAdminSurface>\.adminModal\{max-width:1360px\}/);
  assert.match(css, /\.kpAdminSurface \.adminChartScroll\{[^}]*max-width:100%;overflow-x:auto/);
  assert.match(css, /\.kpAdminSurface \.tableWrap\{width:100%;overflow-x:auto/);
  assert.equal(css, fs.readFileSync('vercel-static/app.css', 'utf8'));
});

test('desktop, tablet and phone layouts use compact readable cards and controls', () => {
  assert.match(css, /\.kpAdminSurface \.adminStats--analytics\{grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:1024px\)\{\s*\.kpAdminSurface \.analyticsGrid\{grid-template-columns:minmax\(0,1fr\)\}/);
  assert.match(css, /repeat\(auto-fit,minmax\(min\(100%,9rem\),1fr\)\)/);
  assert.match(css, /\.kpAdminSurface \.modal :is\(input,button\)\{font-size:1rem;min-height:48px\}/);
  assert.match(css, /\.kpAdminSurface \.analyticsBars small\{[^}]*transform:none/);
  assert.match(css, /\.kpAdminSurface \.recentVisits article\{flex-direction:column/);
});

test('wide graph and table support keyboard scrolling in both publications', () => {
  assert.match(panel, /className="adminChartScroll" tabIndex=\{0\} role="region" aria-label="Просмотры за последние 14 дней"/);
  assert.match(bundle, /class="adminChartScroll" tabindex="0" role="region" aria-label="Просмотры за последние 14 дней"/);
  assert.match(panel, /className="tableWrap" tabIndex=\{0\} role="region" aria-label="Регистрации на события"/);
  assert.match(bundle, /class="tableWrap" tabindex="0" role="region" aria-label="Регистрации на события"/);
});
