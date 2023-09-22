/* eslint-disable import/no-default-export */
/* eslint-disable func-style */
import { useCallback } from "react";
import type { NextPage } from "next";

import { Button } from "src/component/Button";
import { GoogleIcon } from "src/component/Icon";
import { List } from "src/component/List";
import { Layout } from "src/pages-layout";

const SettingAccount: NextPage = () => {
  const handleGoogle = useCallback(() => {
    alert("Google");
  }, []);

  return (
    <Layout left="back" center="account">
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
    </Layout>
  );
};

export default SettingAccount;
