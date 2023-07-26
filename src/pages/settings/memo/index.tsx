import type { NextPage } from "next";
import { RecursiveList } from "src/components/shared/List";
import { Layout } from "src/pages-layout";

const SettingsMemo: NextPage = () => {
  return (
    <Layout left="close" center="マイページ">
      <RecursiveList
        list={[
          {
            title: "設定",
            items: [{ label: "テーマ", href: "/settings/memo/theme" }],
          },
          {
            title: "サポート",
            items: [
              { label: "利用規約", href: "/settings/memo/terms" },
              { label: "プライバシーポリシー", href: "/settings/memo/privacy" },
              { label: "お問い合わせ", href: "##" },
            ],
          },
        ]}
      />
    </Layout>
  );
};

export default SettingsMemo;
