import React, { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import ResetPassword from '../../components/account/settings/ResetPassword'
import { BallTriangle } from 'react-loader-spinner'
import { Container } from '@mui/material'
import { Context, StoreProps } from '../../store/store'


const Page: NextPage = () => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;

  if (!auth?.token) {
    return (
      <Container component="main" className="min-h-[100vh] flex items-center justify-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          visible={true}
        />
      </Container>
    );
  }
  return (
    <React.Fragment>
      <Head>
        <title>Password Reset</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <div className='min-h-[100vh] py-5 w-full flex items-center justify-center max-w-full bg-slate-200 dark:bg-zinc-800 text-slate-900 dark:text-slate-200'>
            <ResetPassword/>
          </div>
      </main>
    </React.Fragment>
  )
}

export default Page