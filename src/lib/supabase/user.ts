import "server-only";

import { createClient } from "@/lib/supabase/server";

export const getSession = async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};

export const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const getProfile = async () => {
  const supabase = createClient();
  const user = await getUser();

  if (user) {
    const { data: profile } = await supabase.from("profiles").select().eq("id", user.id).single();
    return profile;
  }

  return null;
};
