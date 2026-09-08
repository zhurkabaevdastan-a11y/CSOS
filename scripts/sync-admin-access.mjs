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
      const updated = html.replace(/(<(?:a|button)\b[^>]*class="kpCabinet"[^>]*>)[\s\S]*?(<\/(?:a|button)>)/g,
        (_, start, end) => start.replace('href="/#login"', 'href="/#admin"') + 'Админ-панель' + end);
      if (html !== updated) { fs.writeFileSync(file, updated); count++; }
    }
  }
}
walk(path.join(root, 'vercel-static'));
console.log(`Admin-only access synchronized; ${count} page headers updated`);
