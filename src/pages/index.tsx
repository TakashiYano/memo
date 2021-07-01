import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "src/components/layout";

const Home: NextPage = () => {
  const handleClick = () => {
    window.alert("Hello, World!");
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-gray-800 dark:text-white">Home</h2>
      <button onClick={handleClick}>Button</button>
    </Layout>
  );
};

export default Home;
