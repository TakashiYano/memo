"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";

import { isLabelType, type Label } from "@/lib/label/type";
import { type ProfileIdType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";

type CreateLabelProps = ProfileIdType & Pick<Label, "color" | "name"> & { labels: Label[] };

export const useCreateLabel = (props: CreateLabelProps) => {
  const { color, labels, name, profile } = props;
  const supabase = createClient();
  const router = useRouter();

  const handleCreateLabel = useCallback(async () => {
    try {
      const sameLabelItem = labels.find((label) => {
        return label.name === name.trim();
      });
      if (sameLabelItem) {
        throw new Error("Failed to create label");
      }
      const { data } = await supabase
        .from("labels")
        .insert({ color, name: name.trim(), user_id: profile.id })
        .select()
        .single();
      if (data) {
        toast.success("Label created");
      }
      if (!isLabelType(data)) {
        throw new Error("Failed to create label");
      }
      router.refresh();
    } catch (error) {
      toast.error("ラベルの作成に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, [color, name, profile.id, supabase, router, labels]);

  return { handleCreateLabel };
};
