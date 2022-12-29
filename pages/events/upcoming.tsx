import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Typography } from '@mui/material'


const Page: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Upcoming events</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <div className='p-5 pt-[10vh] min-h-[90vh] flex items-start justify-center'>
             <Typography>
              Upcoming events page
             </Typography>
          </div>
      </main>
    </React.Fragment>
  )
}

export default Page