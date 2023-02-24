import type { NextPage } from "next";
import { useCallback } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";
import { Layout } from "src/components/shared/Layout";
import { List } from "src/components/shared/List";

const SettingsAccount: NextPage = () => {
  const handleGoogle = useCallback(() => {
    alert("Google");
  }, []);
  const handleApple = useCallback(() => {
    alert("Apple");
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
                  <GoogleIcon />
                  <div className="ml-3 flex-1 font-bold">Google</div>
                </div>
              ),
              button: (
                <Button className="bg-gray-100 py-2 px-4 text-sm dark:bg-gray-700" onClick={handleGoogle}>
                  解除する
                </Button>
              ),
            },
            {
              label: (
                <div className="flex items-center">
                  <AppleIcon />
                  <div className="ml-3 flex-1 font-bold">Apple</div>
                </div>
              ),
              button: (
                <Button className="bg-blue-500 py-2 px-4 text-sm text-white" onClick={handleApple}>
                  連携する
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
