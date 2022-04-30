import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kuizme</title>
        <link rel='shortcut icon' href='/favicon.ico?' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap' rel='stylesheet'/>
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp
