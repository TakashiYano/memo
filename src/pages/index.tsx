import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEventHandler } from "react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { UserNoteList } from "src/components/NoteList";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import { useAuth } from "src/pages-component/auth/useAuth";
import { useDebouncedCallback } from "use-debounce";

const Index: NextPage = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  // ユーザ情報
  const { profileFromGoogle } = useAuth();
  const user = profileFromGoogle
    ? {
        id: profileFromGoogle.id ?? "",
        name: profileFromGoogle.name ?? "",
        avatarUrl: profileFromGoogle.avatarUrl ?? "",
      }
    : EXAMPLE_USER_01;

  const debounced = useDebouncedCallback((value: string) => {
    try {
      router.push(`/search?q=${value}`);
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, 1000);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = e.target.value;
      setInputValue(value);

      return debounced(e.currentTarget.value);
    },
    [debounced]
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = inputValue;
    router.push(`/search?q=${value}`);
  };

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
        <form onSubmit={handleSubmit}>
          <InputSearch placeholder="検索" value={inputValue} onChange={handleChange} autoFocus />
        </form>
        <UserNoteList userId={user.id} />
      </div>
    </Layout>
  );
};

export default Index;
