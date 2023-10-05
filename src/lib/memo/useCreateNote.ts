"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { isNoteType } from "@/lib/memo/type";
import { type ProfileIdType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";

export const useCreateNote = (props: ProfileIdType) => {
  const { profile } = props;
  const router = useRouter();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const handleCreateMemo = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("memo_notes")
        .insert({ user_id: profile.id })
        .select()
        .single();
      if (!isNoteType(data)) {
        throw new Error("Failed to create memo");
      }
      router.push(`/memo/${data.id}`);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("メモの作成に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, [router, supabase, profile.id]);

  return { handleCreateMemo, isPending };
};
