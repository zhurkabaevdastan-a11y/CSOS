"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://bowvuafbszouqimilytd.supabase.co",
  "sb_publishable_lz5Tf7Xfkz9KTPWjNtvtzQ_Xo9yVAFG",
);

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

      void supabase.from("page_views").insert({
        path,
        page_title: pageTitle,
        visitor_id: getStoredId(window.localStorage, "ktzh_visitor_id"),
        session_id: getStoredId(window.sessionStorage, "ktzh_session_id"),
        referrer_host: referrerHost,
      });
    } catch {
      // Analytics must never interrupt navigation when storage is unavailable.
    }
  }, []);

  return null;
}
