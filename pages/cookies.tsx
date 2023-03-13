import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getData } from "../utils/fetchData";
import Cookies from "../components/pages/cookies";
import Breadcrumb from "../components/Breadcrumb";

export interface Data {
  _id: string;
  title: string;
  shortDescription: string;
  keywords: string;
  photo: string;
  detailedPage: string;
}

export interface Props {
  data: Data;
}
const Page: React.FC<Props> = ({ data }) => {
  const [acceptedData, setAcceptedData] = useState(data);

  useEffect(() => {
    setAcceptedData(data);
  }, [data]);

  return (
    <React.Fragment>
      <Head>
        <title>{acceptedData.title}</title>
        <meta name="description" content={acceptedData.shortDescription} />
        <meta name="keywords" content={acceptedData.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={acceptedData.title} />
        <meta
          property="og:description"
          content={acceptedData.shortDescription}
        />
        <meta property="og:image" content={acceptedData.photo} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-5 min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
          <Breadcrumb title="Cookies" />
          <Cookies data={acceptedData} />
        </div>
      </main>
    </React.Fragment>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const id = "6408c09d248c5addb0770377";
  const res = await getData(`page/${id}`);

  return {
    props: {
      data: res.page,
    },
  };
};
export default Page;
