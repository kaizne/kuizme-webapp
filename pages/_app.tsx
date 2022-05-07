import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Nav from '../components/Nav';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kuizme</title>
        <link rel='shortcut icon' href='/favicon.png?' />
      </Head>
      <div className='font-Poppins bg-gray-100'>
        <Nav />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp
