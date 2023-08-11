import type { NextPage } from "next";
import Link from "next/link";
import type { UserType } from "src/api/handler/user/type";
import { Avatar } from "src/component/Avatar";
import { NoteList, NoteWriteButton } from "src/component/Note";
import { InputSearch1 } from "src/pages-component/Index";
import { Layout } from "src/pages-layout/Layout";

const user: UserType = {
  id: "engineer",
  name: "yanot",
  avatarUrl: "/mocks/avatar01.jpg",
};

const UsersUserId: NextPage = () => {
  return (
    <Layout left="memo" right={[<NoteWriteButton key="note" />, "profile"]}>
      <div className="space-y-7">
        <div className="flex items-center space-x-4">
          <Avatar alt={user.name} src={user.avatarUrl} className="h-16 w-16" />
          <div className="flex flex-col">
            <span className="font-bold">{user.name}</span>
          </div>
        </div>

        <Link href="/search" legacyBehavior>
          <a className="block">
            <InputSearch1 placeholder="メモを検索する" />
          </a>
        </Link>

        <NoteList />
      </div>
    </Layout>
  );
};

export default UsersUserId;
