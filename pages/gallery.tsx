import React from "react";
import Head from "next/head";
import Gallery from "../components/pages/gallery";
import Breadcrumb from "../components/Breadcrumb";

export interface MediaProps {
  _id: string;
  file: string;
  caption: string;
  addToHome: boolean;
}

export interface Props {
  data: MediaProps[];
}
const Page: React.FC = () => {

  return (
    <React.Fragment>
      <Head>
        <title>Gallery</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-5 min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
          <Breadcrumb title="Gallery" />
          <Gallery />
        </div>
      </main>
    </React.Fragment>
  );
};

export default Page;
