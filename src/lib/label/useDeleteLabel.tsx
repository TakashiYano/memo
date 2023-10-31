"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { type Label } from "@/lib/label/type";
import { createClient } from "@/lib/supabase/browser";

type LabelIdProps = Pick<Label, "id">;

export const useDeleteLabel = (props: LabelIdProps) => {
  const { id } = props;
  const router = useRouter();

  const deleteLabel = useCallback(async () => {
    const supabase = createClient();
    await supabase.from("labels").delete().eq("id", id);
  }, [id]);

  const handleDeleteLabel = useCallback(async () => {
    try {
      await toast.promise(deleteLabel(), {
        error: "失敗しました",
        loading: "処理中",
        success: "削除しました",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }, [deleteLabel, router]);

  return { handleDeleteLabel };
};
