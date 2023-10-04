import { type NoteListsType } from "@/lib/memo/type";

export type SearchPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export type SearchListProps = SearchPageProps & NoteListsType;
