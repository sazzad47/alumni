import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import Hero from '../components/home/hero'
import Gallery from '../components/home/gallery'
import Statistics from '../components/home/Statistics'
import Feedback from '../components/home/feedback'
import ContactInfo from '../components/home/ContactInfo'
import Subscription from '../components/home/subscription'
import { getData } from '../utils/fetchData'



const Page = ({props}: {props: any}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(()=> {
     if (contentRef.current) {
      contentRef.current.innerHTML = '<h1>hello</h1>'
     }
  })
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full max-w-full bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200'>
       {/* <div ref={contentRef}></div> */}
         <Hero contents={props.coverPhotos} />
         <Statistics/>
         <Subscription contents={props.subscription} />
         <Gallery contents={props.media} />
         <Feedback contents={props.reviews} />
         <ContactInfo contents={props.contact} />
      </main>
    </React.Fragment>
  )
}
export async function getServerSideProps() {
  const contactInfo = await getData(`admin/contactInfo`);
  const reviews = await getData(`admin/reviews`);
  const media = await getData(`admin/media`);
  const coverPhotos = await getData(`admin/coverPhoto`);
  const subscription = await getData(`admin/subscription`);

  return {
    props: {
      props: {
        contact: contactInfo.content,
        reviews: reviews.content,
        media: media.content,
        coverPhotos: coverPhotos.content,
        subscription: subscription.content,
      },
    },
  };
}
export default Page