"use client";

import { Avatar } from "@/component/Avatar/Avatar";
import { Button } from "@/component/Button/Button";
import { Input } from "@/component/Form/Input";
import { type ProfileFormType } from "@/lib/user/type";
import { useAuth } from "@/lib/user/useAuth";
import { useFile } from "@/lib/user/useFile";
import { useUpsertUser } from "@/lib/user/useUpsertUser";

export const ProfileForm = (props: ProfileFormType) => {
  const { profile, user } = props;
  const { handleSignOut, isLoading } = useAuth();
  const { handleChangeFile, handleOpenFileDialog, imageRef, imageUrl, selectedFile } = useFile();
  const { errors, isPending, onSubmit, register } = useUpsertUser({
    profile,
    selectedFile,
    user,
  });

  return (
    <form onSubmit={onSubmit}>
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
              <div>保存する</div>
            )}
          </Button>
        ) : (
          <>
            <Button type="submit" variant="solid" className="w-full p-3" disabled={isPending}>
              {isPending ? (
                <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
              ) : (
                <div>登録してはじめる</div>
              )}
            </Button>
            <Button variant="solid" className="w-full p-3" onClick={handleSignOut}>
              {isLoading ? (
                <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
              ) : (
                <div>登録せずに終了する</div>
              )}
            </Button>
          </>
        )}
      </div>
    </form>
  );
};
