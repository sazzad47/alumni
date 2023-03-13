import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getData } from "../utils/fetchData";
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
const Page: React.FC<Props> = ({ data }) => {
  const [acceptedData, setAcceptedData] = useState(data);

  useEffect(() => {
    setAcceptedData(data);
  }, [data]);

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
          <Gallery data={acceptedData} />
        </div>
      </main>
    </React.Fragment>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const media = await getData(`admin/media`);

  return {
    props: {
      data: media.content,
    },
  };
};
export default Page;
