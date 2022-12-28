import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BTRI School Alumni Association</title>
        <meta name="description" content="Under development by Sazzad Hossen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div style={{display: 'flex', flexDirection: "column", alignItems: 'center', gap: "2rem"}}>
         <h1>BTRI School Alumni Association</h1>
         <h4>Under development by Sazzad Hossen</h4>
        </div>
      </main>
    </>
  )
}
