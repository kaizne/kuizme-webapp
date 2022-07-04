// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
