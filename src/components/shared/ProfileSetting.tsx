import Image from "next/image";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";

export const ProfileSetting = () => {
  return (
    <>
      <div className="mb-8">
        <p className="py-2 text-gray-500">アイコン</p>
        <div className="flex justify-start items-center">
          <Image src="" alt="" width={500} height={500} />
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
        <p className="py-1 text-gray-500">https://memo.page/test</p>
      </div>
    </>
  );
};
