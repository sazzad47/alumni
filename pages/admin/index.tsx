import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../../components/admin/scenes/layout'
import AdminDashboard from '../../components/admin/scenes/dashboard'


const Page: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>

      <main>
          <AdminDashboard/>
      </main>
      </Layout>
    </React.Fragment>
  )
}

export default Page