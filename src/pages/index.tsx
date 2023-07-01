import type { NextPage } from "next";
import Link from "next/link";
import { UserNoteList } from "src/components/NoteList";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import { useAuth } from "src/pages-component/auth/useAuth";

const Index: NextPage = () => {
  const { profileFromGoogle } = useAuth();

  // ユーザ情報
  const user = profileFromGoogle
    ? {
        id: profileFromGoogle.id ?? "",
        name: profileFromGoogle.name ?? "",
        avatarUrl: profileFromGoogle.avatarUrl ?? "",
      }
    : EXAMPLE_USER_01;

  return (
    <Layout
      left="memo"
      right={[
        <Button key="write memo" variant="solid-blue" linkProps={{ href: "/memos/new" }} className="h-10 px-4">
          メモを書く
        </Button>,
        "profile",
      ]}
    >
      <div className="space-y-7">
        <Link href="/search" legacyBehavior>
          <a className="block rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
            <InputSearch placeholder="メモを検索する" disabled />
          </a>
        </Link>

        <UserNoteList userId={user.id} />
      </div>
    </Layout>
  );
};

export default Index;
