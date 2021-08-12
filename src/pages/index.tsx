import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "src/components/layout";
import type { User, UserPutRequest } from "src/models/user";
import useSWR from "swr";

const Home: NextPage = () => {
  const { data, error } = useSWR<User>("/users/foo");

  const handleClick = async () => {
    const req: UserPutRequest = { id: "foo", name: "エンジニア" };
    // eslint-disable-next-line no-console
    console.log({ ブラウザから送るリクエスト: req });
    const res = await fetch("/users/foo", {
      method: "put",
      body: JSON.stringify(req),
    });
    const json = await res.json();
    // eslint-disable-next-line no-console
    console.log({ サーバーから受け取ったレスポンス: json });
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-gray-800 dark:text-white">Home</h2>
      <button onClick={handleClick}>Button</button>

      <div className="mt-4 text-gray-800 dark:text-white">
        {error ? <div>failed to load</div> : null}
        {data ? (
          <div>
            <Image src={data.avatarUrl} alt={data.name} width={80} height={80} />
            <h2>{data.name}</h2>
          </div>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
