"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { isLabelType, type Label } from "@/lib/label/type";
import { type ProfileIdType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";

type CreateLabelProps = ProfileIdType & Pick<Label, "color" | "name">;

export const useCreateLabel = (props: CreateLabelProps) => {
  const { color, name, profile } = props;
  const supabase = createClient();
  const router = useRouter();

  const handleCreateLabel = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("labels")
        .insert({ color, name, user_id: profile.id })
        .select()
        .single();
      if (!isLabelType(data)) {
        throw new Error("Failed to create label");
      }
      router.refresh();
    } catch (error) {
      toast.error("ラベルの作成に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, [color, name, profile.id, supabase, router]);

  return { handleCreateLabel };
};
