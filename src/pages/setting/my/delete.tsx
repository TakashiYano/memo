import type { NextPage } from "next";
import { useCallback } from "react";
import { Button } from "src/component/Button";
import { RecursiveList } from "src/component/List";
import { Layout } from "src/pages-layout/Layout";

const SettingDelete: NextPage = () => {
  const handleDeleteMemo = useCallback(() => {
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
                  label: "Memoのデータを削除",
                  button: (
                    <Button variant="solid-gray" className="px-5 py-2 text-sm text-red-500" onClick={handleDeleteMemo}>
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

export default SettingDelete;
