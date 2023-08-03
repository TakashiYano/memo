import type { NextPage } from "next";
import type { ListNoteType } from "src/api/handler/note/type";
import { NoteList, NoteWriteButton } from "src/component/Note";
import { InputSearch1 } from "src/pages-component/Index";
import { Layout } from "src/pages-layout/Layout";

const data: ListNoteType[] = [
  {
    id: "a9gVKV12YV1o0wyk74x",
    excerpt:
      "ウェブサイト（英: website）は、World Wide Web (WWW) 上にあり、一般に特定のドメイン名の下にある複数のウェブページの集まりのこと。サイトと呼ばれることもある。企業などの団体が自身を紹介するため自ら構築したサイトを、その団体の公式サイトなどと呼ぶ。\n\nホ",
    public: true,
    updatedOn: "2023-07-24T14:10:30.538Z",
  },
  {
    id: "9_0SrJE92WGz_fkd-tXGq",
    excerpt:
      "広義には、社会的ネットワークの構築の出来るサービスやウェブサイトであれば、ソーシャル・ネットワーキング・サービス（以下、SNS）またはソーシャル・ネットワーキング・サイトと定義される。この為、電子掲示板も広義的にはSNSに含まれることがある。\n\n狭義には、SNSとは人と人とのつな",
    public: true,
    updatedOn: "2023-07-24T06:37:03.004Z",
  },
];

const Index: NextPage = () => {
  return (
    <Layout left="memo" right={[<NoteWriteButton key="write" />, "profile"]}>
      <div className="space-y-7">
        <InputSearch1 />
        <NoteList data={data} />
      </div>
    </Layout>
  );
};

export default Index;
