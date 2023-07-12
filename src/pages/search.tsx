import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { NoteList } from "src/components/NoteList";
import { Anchor } from "src/components/shared/Button";
import { InputSearch2 } from "src/components/shared/InputSearch2";
import { Layout } from "src/components/shared/Layout";

const Search: NextPage = () => {
  return (
    <Layout
      isHeaderNarrow
      left={
        <Anchor href={"/"} variant="ghost" className="h-10 w-10">
          <ChevronLeftIcon className="h-5 w-5" />
        </Anchor>
      }
      center={<InputSearch2 />}
    >
      <NoteList />
    </Layout>
  );
};

export default Search;
