import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Kuizme</title>
        <link rel='shortcut icon' href='/favicon.png?' />
      </Head>
      <div className='flex flex-col min-w-screen min-h-screen font-Poppins '>
        <Nav />
        <Component {...pageProps} />
        {
        //<Footer />
        }
      </div>
    </>
  );
}

export default MyApp
