import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>dev.vinayakakv</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="overflow-y-auto">
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  )
}

export default MyApp
