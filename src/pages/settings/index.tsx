import type { NextPage } from "next";
import Image from "next/image";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";

const Settings: NextPage = () => {
  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <p className="my-4 text-center text-xl font-bold">プロフィール設定</p>
      <div className="mb-8">
        <p className="py-2 text-gray-500">アイコン</p>
        <div className="flex justify-start items-center">
          <Image src="" width={500} height={500} alt="" />
          <Button button bgColor="gray" textColor="black" size="small" className="p-0.5 leading-4 text-xs ml-8">
            変更する
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <p className="py-2 text-gray-500">名前</p>
        <InputText />
      </div>
      <div className="mb-8">
        <p className="py-2 text-gray-500">ユーザー名</p>
        <InputText />
        <p className="py-1 text-gray-500">https://test.page/test</p>
      </div>
      <Button button className="w-full">
        登録してはじめる
      </Button>
      <Button button bgColor="gray" textColor="black" className="w-full">
        登録せずに終了する
      </Button>
    </div>
  );
};

export default Settings;
