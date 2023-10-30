import { createClient } from "@/lib/supabase/server";

export const getLabels = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("labels").select();

  if (error) {
    throw new Error("ラベル一覧の取得に失敗しました");
  }

  return data;
};
