import Nav from '../components/Nav'
import Section from '../components/Section'
import Footer from '../components/Footer'
import Trending from '../components/Trending'

const IndexPage = ({ quizData, trending }) => {
    console.log(trending)
    return (
    <div>
        <Nav />
        <div className='min-h-screen'>
          <Trending quizData={quizData} />
          <Section title='LATEST' quizData={quizData} type={2} />
        </div>
        <Footer />
    </div>
    )
}

export default IndexPage

export async function getStaticProps({ params }) {
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?populate=*`)
    const data = await res.json()
    const quizData = data.data
    const trendingUrl = 'https://plausible.io/api/v1/stats/breakdown?site_id=kuizme.com&period=6mo&property=event:page&limit=5'
    
    const trendingRes = await fetch(trendingUrl, {
        credentials: 'include',
        headers: {
            'Authorization': 'Bearer uhnl6-_T00g8LIVe2lAdSBG6VfSNOAHXxFlfu7kQKDiKrAF8YtbgyQUgHI2L8BAk'
        }
    })
    const trendingData = await trendingRes.json()
    const trending = trendingData
    
    return {
        props: {
            quizData,
            trending
        }
    }
}
