import { XMarkIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
import type { SearchHistoryType } from "src/api/handler/searchHistory/type";
import type { UserType } from "src/api/handler/user/type";
import { Error } from "src/component/Error";
import type { SWRResponse } from "swr";
import useSWR from "swr";

const user: UserType = {
  id: "engineer",
  name: "yanot",
  avatarUrl: "/mocks/avatar01.jpg",
};

export const SearchHistories: FC = () => {
  const { data, error, mutate } = useSWR<SearchHistoryType[]>(`/users/${user.id}/searchHistories`);

  if (error) {
    return <Error />;
  }

  if (!data) {
    return null;
  }

  return (
    <ul className="space-y-1">
      {data.map((searchHistory) => {
        return (
          <li key={searchHistory.id}>
            <HistoryItem {...searchHistory} mutate={mutate} />
          </li>
        );
      })}
    </ul>
  );
};

type HistoryItemProps = SearchHistoryType & { mutate: SWRResponse<SearchHistoryType[], Error>["mutate"] };

const HistoryItem: FC<HistoryItemProps> = (props) => {
  const handleHistoryClick = async () => {
    // 検索結果のアイテムをクリックしたときの処理
    alert(`${props.keyword}で検索`);
  };

  const handleHistoryDeleteClick = async () => {
    // deleteメソッド
    await fetch(`/users/${user.id}/searchHistories/${props.id}`, {
      method: "delete",
    });
    // 検索履歴を取得し直す
    await props.mutate();
  };

  return (
    <div className="flex items-center">
      <button type="button" className="flex-1 p-2.5 text-left" onClick={handleHistoryClick}>
        {props.keyword}
      </button>
      <button type="button" className="grid h-9 w-9 shrink-0 place-items-center" onClick={handleHistoryDeleteClick}>
        <XMarkIcon className="h-5 w-5 text-gray-300" />
      </button>
    </div>
  );
};