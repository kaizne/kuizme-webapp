import Intro from '../components/Intro'
import Body from '../components/Body'
import Conclusion from '../components/Conclusion'
import { useState, useEffect } from 'react'

const Quiz = ({ quizData }) => {
    const [data, setData] = useState({quizData})
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)
    const [start, setStart] = useState(false)
    const [finish, setFinish] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)

    useEffect(() => {
        setTotal(Object.entries(quizData.info).length)
    }, [])

    return (
        <div className='grid place-items-center scroll-smooth font-Poppins'>
            <div className='flex flex-col w-72 mt-20'>
                {start === false ?
                    <Intro title={quizData.title} intro={quizData.intro} setStart={setStart} />
                    : <div></div>
                }
                {start === true ?
                    <Body info={quizData.info} images={quizData.image} 
                          score={score} setScore={setScore} 
                          setFinish={setFinish}
                          currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} />
                    : <div></div>
                }
                {finish === true ? 
                    <Conclusion score={score} total={total} /> : 
                    <div></div>
                }
            </div>
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
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${params.quiz}?populate=*`)
    const data = await res.json()
    const quizData = data.data.attributes
    return {
        props: {
            quizData
        }
    }
}
