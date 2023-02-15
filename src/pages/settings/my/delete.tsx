import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "src/components/shared/Button";
import { Layout } from "src/components/shared/Layout";
import { RecursiveList } from "src/components/shared/List";

const SettingsDelete: NextPage = () => {
  const handleDeleteQinMemo = useCallback(() => {
    alert("Memoの削除");
  }, []);

  return (
    <Layout left="back" center="account">
      <h1 className="text-xl font-bold">データの削除</h1>

      <div className="mt-8">
        <RecursiveList
          list={[
            {
              title: "サービスの削除",
              items: [
                {
                  label: "Memoを削除",
                  button: (
                    <Button className="py-2 px-5 text-sm text-red-500 bg-gray-200" onClick={handleDeleteQinMemo}>
                      削除する
                    </Button>
                  ),
                },
              ],
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default SettingsDelete;
