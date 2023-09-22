import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { Anchor } from "src/component/Button";
import { NoteList, NoteWriteButton } from "src/component/Note";
import { Layout } from "src/pages-layout";

const Index: NextPage = () => {
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
      <div className="space-y-7">
        <NoteList />
      </div>
    </Layout>
  );
};

export default Index;
