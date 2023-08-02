import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "src/component/Button";
import { GoogleIcon } from "src/component/Icon";
import { List } from "src/component/List";
import { Layout } from "src/pages-layout/Layout";

const SettingsAccount: NextPage = () => {
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
              label: (
                <div className="flex items-center">
                  <GoogleIcon className="h-6 w-6" />
                  <div className="ml-3 flex-1 font-bold">Google</div>
                </div>
              ),
              button: (
                <Button variant="solid-gray" className="px-4 py-2 text-sm" onClick={handleGoogle}>
                  解除する
                </Button>
              ),
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default SettingsAccount;
