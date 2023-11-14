import "server-only";

import { notFound } from "next/navigation";

import { type SearchPageProps } from "@/app/search/_component/type";
import { createClient } from "@/lib/supabase/server";

export const getSearchNotes = async (props: SearchPageProps) => {
  const { searchParams } = props;
  const supabase = createClient();

  if (searchParams.q) {
    const { data, error } = await supabase
      .from("memo_notes")
      .select("id, content, updated_at")
      .textSearch("content", `${searchParams.q}`)
      .order("updated_at", { ascending: false });
    if (error) {
      throw new Error("メモ検索一覧の取得に失敗しました");
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("memo_notes")
      .select("id, content, updated_at")
      .order("updated_at", { ascending: false });
    if (error) {
      throw new Error("メモ検索一覧の取得に失敗しました");
    }
    return data;
  }
};

export const getNotes = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("memo_notes")
    .select()
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("メモ一覧の取得に失敗しました");
  }

  return data;
};

export const getNote = async (noteId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("memo_notes")
    .select("id, content, updated_at")
    .eq("id", noteId)
    .single();

  if (!data) {
    notFound();
  }

  if (error) {
    throw new Error("メモ詳細の取得に失敗しました");
  }

  return data;
};
