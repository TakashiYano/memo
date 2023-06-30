import type { FC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";
import { useAuth } from "src/pages-component/auth/useAuth";

type SignProps = { page: "signin" | "signup" };

export const Sign: FC<SignProps> = (props) => {
  const { handleSignInWithGoogle } = useAuth();

  return (
    <div className="grid h-screen w-screen place-items-center bg-gray-200 dark:bg-gray-700">
      <div className="p-4">
        <div className="flex justify-center">Memo</div>
        <div className="mt-20 space-y-5">
          <Button onClick={handleSignInWithGoogle} variant="solid-white" className="w-72 py-4 sm:w-80">
            <div className="flex">
              <GoogleIcon className="mr-3" />
              {props.page === "signin" ? "Googleでログイン" : "Googleでアカウント作成"}
            </div>
          </Button>
          <Button variant="solid-black" className="w-72 py-4 sm:w-80">
            <div className="flex">
              <AppleIcon className="mr-3" />
              <span>{props.page === "signin" ? "Appleでログイン" : "Appleでアカウント作成"}</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
