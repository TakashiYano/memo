"use client";

import { useCallback, type FC } from "react";

import { Button } from "@/component/Button/Button";
import { GoogleIcon } from "@/component/Icon/GoogleIcon";
import { List } from "@/component/List/List";

export const AccountList: FC = () => {
  const handleGoogle = useCallback(() => {
    alert("Google");
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold">アカウントの連携</h1>

      <div className="mt-4">
        <List
          items={[
            {
              button: (
                <Button variant="solid-gray" className="px-4 py-2 text-sm" onClick={handleGoogle}>
                  解除する
                </Button>
              ),
              label: (
                <div className="flex items-center">
                  <GoogleIcon className="h-6 w-6" />
                  <div className="ml-3 flex-1 font-bold">Google</div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
