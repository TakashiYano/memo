import { SearchList } from "@/app/search/_component/SearchContent/SearchList";
import { type SearchPageProps } from "@/app/search/_component/type";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Search",
};

const getNotes = async (props: SearchPageProps) => {
  const { searchParams } = props;
  const supabase = createClient();

  if (searchParams.q) {
    const { data, error } = await supabase
      .from("memo_notes")
      .select("id, content, updated_at")
      .textSearch("content", `${searchParams.q}`)
      .order("updated_at", { ascending: false });
    if (error) {
      throw new Error("メモ検索一覧の取得に失敗しました");
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("memo_notes")
      .select("id, content, updated_at")
      .order("updated_at", { ascending: false });
    if (error) {
      throw new Error("メモ検索一覧の取得に失敗しました");
    }
    return data;
  }
};

const SearchPage = async (props: SearchPageProps) => {
  const { searchParams } = props;
  const notes = await getNotes({ searchParams });

  return (
    <>
      <SearchList searchParams={searchParams} notes={notes} />
    </>
  );
};

export default SearchPage;
