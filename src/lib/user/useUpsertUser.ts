"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

import { createClient } from "@/lib/supabase/browser";
import { type UpsertUserType } from "@/lib/user/type";

const profileSchema = z.object({
  userName: z.string().nonempty({ message: "ユーザ名を入力してください" }),
});
type ProfileSchemaType = z.infer<typeof profileSchema>;

export const useUpsertUser = (props: UpsertUserType) => {
  const { profile, selectedFile, user } = props;
  const router = useRouter();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfileSchemaType>({
    defaultValues: {
      userName: profile?.user_name ?? user.user_metadata["name"] ?? "",
    },
    resolver: zodResolver(profileSchema),
    reValidateMode: "onSubmit",
  });

  const handleProfile = async (formData: ProfileSchemaType) => {
    let avatar_url = user.user_metadata["avatar_url"];

    if (selectedFile) {
      // supabaseストレージに画像アップロード
      const storage = await supabase.storage.from("avatars");
      const { data: storageData, error: storageError } = await storage.upload(
        `${user.id}/${uuidv4()}`,
        selectedFile
      );

      // エラーチェック
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

    // エラーチェック
    if (updateError) {
      throw new Error("エラーが発生しました。" + updateError.message);
    }
  };

  const upsertUser = async (formData: ProfileSchemaType) => {
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

  return { errors, isPending, onSubmit: handleSubmit(upsertUser), register };
};
