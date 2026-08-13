"use client";

import { useEffect } from "react";

const supabaseUrl = "https://bowvuafbszouqimilytd.supabase.co";
const supabaseKey = "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG";

const createId = () => crypto.randomUUID();

function getStoredId(storage: Storage, key: string) {
  const current = storage.getItem(key);
  if (current) return current;
  const next = createId();
  storage.setItem(key, next);
  return next;
}

export default function VisitTracker() {
  useEffect(() => {
    if (["localhost", "127.0.0.1"].includes(window.location.hostname)) return;

    try {
      const path = window.location.pathname.replace(/\/+$/, "") || "/";
      const pageTitle = document.title.replace(/\s+[—|-]\s+Все о социальной политике ҚТЖ$/, "").slice(0, 200);
      const referrer = document.referrer ? new URL(document.referrer) : null;
      const referrerHost = referrer && referrer.origin !== window.location.origin ? referrer.hostname.slice(0, 200) : null;

      const payload = {
        path,
        page_title: pageTitle,
        visitor_id: getStoredId(window.localStorage, "ktzh_visitor_id"),
        session_id: getStoredId(window.sessionStorage, "ktzh_session_id"),
        referrer_host: referrerHost,
      };

      void fetch(`${supabaseUrl}/rest/v1/page_views`, {
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
  }, []);

  return null;
}
