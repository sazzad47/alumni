import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Notice from "../../components/notice";
import Breadcrumb from "../../components/Breadcrumb";
import { getData } from "../../utils/fetchData";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "next-themes";
import filterSearch from "../../utils/filterSearch";
import { useRouter } from "next/router";
import { Context } from "../../store/store";
import { GlobalTypes } from "../../store/types";
import { Typography } from "@mui/material";

const Page = ({ props }) => {
  const { state, dispatch } = useContext(Context);
  const { totalPage, currentPage } = state.notice;
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [data, setData] = useState(props?.data);
  const handlePageChange = (event, value) => {
    filterSearch({ router, page: value });
  };

  useEffect(() => {
    setData(props?.data);
    dispatch({
      type: GlobalTypes.NOTICE_PAGE,
      payload: { totalPage: props?.pageCount, currentPage: props?.currentPage },
    });
  }, [props.data]);

  return (
    <React.Fragment>
      <Head>
        <title>Notice</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-5 min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200">
          <Breadcrumb title="Notice" />
          <Notice data={data} />
          {data.length === 0 ? (
            <Typography className="text-2xl">No content found!</Typography>
          ) : (
            <Pagination
              page={Number(currentPage)}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: currentTheme === "dark" ? "white" : "black",
                },
              }}
              count={Number(totalPage)}
              color="standard"
            />
          )}
        </div>
      </main>
    </React.Fragment>
  );
};
export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const search = query.search || "all";
  const res = await getData(
    `admin/notice?search=${search}&page=${page}&limit=12`
  );

  return {
    props: {
      props: {
        data: res.data,
        pageCount: res.pageCount,
        currentPage: res.currentPage,
      },
    },
  };
}
export default Page;
