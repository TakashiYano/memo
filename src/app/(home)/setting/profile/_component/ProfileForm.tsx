import { type FC } from "react";
import Image from "next/image";

import { UserIcon } from "@heroicons/react/24/solid";

import { Button } from "@/component/Button/Button";
import { Input } from "@/component/Form/Input";
import { type UserType } from "@/lib/user/type";

type ProfileFormProps = { user?: UserType };

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  const { user } = props;

  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex items-center justify-start space-x-6">
            {user ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={96}
                height={96}
                className="h-24 w-24"
              />
            ) : (
              <div className="h-24 w-24 bg-indigo-3 p-2 dark:bg-indigodark-3">
                <UserIcon />
              </div>
            )}
            <Button variant="ui" className="mt-4 px-5 py-2.5">
              アイコンを{user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input name="name" label="名前" />
        <Input name="id" label="ユーザー名" prefix="@" />
      </div>

      <div className="mt-12 space-y-4">
        {user ? (
          <Button variant="solid" className="w-full p-3">
            保存する
          </Button>
        ) : (
          <>
            <Button variant="solid" className="w-full p-3">
              登録してはじめる
            </Button>
            <Button variant="ui" className="w-full p-3">
              登録せずに終了する
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
