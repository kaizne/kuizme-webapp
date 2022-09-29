import { useEffect, useState } from 'react'
import Head from 'next/head'
import Intro from '../components/Quiz/Intro'
import Body from '../components/Quiz/Body'
import Conclusion from '../components/Quiz/Conclusion'
import Transition from '../components/Quiz/Transition'

const Quiz = ({ quizData, id, commentsData }) => {
    const [score, setScore] = useState(0)
    const [total, setTotal] = useState(10)
    const [start, setStart] = useState(false)
    const [finish, setFinish] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [tally, setTally] = useState(createTally(Object.entries(quizData.info).length))
    const [difficulty, setDifficulty] = useState(0)

    const [transition, setTransition] = useState(false)
    const [comments, setComments] = useState(commentsData)

    const [opening, setOpening] = useState()

    const imageUrlArray = []
    if (quizData.type === 1) {
        for (let i = 0; i < quizData.image.data.length; i++) {
            imageUrlArray.push(findImage(quizData.info[i + 1], quizData.image, quizData.type))
        }
    }

    useEffect(() => {
        if (transition) {
            if (quizData.type === 0 && quizData.section.length > 0) setTimeout(() => { setStart(true) }, 2000)
            else setStart(true)
        }
    }, [start, transition])


    useEffect(() => {
        if (quizData.type === 0 && quizData.section.length > 0) {
            const section = quizData.section[difficulty]
            const opening = section.opening
            setOpening(opening)
        }
    }, [difficulty])

    const findAnimeTitle = () => {
        const animeTitleArray = quizData.subcategory.split('-')
        let animeTitle = ''
        for (let i = 0; i < animeTitleArray.length; i++) {
            if (animeTitleArray[i] === 'on' || animeTitleArray === 'x')
                animeTitle = animeTitle + ' ' + animeTitleArray[i]
            else
                animeTitle = animeTitle + ' ' + animeTitleArray[i].charAt(0).toUpperCase() + animeTitleArray[i].slice(1)
        }
        return animeTitle
    }
    const animeTitle = findAnimeTitle()

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

    const updateConclusionStats = async (slug, key, difficulty = null) => {
        if (difficulty) {
            fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${slug}/conclusion?difficulty=${difficulty}&key=${key}`, {
                method: 'PATCH'
            })
        }
        else {
            fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${slug}/conclusion?key=${key}`, {
                method: 'PATCH'
            })
        }
    }

    const postComment = async (content, threadOf = null) => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        if (jwt) {
            let data
            if (threadOf) data = { content: content, threadOf: threadOf }
            else data = { content: content }
            await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/comments/api::quiz.quiz:${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            setComments(await getComments())
        }
    }

    const updateComment = async (commentId, content) => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        if (jwt) {
            const data = { content: content }
            await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/comments/api::quiz.quiz:${id}/comment/${commentId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            setComments(await getComments())
        }
    }

    const deleteComment = async (commentId) => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        const getUser = async () => {
            const response =
                await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/users/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    }
                })
            return response.json()
        }
        if (jwt) {
            const user = await getUser()
            await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/comments/api::quiz.quiz:${id}/comment/${commentId}?authorId=${user.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            setComments(await getComments())
        }
    }

    const upvoteComment = async (slug, commentId) => {
        const jwt = JSON.parse(localStorage.getItem('jwt'))
        if (jwt) {
            await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${slug}/upvote?commentId=${commentId}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            setComments(await getComments())
        }
    }

    const getComments = async () => {
        const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/comments/api::quiz.quiz:${id}`)
        const data = await res.json()
        return data
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
                {quizData.meta ? 
                <><title>{quizData.meta.title}</title><meta name='description' content={quizData.meta.description}></meta></> 
                : titleAndMeta}
                <meta property='og:description' content={quizData.intro} />
                <meta property='og:image' content={quizData.featured.data.attributes.url} />
                <meta property='og:image:width' content='1200' />
                <meta property='og:image:height' content='630' />
                <meta property='og:url' content={`https://www.kuizme.com/${quizData.slug}`} />
            </Head>
            { !start && !transition &&
                <div className='flex flex-col flex-1 bg-white'>
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
                        label={quizData.label}
                        comments={comments} postComment={postComment}
                        setTransition={setTransition} />
                </div>
            }
            { !start && transition && quizData.type === 0 && opening && quizData.section.length > 0 &&
                <div className='flex flex-col flex-1 pt-10 bg-slate-50'>
                    <Transition title={quizData.title} difficulty={difficulty} opening={opening} /> 
                </div> 
            }
            { start && !finish &&
                <div className='flex flex-col flex-1 pt-10 bg-slate-50'>
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
                        setTally={setTally}
                        difficulty={difficulty} setDifficulty={setDifficulty}
                        start={start} />
                </div>
            }
            { finish && 
                <div className='flex flex-col flex-1'>
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
                        updateConclusionStats={updateConclusionStats}
                        comments={comments} postComment={postComment} updateComment={updateComment} deleteComment={deleteComment} upvoteComment={upvoteComment}
                        upvotes={quizData.comments}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        setStart={setStart}
                        setTransition={setTransition}
                        setCurrentQuestion={setCurrentQuestion}
                        setScore={setScore}
                        setFinish={setFinish} />
                </div>
            }
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
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes/${params.quiz}?populate=featured,image,entry.media,section.media,section.entry.media,section.opening`)
    const data = await res.json()
    const quizData = data.data.attributes

    // Comments use the ID of quiz.
    const id = data.data.id
    const commentsRes = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/comments/api::quiz.quiz:${id}`)
    const commentsData = await commentsRes.json()

    return {
        props: {
            quizData,
            id,
            commentsData
        },
        revalidate: 10,
    }
}
