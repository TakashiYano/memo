"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type ProfileFormProps } from "@/app/setting/profile/_component/type";
import { Avatar } from "@/component/Avatar/Avatar";
import { Button } from "@/component/Button/Button";
import { Input } from "@/component/Form/Input";
import { profileSchema, type ProfileSchemaType } from "@/lib/profile/type";
import { useFile } from "@/lib/profile/useFile";
import { useUpsertUser } from "@/lib/profile/useUpsertUser";
import { useAuth } from "@/lib/user/useAuth";

export const ProfileForm = (props: ProfileFormProps) => {
  const { profile, user } = props;
  const { handleSignOut } = useAuth();
  const { handleChangeFile, handleOpenFileDialog, imageRef, imageUrl, selectedFile } = useFile();
  const { isPending, upsertUser } = useUpsertUser({
    profile,
    selectedFile,
    user,
  });
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

  return (
    <form onSubmit={handleSubmit(upsertUser)}>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex items-center justify-start space-x-6">
            <Avatar
              noDialog
              src={imageUrl ?? profile?.avatar_url ?? user.user_metadata["avatar_url"] ?? ""}
              alt={profile?.user_name ?? user.user_metadata["name"] ?? ""}
              width={96}
              height={96}
              className="h-24 w-24"
            />
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={handleChangeFile}
              accept="image/png, image/jpeg"
            />
            <Button variant="ui" className="mt-4 px-5 py-2.5" onClick={handleOpenFileDialog}>
              アイコンを{profile ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>

        <Input
          id="userName"
          required
          label="ユーザ名"
          {...register("userName")}
          error={errors.userName?.message}
        />
      </div>

      <div className="mt-12 space-y-4">
        {profile ? (
          <Button type="submit" variant="solid" className="w-full p-3" disabled={isPending}>
            {isPending ? (
              <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
            ) : (
              <p>保存する</p>
            )}
          </Button>
        ) : (
          <>
            <Button type="submit" variant="solid" className="w-full p-3" disabled={isPending}>
              {isPending ? (
                <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
              ) : (
                <p>登録してはじめる</p>
              )}
            </Button>
            <Button variant="solid" className="w-full p-3" onClick={handleSignOut}>
              <p>登録せずに終了する</p>
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
