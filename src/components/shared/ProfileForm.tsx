import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import type { FC } from "react";
import { InputText } from "src/components/shared/InputText";
import type { UserType } from "src/types/types";

type ProfileFormProps = { user?: UserType };

export const ProfileForm: FC<ProfileFormProps> = (props) => {
  return (
    <div>
      <h1 className="text-xl font-bold">プロフィール設定</h1>

      <div className="mt-8">
        <p className="text-gray-400">アイコン</p>
        <div className="flex justify-start items-center space-x-6">
          {props.user ? (
            <Image src={props.user.avatarUrl} alt={props.user.name} width={96} height={96} className="w-24 h-24" />
          ) : (
            <div className="p-2 w-24 h-24 bg-gray-300">
              <UserIcon className="text-white" />
            </div>
          )}
          <button className="py-2 px-4 mt-4 text-sm font-bold bg-gray-100 rounded-full">
            {props.user ? "変更する" : "設定する"}
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-gray-400">名前</p>
          <InputText value={props.user?.name ?? ""} />
        </div>
        <div>
          <p className="text-gray-400">ユーザー名</p>
          <InputText value={props.user?.id ?? ""} />
          <p className="text-sm text-gray-400">https://my.page/yanot</p>
        </div>
      </div>

      <div className="mt-10">
        {props.user ? (
          <button className="p-4 w-full font-bold text-white bg-blue-500 rounded-full hover:bg-opacity-90">
            保存する
          </button>
        ) : (
          <>
            <button className="p-4 w-full font-bold text-white bg-blue-500 rounded-full hover:bg-opacity-90">
              登録してはじめる
            </button>
            <button className="p-4 mt-4 w-full font-bold bg-gray-100 rounded-full">登録せずに終了する</button>
          </>
        )}
      </div>
    </div>
  );
};