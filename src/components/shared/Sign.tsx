import type { FC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";

type SignProps = { page: "signin" | "signup" };

export const Sign: FC<SignProps> = (props) => {
  return (
    <div className="grid h-screen w-screen place-items-center bg-gray-200 dark:bg-gray-700">
      <div className="p-4">
        <div className="flex justify-center">Memo</div>
        <div className="mt-20 space-y-5">
          <Button className="w-72 bg-white py-4 dark:text-black sm:w-80">
            <GoogleIcon className="mr-3" />
            <span className="font-bold">{props.page === "signin" ? "Googleでログイン" : "Googleでアカウント作成"}</span>
          </Button>
          <Button className="w-72 bg-black py-4 text-white sm:w-80">
            <AppleIcon className="mr-3" />
            <span className="font-bold">{props.page === "signin" ? "Appleでログイン" : "Appleでアカウント作成"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
