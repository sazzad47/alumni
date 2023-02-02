import React, { useContext } from 'react'
import Head from 'next/head'
import Layout from '../../components/admin/scenes/layout'
import AdminDashboard from '../../components/admin/scenes/dashboard'
import { Context, StoreProps } from '../../store/store'


const Page = () => {
  const { state } = useContext(Context) as StoreProps;
  const { auth } = state;
  if (auth?.user?.role !== "admin") return null;
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