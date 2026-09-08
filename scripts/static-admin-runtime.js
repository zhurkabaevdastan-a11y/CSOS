// This source replaces only our application auth code, not the bundled SDK.
var F=hs("https://bowvuafbszouqimilytd.supabase.co","sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG");
const T = (selector) => document.querySelector(selector);
const G = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
let adminRequest = 0;
function Zt(html, admin = false) {
  T("#modalContent").innerHTML = html;
  T("#modal").className = admin ? "modal adminModal" : "modal";
  T("#modal").setAttribute("aria-label", "Админ-панель");
  T("#modalWrap").hidden = false;
}
function Ye() {
  adminRequest += 1;
  T("#modalContent").replaceChildren();
  St();
}
function adminSignOut() { Ye(); void F.auth.signOut({ scope: "local" }); }
function St(message = "") {
  Zt(`<span class="kpEyebrow">Админ-панель</span><h2>Вход для администратора</h2><p class="modalLead">Доступ к статистике сайта</p>
    <form id="adminLoginForm"><label>Электронная почта<input id="email" type="email" autocomplete="username" placeholder="name@example.com" required></label>
    <label>Пароль<input id="password" type="password" autocomplete="current-password" required></label>
    <div class="formActions"><button type="submit" class="primary" id="login">Войти</button></div></form>
    <p class="formMessage" id="msg" role="alert" ${message ? "" : "hidden"}>${G(message)}</p>`);
  T("#adminLoginForm").onsubmit = async (event) => {
    event.preventDefault();
    if (T("#login").disabled) return;
    const id = ++adminRequest;
    const email = T("#email").value.trim();
    const password = T("#password").value;
    T("#login").disabled = true;
    T("#login").textContent = "Проверяем данные…";
    T("#msg").hidden = true;
    try {
      const result = await F.auth.signInWithPassword({ email, password });
      if (id !== adminRequest) return;
      if (result.error || !result.data.session) throw new Error(adminMessages.credentials);
      T("#password").value = "";
      await us();
    } catch (error) {
      if (id !== adminRequest) return;
      T("#msg").hidden = false;
      T("#msg").textContent = adminErrorMessage(error);
    } finally {
      if (id === adminRequest && T("#login")) {
        T("#login").disabled = false;
        T("#login").textContent = "Войти";
      }
    }
  };
}
/*__EXISTING_ADMIN_DASHBOARD__*/
async function us() {
  const id = ++adminRequest;
  Zt('<p class="adminNotice">Проверяем данные…</p>');
  try {
    await requireAdmin(F);
    if (id !== adminRequest) return;
    Zt('<p class="adminNotice">Загружаем актуальную статистику…</p>', true);
    await Si(id);
  } catch (error) {
    if (id === adminRequest) St(adminErrorMessage(error));
  }
}
F.auth.onAuthStateChange((event) => { if (event === "SIGNED_OUT") Ye(); });
if (location.pathname.replace(/\/+$/, "") === "/admin" && T("#modalContent")) void us();
const ds = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("is-visible"); ds.unobserve(entry.target); }
}), { threshold: .08 });
document.querySelectorAll(".reveal").forEach((node) => ds.observe(node));
