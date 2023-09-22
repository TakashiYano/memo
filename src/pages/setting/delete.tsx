/* eslint-disable import/no-default-export */
/* eslint-disable func-style */
import { useCallback } from "react";
import type { NextPage } from "next";

import { Button } from "src/component/Button";
import { RecursiveList } from "src/component/List";
import { Layout } from "src/pages-layout";

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
              items: [
                {
                  button: (
                    <Button
                      variant="solid-gray"
                      className="px-5 py-2 text-sm text-red-500"
                      onClick={handleDeleteMemo}
                    >
                      削除する
                    </Button>
                  ),
                  label: "Memoのデータを削除",
                },
              ],
              title: "サービスの削除",
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default SettingDelete;
