"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { profileSchema, type ProfileOrNullType, type ProfileSchemaType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";
import { type UserType } from "@/lib/user/type";

type UpsertUserProps = ProfileOrNullType & UserType & { selectedFile: File | undefined };

export const useUpsertUser = (props: UpsertUserProps) => {
  const { profile, selectedFile, user } = props;
  const router = useRouter();
  const supabase = createClient();
  const [isUpsertingProfile, startTransition] = useTransition();

  const handleProfile = async (formData: ProfileSchemaType) => {
    let avatar_url = user.user_metadata["avatar_url"];

    if (selectedFile) {
      // supabaseストレージに画像アップロード
      const storage = await supabase.storage.from("avatars");
      const { data: storageData, error: storageError } = await storage.upload(
        `${user.id}/${uuidv4()}`,
        selectedFile
      );
      if (storageError) {
        throw new Error("エラーが発生しました。" + storageError.message);
      }

      // 古い画像を削除
      if (avatar_url) {
        const fileName = avatar_url.split("/").slice(-1)[0];
        await supabase.storage.from("avatars").remove([`${user.id}/${fileName}`]);
      }

      // 画像のURLを取得
      const { data: urlData } = await supabase.storage
        .from("avatars")
        .getPublicUrl(storageData.path);

      avatar_url = urlData.publicUrl;
    }

    // プロフィールアップデート
    const parsed = profileSchema.parse(formData);
    const updates = {
      avatar_url,
      id: user.id,
      user_name: parsed.userName,
    };
    const { error: updateError } = await supabase.from("profiles").upsert(updates).single();
    if (updateError) {
      throw new Error("エラーが発生しました。" + updateError.message);
    }
  };

  const upsertUser: SubmitHandler<ProfileSchemaType> = async (formData) => {
    await toast.promise(handleProfile(formData), {
      error: (error) => {
        return error.message ?? "失敗しました";
      },
      loading: "処理中",
      success: () => {
        return profile ? "保存しました" : "登録しました";
      },
    });
    // 新規登録の場合はリダイレクト
    if (!profile) {
      await router.push("/");
    }
    startTransition(() => {
      router.refresh();
    });
  };

  return { isUpsertingProfile, upsertUser };
};
