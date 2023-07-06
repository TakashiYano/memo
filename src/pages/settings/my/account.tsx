import type { NextPage } from "next";
import { useCallback } from "react";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";
import { Layout } from "src/components/shared/Layout";
import { List } from "src/components/shared/List";

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
