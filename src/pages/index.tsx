import type { NextPage } from "next";
import { UserNoteList } from "src/components/NoteList";
import { Anchor } from "src/components/shared/Button";
import { InputSearch1 } from "src/components/shared/InputSearch1";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import { useAuth } from "src/pages-component/auth/useAuth";

const Index: NextPage = () => {
  // ユーザ情報
  const { profileFromGoogle } = useAuth();
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
        <Anchor key="write memo" variant="solid-blue" href={"/memos/new"} className="h-10 px-4">
          メモを書く
        </Anchor>,
        "profile",
      ]}
    >
      <div className="space-y-7">
        <InputSearch1 />
        <UserNoteList userId={user.id} />
      </div>
    </Layout>
  );
};

export default Index;
