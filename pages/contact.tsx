import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Breadcrumb from '../components/Breadcrumb';
import Contact from '../components/contact';
import ContactInfo from '../components/contact/ContactInfo';
import { getData } from '../utils/fetchData';



const Page = ({props}: {props: any}) => {
  
  return (
    <React.Fragment>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <div className='p-5 min-h-[90vh] flex flex-col gap-5 items-center justify-start bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200'>
             <Breadcrumb title='Contact' />
             <Contact/>
             <ContactInfo contents={props.data} />
          </div>
      </main>
    </React.Fragment>
  )
}
export async function getServerSideProps() {
  const res = await getData(`admin/contactInfo`);

  return {
    props: {
      props: {
        data: res.content,
      },
    },
  };
}
export default Page