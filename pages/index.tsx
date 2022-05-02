import Link from 'next/link'
import Nav from '../components/Nav'
import New from '../components/New'
import Footer from '../components/Footer'

const IndexPage = ({ quizData }) => {
    console.log(quizData)
    return (
    <div>
        <Nav />
        <div className='min-h-screen'>
          <New quizData={quizData}/>
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
    return {
        props: {
            quizData
        }
    }
}
