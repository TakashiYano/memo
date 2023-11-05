import { tv } from "tailwind-variants";

import { NoteList } from "@/app/(home)/_component/NoteContent/NoteList";
import { type SearchPageProps } from "@/app/search/_component/type";
import { type Label } from "@/lib/label/type";
import { type NoteDisplayType } from "@/lib/memo/type";
import { type ProfileIdType } from "@/lib/profile/type";

type SearchListProps = SearchPageProps & { notes: NoteDisplayType[] } & {
  availableLabels: Label[];
} & ProfileIdType;

const searchList = tv({
  slots: {
    base: "space-y-4 p-4",
    body: "text-lg opacity-70 text-indigo-12 dark:text-indigodark-12",
    title: "text-xl font-bold text-indigo-12 dark:text-indigodark-12",
  },
});

export const SearchList = (props: SearchListProps) => {
  const { availableLabels, notes, profile, searchParams } = props;
  const { base, body, title } = searchList();

  return (
    <section className={base()}>
      <h2 className={title()}>{searchParams.q ? `「${searchParams.q}」で検索` : "メモ一覧"}</h2>
      {notes.length !== 0 ? (
        <NoteList notes={notes} availableLabels={availableLabels} profile={profile} />
      ) : (
        <p className={body()}>メモが見つかりませんでした！</p>
      )}
    </section>
  );
};
