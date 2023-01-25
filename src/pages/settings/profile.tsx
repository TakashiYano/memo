import type { NextPage } from "next";
import Link from "next/link";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { Button } from "src/components/shared/Button";
import { ProfileSetting } from "src/components/shared/ProfileSetting";

const Settings: NextPage = () => {
  return (
    <div className="max-w-screen-sm mx-auto p-4">
      <p className="relative my-4 flex items-center">
        <Link href="/" legacyBehavior>
          <a className="absolute left-1">
            <ChevronLeft />
          </a>
        </Link>
        <span className="block text-center w-full text-xl font-bold">プロフィール設定</span>
      </p>
      <ProfileSetting />
      <Button button className="w-full mt-8">
        保存する
      </Button>
    </div>
  );
};

export default Settings;
