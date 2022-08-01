import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Nav from '../components/Nav/Nav'
import { useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'
import Overlay from '../components/Overlay'

function MyApp({ Component, pageProps }: AppProps) {
  const consentProperty = 'cookieConsent'
  const [showConsent, setShowConsent] = useState(false)
  const [overlay, setOverlay] = useState('')
  
  const saveToLocalStorage = () => localStorage.setItem(consentProperty, 'consent')

  useEffect(() => {
      const timer = setTimeout(() => {
          if (checkForShowConsent(consentProperty)) {
              setShowConsent(true)
          }
      }, 2500);
  }, [])

  return (
    <>
      <Head>
        <title>Kuizme</title>
        <link rel='shortcut icon' href='/favicon.png?' />
      </Head>
      <div className={`flex flex-col min-w-screen font-Poppins
                    ${overlay !== '' ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
        <Nav setOverlay={setOverlay} />
        <Component {...pageProps} />
        <Overlay overlay={overlay} setOverlay={setOverlay} />
        <div className={`flex flex-row items-center justify-center sticky bottom-0 w-full bg-indigo-600 gap-x-2 
        sm:gap-x-4 md:gap-x-6 lg:gap-x-8 py-3 ${showConsent ? 'none' : 'hidden'}`}>
            <p className='text-xs md:text-sm text-white w-5/6'>We and our partners use cookies to personalize your experience
            and for analytics purposes. By using our website and services, you agree to our use of
            cookies as described in our <a href='/privacy' 
            className='hover:cursor-pointer font-semibold'>Privacy Policy</a>.</p>
            <XIcon className='h-[1.5rem] w-[1.5rem] hover:cursor-pointer stroke-white'
            onClick={() => { saveToLocalStorage(); setShowConsent(false) }}></XIcon>
        </div>
      </div>
    </>
  );
}

function checkForShowConsent(consentProperty) {
  return !localStorage.getItem(consentProperty)
}

export default MyApp
