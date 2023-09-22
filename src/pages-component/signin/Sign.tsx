/* eslint-disable func-style */
import type { FC } from "react";

import { Button } from "src/component/Button";
import { GoogleIcon } from "src/component/Icon";
import { useAuth } from "src/lib/user";

export const Sign: FC = () => {
  const { handleSignInWithGoogle } = useAuth();

  return (
    <div className="grid h-screen w-screen place-items-center bg-gray-200 dark:bg-gray-700">
      <div className="p-4">
        <div className="flex justify-center">Memo</div>
        <div className="mt-20 space-y-5">
          <Button
            onClick={handleSignInWithGoogle}
            variant="solid-white"
            className="w-72 py-4 sm:w-80"
          >
            <div className="flex">
              <GoogleIcon className="mr-3 h-6 w-6" />
              Googleでログイン
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};