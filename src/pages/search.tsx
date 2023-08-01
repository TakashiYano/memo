import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { Anchor } from "src/component/Button";
import { NoteList } from "src/component/Note";
import { InputSearch2 } from "src/pages-component/search";
import { Layout } from "src/pages-layout/Layout";

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
