import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { requireAdmin, adminMessages, adminErrorMessage } from '../public/admin-access.js';

// Exercise the deployed static runtime with an isolated DOM/API test double.
async function boot({ role = 'admin', invalidPassword = false, offline = false } = {}) {
  const elements = new Map();
  const queries = [];
  let session = false;
  let authListener;
  function element(id) {
    const node = { value: '', hidden: false, disabled: false, textContent: '', setAttribute() {}, replaceChildren() { this.innerHTML = ''; } };
    Object.defineProperty(node, 'innerHTML', {
      get() { return this.html || ''; },
      set(html) {
        this.html = html;
        if (id === '#modalContent') {
          for (const key of [...elements.keys()]) if (!['#modal', '#modalWrap', '#modalContent'].includes(key)) elements.delete(key);
          for (const match of html.matchAll(/id="([^"]+)"/g)) elements.set('#' + match[1], element('#' + match[1]));
        }
      },
    });
    return node;
  }
  for (const id of ['#modal', '#modalWrap', '#modalContent']) elements.set(id, element(id));
  const api = {
    auth: {
      getSession: async () => ({ data: { session: session ? {} : null } }),
      getUser: async () => ({ data: { user: { id: 'verified-admin' } } }),
      signInWithPassword: async ({ email, password }) => {
        assert.equal(email, 'owner@example.com'); assert.equal(password, 'test-only-password');
        session = !invalidPassword;
        return { data: { session: session ? {} : null }, error: invalidPassword ? { message: 'invalid' } : null };
      },
      signOut: async () => { session = false; authListener('SIGNED_OUT'); },
      onAuthStateChange: (listener) => { authListener = listener; },
    },
    from: (table) => {
      queries.push(table);
      return { select: () => table === 'profiles'
        ? { eq: () => ({ single: async () => ({ data: { role } }) }) }
        : { order: async () => ({ data: [], error: offline ? { message: 'offline' } : null }) } };
    },
    rpc: async (name) => { queries.push(name); return { data: null }; },
  };
  const bundle = fs.readFileSync('vercel-static/app.js', 'utf8');
  const runtime = bundle.slice(bundle.indexOf('var F=hs('), bundle.indexOf('const ds = new IntersectionObserver'));
  vm.runInNewContext(runtime, {
    hs: () => api, requireAdmin, adminMessages, adminErrorMessage,
    document: { querySelector: (key) => elements.get(key) || null },
    location: { pathname: '/admin/' }, Intl, Date, Error,
  });
  const settle = async () => { for (let i = 0; i < 12; i++) await new Promise(setImmediate); };
  await settle();
  const login = async () => {
    elements.get('#email').value = 'owner@example.com';
    elements.get('#password').value = 'test-only-password';
    await elements.get('#adminLoginForm').onsubmit({ preventDefault() {} });
    await settle();
  };
  return { elements, queries, login, settle };
}

test('direct admin URL starts at login, loads protected data after authorization, and clears it on logout', async () => {
  const app = await boot();
  assert.deepEqual(app.queries, []);
  assert.ok(app.elements.has('#adminLoginForm'));
  await app.login();
  assert.deepEqual(app.queries, ['profiles', 'registrations', 'get_site_analytics']);
  assert.match(app.elements.get('#modalContent').innerHTML, /Статистика сайта/);
  app.elements.get('#logout').onclick();
  await app.settle();
  assert.ok(app.elements.has('#adminLoginForm'));
  assert.doesNotMatch(app.elements.get('#modalContent').innerHTML, /Статистика сайта/);
});
test('ordinary accounts never request dashboard data', async () => {
  const app = await boot({ role: 'participant' });
  await app.login();
  assert.deepEqual(app.queries, ['profiles']);
  assert.match(app.elements.get('#modalContent').innerHTML, /Доступ разрешён только администратору/);
});
test('incorrect password and unavailable data return usable sign-in state', async () => {
  const denied = await boot({ invalidPassword: true });
  await denied.login();
  assert.equal(denied.elements.get('#login').disabled, false);
  assert.deepEqual(denied.queries, []);
  assert.equal(denied.elements.get('#msg').textContent, adminMessages.credentials);
  const offline = await boot({ offline: true });
  await offline.login();
  assert.match(offline.elements.get('#modalContent').innerHTML, /Не удалось подключиться/);
  assert.ok(offline.elements.has('#adminLoginForm'));
});
