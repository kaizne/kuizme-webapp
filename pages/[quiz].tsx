import { useState, useEffect } from 'react'
import Intro from '../components/Quiz/Intro'
import Body from '../components/Quiz/Body'
import Nav from '../components/Nav'
import Conclusion from '../components/Quiz/Conclusion'

const Quiz = ({ quizData }) => {
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)
    const [start, setStart] = useState(false)
    const [finish, setFinish] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [tally, setTally] = useState(createTally(Object.entries(quizData.info).length))

    useEffect(() => {
        setTotal(Object.entries(quizData.info).length)
    }, [])

    return (
        <div>
            <Nav />
            <div className='grid place-items-center scroll-smooth font-Poppins'>
                <div className='flex flex-col w-72 mt-10 md:mt-16'>
                    {start === false ?
                        <Intro title={quizData.title} intro={quizData.intro} setStart={setStart}
                               featured={quizData.featured.data.attributes.url} />
                        : <div></div>
                    }
                    {start === true ?
                        <Body info={quizData.info} images={quizData.image} 
                              score={score} setScore={setScore} 
                              setFinish={setFinish}
                              currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} 
                              type={quizData.type}
                              entries={quizData.entry}
                              setTally={setTally}
                              tally={tally} />
                        : <div></div>
                    }
                    {finish === true ? 
                        <Conclusion type={quizData.type} score={score} total={total} 
                                    character={calculateTally(tally, quizData.info)} 
                                    characterImageUrl={findImage(calculateTally(tally, quizData.info), quizData.image)} /> 
                        : <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

const createTally = (size) => {
    const arr = []
    for (let i = 0; i < size; ++i)
        arr.push(0)
    return arr
}

const calculateTally = (tally, info) => {
    const max = Math.max(...tally)
    const index = tally.indexOf(max) + 1
    return info[index]
}

const findImage = (name: string, images) => {
    const searchName = name.toLowerCase().replace(/ /g, '-')
    for (let image of images.data) {
        const imageName = image.attributes.name.split('.', 1)[0]
        if (searchName === imageName)
            return image.attributes.url
    }
    return ''
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
