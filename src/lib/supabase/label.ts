import "server-only";

import { type Label } from "@/lib/label/type";
import { createClient } from "@/lib/supabase/server";

export const getLabels = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("labels").select();

  if (error) {
    throw new Error("ラベル一覧の取得に失敗しました");
  }

  return data;
};

export const getNoteLabels = async (noteId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("note_labels")
    .select("labels:label_id(*)")
    .eq("note_id", noteId);

  if (error) {
    throw new Error("ラベルの取得に失敗しました");
  }
  const labelIds = data.map((l) => {
    return l.labels;
  });
  return labelIds as unknown as Label[];
};
