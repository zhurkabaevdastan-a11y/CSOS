const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) {
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  }
}), { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

const supabaseUrl = "https://bowvuafbszouqimilytd.supabase.co";
const supabaseKey = "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG";

function getStoredId(storage, key) {
  const current = storage.getItem(key);
  if (current) return current;
  const next = crypto.randomUUID();
  storage.setItem(key, next);
  return next;
}

async function trackPageView() {
  if (["localhost", "127.0.0.1"].includes(location.hostname)) return;

  try {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const payload = {
      path,
      page_title: document.title.replace(/\s+[—|-]\s+Все о социальной политике ҚТЖ$/, "").slice(0, 200),
      visitor_id: getStoredId(localStorage, "ktzh_visitor_id"),
      session_id: getStoredId(sessionStorage, "ktzh_session_id"),
      referrer_host: referrer && referrer.origin !== location.origin ? referrer.hostname.slice(0, 200) : null,
    };

    await fetch(`${supabaseUrl}/rest/v1/page_views`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
  } catch {
    // Analytics must never interrupt navigation when storage is unavailable.
  }
}

void trackPageView();
