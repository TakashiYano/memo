import type { NextPage } from "next";
import { NoteList } from "src/components/NoteList";
import { Anchor } from "src/components/shared/Button";
import { InputSearch1 } from "src/components/shared/InputSearch1";
import { Layout } from "src/components/shared/Layout";
import { EXAMPLE_MY_NOTE_LIST } from "src/models/note";

const data = EXAMPLE_MY_NOTE_LIST;

const Index: NextPage = () => {
  return (
    <Layout
      left="memo"
      right={[
        <Anchor key="write memo" variant="solid-blue" href={"/memos/new"} className="h-10 px-4">
          メモを書く
        </Anchor>,
        "profile",
      ]}
    >
      <div className="space-y-7">
        <InputSearch1 />
        <NoteList data={data} />
      </div>
    </Layout>
  );
};

export default Index;
