import React from "react";
import Head from "next/head";
import Donation from "../components/donation";
import Breadcrumb from "../components/Breadcrumb";
import { getData } from "../utils/fetchData";

const Page = ({ props }: { props: any }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Donate</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-5 min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
          <Breadcrumb title="Donate" />
          <Donation contents={props?.subscription} />
        </div>
      </main>
    </React.Fragment>
  );
};
export async function getServerSideProps() {
  const subscription = await getData(`admin/subscription`);

  return {
    props: {
      props: {
        subscription: subscription.content,
      },
    },
  };
}
export default Page;
