import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import type { FC } from "react";
import { Button } from "src/components/shared/Button";
import { Input } from "src/components/shared/Input";
import type { UserType } from "src/types/types";

type ProfileFormProps = { user?: UserType };

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <div className="flex items-center justify-start space-x-6">
            {props.user ? (
              <Image src={props.user.avatarUrl} alt={props.user.name} width={96} height={96} className="h-24 w-24" />
            ) : (
              <div className="h-24 w-24 bg-gray-300 p-2">
                <UserIcon className="text-white" />
              </div>
            )}
            <Button variant="solid-gray" className="mt-4 px-5 py-2.5">
              アイコンを{props.user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input name="name" label="名前" />
        <Input name="id" label="ユーザー名" prefix="@" />
      </div>

      <div className="mt-12 space-y-4">
        {props.user ? (
          <Button variant="solid-blue" className="w-full p-3">
            保存する
          </Button>
        ) : (
          <>
            <Button variant="solid-blue" className="w-full p-3">
              登録してはじめる
            </Button>
            <Button variant="solid-gray" className="w-full p-3">
              登録せずに終了する
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
