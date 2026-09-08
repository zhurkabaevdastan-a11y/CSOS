// Shared by the React site and the static publication. Database RLS remains
// the authority for access to statistics; never trust client user_metadata.
export const adminMessages = {
  unavailable: "Не удалось подключиться к админ-панели — попробуйте позже",
  denied: "Доступ разрешён только администратору сайта",
  credentials: "Не удалось войти — проверьте почту и пароль",
};

/** @param {import('@supabase/supabase-js').SupabaseClient} client */
export async function requireAdmin(client) {
  const session = await client.auth.getSession();
  if (session.error) throw new Error(adminMessages.unavailable);
  if (!session.data.session) throw new Error("LOGIN_REQUIRED");
  const user = await client.auth.getUser();
  if (user.error || !user.data.user) throw new Error(adminMessages.credentials);
  const profile = await client.from("profiles").select("role").eq("id", user.data.user.id).single();
  if (profile.error) throw new Error(adminMessages.unavailable);
  if (profile.data?.role !== "admin") {
    throw new Error(adminMessages.denied);
  }
  return user.data.user;
}

/** @param {unknown} error */
export function adminErrorMessage(error) {
  if (error instanceof Error && error.message === "LOGIN_REQUIRED") return "";
  if (error instanceof Error && Object.values(adminMessages).includes(error.message)) return error.message;
  return adminMessages.unavailable;
}
