import '@styles/fonts.css'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Navbar } from '@components/Navbar'
import { Footer } from '@components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>dev.vinayakakv</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Navbar />
      <main className="flex h-full w-full flex-col gap-8 overflow-y-auto">
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  )
}

export default MyApp
