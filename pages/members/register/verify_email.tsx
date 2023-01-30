import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import VerifyEmail from "../../../components/register/VerifyEmail";
import Breadcrumb from "../../../components/Breadcrumb";

const Page: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Verify Email Address</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-5 min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
          <Breadcrumb title="Members" subtitle="Register" />
          <VerifyEmail />
        </div>
      </main>
    </React.Fragment>
  );
};

export default Page;
