import type { NextPage } from "next";
import Head from "next/head";
import { Layout } from "src/components/layout";

const About: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-gray-800 dark:text-white">About</h2>
    </Layout>
  );
};

export default About;
