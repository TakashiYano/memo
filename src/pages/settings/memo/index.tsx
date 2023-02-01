import { XMarkIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import Link from "next/link";
import { RecursiveList } from "src/components/shared/List";

const SettingsMemo: NextPage = () => {
  return (
    <div className="p-4 mx-auto max-w-screen-sm">
      <p className="flex relative items-center my-4">
        <Link href="/" legacyBehavior>
          <a className="absolute left-1">
            <XMarkIcon className="w-5 h-5" />
          </a>
        </Link>
        <span className="block w-full text-xl font-bold text-center">マイページ</span>
      </p>
      <div className="mt-12">
        <RecursiveList
          list={[
            {
              title: "設定",
              items: [
                { label: "通知", href: "/settings/memo/notification" },
                { label: "テーマ", href: "/settings/memo/theme" },
              ],
            },
            {
              title: "サポート",
              items: [
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "利用規約", href: "/terms" },
                { label: "お問い合わせ", href: "/contact" },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default SettingsMemo;
