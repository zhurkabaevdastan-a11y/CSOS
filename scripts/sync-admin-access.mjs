import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const bundlePath = path.join(root, 'vercel-static/app.js');
const old = fs.readFileSync(bundlePath, 'utf8');
const importLine = 'import { requireAdmin, adminMessages, adminErrorMessage } from "/admin-access.js";\n';
const vendor = old.replace(importLine, '').split('var F=hs(')[0]
  .split('// This source replaces only our application auth code, not the bundled SDK.')[0];
const dashboardStart = old.indexOf('async function Si(');
const dashboardEnd = old.indexOf('async function us(', dashboardStart);
const trackingStart = old.indexOf('function getKtzStoredId(');
if (dashboardStart < 0 || dashboardEnd < dashboardStart || trackingStart < dashboardEnd || !vendor) {
  throw new Error('Static application anchors changed; refusing to replace the SDK');
}
let dashboard = old.slice(dashboardStart, dashboardEnd).trim();
dashboard = dashboard.replace('async function Si()', 'async function Si(id)');
if (!dashboard.includes('id !== adminRequest')) {
  dashboard = dashboard.replace('  const registrations =', '  if (id !== adminRequest) return;\n  if (registrationResult.error || analyticsResult.error) throw new Error(adminMessages.unavailable);\n  const registrations =');
}
dashboard = dashboard.replace('T("#logout").onclick = async () => { await F.auth.signOut(); C = null; Ye(); Et(); };', 'T("#logout").onclick = adminSignOut;');
if (!dashboard.includes('class="adminChartScroll"')) {
  dashboard = dashboard.replace('<div class="analyticsBars">', '<div class="adminChartScroll" tabindex="0" role="region" aria-label="Просмотры за последние 14 дней"><div class="analyticsBars">')
    .replace('.join("")}</div></div>\n    <div class="analyticsGrid">', '.join("")}</div></div></div>\n    <div class="analyticsGrid">');
}
dashboard = dashboard.replace('<div class="tableWrap"><table>', '<div class="tableWrap" tabindex="0" role="region" aria-label="Регистрации на события"><table>');
const runtime = fs.readFileSync(path.join(root, 'scripts/static-admin-runtime.js'), 'utf8').replace('/*__EXISTING_ADMIN_DASHBOARD__*/', dashboard);
fs.writeFileSync(bundlePath, importLine + vendor + runtime + '\n' + old.slice(trackingStart));
for (const file of ['admin-access.js', 'language.js']) {
  fs.copyFileSync(path.join(root, 'public', file), path.join(root, 'vercel-static', file));
}
let count = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) {
      const html = fs.readFileSync(file, 'utf8');
      let updated = html.replace(/<(?:a|button)\b[^>]*class="kpCabinet"[^>]*>[\s\S]*?<\/(?:a|button)>/g, '');
      if (file === path.join(root, 'vercel-static/index.html')) {
        updated = updated.replace(/<div class="modalBackdrop" id="modalWrap" hidden>[\s\S]*?<\/section><\/div>/, '')
          .replace('<script type="module" src="/app.js"></script>', '');
      }
      if (html !== updated) { fs.writeFileSync(file, updated); count++; }
    }
  }
}
walk(path.join(root, 'vercel-static'));
fs.copyFileSync(path.join(root, 'app/globals.css'), path.join(root, 'vercel-static/app.css'));
console.log(`Separate admin page synchronized; ${count} public pages updated`);
