import { SearchList } from "@/app/search/_component/SearchContent/SearchList";
import { type SearchPageProps } from "@/app/search/_component/type";
import { getLabels } from "@/lib/supabase/label";
import { getSearchNotes } from "@/lib/supabase/note";
import { getProfile } from "@/lib/supabase/user";

export const metadata = {
  title: "Search",
};

export const fetchCache = "default-no-store";

const SearchPage = async (props: SearchPageProps) => {
  const { searchParams } = props;
  const notes = await getSearchNotes({ searchParams });
  const availableLabels = await getLabels();
  const profile = await getProfile();
  if (!profile) {
    return null;
  }

  return (
    <>
      <SearchList
        searchParams={searchParams}
        notes={notes}
        availableLabels={availableLabels}
        profile={profile}
      />
    </>
  );
};

export default SearchPage;
