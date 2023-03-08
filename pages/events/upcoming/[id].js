import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getData } from "../../../utils/fetchData";
import Detailed from "../../../components/events/upcoming/detailed";

const Page = ({ props }) => {
  const [data, setData] = useState(props?.data);

  useEffect(() => {
    setData(props?.data);
  }, [props.data]);

  return (
    <React.Fragment>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.shortDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.shortDescription} />
        <meta property="og:image" content={data.photo} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
          <Detailed data={data} />
        </div>
      </main>
    </React.Fragment>
  );
};
export async function getServerSideProps({ query }) {
  const id = query.id;
  const res = await getData(`admin/event/${id}`);

  return {
    props: {
      props: {
        data: res.data,
      },
    },
  };
}
export default Page;
