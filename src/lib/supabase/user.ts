import "server-only";

import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

export const getSession = cache(async () => {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
});

export const getUser = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const getProfile = cache(async () => {
  const supabase = createClient();
  const user = await getUser();

  if (user) {
    const { data: profile } = await supabase.from("profiles").select().eq("id", user.id).single();
    return profile;
  }

  return null;
});
