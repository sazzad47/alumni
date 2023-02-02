import React, { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/admin/scenes/layout'
import PendingMembers from '../../components/admin/scenes/pendings'
import { Context, StoreProps } from '../../store/store'


const Page: NextPage = () => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  if (auth?.user?.role !== "admin") return null;
  return (
    <React.Fragment>
      <Head>
        <title>Pending Members</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>

      <main className="app">
          <PendingMembers/>
      </main>
      </Layout>
    </React.Fragment>
  )
}

export default Page