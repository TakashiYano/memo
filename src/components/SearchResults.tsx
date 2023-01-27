import type { FC } from "react";
import { MemoCard } from "src/components/users/MemoCard";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { ListNoteType } from "src/types/types";
import useSWR from "swr";

type Props = { keyword: string };

const user = EXAMPLE_USER_01;

export const SearchResults: FC<Props> = (props) => {
  const { data, error } = useSWR(`/users/${user.id}/notes/search/${props.keyword}`);

  if (error) {
    // 検索結果が取得できなかった場合のエラー処理
    return null;
  }

  if (!data) {
    // 検索結果取得時のローディング処理
    return <div>loading</div>;
  }

  return (
    <ul className="space-y-1">
      {data.length > 0 ? (
        data.map((note: ListNoteType) => {
          return (
            <li key={note.id}>
              <MemoCard note={note} />
            </li>
          );
        })
      ) : (
        <div>
          <strong>{props.keyword}</strong>に一致するメモは見つかりませんでした。
        </div>
      )}
    </ul>
  );
};