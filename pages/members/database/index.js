import React, { ChangeEvent, useEffect, useState } from 'react'
import Head from 'next/head'
import Database from '../../../components/database'
import Breadcrumb from '../../../components/Breadcrumb'
import { getData } from '../../../utils/fetchData'
import Pagination from '@mui/material/Pagination';
import { useTheme } from 'next-themes'
import filterSearch from '../../../utils/filterSearch'
import { useRouter } from 'next/router'


const Page = ({props}) => {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const [totalPage, setTotalPage] = useState();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const [data, setData] = useState(props?.data);
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const handlePageChange = (event, value)=> {
       filterSearch({router, page: value})
       
  }
  
  
  useEffect(() => {
    setData(props?.data);
    setTotalPage(props?.pageCount)
    setCurrentPage(Number(props.currentPage));
    setMounted(true);
  }, [props.data]);
 
  return (
    <React.Fragment>
      <Head>
        <title>Database</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className='p-5 min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200'>
             <Breadcrumb title='Members' subtitle='Database' />
             <Database data={data} />
            <Pagination
             page={currentPage}
             onChange={handlePageChange}
             sx={{
              "& .MuiPaginationItem-root": {
                color: currentTheme === "dark" ? "white" : "black"
              },
             }} count={totalPage} color="standard" />
          </div>
      </main>
    </React.Fragment>
  )
}
export async function getServerSideProps({ query }) {
    const page = query.page || 1;
    const search = query.search || "all";
    const res = await getData(
      `members/approved/public?search=${search}&page=${page}&limit=12`
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
export default Page