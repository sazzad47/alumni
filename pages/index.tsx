import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Hero from '../components/home/Hero'



const Page: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
       
         <Hero/>
      </main>
    </React.Fragment>
  )
}

export default Page