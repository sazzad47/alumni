import React from 'react'
import Head from 'next/head'
import Hero from '../components/home/hero'
import Gallery from '../components/home/gallery'
import Statistics from '../components/home/Statistics'
import Feedback from '../components/home/feedback'
import ContactInfo from '../components/home/ContactInfo'
import Subscription from '../components/home/subscription'


const Page = () => {

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full max-w-full bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200'>
         <Hero />
         <Statistics />
         <Subscription />
         <Gallery />
         <Feedback />
         <ContactInfo />
      </main>
    </React.Fragment>
  )
}

export default Page