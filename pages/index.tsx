import Head from 'next/head'
import Scroll from '../components/Home/Scroll'
import Section from '../components/Home/Section'
import { useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

const IndexPage = ({ quizData, tokyoData, demonSlayer, trending, popular, trivia }) => {
    
    const consentProperty = 'cookieConsent'
    const [showConsent, setShowConsent] = useState(false)
    
    const saveToLocalStorage = () => localStorage.setItem(consentProperty, 'consent')

    useEffect(() => {
        const timer = setTimeout(() => {
            if (checkForShowConsent(consentProperty)) {
                setShowConsent(true)
            }
        }, 2000);
    }, [])

    return (
        <>
        <Head>
            <title>Kuizme - The Home of Quizzes</title>
            <meta name='description' content='Test your knowledge of your favourite animes, 
            TV series, and movies, or find out which character you are. Visit Kuizme for more!'></meta>
        </Head>
        <div className='flex flex-col items-center mb-4 md:mb-8'>
            <Section title='Trending' category={''} entries={trending}  />
            <Scroll />
            <Section title='Popular' category={''} entries={popular}  />
            <Section title='Demon Slayer' category={'demon-slayer'} entries={demonSlayer} />
            <Section title='Trivia' category={''} entries={trivia} />
        </div>
        <div className={`flex flex-row items-center justify-center sticky bottom-0 w-full bg-indigo-600 gap-x-2 
        sm:gap-x-4 md:gap-x-6 lg:gap-x-8 py-3 ${showConsent ? 'none' : 'hidden'}`}>
            <p className='text-xs md:text-sm text-white w-5/6'>We and our partners use cookies to personalize your experience
            and for analytics purposes. By using our website and services, you agree to our use of
            cookies as described in our <a href='/privacy' 
            className='hover:cursor-pointer font-semibold'>Privacy Policy</a>.</p>
            <XIcon className='h-[1rem] w-[1rem] hover:cursor-pointer'
            onClick={() => { saveToLocalStorage(); setShowConsent(false) }}></XIcon>
        </div>
        <div className={` ${showConsent ? 'none' : 'hidden'}`}>

        </div>
        </>
    )
}

export default IndexPage

function checkForShowConsent(consentProperty) {
    return !localStorage.getItem(consentProperty)
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?populate=*`)
    const data = await res.json()
    const quizData = data.data

    const tokyoRes = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?filters[subcategory]=tokyo-revengers&populate=*')
    const tokyo = await tokyoRes.json()
    const tokyoData = tokyo.data

    const demonSlayerRes = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?filters[subcategory]=demon-slayer&populate=*')
    const demonSlayerData = await demonSlayerRes.json()
    const demonSlayer = demonSlayerData.data

    const trendingRes = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?filters[label]=trending&populate=*')
    const trendingData = await trendingRes.json()
    const trending = trendingData.data

    const popularRes = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?filters[label]=popular&populate=*')
    const popularData = await popularRes.json()
    const popular = popularData.data

    const triviaRes = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?filters[group]=trivia&populate=*')
    const triviaData = await triviaRes.json()
    const trivia = triviaData.data
    
    /*
    const trendingUrl = 'https://plausible.io/api/v1/stats/breakdown?site_id=kuizme.com&period=6mo&property=event:page&limit=5'
    
    const trendingRes = await fetch(trendingUrl, {
        credentials: 'include',
        headers: {
            'Authorization': 'Bearer uhnl6-_T00g8LIVe2lAdSBG6VfSNOAHXxFlfu7kQKDiKrAF8YtbgyQUgHI2L8BAk'
        }
    })
    const trendingData = await trendingRes.json()
    const trending = trendingData
    */

    return {
        props: {
            quizData,
            tokyoData,
            demonSlayer,
            trending,
            popular,
            trivia,
        }
    }
}
