import { useState } from 'react'
import Intro from '../components/Intro'
import Body from '../components/Body'
import Conclusion from '../components/Conclusion'

const Quiz = ({ quizData }) => {
    const [data, setData] = useState({quizData})
    return (
        <div>
            <Intro title={quizData.title} intro={quizData.intro}/>
            <p>{quizData.intro}</p>
        </div>
    )
}

export default Quiz

export async function getStaticPaths() {
    const paths = []
    const res = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes')
    const data = await res.json()
    data.data.map(elem => paths.push({ params: { quiz: elem.attributes.slug } }))
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${params.quiz}`)
    const data = await res.json()
    const quizData = data.data.attributes
    return {
        props: {
            quizData
        }
    }
}
