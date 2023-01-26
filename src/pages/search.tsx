import type { NextPage } from "next";
import type { ComponentProps } from "react";
import { useState } from "react";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { SearchIcon } from "src/components/icon/SearchIcon";
import { XIcon } from "src/components/icon/XIcon";
import { SearchHistories } from "src/components/SearchHistories";
import { SearchResults } from "src/components/SearchResults";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistory } from "src/types/types";

// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

const Search: NextPage = () => {
  const [value, setValue] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleChange: ComponentProps<"input">["onChange"] = (e) => {
    setValue(e.currentTarget.value);
  };

  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    setKeyword(value);
    const req: Pick<SearchHistory, "keyword"> = { keyword };
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
    <div className="flex flex-col overscroll-none h-screen">
      <header>
        <div className="w-3/5 mx-auto flex flex-col mt-4">
          <div className="flex flex-row items-center">
            <div className="flex-1">
              <div className="flex  mr-4">
                <Button
                  linkProps={{ href: `/users/${user.id}` }}
                  className="hover:bg-gray-100 rounded-full"
                  bgColor="transparent"
                  size="extrasmall"
                >
                  <ChevronLeft />
                </Button>
              </div>
            </div>
            <div className="flex-auto items-center m-0">
              <form onSubmit={handleSubmit}>
                <InputText
                  className="w-full"
                  startIcon={<SearchIcon className="my-auto mr-2 w-6 h-6 text-gray-200" />}
                  placeholder="検索"
                  value={value}
                  onChange={handleChange}
                />
              </form>
            </div>
            <div className="flex-1 w-6">
              <div className="flex flex-row justify-end ">
                <Button
                  button
                  className="hover:bg-gray-100 rounded-full"
                  bgColor="transparent"
                  size="extrasmall"
                  onClick={handleClose}
                >
                  <XIcon className="my-auto w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="w-3/5 mx-auto">{keyword === "" ? <SearchHistories /> : <SearchResults keyword={keyword} />}</div>
    </div>
  );
};

export default Search;
