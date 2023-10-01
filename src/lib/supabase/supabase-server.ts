import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/type";

export const createClient = () => {
  return createServerComponentClient<Database>({
    cookies,
  });
};
