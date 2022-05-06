import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kuizme</title>
        <link rel='shortcut icon' href='/favicon.png?' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
