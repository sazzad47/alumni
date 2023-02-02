import React, { useContext } from "react";
import Head from "next/head";
import Uploads from "../../components/admin/scenes/uploads";
import Layout from "../../components/admin/scenes/layout";
import { Context, StoreProps } from "../../store/store";

const Page = () => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  if (auth?.user?.role !== "admin") return null;
  return (
    <React.Fragment>
      <Head>
        <title>Uploads</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className="app">
          <Uploads />
        </main>
      </Layout>
    </React.Fragment>
  );
};

export default Page;
