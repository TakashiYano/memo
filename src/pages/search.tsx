import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ChangeEventHandler, FormEvent } from "react";
import { useMemo } from "react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { UserNoteList } from "src/components/NoteList";
import { Button } from "src/components/shared/Button";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import { useDebouncedCallback } from "use-debounce";

const user = EXAMPLE_USER_01;

const Search: NextPage = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(router.query.q);

  const debounced = useDebouncedCallback((value: string) => {
    try {
      if (!value) {
        router.push("/search");
      } else {
        router.push(`/search?q=${value}`);
      }
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

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/search?q=${inputValue}`);
    },
    [router, inputValue]
  );

  const handleClose = useCallback(() => {
    setInputValue("");
    router.push("/search");
  }, [router]);

  const right = useMemo(() => {
    if (!inputValue) return;
    return [
      <Button key="delete" variant="ghost" className="h-10 w-10" onClick={handleClose}>
        <XMarkIcon className="h-5 w-5" />
      </Button>,
    ];
  }, [handleClose, inputValue]);

  return (
    <Layout
      isHeaderNarrow
      left={
        <Link href={"/"}>
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
      }
      center={
        <form className="flex-1" onSubmit={handleSubmit}>
          <InputSearch placeholder="検索" value={inputValue} onChange={handleChange} autoFocus />
        </form>
      }
      right={right}
    >
      <UserNoteList userId={user.id} />
    </Layout>
  );
};

export default Search;
