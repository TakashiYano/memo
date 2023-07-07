import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { UserNoteList } from "src/components/NoteList";
import { Button } from "src/components/shared/Button";
import { InputSearch2 } from "src/components/shared/InputSearch2";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

const Search: NextPage = () => {
  return (
    <Layout
      isHeaderNarrow
      left={
        <Button linkProps={{ href: "/" }} variant="ghost" className="h-10 w-10">
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
      }
      center={<InputSearch2 />}
    >
      <UserNoteList userId={user.id} />
    </Layout>
  );
};

export default Search;
