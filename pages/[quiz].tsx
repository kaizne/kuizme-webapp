import { useState, useEffect, useRef } from 'react'
import Head from 'next/head'
import Intro from '../components/Quiz/Intro'
import Body from '../components/Quiz/Body'
import Conclusion from '../components/Quiz/Conclusion'
import axios from 'axios'

const Quiz = ({ quizData }) => {
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(0)
    const [start, setStart] = useState(false)
    const [finish, setFinish] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [tally, setTally] = useState(createTally(Object.entries(quizData.info).length))
    const [difficulty, setDifficulty] = useState(0)
    const conclusionRef = useRef(null)
    const imageUrlArray = []
    if (quizData.type === 1) 
    for (let i = 0; i < quizData.image.data.length; i++) {
        imageUrlArray.push(findImage(quizData.info[i+1], quizData.image, quizData.type))
    }
    
    useEffect(() => {
        if (quizData.limit !== null) { 
            setTotal(quizData.limit) 
        }
        else { 
            setTotal(10)
        }
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
    const animeTitle = findAnimeTitle()

    const scrollConclusion = () => conclusionRef.current?.scrollIntoView({ behavior: 'smooth' })

    const incrementPlay = () => {
        fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${quizData.slug}/play`, {
            method: 'PATCH',
        })
    }

    const incrementLike = async () => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${quizData.slug}/like`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
    }

    const decrementLike = async () => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${quizData.slug}/dislike`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
    }

    const updateLibrary = async () => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/users/updateLibrary', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: quizData.slug }),
        })
        
    }

    const updateUser = () => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/users/me', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('user', data)
        })
    }

    const updateConclusionStats = async (slug, key) => {
        fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${slug}/conclusion?key=${key}`, {
            method: 'PATCH'
        })
    }

    let infoCopy = []

    if (quizData.type === 0) {
        infoCopy = JSON.parse(JSON.stringify(Object.entries(quizData.info)))
    }

    let count = 0
    if (infoCopy.length === Object.entries(quizData.info).length) {
        infoCopy.forEach(entry => {
            if (quizData.limit !== null) {
                if (entry[0] > quizData.limit) {
                    count++
                }
            }
            else {
                if (entry[0] > 10) {
                    count++
                } 
            }
        })
    }

    let numQuestions = 10

    if (quizData.limit !== null) {
        infoCopy.splice(quizData.limit, count)
        numQuestions = quizData.limit
    }
    else {
        infoCopy.splice(10, count)
    }

    const titleAndMeta = returnTitleAndMeta(quizData.type, quizData.title, animeTitle)

    const parseDate = (d: string) => {
        const date = new Date(d)
        const dateStr = date.toDateString().slice(3)
        const newDateStr = dateStr.slice(0, 7) + ',' + dateStr.slice(7)
        return newDateStr
    }

    return (
        <>
        <Head>
            {titleAndMeta}
            <meta property='og:description' content={quizData.intro} />
            <meta property='og:image' content={quizData.featured} />
            <meta property='og:image:width' content='1200' />
            <meta property='og:image:height' content='630' />
        </Head>
        <div className={`flex flex-col flex-1 bg-white
                        ${!start ? 'none' : 'hidden'}`}>
            <Intro title={quizData.title} 
                    intro={quizData.intro}
                    introText={quizData.introText} 
                    setStart={setStart}
                    plays={quizData.plays} 
                    likes={quizData.likes} 
                    publishedAt={parseDate(quizData.publishedAt)} 
                    incrementPlay={incrementPlay}
                    featured={quizData.featured.data.attributes.url}
                    section={quizData.section}
                    difficulty={difficulty} setDifficulty={setDifficulty}
                    label={quizData.label}/>
        </div>
        <div className={`flex flex-col flex-1 pt-10 bg-slate-50 
                        ${start && !finish ? 'none' : 'hidden'}`}>                
            <Body info={quizData.info} 
                    infoCopy={infoCopy}
                    images={quizData.image}
                    size={numQuestions}
                    setScore={setScore}
                    setFinish={setFinish}
                    currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                    type={quizData.type}
                    entries={quizData.entry}
                    sections={quizData.section}
                    setTally={setTally} scrollConclusion={scrollConclusion}
                    difficulty={difficulty} setDifficulty={setDifficulty}
                    start={start} />
        </div>
        <div ref={conclusionRef} className={`flex flex-col flex-1
                                            ${finish ? 'none' : 'hidden'}`}> 
            <Conclusion type={quizData.type} score={score} total={total} 
                        character={calculateTally(tally, quizData.info)} 
                        characterImageUrl={findImage(calculateTally(tally, quizData.info), quizData.image, quizData.type)}
                        conclusion={calculateConclusionTally(tally, quizData.conclusion)}
                        category={quizData.category}
                        subcategory={quizData.subcategory}
                        title={quizData.title}
                        imageUrls={imageUrlArray}
                        triviaScore={calculateTriviaTally(tally)}
                        incrementLike={incrementLike}
                        decrementLike={decrementLike}
                        updateLibrary={updateLibrary} 
                        slug={quizData.slug}
                        conclusionStats={quizData.conclusionStats}
                        conclusionCharacters={quizData.info}
                        conclusionIndex={calculateConclusionTallyIndex(tally, quizData.conclusion)}
                        updateConclusionStats={updateConclusionStats} /> 
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

const calculateConclusionTallyIndex = (tally, conclusion) => {
    if (conclusion !== null) {
        const max = Math.max(...tally)
        const index = tally.indexOf(max) + 1
        return index
    }
    return
}

const calculateTriviaTally = (tally) => {
    return tally[0]
}

const findImage = (name: string, images, type) => {
    if (type !== 0 && type !== 2 && type !== 3) {
        const searchName = name.toLowerCase().replace(/ /g, '-')
        for (let image of images.data) {
            const imageName = image.attributes.name.split('.', 1)[0]
            if (searchName === imageName)
                return image.attributes.url
        }
    }
    return ''
}

function returnTitleAndMeta(type, title, animeTitle) {
    switch (type) {
        case 0:
            if (title.includes('Quiz')) {
                return (
                <>
                <title>{title}- Kuizme</title> 
                <meta name='description' content={`How well do you know the characters from ${animeTitle}? Play the ${title} to find out now!`}></meta>
                </>
                )
            }
            return (
            <>
            <title>{title} Quiz - Kuizme</title> 
            <meta name='description' content={`How well do you know ${animeTitle}? Play the ${title} quiz to find out now!`}></meta>
            </>
            )
        case 1:
            if (title.includes('Character')) { 
                return (
                <>
                <title>{title} - Kuizme</title>
                <meta name='description' content={`Have you ever wondered which ${animeTitle} character you are? Take the ${title} quiz to find out now!`}></meta> 
                </>
                )
            }
            else if (title.includes('Boyfriend')) {
                return (
                <>
                <title>{title} - Kuizme</title>
                <meta name='description' content={`Who would your boyfriend be in ${animeTitle}? Take the ${title} quiz to find out now!`}></meta>
                </>
                )
            }
            else if (title.includes('Boyfriend')) {
                return (
                <>
                <title>{title} - Kuizme</title>
                <meta name='description' content={`Who would your boyfriend be in ${animeTitle}? Take the ${title} quiz to find out now!`}></meta>
                </>
                )
            }
            else if (title.includes('Breathing')) {
                return (
                <>
                <title>{title} - Kuizme</title>
                <meta name='description' content={`Have you ever wondered which ${animeTitle} breathing style you would use? Take the ${title} quiz to find out now!`}></meta> 
                </>
                )
            }
            return (
                <>
                <title>{title} - Kuizme</title>
                <meta name='description' content={`Try the ${title} quiz now if you love ${animeTitle}, or visit Kuizme for more quizzes like this one!`}></meta> 
                </>
            )
        case 2:
            return (
            <>
            <title>{title} - Kuizme</title> 
            <meta name='description' content={`How well do you know ${animeTitle}? Play the ${title} quiz to find out now!`}>
            </meta>
            </>
            )
    }
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
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${params.quiz}?populate=featured,image,entry.media,section.entry`)
    const data = await res.json()
    const quizData = data.data.attributes
    return {
        props: {
            quizData
        },
        revalidate: 10,
    }
}
