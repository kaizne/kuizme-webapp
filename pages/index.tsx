import Head from 'next/head'
import Scroll from '../components/Home/Scroll'
import Section from '../components/Home/Section'

const IndexPage = ({ quizData, tokyoData, demonSlayer, trending, popular }) => {
    return (
        <>
        <Head>
            <title>Kuizme - The Home of Quizzes</title>
            <meta name='description' content='Test your knowledge of your favourite animes, 
            TV series, and movies, or find out which character you are. Visit Kuizme for more!'></meta>
        </Head>
        <div className='flex flex-col items-center'>
            <Scroll />
            <Section title='Trending' category={''} entries={trending}  />
            <Section title='Popular' category={''} entries={popular}  />
            <Section title='Demon Slayer' category={'demon-slayer'} entries={demonSlayer} />
        </div>
        </>
    )
}

export default IndexPage

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
        }
    }
}
