"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { type Label } from "@/lib/label/type";
import { createClient } from "@/lib/supabase/browser";

export const useUpdateLabel = (props: Label) => {
  const { color, id, name } = props;
  const router = useRouter();

  const saveLabel = useCallback(async () => {
    const supabase = createClient();
    await supabase.from("labels").update({ color, name }).eq("id", id);
  }, [color, name, id]);

  const handleUpdateLabel = useCallback(async () => {
    try {
      await saveLabel();
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, [router, saveLabel]);

  return { handleUpdateLabel };
};
