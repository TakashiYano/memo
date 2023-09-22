import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { Anchor } from "src/component/Button";
import { NoteWriteButton } from "src/component/Note";
import { InputSearch2 } from "src/pages-component/search";
import { Layout } from "src/pages-layout";

const Search: NextPage = () => {
  return (
    <Layout
      left="memo"
      right={[
        <Anchor variant="ghost" href={"/search"} key="search">
          <MagnifyingGlassIcon className="h-6 w-6" key="search" />
        </Anchor>,
        "profile",
        <NoteWriteButton key="write" />,
      ]}
    >
      <InputSearch2 />
    </Layout>
  );
};

export default Search;
