import React, { useContext } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/admin/scenes/layout";
import ApprovedMembers from "../../components/admin/scenes/approved";
import { Context, StoreProps } from "../../store/store";

const Page: NextPage = () => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  if (auth?.user?.role !== "admin") return null;
  return (
    <React.Fragment>
      <Head>
        <title>Approved Members</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="app">
          <ApprovedMembers />
        </main>
      </Layout>
    </React.Fragment>
  );
};

export default Page;
