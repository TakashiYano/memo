import type { NextPage } from "next";
import Link from "next/link";
import { NoteList } from "src/components/NoteList";
import { Avatar } from "src/components/shared/Avatar";
import { Anchor } from "src/components/shared/Button";
import { InputSearch1 } from "src/components/shared/InputSearch1";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_02 } from "src/models/user";

const user = EXAMPLE_USER_02;

const UsersUserId: NextPage = () => {
  return (
    <Layout
      left="memo"
      right={[
        <Anchor key="write memo" variant="solid-blue" href={"/memos/new"} className="h-10 px-4">
          メモを書く
        </Anchor>,
        "profile",
      ]}
    >
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
