import type { FC } from "react";
import { XIcon } from "src/components/icon/XIcon";
import { Button } from "src/components/shared/Button";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { SearchHistoryType } from "src/types/types";
import useSWR from "swr";

const user = EXAMPLE_USER_01;

export const SearchHistories: FC = () => {
  const { data, error, mutate } = useSWR<SearchHistoryType[]>(`/users/${user.id}/searchHistories`);

  if (error) {
    // 検索結果が取得できなかった場合のエラー処理
    return null;
  }

  if (!data) {
    // 検索結果取得時のローディング処理
    return null;
  }

  return (
    <ul className="space-y-1">
      {data.map((serchHistory) => {
        const handleHistoryClick = async () => {
          // 検索結果のアイテムをクリックしたときの処理
          alert(`${serchHistory.keyword}で検索`);
        };

        const handleHistoryDeleteClick = async () => {
          await fetch(`/users/${user.id}/searchHistories/${serchHistory.id}`, {
            method: "delete",
          });
          await mutate();
        };

        return (
          <li key={serchHistory.id}>
            <div className="flex">
              <div className="flex-1 my-auto p-2 pl-6 rounded-full hover:bg-gray-100 ">
                <Button
                  button
                  className="w-full"
                  bgColor="transparent"
                  textColor="black"
                  size="extrasmall"
                  justifyContent="justify-start"
                  onClick={handleHistoryClick}
                >
                  <strong>
                    <span className="my-auto">{serchHistory.keyword}</span>
                  </strong>
                </Button>
              </div>
              <Button
                button
                className="hover:bg-gray-100 rounded-full"
                bgColor="transparent"
                textColor="black"
                size="extrasmall"
                onClick={handleHistoryDeleteClick}
              >
                <XIcon className="text-gray-300 my-2 w-6 h-6" />
              </Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};