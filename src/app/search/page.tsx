import { NoteList } from "@/app/(home)/_component/Note/NoteList";
import { createClient } from "@/lib/supabase/supabase-server";

type SearchType = {
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getNotes(props: SearchType) {
  const { searchParams } = props;
  const supabase = createClient();

  if (searchParams.q) {
    const { data: notes, error } = await supabase
      .from("memo_notes")
      .select("id, content, updated_at")
      .textSearch("content", `${searchParams.q}`)
      .order("updated_at", { ascending: false });
    if (error) {
      throw new Error("メモ検索一覧の取得に失敗しました");
    }
    return notes;
  } else {
    const { data: notes, error } = await supabase
      .from("memo_notes")
      .select("id, content, updated_at")
      .order("updated_at", { ascending: false });

    if (error) {
      throw new Error("メモ検索一覧の取得に失敗しました");
    }
    return notes;
  }
}

const Search = async (props: SearchType) => {
  const { searchParams } = props;
  const notes = await getNotes({ searchParams });

  return (
    <main className="mx-auto w-full max-w-screen-sm space-y-4 px-4">
      <h2 className="text-xl font-bold">
        {searchParams.q ? `「${searchParams.q}」で検索` : "メモ一覧"}
      </h2>
      {notes.length !== 0 ? (
        <NoteList note={notes} />
      ) : (
        <p className="space-y-5">メモが見つかりませんでした！</p>
      )}
    </main>
  );
};

export default Search;
