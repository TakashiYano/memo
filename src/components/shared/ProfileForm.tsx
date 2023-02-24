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
            <Button className="mt-4 w-max bg-gray-100 py-2.5 px-5 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:focus:bg-gray-600">
              アイコンを{props.user ? "変更する" : "設定する"}
            </Button>
          </div>
        </div>
        <Input name="name" label="名前" />
        <Input name="id" label="ユーザー名" prefix="@" />
      </div>

      <div className="mt-12 space-y-4">
        {props.user ? (
          <Button className="bg-blue-500 p-3 text-white">保存する</Button>
        ) : (
          <>
            <Button className="bg-blue-500 p-3 text-white">登録してはじめる</Button>
            <Button className="bg-gray-100 p-3 text-gray-800">登録せずに終了する</Button>
          </>
        )}
      </div>
    </div>
  );
};
