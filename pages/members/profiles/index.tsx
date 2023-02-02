import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { getData } from '../../../utils/fetchData'
import Profile from '../../../components/database/profile'



const Page = ({props}: {props: any}) => {
    const [data, setData] = useState(props?.data);
 
  useEffect(() => {
    setData(props?.data);
  }, [props.data]);


  return (
    <React.Fragment>
      <Head>
        <title>Register</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className='min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200'>
            <Profile data={data} />
          </div>
      </main>
    </React.Fragment>
  )
}
export async function getServerSideProps({ query }: {query: any}) {
    const id = query.id;
    const res = await getData(
      `members/approved/public/${id}`
    );
  
    return {
      props: {
        props: {
          data: res.data
        },
      },
    };
  }
export default Page