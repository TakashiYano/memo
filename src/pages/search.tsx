import { XMarkIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import type { DOMAttributes } from "react";
import { useState } from "react";
import { SearchNoteList } from "src/components/NoteList";
import { SearchHistories } from "src/components/SearchHistories";
import { InputSearch } from "src/components/shared/InputSearch";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistoryType } from "src/types/types";

const user = EXAMPLE_USER_01;

const Search: NextPage = () => {
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleChange: DOMAttributes<HTMLInputElement>["onChange"] = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = async (e) => {
    e.preventDefault();
    setKeyword(value);
    const req: Pick<SearchHistoryType, "keyword"> = { keyword };
    await fetch(`/users/${user.id}/searchHistories`, {
      method: "post",
      body: JSON.stringify(req),
    });
  };

  const handleClose = () => {
    setValue("");
    setKeyword("");
  };

  return (
    <Layout
      isHeaderNarrow
      left="back"
      center={
        <form className="flex-1" onSubmit={handleSubmit}>
          <InputSearch placeholder="検索" value={value} onChange={handleChange} autoFocus />
        </form>
      }
      right={[
        <button key="delete" type="button" className="grid place-items-center w-9 h-9" onClick={handleClose}>
          <XMarkIcon className="w-5 h-5" />
        </button>,
      ]}
    >
      {keyword === "" ? <SearchHistories /> : <SearchNoteList userId={user.id} keyword={keyword} />}
    </Layout>
  );
};

export default Search;
