import type { FC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";

type SignProps = { page: "signin" | "signup" };

export const Sign: FC<SignProps> = (props) => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-gray-200">
      <div className="p-4">
        <div className="flex justify-center">Memo</div>
        <div className="mt-20 space-y-5">
          <Button className="py-4 w-72 bg-white sm:w-80">
            <GoogleIcon className="mr-3" />
            <span className="font-bold">{props.page === "signin" ? "Googleでログイン" : "Googleでアカウント作成"}</span>
          </Button>
          <Button className="py-4 w-72 text-white bg-black sm:w-80">
            <AppleIcon className="mr-3" />
            <span className="font-bold">{props.page === "signin" ? "Appleでログイン" : "Appleでアカウント作成"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
