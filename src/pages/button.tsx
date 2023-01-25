import type { NextPage } from "next";
import { useState } from "react";
import { SignOut } from "src/components/icon/SignOut";
import { Layout } from "src/components/layout";
import { Button } from "src/components/shared/Button";

const ButtonPage: NextPage = () => {
  const [count, setCount] = useState(0);

  const handleAddCount = () => {
    setCount((preCount) => {
      return preCount + 1;
    });
  };

  return (
    <Layout>
      <h2 className="text-gray-800 dark:text-white">使い回せるボタンのコンポーネント</h2>
      <div className="flex flex-col">
        <div className="my-4 ml-4">
          <span className="m-auto">ボタンクリック テスト用のカウント：{count}</span>
        </div>
        <div className="flex flex-row justify-start flex-none">
          <div className="mx-auto">
            <Button button bgColor="blue" onClick={handleAddCount}>
              メモを書く
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="blue" onClick={handleAddCount} disabled>
              メモを書く
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="orange" className="w-auto" onClick={handleAddCount}>
              公開中
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="orange" className="w-auto" onClick={handleAddCount} disabled>
              公開中
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="gray" onClick={handleAddCount}>
              キャンセル
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="blue" onClick={handleAddCount} disabled>
              キャンセル
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-start">
          <div className="mx-auto">
            <Button button bgColor="red" className="w-32" onClick={handleAddCount}>
              削除する
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="red" className="w-32" onClick={handleAddCount} disabled>
              削除する
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="white" textColor="blue" onClick={handleAddCount}>
              プロフィール設定
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="white" textColor="blue" onClick={handleAddCount} disabled>
              プロフィール設定
            </Button>
          </div>
          <div className="mx-auto">
            <Button button bgColor="white" textColor="red" startIcon={<SignOut />} onClick={handleAddCount}>
              ログアウト
            </Button>
          </div>
          <div className="mx-auto">
            <Button
              button
              bgColor="white"
              textColor="red"
              startIcon={<SignOut disabled />}
              onClick={handleAddCount}
              disabled
            >
              ログアウト
            </Button>
          </div>
        </div>
        <div>
          <Button linkProps={{ href: "/signin" }}>サインイン</Button>
        </div>
      </div>
    </Layout>
  );
};

export default ButtonPage;
