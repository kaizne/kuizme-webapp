import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Intro from '../components/Quiz/Intro'
import Body from '../components/Quiz/Body'
import Conclusion from '../components/Quiz/Conclusion'

const Quiz = ({ quizData }) => {
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)
    const [start, setStart] = useState(false)
    const [finish, setFinish] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [tally, setTally] = useState(createTally(Object.entries(quizData.info).length))
    const conclusionRef = useRef(null)

    useEffect(() => {
        setTotal(Object.entries(quizData.info).length)
    }, [])

    const findAnimeTitle = () => {
        const animeTitleArray = quizData.subcategory.split('-')
        let animeTitle = ''
        for (let i = 0; i < animeTitleArray.length; i++) {
            if (animeTitleArray[i] === 'on' || animeTitleArray === 'x')
                animeTitle =  animeTitle + ' ' + animeTitleArray[i]
            else 
                animeTitle =  animeTitle + ' ' + animeTitleArray[i].charAt(0).toUpperCase() + animeTitleArray[i].slice(1) 
        } 
        return animeTitle
    }

    const scrollConclusion = () => conclusionRef.current?.scrollIntoView({ behavior: 'smooth' })

    const incrementPlay = () => {
        fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${quizData.slug}/play`, {
            method: 'PATCH',
        })
    }

    return (
        <>
        <Head>
]           { quizData.type === 0 ?
                <>
                <title>{quizData.title} Quiz - Kuizme</title> 
                <meta name='description' content={`How well do you know ${findAnimeTitle()}? Play the ${quizData.title} quiz to find out now!`}>
                </meta>
                </>
                :
                <>
                <title>{quizData.title} - Kuizme</title>
                { quizData.title.includes('Breathing') || quizData.title.includes('friend') ?
                <>
                { quizData.title.includes('Boyfriend') ? 
                <>
                <meta name='description' content={`Who would your boyfriend be in ${findAnimeTitle()}? Take the ${quizData.title} quiz to find out now!`}>
                </meta> 
                </>
                :
                <>
                <meta name='description' content={`Have you ever wondered which ${findAnimeTitle()} breathing style you would use? Take the ${quizData.title} quiz to find out now!`}>
                </meta> 
                </>
                }
                </>
                :
                <>
                <meta name='description' content={`Have you ever wondered which ${findAnimeTitle()} character you are? Take the ${quizData.title} quiz to find out now!`}>
                </meta>
                </> 
                }
                </>
            }  
        </Head>
        <div className='min-h-screen flex flex-col mt-6 md:mt-12 scroll-smooth'>
                <div className={`${start === false ? 'none' : 'hidden'}`}>
                <Intro title={quizData.title} intro={quizData.intro} setStart={setStart}
                       plays={quizData.plays} incrementPlay ={incrementPlay}
                       featured={quizData.featured.data.attributes.url} />
                </div>
            {start === true ?
                <Body info={quizData.info} images={quizData.image}
                      setScore={setScore}
                      setFinish={setFinish}
                      currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                      type={quizData.type}
                      entries={quizData.entry}
                      setTally={setTally} scrollConclusion={scrollConclusion} />
                : <></>
            }
            {finish === true ? 
                <div ref={conclusionRef}> 
                    <Conclusion type={quizData.type} score={score} total={total} 
                                character={calculateTally(tally, quizData.info)} 
                                characterImageUrl={findImage(calculateTally(tally, quizData.info), quizData.image)}
                                conclusion={calculateConclusionTally(tally, quizData.conclusion)}
                                category={quizData.category}
                                subcategory={quizData.subcategory} /> 
                </div>
                : <></>  
            }
        </div>
        </>
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

const calculateConclusionTally = (tally, conclusion) => {
    if (conclusion !== null) {
        const max = Math.max(...tally)
        const index = tally.indexOf(max) + 1
        return conclusion[index] 
    }
    return
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
        },
        revalidate: 10,
    }
}
