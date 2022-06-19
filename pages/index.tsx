import Head from 'next/head'
import Section from '../components/Home/Section'
import Trending from '../components/Home/Trending'

const IndexPage = ({ quizData }) => {
    return (
    <div className='min-h-screen'>
        <Head>
            <title>Kuizme - The Home of Quizzes</title>
            <meta name='description' content='Test your knowledge of your favourite animes, 
            TV series, and movies, or find out which character you are. Visit Kuizme for more!'></meta>
        </Head>
        <Trending title='Trending' quizData={quizData} />
        <Section title='Latest' quizData={quizData} />
        <Section title='Naruto' quizData={quizData} />
        <Section title='Demon Slayer' quizData={quizData} />
    </div>
    )
}

export default IndexPage

export async function getStaticProps({ params }) {
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?populate=*`)
    const data = await res.json()
    const quizData = data.data
    
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
            quizData
        }
    }
}
