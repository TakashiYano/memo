import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/type";

export const createClient = () => {
  return createClientComponentClient<Database>();
};
