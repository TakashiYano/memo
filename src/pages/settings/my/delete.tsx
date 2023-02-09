import type { NextPage } from "next";
import { Header } from "src/components/shared/Header";
import { RecursiveList } from "src/components/shared/List";

const SettingsAccount: NextPage = () => {
  return (
    <div className="pb-20">
      <Header left="back" center="Account" />

      <div className="mx-auto max-w-screen-sm">
        <h1 className="px-4 text-xl font-bold">データの削除</h1>

        <div className="mt-8">
          <RecursiveList
            list={[
              {
                title: "サービスの削除",
                items: [
                  {
                    label: "Memoを削除",
                    button: {
                      label: (
                        <div className="py-2 px-5 text-sm font-bold text-red-500 bg-gray-200 rounded-full">
                          削除する
                        </div>
                      ),
                      onClick: () => {
                        alert(123);
                      },
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
