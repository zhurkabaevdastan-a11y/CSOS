import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { requireAdmin, adminMessages, adminErrorMessage } from '../public/admin-access.js';

function client({ session = true, userError = null, profileError = null, role = 'admin' } = {}) {
  const calls = [];
  return {
    calls,
    auth: {
      getSession: async () => ({ data: { session: session ? { user: { id: 'untrusted-session-id', user_metadata: { role: 'admin' } } } : null } }),
      getUser: async () => { calls.push('getUser'); return { data: { user: { id: 'verified-user-id' } }, error: userError }; },
    },
    from: (table) => {
      calls.push(table);
      return { select: (column) => {
        assert.equal(column, 'role');
        return { eq: (column, id) => {
          assert.equal(column, 'id'); assert.equal(id, 'verified-user-id');
          return { single: async () => ({ data: { role }, error: profileError }) };
        } };
      } };
    },
  };
}

test('anonymous visitors cannot load administrator data', async () => {
  const api = client({ session: false });
  await assert.rejects(requireAdmin(api), /LOGIN_REQUIRED/);
  assert.deepEqual(api.calls, []);
});
test('administrator identity is verified before the database role is checked', async () => {
  const api = client();
  assert.equal((await requireAdmin(api)).id, 'verified-user-id');
  assert.deepEqual(api.calls, ['getUser', 'profiles']);
});
test('client metadata cannot grant access to a participant', async () => {
  await assert.rejects(requireAdmin(client({ role: 'participant' })), { message: adminMessages.denied });
});
test('expired sessions and database errors fail closed', async () => {
  const expired = client({ userError: { message: 'expired' } });
  await assert.rejects(requireAdmin(expired));
  assert.deepEqual(expired.calls, ['getUser']);
  await assert.rejects(requireAdmin(client({ profileError: { message: 'offline' } })), { message: adminMessages.unavailable });
  assert.equal(adminErrorMessage(new Error('private backend detail')), adminMessages.unavailable);
  assert.equal(adminErrorMessage(new Error('LOGIN_REQUIRED')), '');
});
test('both publications only offer administrator sign-in, while marathon registration remains', () => {
  const react = fs.readFileSync('app/admin/admin-panel.tsx', 'utf8');
  const bundle = fs.readFileSync('vercel-static/app.js', 'utf8');
  const application = bundle.slice(bundle.indexOf('var F=hs('));
  for (const source of [react, application]) {
    assert.doesNotMatch(source, /\.signUp\(|Зарегистрироваться на сайте|Мой аккаунт|#register/);
    assert.match(source, /signInWithPassword/);
    assert.match(source, /requireAdmin/);
    assert.match(source, /get_site_analytics/);
    assert.match(source, /Вход для администратора/);
  }
  assert.match(fs.readFileSync('app/page.tsx', 'utf8'), /marathonRegistrationPath/);
  const marathon = fs.readFileSync('vercel-static/sport/marathon-registration/index.html', 'utf8');
  assert.match(marathon, /forms\.cloud\.microsoft/);
  for (const file of ['language.js', 'admin-access.js']) {
    assert.equal(fs.readFileSync('public/' + file, 'utf8'), fs.readFileSync('vercel-static/' + file, 'utf8'));
  }
});
test('all public page headers omit admin links and login controls', () => {
  let count = 0;
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.name.endsWith('.html')) {
        const html = fs.readFileSync(file, 'utf8');
        const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
        if (header) {
          count++;
          assert.doesNotMatch(header, /kpCabinet|Админ-панель|Личный кабинет|href="\/(?:#(?:login|admin)|admin)/, file);
        }
      }
    }
  }
  walk('vercel-static');
  assert.ok(count > 60);
  for (const file of ['app/page.tsx', 'app/[...slug]/page.tsx']) {
    const source = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /kpCabinet|Админ-панель|signInWithPassword/);
  }
});

test('separate admin entry point is not indexed and uses the existing role guard', () => {
  const page = fs.readFileSync('app/admin/page.tsx', 'utf8');
  const panel = fs.readFileSync('app/admin/admin-panel.tsx', 'utf8');
  const html = fs.readFileSync('vercel-static/admin/index.html', 'utf8');
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  assert.match(html, /name="robots" content="noindex,nofollow"/);
  assert.match(panel, /void openCabinet\(\)/);
  assert.ok(panel.indexOf('await requireAdmin(supabase)') < panel.indexOf('supabase.rpc("get_site_analytics")'));
  assert.match(html, /src="\/app.js"/);
  assert.doesNotMatch(html, /modalBackdrop|modalClose|zhurkabaevdastan@gmail/);
  assert.doesNotMatch(fs.readFileSync('vercel-static/index.html', 'utf8'), /modalWrap|src="\/app.js"/);
  assert.match(fs.readFileSync('vercel-static/route.js', 'utf8'), /location.replace\("\/admin\/"\)/);
  assert.match(fs.readFileSync('app/page.tsx', 'utf8'), /location.replace\("\/admin\/"\)/);
});
