import type { NextPage } from "next";
import Link from "next/link";
import { UserNoteList } from "src/components/NoteList";
import { Avatar } from "src/components/shared/Avatar";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const Index: NextPage = () => {
  return (
    <Layout
      left="memo"
      right={[
        <Link href="/memos/new" key="write memo" legacyBehavior>
          <a className="grid h-9 place-items-center rounded-full bg-blue-500 px-4 text-sm font-bold text-white">
            メモを書く
          </a>
        </Link>,
        "profile",
      ]}
    >
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar alt={user.name} src={user.avatarUrl} className="h-16 w-16" />
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
            <Link href="/settings/my/user/edit" legacyBehavior>
              <a className="text-sm font-bold text-blue-500 hover:underline">プロフィール設定</a>
            </Link>
          </div>
        </div>

        <Link href="/search" legacyBehavior>
          <a className="block">
            <InputSearch placeholder="メモを検索する" />
          </a>
        </Link>

        <UserNoteList userId={user.id} />
      </div>
    </Layout>
  );
};

export default Index;
