import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/type";

export const createClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({
    cookies: () => {
      return cookieStore;
    },
  });
};
