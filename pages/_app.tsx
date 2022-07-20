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
        <link rel='stylesheet' href='...' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Roboto:wght@400;500;700&display=swap' rel='stylesheet' />
        <script defer data-domain='kuizme.com' src='https://plausible.io/js/plausible.js' />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`} />
        <script dangerouslySetInnerHTML={{
          __html: 
            `window.dataLayer = window.dataLayer || []
              function gtag() { dataLayer.push(arguments) }
              gtag('js', new Date())
              gtag('config', '${process.env.GOOGLE_ANALYTICS}', { page_path: window.location.pathname })
            `,
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6765404626601198"
                crossOrigin="anonymous"></script>
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
