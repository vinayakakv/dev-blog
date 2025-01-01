import '@styles/fonts.css'
import '@styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Navbar } from '@components/Navbar'
import { Footer } from '@components/Footer'
import { DefaultSeo, WebPageJsonLd } from 'next-seo'
import { Analytics } from '@vercel/analytics/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>vinayakakv</title>
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
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Navbar />
      <DefaultSeo
        title="vinayakakv"
        description="Dev Blog of Vinayaka K V"
        openGraph={{
          type: 'website',
          url: 'https://vinayakakv.com',
          locale: 'en_US',
          profile: {
            firstName: 'Vinayaka',
            lastName: 'K V',
          },
        }}
        twitter={{
          handle: '@me.vinayakakv',
          cardType: 'summary_large_image',
        }}
        canonical="https://vinayakakv.com"
      />
      <WebPageJsonLd
        description="Dev Blog of Vinayaka K V"
        id="https://vinayakakv.com"
        lastReviewed={new Date().toISOString()}
        reviewedBy={{
          type: 'Person',
          name: 'Vinayaka K V',
        }}
      />
      <div id="contents">
        <main className="mt-20">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  )
}

export default MyApp
