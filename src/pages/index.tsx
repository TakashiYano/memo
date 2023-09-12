import type { NextPage } from "next";
import { NoteList, NoteWriteButton } from "src/component/Note";
import { InputSearch1 } from "src/pages-component/Index";
import { Layout } from "src/pages-layout/Layout";

const Index: NextPage = () => {
  return (
    <Layout left="memo" right={[<NoteWriteButton key="write" />, "profile"]}>
      <div className="space-y-7">
        <InputSearch1 />
        <NoteList />
      </div>
    </Layout>
  );
};

export default Index;
