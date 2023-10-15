import { SearchList } from "@/app/search/_component/SearchContent/SearchList";
import { type SearchPageProps } from "@/app/search/_component/type";
import { getSearchNotes } from "@/lib/supabase/note";

export const metadata = {
  title: "Search",
};

const SearchPage = async (props: SearchPageProps) => {
  const { searchParams } = props;
  const notes = await getSearchNotes({ searchParams });

  return (
    <>
      <SearchList searchParams={searchParams} notes={notes} />
    </>
  );
};

export default SearchPage;
