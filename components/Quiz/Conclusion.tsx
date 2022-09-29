import { setDefaultResultOrder } from 'dns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { FacebookIcon, TwitterIcon } from '@remixicons/react/fill'
import {
    ThumbUpIcon, MenuAlt2Icon, ChevronDownIcon, ChevronUpIcon,
    ChevronDoubleRightIcon, ChevronDoubleLeftIcon
} from '@heroicons/react/outline'

import testComments from '../../data/testComments'

const Conclusion = ({ type = 0, score = 0, triviaScore = 0, total = 0, character = '', characterImageUrl = '',
    conclusion = '', category = '', subcategory = '', title = '', imageUrls,
    incrementLike, decrementLike, updateLibrary, slug,
    conclusionStats, conclusionCharacters, conclusionIndex, updateConclusionStats, comments, postComment, updateComment, deleteComment, upvoteComment, upvotes,
    difficulty, setDifficulty, setStart, setTransition, setCurrentQuestion, setScore, setFinish }) => {

    const minComments = 10
    const commentsIncrement = 10
    const characterLimit = 400
    const minReplies = 5
    const repliesIncrement = 5
    
    const refComment = useRef(null)
    const refStats = useRef(null)
    const refFilter = useRef(null)
    const refTextarea = useRef(null)
    const refResetFocus = useRef(null)
    const [forceRenderState, setForceRenderState] = useState(false)
    const [dropDownFilter, setDropDownFilter] = useState(false)
    const [filter, setFilter] = useState('Newest')
    const [commentsShown, setCommentsShown] = useState(Math.min(comments.length, minComments))
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [profile, setProfile] = useState(false)
    const [like, setLike] = useState(false)
    const [error, setError] = useState(false)
    const [likeText, setLikeText] = useState('Add to library')
    const [likeButton, setLikeButton] = useState(false)
    const [disablePointerEvents, setDisablePointerEvents] = useState(false)
    const [characterCounter, setCharacterCounter] = useState(0)
    const [showReplies, setShowReplies] = useState(new Array(Math.min(comments.length, minComments)).fill(false)) // array containing state of replies (shown/hidden)
    const [openReplies, setOpenReplies] = useState(new Array(Math.min(comments.length, minComments)).fill(false)) // array containing state of reply textareas (open/closed)
    const [replyCharacterCounts, setReplyCharacterCounts] = useState(new Array(Math.min(comments.length, minComments)).fill(0))
    const [replyPostText, setReplyPostText] = useState(new Array(Math.min(comments.length, minComments)).fill('Post'))
    const [openDelete, setOpenDelete] = useState(new Array(Math.min(comments.length, minComments)).fill(false))
    const refReplyTextarea = useRef(new Array())
    const refCommentTextarea = useRef(new Array())
    let refNestedReplyTextarea = useRef([...Array(Math.min(comments.length, minComments))].map(e => Array()))
    let refNestedCommentTextarea = useRef([...Array(Math.min(comments.length, minComments))].map(e => Array()))
    const animeTitle = getAnimeTitle(subcategory)
    const [userId, setUserId] = useState(-1)
    const [username, setUsername] = useState('')
    const [profileColour, setProfileColour] = useState('bg-gray-300')
    const [asyncUpvotes, setAsyncUpvotes] = useState(upvotes)
    const [overlay, setOverlay] = useState(false)
    // const jsonCharacterStatsPh = {'0':15,'1':20,'2':5,'3':12,'4':11,'5':5,'6':31,'7':3,'8':9,'9':15,'10':18}
    // variables beginning with character are for type 0 and type 2
    /*const characterStatsArray = Object.values(jsonCharacterStatsPh)
    const characterTotal = characterStatsArray.reduce((partialSum, a) => partialSum + a, 0)
    let characterPartialSums = []
    for (let i = 0; i < characterStatsArray.length; i++) {
        let partialSum = 0
        for (let j = i; j >= 0; j--) {
            partialSum += characterStatsArray[j]
        }
        characterPartialSums.push(partialSum)
    }
    const characterPercentages = []
    for (let element of characterPartialSums) {
        characterPercentages.push(100*(element/characterTotal))
    }
    const relativePercentage = characterPercentages[score-1]*/
    let statsArray = []
    let charactersArray = []
    if (type === 1) {
        statsArray = Object.values(conclusionStats['default'])
        charactersArray = Object.values(conclusionCharacters)
    }
    const keys = Array.from(statsArray.keys()).sort((a, b) => statsArray[b] - statsArray[a])
    const sortedStats = keys.map(i => statsArray[i])
    const sortedCharacters = keys.map(i => charactersArray[i])
    const sortedImageUrls = keys.map(i => imageUrls[i])
    const statsTotal = statsArray.reduce((partialSum, a) => partialSum + a, 0)

    const colourArray = ['bg-indigo-900', 'bg-indigo-800', 'bg-indigo-700', 'bg-indigo-600', 'bg-indigo-500',
        'bg-indigo-400', 'bg-indigo-300', 'bg-violet-400', 'bg-violet-500', 'bg-violet-600', 'bg-violet-700',
        'bg-violet-800', 'bg-violet-900']
    const profileColours = ['bg-red-300', 'bg-orange-300', 'bg-amber-300', 'bg-lime-300',
        'bg-emerald-300', 'bg-cyan-300', 'bg-blue-300', 'bg-indigo-300', 'bg-purple-300', 'bg-fuchsia-300']
    {/* How to save dates for time zone compatibility?
    let commentDate = new Date().toUTCString()
    *save commentDate to the comment object in Strapi
    *retrive commentDate from comment object in Strapi when displaying
    let currentDate = new Date().toUTCString()
    let commentDateObj = new Date(commentDate)
    let currentDateObj = new Date(currentDate)
    const timeElapsed = currentDateObj.valueOf() - commentDateObj.valueOf() * time in milliseconds *
    */}
    let sortedCommmentsArray = comments.sort((a, b) => {
        if (filter === 'Newest') {
            const dateA = new Date(a.createdAt)
            const dateB = new Date(b.createdAt)
            const timeElapsedA = new Date().valueOf() - dateA.valueOf()
            const timeElapsedB = new Date().valueOf() - dateB.valueOf()
            if (timeElapsedA > timeElapsedB) return (1)
            else return (-1)
        }
        else if (filter === 'Most Popular') {
            let likesA = 0
            let likesB = 0
            if (asyncUpvotes) {
                if (asyncUpvotes[a.id]) likesA = asyncUpvotes[a.id].length
                if (asyncUpvotes[b.id]) likesB = asyncUpvotes[b.id].length
            }
            if (a.author.id == userId && b.author.id == userId) {
                return compareLikes(likesA, likesB)
            }
            else if (a.author.id == userId && b.author.id != userId) {
                return (-1)
            }
            else if (a.author.id != userId && b.author.id == userId) {
                return (1)
            }
            else {
                return compareLikes(likesA, likesB)
            }
        }
    }).slice(0, Math.min(comments.length, minComments))
    let init = []
    let initNested = []
    let initNestedReplyCharacterCounts = []
    let initNestedReplyPostText = []
    let initNestedOpenDelete = []
    if (type === 1 && comments.length > 0) {
        for (let i = 0; i < Math.min(comments.length, minComments); i++) {
            init.push(Math.min(sortedCommmentsArray[i].children.length, minReplies))
            initNested.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
            initNestedReplyCharacterCounts.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(0))
            initNestedReplyPostText.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill('Post'))
            initNestedOpenDelete.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
        }
    }
    const [repliesShown, setRepliesShown] = useState(init) // array containing number of replies shown (i.e., if comment has 56 replies we might show 5/25/etc depending on state)
    const [nestedOpenReplies, setNestedOpenReplies] = useState(initNested) // array containing number of nested replies shown (i.e., if comment has 56 replies we might show 5/25/etc depending on state)
    const [nestedReplyCharacterCounts, setNestedReplyCharacterCounts] = useState(initNestedReplyCharacterCounts)
    const [nestedReplyPostText, setNestedReplyPostText] = useState(initNestedReplyPostText)
    const [nestedOpenDelete, setNestedOpenDelete] = useState(initNestedOpenDelete)
    
    useEffect(() => {
        if (localStorage.getItem('jwt')) setProfile(true)
        else setProfile(false)
        document.addEventListener('click', handleClickOutsideFilter, true)
        if (localStorage.getItem('user')) {
            setUserId(JSON.parse(localStorage.getItem('user')).id)
            setUsername(String(JSON.parse(localStorage.getItem('user')).username))
            setProfileColour(profileColours[Number(String(userId).slice(-1))])
            const library = JSON.parse(localStorage.getItem('user')).library
            if (library && library.includes(slug)) {
                setLikeText('Remove from library')
                setLike(true)
            }
        }
        updateConclusionStats(slug, conclusionIndex)
    }, [])

    const handleClickOutsideFilter = (e) => {
        if (refFilter.current && !refFilter.current.contains(e.target))
            setDropDownFilter(false)
    }
    const handleClickPostComment = (e) => {
        if (e.current) {
            if (e.current.value) {
                postComment(e.current.value)
                e.current.value = ''
                e.current.style.height = '38px'
                e.current.style.height = `${e.current.scrollHeight}px`
                setCharacterCounter(e.current.value.length)
            }
        }
    }
    const handleClickPostReply = (e, element) => {
        if (e) {
            if (e.value) {
                postComment(e.value, element.id)
                e.value = ''
                e.style.height = '33px'
                e.style.height = `${e.scrollHeight}px`
            }
        }
    }
    const handleClickUpdate = (e, element) => {
        if (e) {
            if (e.value) {
                updateComment(element.id, e.value)
                setTimeout(() => {
                    e.value = ''
                    e.style.height = '33px'
                    e.style.height = `${e.scrollHeight}px`
                }, 1000)
            }
        }
    }
    const handleClickNestedUpdate = (e, element) => {
        if (e) {
            if (e.value) {
                updateComment(element.id, e.value)
                setTimeout(() => {
                    e.value = ''
                    e.style.height = '33px'
                    e.style.height = `${e.scrollHeight}px`
                }, 1000)
            }
        }
    }
    const handleClickCancelUpdate = (e) => {
        if (e) {
            if (e.value) {
                e.value = ''
                e.style.height = '33px'
                e.style.height = `${e.scrollHeight}px`
            }
        }
    }
    const handleClickCancel = (e) => {
        if (e) {
            if (e.value) {
                e.value = ''
                e.style.height = '33px'
                e.style.height = `${e.scrollHeight}px`
            }
        }
    }
    const handleClickDelete = (element) => {
        deleteComment(element.id)
    }
    const handleClickNestedDelete = (element) => {
        deleteComment(element.id)
    }
    let text = 'Thanks for playing.'
    if (type === 0) { text = calculatePercentageText(score, total) }
    else if (type === 2) { text = calculatePercentageText(triviaScore, total) }
    let endText = 'You are'
    if (title.includes('Breathing')) { endText = 'You got' }
    else if (title.includes('Kin')) { endText = 'You kin' }
    else if (title.includes('Boyfriend')) { endText = 'Your boyfriend is' }

    const router = useRouter()
    const postUrl = router.asPath
    let postTitle = ''
    if (type === 0) postTitle = `I got ${score / total} on this ${subcategory} quiz... let
    me know if you can beat my score.`
    else if (type === 1) postTitle = `I got ${character}! Let me know what you get.`
    else if (type === 2) postTitle = `I got ${triviaScore / total} on this ${subcategory} quiz... let
    me know if you can beat my score.`
    else if (type === 3) postTitle = `I got ${score / total} on this ${subcategory} quiz... let
    me know if you can beat my score.`
    const scrollToComment = () => {
        //refComment.current.scrollIntoView({ behavior: "smooth" })
        refComment.current.scrollIntoView(true)
    }
    const scrollToStats = () => {
        //refStats.current.scrollIntoView({ behavior: "smooth" })
        refStats.current.scrollIntoView(true)
    }

    const likeQuiz = () => {
        if (profile) {
            setLikeButton(true)
            setTimeout(() => setLikeButton(false), 2000)
            if (!like) {
                incrementLike()
                updateLibrary()
                setLikeText('Remove from library')
                setLike(true)
            }
            else if (like) {
                decrementLike()
                updateLibrary()
                setLikeText('Add to library')
                setLike(false)
            }
        } else {
            setError(true)
            setTimeout(() => setError(false), 2000)
        }
    }

    const mode = (difficulty) => {
        switch (difficulty) {
            case 0: return 'Easy'
            case 1: return 'Medium'
            case 2: return 'Hard'
            case 3: return 'Expert'
            default: return 'Easy'
        }
    }

    switch (type) {
        case 0:
            return (
                <div className='flex flex-col flex-1 justify-center items-center'>
                    <div className='font-semibold'>{title}</div>
                    <div className='font-bold text-violet-600'>{mode(difficulty)}</div>
                    <div className='text-3xl text-center font-semibold'>
                        You scored {score}/{total}.
                    </div>
                    <div className='text-xl text-violet-600 w-80 text-center'>{text}</div>
                    <div className='mt-2 text-lg'>Share Your Result</div>
                    <div className='flex flex-row w-80 h-8 justify-center gap-x-2 mb-2'>
                        <a href={`https://facebook.com/sharer.php?u=https://kuizme.com${postUrl}`} target='_blank'
                            className='flex flex-row basis-[47.5%] bg-[#4267B2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            { /* <img src='/facebook.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/> */ }
                            <FacebookIcon className='h-[1.3rem] w-[1.3rem] fill-white' />
                            <p className='text-white'>Facebook</p>
                        </a>
                        <a href={`https://twitter.com/share?url=https://www.kuizme.com${postUrl}&text=${postTitle}`} target='_blank'
                            className='flex flex-row basis-[47.5%] bg-[#1DA1F2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            { /* <img src='/twitter.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/> */ }
                            <TwitterIcon className='h-[1.5rem] w-[1.5rem] fill-white' />
                            <p className='text-white'>Twitter</p>
                        </a>
                    </div>
                    { score < 10 && difficulty < 3 && 
                        <div className='mt-2 w-80 text-center text-sm text-green-600 font-semibold'>
                            Achieve a perfect score to unlock {mode(difficulty + 1)}!
                        </div>
                    }
                    {   /*
                        <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('test'); console.log(comments) }}>
                            Post
                        </button>
                        <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                            Update
                        </button>
                        <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                            Reply
                        </button>
                        <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { deleteComment(comments[0].id); console.log(comments) }}>
                            Delete
                        </button>
                        <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { console.log(comments) }}>
                            Log
                        </button> 
                        */ 
                    }
                    <div className='flex flex-col gap-y-3 w-full mt-2 items-center'>
                        {difficulty < 3 && 
                            <div className={`flex flex-row w-80 rounded justify-center py-2
                                            ${score === 10 ? 'bg-green-500 cursor-pointer' : 'bg-gray-300 cursor-default'}`}>    
                                <button onClick={() => { setStart(false) 
                                                         setTransition(true) 
                                                         setFinish(false)
                                                         setCurrentQuestion(0)
                                                         setScore(0)
                                                         setDifficulty(difficulty + 1) 
                                                        }}
                                        disabled={score <  10}
                                        className='flex flex-row justify-center w-full text-xl text-white font-semibold'>
                                            { score < 10 && 
                                        <div className='relative w-7 h-7'>
                                            <Image src='/lock.svg' layout='fill' />
                                        </div> }
                                    {mode(difficulty + 1)}
                                </button>
                            </div>
                        }
                        <div className='flex flex-row w-80 rounded justify-center py-2 bg-indigo-600 hover:cursor-pointer'>
                            <button onClick={() => { setStart(false) 
                                                     setTransition(true)
                                                     setFinish(false) 
                                                     setCurrentQuestion(0)
                                                     setScore(0)
                                                    }}
                                className='text-xl text-white font-semibold w-full'>
                                Try Again
                            </button>
                        </div>
                    {   /*
                        <div className='flex flex-row mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()} disabled={likeButton}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */
                    }
                    {   /*
                        <div className={`${error ? 'none' : 'invisible' } mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div> 
                        */
                    }
                        
                        <div className='flex flex-row w-80 rounded justify-center py-2 bg-rose-600 hover:cursor-pointer'>
                            <Link href={`/anime/${subcategory}`}>
                                <button className='w-full text-xl text-white font-semibold px-2 md:px-4 2xl:px-8'>
                                    Try Other {animeTitle} Quizzes</button>
                            </Link>
                        </div>
                        <div className='flex flex-row w-80 rounded justify-center py-2 bg-indigo-600 hover:cursor-pointer'>
                            <Link href='/anime'>
                                <button className='text-xl text-white font-semibold w-full'>
                                    Browse Anime Quizzes</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        case 1:
            return (
                <>
                    <div className='fixed h-screen pointer-events-none w-full z-40'>
                        <div className={`flex items-center justify-center top-full sticky bg-indigo-600 
                        py-3 -translate-y-full ${overlay ? 'none' : 'hidden'}`}>
                            <p className='text-sm md:text-base text-white w-5/6 text-center'>
                                Please sign in or sign up for an account to access user features.
                            </p>
                        </div>
                    </div>
                    <div className={`fixed w-full h-screen bg-black opacity-70 z-40 ${!deleteOpen ? 'hidden' : 'none'}`}></div>
                    <input ref={refResetFocus} className='h-0'></input>
                    <div className='flex flex-col flex-1 justify-center items-center bg-white'>
                        <div className='mt-3 text-black text-3xl'>{endText}</div>
                        {characterImageUrl && <Image className='rounded-lg' src={characterImageUrl} width={200} height={200} priority />}
                        <div className='text-3xl mt-1 text-violet-600 font-semibold'>{character}</div>
                        <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] mt-4 p-2 rounded 
                                    text-lg text-center bg-slate-100'>
                            {conclusion}
                        </div>
                        <div className='mt-4 text-lg'>Share Your Result</div>
                        <div className='flex flex-row w-[21rem] h-[2rem] justify-center gap-x-1'>
                            <a href={`https://facebook.com/sharer.php?u=https://kuizme.com${postUrl}`} target='_blank'
                                className='flex flex-row basis-[47.5%] bg-[#4267B2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                                {/*<img src='/facebook.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                                <FacebookIcon className='h-[1.3rem] w-[1.3rem] fill-white' />
                                <p className='text-white'>Facebook</p>
                            </a>
                            <a href={`https://twitter.com/share?url=https://www.kuizme.com${postUrl}&text=${postTitle}`} target='_blank'
                                className='flex flex-row basis-[47.5%] bg-[#1DA1F2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                                {/*<img src='/twitter.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                                <TwitterIcon className='h-[1.5rem] w-[1.5rem] fill-white' />
                                <p className='text-white'>Twitter</p>
                            </a>
                        </div>
                        {/* <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('test'); console.log(comments) }}>
                        Post
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                        Update
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                        Reply
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { deleteComment(comments[0].id); console.log(comments) }}>
                        Delete
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { console.log(comments) }}>
                        Log
                    </button> */}
                        <div className='flex flex-col gap-y-3 w-full mt-6 items-center'>
                            <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-indigo-600 
                    hover:cursor-pointer hover:bg-indigo-700'>
                                <button onClick={() => router.reload()}
                                    className='text-xl text-white font-bold w-full'>
                                    Play Again
                                </button>
                                {/*<div className='flex flex-row mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()} disabled={likeButton}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                                {/*<div className={`${error ? 'none' : 'invisible' } mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                            </div>
                            <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-rose-500
                    hover:cursor-pointer hover:bg-rose-600'>
                                <Link href={`/anime/${subcategory}`}>
                                    <button className='w-full text-xl text-white font-bold px-2 md:px-4 2xl:px-8'>
                                        Try Other {animeTitle} Quizzes</button>
                                </Link>
                            </div>
                            <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-indigo-600
                    hover:cursor-pointer hover:bg-indigo-700'>
                                <Link href={`/anime`}>
                                    <button className='text-xl text-white font-bold w-full'>
                                        Browse Anime Quizzes</button>
                                </Link>
                            </div>
                        </div>
                        <div ref={refStats} className='flex flex-row w-full md:w-3/5 xl:w-2/5 3xl:w-[30%] md:rounded justify-center bg-pink-700 mt-6 py-2 font-semibold'>
                            <p className='text-center text-white text-lg w-5/6'>
                                How Do the Results From Other Users Compare to Yours?</p>
                        </div>
                        <div className='flex flex-col w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] items-start space-y-1 mt-4'>
                            {sortedStats.map((element, index) => {
                                const percentage = (100 * (element / statsTotal)).toFixed(1)
                                const width = 100 * (element / sortedStats[0])
                                let isCharacter = false
                                if (characterImageUrl === sortedImageUrls[index]) isCharacter = true
                                return (
                                    <div key={index} className='flex flex-col w-full'>
                                        <div className={`h-[0.25rem] ${colourArray[index]}`}
                                            style={{ 'width': `${width}%` }}></div>
                                        <div className='flex flex-row items-center mt-[0.2rem]'>
                                            <p className='w-[2.5rem] text-gray-500 text-sm'>{percentage}%</p>
                                            <img src={sortedImageUrls[index]} className='ml-2 h-[2rem] w-[2rem] border-black'></img>
                                            <p className={`${isCharacter ? 'font-semibold text-amber-500' : 'none'} ml-1`}>{sortedCharacters[index]}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <textarea ref={refTextarea} placeholder='Leave a comment...' rows={1} spellCheck='false' className={`resize-none w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] mt-4 
                        bg-gray-200 border-2 border-gray-200 rounded hover:border-gray-300 focus:bg-white placeholder:text-gray-700 
                        focus:border-indigo-600 focus:outline-none md:block px-2 py-1 h-38px scrollbar-hide text-[15.4px] md:text-[14.8px]
                        ${disablePointerEvents ? 'pointer-events-none' : 'none'}`} maxLength={characterLimit} onChange={(event) => {
                                event.target.style.height = '38px'
                                event.target.style.height = `${event.target.scrollHeight}px`
                                if (event.target.value.length > characterLimit) {
                                    event.target.value = event.target.value.substring(0, characterLimit)
                                }
                                setCharacterCounter(event.target.value.length)
                                //scrollToComment()
                        }}></textarea>
                        <div className={`w-11/12 flex flex-row justify-start md:w-3/5 xl:w-2/5 3xl:w-[30%] mt-1 h-[2rem] items-center gap-x-4
                                        ${disablePointerEvents ? 'pointer-events-none' : 'none'}`}>
                            <button className='w-[15%] bg-indigo-600 rounded text-white text-center font-semibold hover:bg-indigo-700 py-1'
                                onClick={(e) => {
                                    if (userId != -1) {
                                    handleClickPostComment(refTextarea)
                                    setDisablePointerEvents(true)
                                    setTimeout(() => {
                                        setDisablePointerEvents(false)
                                    }, 1000)
                                    let tempShowReplies = showReplies
                                    let tempOpenReplies = openReplies
                                    let tempRepliesShown = repliesShown
                                    let tempReplyCharacterCounts = replyCharacterCounts
                                    let tempNestedOpenReplies = nestedOpenReplies
                                    let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                    let tempReplyPostText = replyPostText
                                    let tempNestedReplyPostText = nestedReplyPostText
                                    let tempOpenDelete = openDelete
                                    let tempNestedOpenDelete = initNestedOpenDelete
                                    tempShowReplies.unshift(false)
                                    tempOpenReplies.unshift(false)
                                    tempRepliesShown.unshift(0)
                                    tempReplyCharacterCounts.unshift(0)
                                    tempNestedOpenReplies.unshift(new Array())
                                    tempNestedReplyCharacterCounts.unshift(new Array())
                                    tempReplyPostText.unshift('Post')
                                    tempNestedReplyPostText.unshift(new Array())
                                    tempOpenDelete.unshift(false)
                                    tempNestedOpenDelete.unshift(new Array())
                                    setShowReplies((showReplies) => tempShowReplies)
                                    setOpenReplies((openReplies) => tempOpenReplies)
                                    setRepliesShown((repliesShown) => tempRepliesShown)
                                    setReplyCharacterCounts((replyCharacterCounts) => tempReplyCharacterCounts)
                                    setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                    setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                    setReplyPostText((replyPostText) => tempReplyPostText)
                                    setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                    setOpenDelete((openDelete) => tempOpenDelete)
                                    setNestedOpenDelete((nestedOpenDelete) => tempNestedOpenDelete)
                                    setCommentsShown(commentsShown + 1)
                                    refNestedReplyTextarea.current = [...Array(commentsShown)].map(e => Array())
                                    refNestedCommentTextarea.current = [...Array(commentsShown)].map(e => Array())
                                    }
                                    else { 
                                        setOverlay(true)
                                        setTimeout(() => {
                                            setOverlay(false)
                                        }, 2000)
                                    }
                                }}>
                                Post
                            </button>
                            <p className='text-sm text-gray-600'>
                                {characterCounter}<span className='text-black'>/{characterLimit}</span>
                            </p>
                        </div>
                        <div className={`w-11/12 flex flex-row justify-start md:w-3/5 xl:w-2/5 3xl:w-[30%] mt-4 h-[2rem] items-center
                                        ${disablePointerEvents ? 'pointer-events-none' : 'none'}`}>
                            <p className='text-gray-700'>
                                {comments.length === 1 ? `${comments.length} Comment` : `${comments.length} Comments`}
                            </p>
                            <div ref={refFilter} className='flex flex-col ml-6'>
                                <div className='flex flex-row gap-x-1 items-center hover:cursor-pointer hover:outline hover:outline-2 hover:outline-indigo-600' onClick={() => {
                                    setDropDownFilter(!dropDownFilter)
                                }}>
                                    <MenuAlt2Icon className='h-[1.7rem] w-[1.7rem]' />
                                    <p className='pr-1'>Sort by</p>
                                </div>
                                <div className={`${dropDownFilter ? 'none' : 'hidden'} absolute flex flex-col mt-9 pr-2 gap-y-1 shadow-lg bg-white outline outline-2`}>
                                    <button className='text-left ml-2 px-1 md:hover:bg-gray-300 md:hover:rounded mt-1.5' onClick={() => {
                                        if (filter === 'Most Popular') {
                                            setFilter('Newest')
                                            setDropDownFilter(false)
                                            let sortedCommmentsArray = comments.sort((a, b) => {
                                                const dateA = new Date(a.createdAt)
                                                const dateB = new Date(b.createdAt)
                                                const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                                                const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                                                if (timeElapsedA > timeElapsedB) return (1)
                                                else return (-1)
                                            }).slice(0, commentsShown)
                                            let init = []
                                            let initNestedOpenReplies = []
                                            let initNestedReplyCharacterCounts = []
                                            let initNestedReplyPostText = []
                                            let initNestedOpenDelete = []
                                            for (let i in sortedCommmentsArray) {
                                                init.push(Math.min(sortedCommmentsArray[i].children.length, minReplies))
                                                initNestedOpenReplies.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                                initNestedReplyCharacterCounts.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(0))
                                                initNestedReplyPostText.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill('Post'))
                                                initNestedOpenDelete.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                            }
                                            setRepliesShown((repliesShown) => init)
                                            setNestedOpenReplies((nestedOpenReplies) => initNestedOpenReplies)
                                            setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => initNestedReplyCharacterCounts)
                                            setNestedReplyPostText((nestedReplyPostText) => initNestedReplyPostText)
                                            setShowReplies((showReplies) => new Array(commentsShown).fill(false))
                                            setOpenReplies((openReplies) => new Array(commentsShown).fill(false))
                                            setReplyPostText((replyPostText) => new Array(commentsShown).fill('Post'))
                                            setOpenDelete((openDelete) => new Array(commentsShown).fill(false))
                                            setNestedOpenDelete((nestedOpenDelete) => initNestedOpenDelete)
                                            setForceRenderState(!forceRenderState)
                                        }
                                        if (dropDownFilter) setDropDownFilter(false)
                                    }}>Newest</button>
                                    <button className='text-left ml-2 px-1 md:hover:bg-gray-300 md:hover:rounded mb-1.5' onClick={() => {
                                        if (filter === 'Newest') {
                                            setFilter('Most Popular')
                                            setDropDownFilter(false)
                                            let sortedCommmentsArray = comments.sort((a, b) => {
                                                let likesA = 0
                                                let likesB = 0
                                                if (asyncUpvotes) {
                                                    if (asyncUpvotes[a.id]) likesA = asyncUpvotes[a.id].length
                                                    if (asyncUpvotes[b.id]) likesB = asyncUpvotes[b.id].length
                                                }
                                                if (a.author.id == userId && b.author.id == userId) {
                                                    return compareLikes(likesA, likesB)
                                                }
                                                else if (a.author.id == userId && b.author.id != userId) {
                                                    return (-1)
                                                }
                                                else if (a.author.id != userId && b.author.id == userId) {
                                                    return (1)
                                                }
                                                else {
                                                    return compareLikes(likesA, likesB)
                                                }
                                            }).slice(0, commentsShown)
                                            let init = []
                                            let initNestedOpenReplies = []
                                            let initNestedReplyCharacterCounts = []
                                            let initNestedReplyPostText = []
                                            let initNestedOpenDelete = []
                                            for (let i in sortedCommmentsArray) {
                                                init.push(Math.min(sortedCommmentsArray[i].children.length, minReplies))
                                                initNestedOpenReplies.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                                initNestedReplyCharacterCounts.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(0))
                                                initNestedReplyPostText.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill('Post'))
                                                initNestedOpenDelete.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                            }
                                            setRepliesShown((repliesShown) => init)
                                            setNestedOpenReplies((nestedOpenReplies) => initNestedOpenReplies)
                                            setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => initNestedReplyCharacterCounts)
                                            setNestedReplyPostText((nestedReplyPostText) => initNestedReplyPostText)
                                            setShowReplies((showReplies) => new Array(commentsShown).fill(false))
                                            setOpenReplies((openReplies) => new Array(commentsShown).fill(false))
                                            setReplyPostText((replyPostText) => new Array(commentsShown).fill('Post'))
                                            setOpenDelete((openDelete) => new Array(commentsShown).fill(false))
                                            setNestedOpenDelete((nestedOpenDelete) => initNestedOpenDelete)
                                            setForceRenderState(!forceRenderState)
                                        }
                                        if (dropDownFilter) setDropDownFilter(false)
                                    }}>Most Popular</button>
                                </div>
                            </div>
                        </div>
                        <div ref={refComment} className='h-2'></div>
                        <div className={`flex flex-col w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%]
                                        ${disablePointerEvents ? 'pointer-events-none' : 'none'}`}>
                            {comments.sort((a, b) => {
                                if (forceRenderState) { }
                                if (filter === 'Newest') {
                                    const dateA = new Date(a.createdAt)
                                    const dateB = new Date(b.createdAt)
                                    const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                                    const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                                    if (timeElapsedA > timeElapsedB) return (1)
                                    else return (-1)
                                }
                                else if (filter === 'Most Popular') {
                                    let likesA = 0
                                    let likesB = 0
                                    if (asyncUpvotes) {
                                        if (asyncUpvotes[a.id]) likesA = asyncUpvotes[a.id].length
                                        if (asyncUpvotes[b.id]) likesB = asyncUpvotes[b.id].length
                                    }
                                    if (a.author.id == userId && b.author.id == userId) {
                                        return compareLikes(likesA, likesB)
                                    }
                                    else if (a.author.id == userId && b.author.id != userId) {
                                        return (-1)
                                    }
                                    else if (a.author.id != userId && b.author.id == userId) {
                                        return (1)
                                    }
                                    else {
                                        return compareLikes(likesA, likesB)
                                    }
                                }
                            }).slice(0, commentsShown).map((element, index) => {
                                const timeSinceComment = calculateTimeSinceComment(element.createdAt)
                                let repliesArray = element.children
                                let viewComments = false
                                let tempRepliesShown = 0
                                if (repliesShown[index] === 0) tempRepliesShown = Math.min(repliesArray.length, minReplies)
                                else tempRepliesShown = repliesShown[index]
                                return (
                                    <>
                                        <div key={element.id} className={`${!openDelete[index] ? 'hidden' : 'none'} fixed z-50 flex flex-col
                                        bg-gray-500 w-[20rem] top-[45%] left-1/2 -translate-x-1/2 rounded p-4 gap-y-6`}>
                                            <p className='text-white font-semibold'>Delete your comment permanently?</p>
                                            <div className='flex flex-row justify-end gap-x-2'>
                                                <button className='md:hover:cursor-pointer bg-gray-200 rounded text-black text-center font-semibold text-sm hover:bg-gray-300 w-[6rem] py-1'
                                                    onClick={() => {
                                                        let tempOpenDelete = openDelete
                                                        tempOpenDelete[index] = false
                                                        setOpenDelete((openDelete) => tempOpenDelete)
                                                        setDeleteOpen(false)
                                                        setForceRenderState(!forceRenderState)
                                                    }}>
                                                    Cancel
                                                </button>
                                                <button className='md:hover:cursor-pointer bg-indigo-600 rounded text-white text-center font-semibold text-sm hover:bg-indigo-700 w-[6rem] py-1'
                                                    onClick={() => {
                                                        let tempOpenDelete = openDelete
                                                        tempOpenDelete[index] = false
                                                        setOpenDelete((openDelete) => tempOpenDelete)
                                                        setDeleteOpen(false)
                                                        handleClickDelete(element)
                                                        setDisablePointerEvents(true)
                                                        setForceRenderState(!forceRenderState)
                                                        setTimeout(() => {
                                                            setDisablePointerEvents(false)
                                                        }, 1000)
                                                        let asyncComments = comments.sort((a, b) => {
                                                            if (filter === 'Newest') {
                                                                const dateA = new Date(a.createdAt)
                                                                const dateB = new Date(b.createdAt)
                                                                const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                                                                const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                                                                if (timeElapsedA > timeElapsedB) return (1)
                                                                else return (-1)
                                                            }
                                                            else if (filter === 'Most Popular') {
                                                                let likesA = 0
                                                                let likesB = 0
                                                                if (asyncUpvotes) {
                                                                    if (asyncUpvotes[a.id]) likesA = asyncUpvotes[a.id].length
                                                                    if (asyncUpvotes[b.id]) likesB = asyncUpvotes[b.id].length
                                                                }
                                                                if (a.author.id == userId && b.author.id == userId) {
                                                                    return compareLikes(likesA, likesB)
                                                                }
                                                                else if (a.author.id == userId && b.author.id != userId) {
                                                                    return (-1)
                                                                }
                                                                else if (a.author.id != userId && b.author.id == userId) {
                                                                    return (1)
                                                                }
                                                                else {
                                                                    return compareLikes(likesA, likesB)
                                                                }
                                                            }
                                                        }).slice(0, commentsShown)
                                                        let tempShowReplies = showReplies
                                                        let tempOpenReplies = openReplies
                                                        let tempRepliesShown = repliesShown
                                                        let tempReplyCharacterCounts = replyCharacterCounts
                                                        let tempNestedOpenReplies = nestedOpenReplies
                                                        let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                        let tempReplyPostText = replyPostText
                                                        let tempNestedReplyPostText = nestedReplyPostText
                                                        tempOpenDelete = openDelete
                                                        let tempNestedOpenDelete = nestedOpenDelete
                                                        tempShowReplies.splice(index, 1)
                                                        tempOpenReplies.splice(index, 1)
                                                        tempRepliesShown.splice(index, 1)
                                                        tempReplyCharacterCounts.splice(index, 1)
                                                        tempNestedOpenReplies.splice(index, 1)
                                                        tempNestedReplyCharacterCounts.splice(index, 1)
                                                        tempReplyPostText.splice(index, 1)
                                                        tempNestedReplyPostText.splice(index, 1)
                                                        tempOpenDelete.splice(index, 1)
                                                        tempNestedOpenDelete.splice(index, 1)
                                                        if (commentsShown < comments.length) {
                                                            tempShowReplies.push(false)
                                                            tempOpenReplies.push(false)
                                                            tempRepliesShown.push(Math.min(asyncComments[asyncComments.length - 1].children.length, minReplies))
                                                            tempReplyCharacterCounts.push(0)
                                                            tempNestedOpenReplies.push(new Array(Math.min(asyncComments[asyncComments.length - 1].children.length, minReplies)).fill(false))
                                                            tempNestedReplyCharacterCounts.push(new Array(Math.min(asyncComments[asyncComments.length - 1].children.length, minReplies)).fill(0))
                                                            tempReplyPostText.push('Post')
                                                            tempNestedReplyPostText.push(new Array(Math.min(asyncComments[asyncComments.length - 1].children.length, minReplies)).fill('Post'))
                                                            tempOpenDelete.push(false)
                                                            tempNestedOpenDelete.push(new Array(Math.min(asyncComments[asyncComments.length - 1].children.length, minReplies)).fill(false))
                                                        }
                                                        else {
                                                            setCommentsShown(commentsShown - 1)
                                                        }
                                                        setShowReplies((showReplies) => tempShowReplies)
                                                        setOpenReplies((openReplies) => tempOpenReplies)
                                                        setRepliesShown((repliesShown) => tempRepliesShown)
                                                        setReplyCharacterCounts((replyCharacterCounts) => tempReplyCharacterCounts)
                                                        setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                        setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                        setReplyPostText((replyPostText) => tempReplyPostText)
                                                        setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                        setOpenDelete((openDelete) => tempOpenDelete)
                                                        setNestedOpenDelete((nestedOpenDelete) => tempNestedOpenDelete)
                                                        refNestedReplyTextarea.current = [...Array(commentsShown)].map(e => Array())
                                                        refNestedCommentTextarea.current = [...Array(commentsShown)].map(e => Array())
                                                        setForceRenderState(!forceRenderState)
                                                    }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div key={element.id - 0.1} className='flex flex-row w-full mb-4'>
                                            <div className='w-[15%] md:w-[2.5rem] shrink-0'>
                                            <div className={`rounded-full ${profileColours[Number(String(element.author.id).slice(-1))]}
                                            h-[2.5rem] aspect-square flex items-center justify-center`}>
                                                <p className='text-black font-semibold text-center'>{element.author.name[0].toUpperCase()}</p>
                                            </div>
                                            </div>
                                            {/*<img src='/goku.jpg' className='rounded-full'/>
                                            */}
                                            <div className='flex flex-col w-[85%] md:w-full md:ml-3'>
                                                <div className='flex flex-row items-end'>
                                                    <p className='text-sm font-semibold'>{element.author.name}</p>
                                                    <p className='text-[12px] text-gray-600 ml-2'>{timeSinceComment}</p>
                                                </div>
                                                <div className='flex flex-row mt-1'>
                                                    <p className={`text-sm ${replyPostText[index] === 'Save' ? 'hidden' : 'none'}`} style={{ overflowWrap: 'anywhere' }}>{element.content}</p>
                                                </div>
                                                <textarea ref={(element) => refCommentTextarea.current[index] = element} rows={1} spellCheck='false' className={`resize-none
                                                bg-gray-200 border-2 border-gray-200 rounded hover:border-gray-300 focus:bg-white
                                                focus:border-indigo-600 focus:outline-none px-2 h-33px scrollbar-hide py-[0.15rem] text-[14px] md:text-[14px]
                                                ${replyPostText[index] === 'Post' ? 'hidden' : 'none'}`} maxLength={characterLimit} onChange={(event) => {
                                                        event.target.style.height = '33px'
                                                        event.target.style.height = `${event.target.scrollHeight}px`
                                                        if (event.target.value.length > characterLimit) {
                                                            event.target.value = event.target.value.substring(0, characterLimit)
                                                        }
                                                        let tempCharacterCount = replyCharacterCounts
                                                        tempCharacterCount[index] = event.target.value.length
                                                        setReplyCharacterCounts((replyCharacterCounts) => tempCharacterCount)
                                                        setForceRenderState(!forceRenderState)
                                                    }}></textarea>
                                                <div className={`flex flex-row items-center mt-1 ${replyPostText[index] === 'Post' ? 'hidden' : 'none'}`}>
                                                    <p className='text-sm text-gray-600'>
                                                        {replyCharacterCounts[index]}<span className='text-black'>/{characterLimit}</span>
                                                    </p>
                                                    <div className='relative w-full flex justify-end'>
                                                        <button className='px-2 md:px-3 bg-gray-200 rounded text-black text-center font-semibold text-sm hover:bg-gray-300 py-1 mr-1 relative right-0' onClick={() => {
                                                            let tempReplyCharacterCounts = replyCharacterCounts
                                                            tempReplyCharacterCounts[index] = 0
                                                            setReplyCharacterCounts((replyCharacterCounts) => tempReplyCharacterCounts)
                                                            setTimeout(() => {
                                                                refResetFocus.current.focus({preventScroll:true})
                                                            }, 10)
                                                            handleClickCancelUpdate(refCommentTextarea.current[index])
                                                            let tempReplyPostText = replyPostText
                                                            tempReplyPostText[index] = 'Post'
                                                            setReplyPostText((replyPostText) => tempReplyPostText)
                                                            setForceRenderState(!forceRenderState)
                                                        }}>Cancel</button>
                                                        <button className='px-2 md:px-3 bg-indigo-600 rounded text-white text-center font-semibold text-sm hover:bg-indigo-700 py-1 mr-1 relative right-0' onClick={() => {
                                                            handleClickUpdate(refCommentTextarea.current[index], element)
                                                            setDisablePointerEvents(true)
                                                            setTimeout(() => {
                                                                let tempReplyCharacterCounts = replyCharacterCounts
                                                                tempReplyCharacterCounts[index] = 0
                                                                setReplyCharacterCounts((replyCharacterCounts) => tempReplyCharacterCounts)
                                                                setTimeout(() => {
                                                                    refResetFocus.current.focus({preventScroll:true})
                                                                }, 10)
                                                                let tempReplyPostText = replyPostText
                                                                tempReplyPostText[index] = 'Post'
                                                                setReplyPostText((replyPostText) => tempReplyPostText)
                                                                setForceRenderState(!forceRenderState)
                                                                setDisablePointerEvents(false)
                                                            }, 1000)
                                                        }}>Save</button>
                                                    </div>
                                                </div>
                                                <div className={`flex flex-row mt-2 items-center ${replyPostText[index] === 'Save' ? 'hidden' : 'none'}`}>
                                                    <ThumbUpIcon className={`h-[1.1rem] hover:cursor-pointer 
                                                    ${asyncUpvotes && element.id in asyncUpvotes ? asyncUpvotes[element.id].includes(userId) ? 'stroke-indigo-600' : 'none' : 'none'}`} onClick={() => {
                                                        upvoteComment(slug, element.id)
                                                        let tempAsyncUpvotes = asyncUpvotes
                                                        if (asyncUpvotes) {
                                                            if (element.id in asyncUpvotes) {
                                                                if (asyncUpvotes[element.id].includes(userId)) tempAsyncUpvotes[element.id].splice(tempAsyncUpvotes[element.id].indexOf(userId))
                                                                else tempAsyncUpvotes[element.id].push(userId)
                                                            }
                                                            else {
                                                                tempAsyncUpvotes[element.id] = [userId]
                                                            }
                                                        }
                                                        else {
                                                            tempAsyncUpvotes = {}
                                                            tempAsyncUpvotes[element.id] = [userId]
                                                        }
                                                        setAsyncUpvotes((asyncUpvotes) => tempAsyncUpvotes)
                                                    }} />
                                                    <p className='text-sm text-gray-600 ml-1'>{ asyncUpvotes && element.id in asyncUpvotes ? asyncUpvotes[element.id].length : '0' }</p>
                                                    <button className='ml-4 text-sm text-gray-600 hover:text-black' onClick={() => {
                                                        let tempOpenReplies = openReplies
                                                        if (!tempOpenReplies[index]) {
                                                            tempOpenReplies[index] = true
                                                            setOpenReplies((openReplies) => tempOpenReplies)
                                                            setForceRenderState(!forceRenderState)
                                                        }
                                                        setTimeout(() => {
                                                            refReplyTextarea.current[index].focus({preventScroll:true})
                                                        }, 10)
                                                    }}>Reply</button>
                                                    <button className={`ml-4 text-sm text-gray-600 hover:text-black ${element.author.id == userId ? 'none' : 'hidden'}`} onClick={() => {
                                                        if (replyPostText[index] === 'Post') {
                                                            let tempReplyPostText = replyPostText
                                                            tempReplyPostText[index] = 'Save'
                                                            setReplyPostText((replyPostText) => tempReplyPostText)
                                                            setForceRenderState(!forceRenderState)
                                                            refCommentTextarea.current[index].value = element.content
                                                            let tempReplyCharacterCounts = replyCharacterCounts
                                                            tempReplyCharacterCounts[index] = element.content.length
                                                            setReplyCharacterCounts((replyCharacterCounts) => tempReplyCharacterCounts)
                                                            setTimeout(() => {
                                                                refCommentTextarea.current[index].focus({preventScroll:true})
                                                            }, 10)
                                                        }
                                                    }}>Edit</button>
                                                    <button className={`ml-4 text-sm text-gray-600 hover:text-black ${element.author.id == userId ? 'none' : 'hidden'}`} onClick={() => {
                                                        if (!openDelete[index]) {
                                                            let tempOpenDelete = openDelete
                                                            tempOpenDelete[index] = true
                                                            setOpenDelete((openDelete) => tempOpenDelete)
                                                            setDeleteOpen(true)
                                                        }
                                                    }}>Delete</button>
                                                </div>
                                                <div className={`${!openReplies[index] ? 'hidden' : 'none'} flex flex-row mt-2`}>
                                                    <div className='w-[13%] shrink-0 md:w-[30px]'>
                                                    <div className={`flex rounded-full ${profileColour}
                                                    h-[30px] aspect-square items-center justify-center`}>
                                                        <p className='text-black font-semibold text-center text-sm'>{username ? username[0].toUpperCase() : ''}</p>
                                                        {/*<img src='/goku.jpg' className='rounded-full'/>
                                                        */}
                                                    </div>
                                                    </div>
                                                    <div className='flex flex-col w-[87%] md:w-full md:ml-3 gap-y-1'>
                                                        <textarea ref={(element) => refReplyTextarea.current[index] = element} placeholder='Leave a reply...' rows={1} spellCheck='false' className='resize-none
                                                        bg-gray-200 border-2 border-gray-200 rounded hover:border-gray-300 focus:bg-white placeholder:text-gray-700
                                                        focus:border-indigo-600 focus:outline-none md:block px-2 h-33px scrollbar-hide py-[0.15rem] text-[14px] md:text-[14px]' maxLength={characterLimit} onChange={(event) => {
                                                                event.target.style.height = '33px'
                                                                event.target.style.height = `${event.target.scrollHeight}px`
                                                                if (event.target.value.length > characterLimit) {
                                                                    event.target.value = event.target.value.substring(0, characterLimit)
                                                                }
                                                                let tempCharacterCount = replyCharacterCounts
                                                                tempCharacterCount[index] = event.target.value.length
                                                                setReplyCharacterCounts((replyCharacterCounts) => tempCharacterCount)
                                                                setForceRenderState(!forceRenderState)
                                                            }}></textarea>
                                                        <div className='flex flex-row items-center'>
                                                            <p className='text-sm text-gray-600'>
                                                                {replyCharacterCounts[index]}<span className='text-black'>/{characterLimit}</span>
                                                            </p>
                                                            <div className='relative w-full flex justify-end'>
                                                                <button className='px-2 md:px-3 bg-gray-200 rounded text-black text-center font-semibold text-sm hover:bg-gray-300 py-1 mr-1 relative right-0' onClick={() => {
                                                                    let tempOpenReplies = openReplies
                                                                    tempOpenReplies[index] = false
                                                                    setOpenReplies((openReplies) => tempOpenReplies)
                                                                    let tempReplyCharacterCounts = replyCharacterCounts
                                                                    tempReplyCharacterCounts[index] = 0
                                                                    setReplyCharacterCounts((replyCharacterCounts) => tempReplyCharacterCounts)
                                                                    handleClickCancel(refReplyTextarea.current[index])
                                                                    setForceRenderState(!forceRenderState)
                                                                }}>Cancel</button>
                                                                <button className='px-2 md:px-3 bg-indigo-600 rounded text-white text-center font-semibold text-sm hover:bg-indigo-700 py-1 relative right-0' onClick={() => {
                                                                    if (userId != -1) {
                                                                    let tempOpenReplies = openReplies
                                                                    tempOpenReplies[index] = false
                                                                    setOpenReplies((openReplies) => tempOpenReplies)
                                                                    let tempReplyCharacterCounts = replyCharacterCounts
                                                                    tempReplyCharacterCounts[index] = 0
                                                                    setReplyCharacterCounts((replyCharacterCounts) => tempReplyCharacterCounts)
                                                                    handleClickPostReply(refReplyTextarea.current[index], element)
                                                                    setDisablePointerEvents(true)
                                                                    setTimeout(() => {
                                                                        setDisablePointerEvents(false)
                                                                    }, 1000)
                                                                    if (repliesArray.length < 1) {
                                                                        let tempShowReplies = showReplies
                                                                        tempShowReplies[index] = true
                                                                        setShowReplies((showReplies) => tempShowReplies)
                                                                    }
                                                                    let tempShowReplies = showReplies
                                                                    let tempRepliesShown = repliesShown
                                                                    let tempNestedOpenReplies = nestedOpenReplies
                                                                    let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                    let tempNestedReplyPostText = nestedReplyPostText
                                                                    if (tempRepliesShown[index] < minReplies) {
                                                                        tempRepliesShown[index] += 1
                                                                        tempNestedOpenReplies[index].push(false)
                                                                        tempNestedReplyCharacterCounts[index].push(0)
                                                                        tempNestedReplyPostText[index].push('Post')
                                                                    }
                                                                    else {
                                                                        tempRepliesShown[index] = repliesArray.length + 1
                                                                        tempNestedOpenReplies[index] = new Array(repliesArray.length + 1).fill(false)
                                                                        tempNestedReplyCharacterCounts[index] = new Array(repliesArray.length + 1).fill(0)
                                                                        tempNestedReplyPostText[index] = new Array(repliesArray.length + 1).fill('Post')
                                                                    }
                                                                    tempShowReplies[index] = true
                                                                    setShowReplies((showReplies) => tempShowReplies)
                                                                    setRepliesShown((repliesShown) => tempRepliesShown)
                                                                    setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                                    setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                    setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                                    setForceRenderState(!forceRenderState)
                                                                    }
                                                                    else { 
                                                                        setOverlay(true)
                                                                        setTimeout(() => {
                                                                            setOverlay(false)
                                                                        }, 2000)
                                                                    }
                                                                }}>Post</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`flex flex-row mt-2 ${repliesArray.length > 0 ? 'none' : 'hidden'}`}>
                                                    <button className='flex flex-row items-center gap-x-2' onClick={() => {
                                                        let tempShowReplies = showReplies
                                                        tempShowReplies[index] = !tempShowReplies[index]
                                                        setShowReplies((showReplies) => tempShowReplies)
                                                        if (!showReplies[index]) {
                                                            let tempRS = repliesShown
                                                            let tempNestedOpenReplies = nestedOpenReplies
                                                            let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                            let tempNestedReplyPostText = nestedReplyPostText
                                                            tempRS[index] = Math.min(repliesArray.length, minReplies)
                                                            tempNestedOpenReplies[index] = new Array(Math.min(repliesArray.length, minReplies)).fill(false)
                                                            tempNestedReplyCharacterCounts[index] = new Array(Math.min(repliesArray.length, minReplies)).fill(0)
                                                            tempNestedReplyPostText[index] = new Array(Math.min(repliesArray.length, minReplies)).fill('Post')
                                                            setRepliesShown((repliesShown) => tempRS)
                                                            setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                            setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                            setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                            //refNestedReplyTextarea.current[index] = new Array() 
                                                        }
                                                        setForceRenderState(!forceRenderState)
                                                    }}>
                                                        {!showReplies[index] ?
                                                            <ChevronDownIcon className='h-[1rem] stroke-blue-600' />
                                                            :
                                                            <ChevronUpIcon className='h-[1rem] stroke-blue-600' />
                                                        }
                                                        <p className='text-sm text-blue-600'>{repliesArray.length > 1 ?
                                                            !showReplies[index] ? `View ${repliesArray.length} replies` : `Hide ${repliesArray.length} replies`
                                                            :
                                                            !showReplies[index] ? 'View 1 reply' : 'Hide 1 reply'}</p>
                                                    </button>
                                                </div>
                                                {showReplies[index] ? repliesArray.sort((a, b) => {
                                                    const dateA = new Date(a.createdAt)
                                                    const dateB = new Date(b.createdAt)
                                                    const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                                                    const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                                                    if (timeElapsedA > timeElapsedB) return (-1)
                                                    else return (1)
                                                }).slice(0, tempRepliesShown).map((nestedElement, nestedIndex) => {
                                                    const timeSinceComment = calculateTimeSinceComment(nestedElement.createdAt)
                                                    return (
                                                        <>
                                                            <div key={nestedElement.id} className={`${!nestedOpenDelete[index][nestedIndex] ? 'hidden' : 'none'} fixed z-50 flex flex-col
                                                            bg-gray-500 w-[20rem] top-[45%] left-1/2 -translate-x-1/2 rounded p-4 gap-y-6`}>
                                                                <p className='text-white font-semibold'>Delete your comment permanently?</p>
                                                                <div className='flex flex-row justify-end gap-x-2'>
                                                                    <button className='md:hover:cursor-pointer bg-gray-200 rounded text-black text-center font-semibold text-sm hover:bg-gray-300 w-[6rem] py-1'
                                                                        onClick={() => {
                                                                            let tempNestedOpenDelete = nestedOpenDelete
                                                                            tempNestedOpenDelete[index][nestedIndex] = false
                                                                            setNestedOpenDelete((nestedOpenDelete) => tempNestedOpenDelete)
                                                                            setDeleteOpen(false)
                                                                            setForceRenderState(!forceRenderState)
                                                                        }}>
                                                                        Cancel
                                                                    </button>
                                                                    <button className='md:hover:cursor-pointer bg-indigo-600 rounded text-white text-center font-semibold text-sm hover:bg-indigo-700 w-[6rem] py-1'
                                                                        onClick={() => {
                                                                            let tempNestedOpenDelete = nestedOpenDelete
                                                                            tempNestedOpenDelete[index][nestedIndex] = false
                                                                            setNestedOpenDelete((nestedOpenDelete) => tempNestedOpenDelete)
                                                                            setDeleteOpen(false)
                                                                            let flag = false
                                                                            if (repliesShown[index] < comments[index].children.length) flag = true
                                                                            handleClickNestedDelete(nestedElement)
                                                                            setDisablePointerEvents(true)
                                                                            setTimeout(() => {
                                                                                setForceRenderState(!forceRenderState)
                                                                                let tempNestedOpenReplies = nestedOpenReplies
                                                                                let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                                let tempNestedReplyPostText = nestedReplyPostText
                                                                                tempNestedOpenDelete = nestedOpenDelete
                                                                                tempNestedOpenReplies[index].splice(nestedIndex, 1)
                                                                                tempNestedReplyCharacterCounts[index].splice(nestedIndex, 1)
                                                                                tempNestedReplyPostText[index].splice(nestedIndex, 1)
                                                                                tempNestedOpenDelete[index].splice(nestedIndex, 1)
                                                                                if (flag) {
                                                                                    tempNestedOpenDelete[index].push(false)
                                                                                    tempNestedOpenReplies[index].push(false)
                                                                                    tempNestedReplyCharacterCounts[index].push(0)
                                                                                    tempNestedReplyPostText[index].push('Post')
                                                                                }
                                                                                else {
                                                                                    let tempRepliesShown = repliesShown
                                                                                    tempRepliesShown[index] -= 1
                                                                                    setRepliesShown((repliesShown) => tempRepliesShown)
                                                                                }
                                                                                setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                                                setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                                setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                                                setNestedOpenDelete((nestedOpenDelete) => tempNestedOpenDelete)
                                                                                setForceRenderState(!forceRenderState)
                                                                                setDisablePointerEvents(false)
                                                                            }, 1000)
                                                                        }}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div key={nestedElement.id - 0.1} className='flex flex-row mt-2'>
                                                                <div className='w-[14%] md:w-[30px]'>
                                                                <div className={`rounded-full ${profileColours[Number(String(nestedElement.author.id).slice(-1))]} shrink-0
                                                                h-[30px] aspect-square flex items-center justify-center`}>
                                                                    <p className='text-black font-semibold text-center text-sm'>{nestedElement.author.name[0].toUpperCase()}</p>
                                                                    {/*<img src='/goku.jpg' className='rounded-full'/>
                                                                    */}
                                                                </div>
                                                                </div>
                                                                <div className='flex flex-col w-[86%] md:w-full md:ml-3'>
                                                                    <div className='flex flex-row items-end'>
                                                                        <p className='text-sm font-semibold'>{nestedElement.author.name}</p>
                                                                        <p className='text-[12px] text-gray-600 ml-2'>{timeSinceComment}</p>
                                                                    </div>
                                                                    <div className={`flex flex-row mt-1 ${nestedReplyPostText[index][nestedIndex] === 'Save' ? 'hidden' : 'none'}`}>
                                                                        <p className='text-sm' style={{ overflowWrap: 'anywhere' }}>{nestedElement.content}</p>
                                                                    </div>
                                                                    <textarea ref={(nestedElement) => refNestedCommentTextarea.current[index][nestedIndex] = nestedElement} rows={1} spellCheck='false' className={`resize-none
                                                                    bg-gray-200 border-2 border-gray-200 rounded hover:border-gray-300 focus:bg-white placeholder:text-gray-700 
                                                                    focus:border-indigo-600 focus:outline-none px-2 h-33px scrollbar-hide py-[0.15rem] text-[14px] md:text-[14px] mt-1
                                                                    ${nestedReplyPostText[index][nestedIndex] === 'Post' ? 'hidden' : 'none'}`} maxLength={characterLimit}
                                                                        onChange={(event) => {
                                                                            event.target.style.height = '33px'
                                                                            event.target.style.height = `${event.target.scrollHeight}px`
                                                                            if (event.target.value.length > characterLimit) {
                                                                                event.target.value = event.target.value.substring(0, characterLimit)
                                                                            }
                                                                            let tempCharacterCount = nestedReplyCharacterCounts
                                                                            tempCharacterCount[index][nestedIndex] = event.target.value.length
                                                                            setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempCharacterCount)
                                                                            setForceRenderState(!forceRenderState)
                                                                        }}></textarea>
                                                                    <div className={`flex flex-row items-center mt-1 ${nestedReplyPostText[index][nestedIndex] === 'Post' ? 'hidden' : 'none'}`}>
                                                                        <p className='text-sm text-gray-600'>
                                                                            {nestedReplyCharacterCounts[index][nestedIndex]}<span className='text-black'>/{characterLimit}</span>
                                                                        </p>
                                                                        <div className='relative w-full flex justify-end'>
                                                                            <button className='px-2 md:px-3 bg-gray-200 rounded text-black text-center font-semibold text-sm hover:bg-gray-300 py-1 mr-1 relative right-0' onClick={() => {
                                                                                let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                                tempNestedReplyCharacterCounts[index][nestedIndex] = 0
                                                                                setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                                setTimeout(() => {
                                                                                    refResetFocus.current.focus({preventScroll:true})
                                                                                }, 10)
                                                                                handleClickCancelUpdate(refNestedCommentTextarea.current[index][nestedIndex])
                                                                                let tempNestedReplyPostText = nestedReplyPostText
                                                                                tempNestedReplyPostText[index][nestedIndex] = 'Post'
                                                                                setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                                                setForceRenderState(!forceRenderState)
                                                                            }}>Cancel</button>
                                                                            <button className='px-2 md:px-3 bg-indigo-600 rounded text-white text-center font-semibold text-sm hover:bg-indigo-700 py-1 mr-1 relative right-0' onClick={() => {
                                                                                handleClickNestedUpdate(refNestedCommentTextarea.current[index][nestedIndex], nestedElement)
                                                                                setDisablePointerEvents(true)
                                                                                setTimeout(() => {
                                                                                    let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                                    tempNestedReplyCharacterCounts[index][nestedIndex] = 0
                                                                                    setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                                    setTimeout(() => {
                                                                                        refResetFocus.current.focus({preventScroll:true})
                                                                                    }, 10)
                                                                                    let tempNestedReplyPostText = nestedReplyPostText
                                                                                    tempNestedReplyPostText[index][nestedIndex] = 'Post'
                                                                                    setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                                                    setForceRenderState(!forceRenderState)
                                                                                    setDisablePointerEvents(false)
                                                                                }, 1000)
                                                                            }}>Save</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className={`flex flex-row mt-2 items-center ${nestedReplyPostText[index][nestedIndex] === 'Save' ? 'hidden' : 'none'}`}>
                                                                        <ThumbUpIcon className={`h-[1.1rem] hover:cursor-pointer 
                                                                        ${upvotes && nestedElement.id in upvotes ? upvotes[nestedElement.id].includes(userId) ? 'stroke-indigo-600' : 'none' : 'none'}`} onClick={() => { 
                                                                            upvoteComment(slug, nestedElement.id)
                                                                            let tempAsyncUpvotes = asyncUpvotes
                                                                            if (asyncUpvotes) {
                                                                                if (nestedElement.id in asyncUpvotes) {
                                                                                    if (asyncUpvotes[nestedElement.id].includes(userId)) tempAsyncUpvotes[nestedElement.id].splice(tempAsyncUpvotes[nestedElement.id].indexOf(userId))
                                                                                    else tempAsyncUpvotes[nestedElement.id].push(userId)
                                                                                }
                                                                                else {
                                                                                    tempAsyncUpvotes[nestedElement.id] = [userId]
                                                                                }
                                                                            }
                                                                            else {
                                                                                tempAsyncUpvotes = {}
                                                                                tempAsyncUpvotes[nestedElement.id] = [userId]
                                                                            }
                                                                            setAsyncUpvotes((asyncUpvotes) => tempAsyncUpvotes)
                                                                        }} />
                                                                        <p className='text-sm text-gray-600 ml-1'>{ upvotes && nestedElement.id in upvotes ? upvotes[nestedElement.id].length : '0' }</p>
                                                                        <button className='ml-4 text-sm text-gray-600 hover:text-black' onClick={() => {
                                                                            let temp = nestedOpenReplies
                                                                            if (!nestedOpenReplies[index][nestedIndex]) {
                                                                                temp[index][nestedIndex] = true
                                                                                setNestedOpenReplies((nestedOpenReplies) => temp)
                                                                            }
                                                                            refNestedReplyTextarea.current[index][nestedIndex].value = `@${nestedElement.author.name} `
                                                                            let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                            tempNestedReplyCharacterCounts[index][nestedIndex] = refNestedReplyTextarea.current[index][nestedIndex].value.length
                                                                            setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                            setForceRenderState(!forceRenderState)
                                                                            setTimeout(() => {
                                                                                refNestedReplyTextarea.current[index][nestedIndex].focus({preventScroll:true})
                                                                            }, 10)
                                                                        }}>Reply</button>
                                                                        <button className={`ml-4 text-sm text-gray-600 hover:text-black ${nestedElement.author.id == userId ? 'none' : 'hidden'}`} onClick={() => {
                                                                            if (nestedReplyPostText[index][nestedIndex] === 'Post') {
                                                                                let tempNestedReplyPostText = nestedReplyPostText
                                                                                tempNestedReplyPostText[index][nestedIndex] = 'Save'
                                                                                setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                                                setForceRenderState(!forceRenderState)
                                                                                refNestedCommentTextarea.current[index][nestedIndex].value = nestedElement.content
                                                                                let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                                tempNestedReplyCharacterCounts[index][nestedIndex] = nestedElement.content.length
                                                                                setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                                setTimeout(() => {
                                                                                    refNestedCommentTextarea.current[index][nestedIndex].focus({preventScroll:true})
                                                                                }, 10)
                                                                            }
                                                                        }}>Edit</button>
                                                                        <button className={`ml-4 text-sm text-gray-600 hover:text-black ${nestedElement.author.id == userId ? 'none' : 'hidden'}`} onClick={() => {
                                                                            if (!nestedOpenDelete[index][nestedIndex]) {
                                                                                let tempNestedOpenDelete = nestedOpenDelete
                                                                                tempNestedOpenDelete[index][nestedIndex] = true
                                                                                setNestedOpenDelete((nestedOpenDelete) => tempNestedOpenDelete)
                                                                                setDeleteOpen(true)
                                                                            }
                                                                        }}>Delete</button>
                                                                    </div>
                                                                    <div className={`${!nestedOpenReplies[index][nestedIndex] ? 'hidden' : 'none'} flex flex-row mt-2`}>
                                                                        <div className='w-[15%] md:w-[30px] shrink-0'>
                                                                        <div className={`rounded-full ${profileColour} 
                                                                        h-[30px] aspect-square flex items-center justify-center`}>
                                                                            <p className='text-black font-semibold text-center text-sm'>{username ? username[0].toUpperCase() : ''}</p>
                                                                            {/*<img src='/goku.jpg' className='rounded-full'/>
                                                                            */}
                                                                        </div>
                                                                        </div>
                                                                        <div className='flex flex-col w-[85%] md:w-full md:ml-3 gap-y-1'>
                                                                            <textarea ref={(nestedElement) => refNestedReplyTextarea.current[index][nestedIndex] = nestedElement} placeholder='Leave a reply...' rows={1} spellCheck='false' className='resize-none
                                                                            bg-gray-200 border-2 border-gray-200 rounded hover:border-gray-300 focus:bg-white placeholder:text-gray-700 
                                                                            focus:border-indigo-600 focus:outline-none md:block px-1 h-33px scrollbar-hide py-[0.15rem] text-[14px] md:text-[14px]' maxLength={characterLimit}
                                                                                onChange={(event) => {
                                                                                    event.target.style.height = '33px'
                                                                                    event.target.style.height = `${event.target.scrollHeight}px`
                                                                                    if (event.target.value.length > characterLimit) {
                                                                                        event.target.value = event.target.value.substring(0, characterLimit)
                                                                                    }
                                                                                    let tempCharacterCount = nestedReplyCharacterCounts
                                                                                    tempCharacterCount[index][nestedIndex] = event.target.value.length
                                                                                    setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempCharacterCount)
                                                                                    setForceRenderState(!forceRenderState)
                                                                                }}></textarea>
                                                                            <div className='flex flex-row items-center'>
                                                                                <p className='text-sm text-gray-600'>
                                                                                    {nestedReplyCharacterCounts[index][nestedIndex]}<span className='text-black'>/{characterLimit}</span>
                                                                                </p>
                                                                                <div className='relative w-full flex justify-end'>
                                                                                    <button className='px-2 md:px-3 bg-gray-200 rounded text-black text-center font-semibold text-sm hover:bg-gray-300 py-1 mr-1 relative right-0' onClick={() => {
                                                                                        let tempNestedOpenReplies = nestedOpenReplies
                                                                                        tempNestedOpenReplies[index][nestedIndex] = false
                                                                                        setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                                                        let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                                        tempNestedReplyCharacterCounts[index][nestedIndex] = 0
                                                                                        setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                                        handleClickCancel(refNestedReplyTextarea.current[index][nestedIndex])
                                                                                        setTimeout(() => {
                                                                                            refResetFocus.current.focus({preventScroll:true})
                                                                                        }, 10)
                                                                                        setForceRenderState(!forceRenderState)
                                                                                    }}>Cancel</button>
                                                                                    <button className='px-2 md:px-3 bg-indigo-600 rounded text-white text-center font-semibold text-sm hover:bg-indigo-700 py-1 relative right-0' onClick={() => {
                                                                                        if (userId != -1) {
                                                                                        let tempNestedOpenReplies = nestedOpenReplies
                                                                                        tempNestedOpenReplies[index][nestedIndex] = false
                                                                                        setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                                                        let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                                        tempNestedReplyCharacterCounts[index][nestedIndex] = 0
                                                                                        setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                                        handleClickPostReply(refNestedReplyTextarea.current[index][nestedIndex], element)
                                                                                        setDisablePointerEvents(true)
                                                                                        setTimeout(() => {
                                                                                            setDisablePointerEvents(false)
                                                                                        }, 1000)
                                                                                        let tempRepliesShown = repliesShown
                                                                                        let tempNestedReplyPostText = nestedReplyPostText
                                                                                        tempNestedOpenReplies = nestedOpenReplies
                                                                                        tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                                                        if (tempRepliesShown[index] < minReplies) {
                                                                                            tempRepliesShown[index] += 1
                                                                                            tempNestedOpenReplies[index].push(false)
                                                                                            tempNestedReplyCharacterCounts[index].push(0)
                                                                                            tempNestedReplyPostText[index].push('Post')
                                                                                        }
                                                                                        else {
                                                                                            tempRepliesShown[index] = repliesArray.length + 1
                                                                                            tempNestedOpenReplies[index] = new Array(repliesArray.length + 1).fill(false)
                                                                                            tempNestedReplyCharacterCounts[index] = new Array(repliesArray.length + 1).fill(0)
                                                                                            tempNestedReplyPostText[index] = new Array(repliesArray.length + 1).fill('Post')
                                                                                        }
                                                                                        setRepliesShown((repliesShown) => tempRepliesShown)
                                                                                        setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                                                        setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                                                        setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                                                        setForceRenderState(!forceRenderState)
                                                                                        }
                                                                                        else { 
                                                                                            setOverlay(true)
                                                                                            setTimeout(() => {
                                                                                                setOverlay(false)
                                                                                            }, 2000)
                                                                                        }
                                                                                    }}>Post</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                                    :
                                                    <></>}
                                                <div className={`flex flex-row w-full mt-2 hover:cursor-pointer items-center ${(showReplies[index]) && (tempRepliesShown < repliesArray.length) ? 'none' : 'hidden'}`} onClick={() => {
                                                    let temp = repliesShown
                                                    let tempNestedOpenReplies = nestedOpenReplies
                                                    let tempNestedReplyCharacterCounts = nestedReplyCharacterCounts
                                                    let tempNestedReplyPostText = nestedReplyPostText
                                                    for (let i = 0; i < Math.min(repliesIncrement, repliesArray.length - repliesShown[index]); i++) {
                                                        tempNestedOpenReplies[index].push(false)
                                                        tempNestedReplyCharacterCounts[index].push(0)
                                                        tempNestedReplyPostText[index].push('Post')
                                                    }
                                                    setNestedOpenReplies((nestedOpenReplies) => tempNestedOpenReplies)
                                                    setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => tempNestedReplyCharacterCounts)
                                                    setNestedReplyPostText((nestedReplyPostText) => tempNestedReplyPostText)
                                                    temp[index] += Math.min(repliesIncrement, repliesArray.length - repliesShown[index])
                                                    setRepliesShown((repliesShown) => temp)
                                                    setForceRenderState(!forceRenderState)
                                                }}>
                                                    <ChevronDoubleRightIcon className='h-[1rem] stroke-blue-600'></ChevronDoubleRightIcon>
                                                    <p className='ml-2 text-sm text-blue-600 text-center'>Show more replies</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                            <button className={`w-full py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-center rounded mb-8
                            ${comments.length > minComments ? 'none' : 'hidden'} ${disablePointerEvents ? 'pointer-events-none' : 'none'}`} onClick={() => {
                                    let asyncCommentsShown = commentsShown + Math.min(commentsIncrement, comments.length - commentsShown)
                                    if (commentsShown < comments.length) {
                                        setShowReplies((showReplies) => new Array(asyncCommentsShown).fill(false))
                                        setOpenReplies((openReplies) => new Array(asyncCommentsShown).fill(false))
                                        setReplyCharacterCounts((openReplies) => new Array(asyncCommentsShown).fill(0))
                                        setReplyPostText((replyPostText) => new Array(asyncCommentsShown).fill('Post'))
                                        let sortedCommmentsArray = comments.sort((a, b) => {
                                            if (filter === 'Newest') {
                                                const dateA = new Date(a.createdAt)
                                                const dateB = new Date(b.createdAt)
                                                const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                                                const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                                                if (timeElapsedA > timeElapsedB) return (1)
                                                else return (-1)
                                            }
                                            else if (filter === 'Most Popular') {
                                                let likesA = 0
                                                let likesB = 0
                                                if (asyncUpvotes) {
                                                    if (asyncUpvotes[a.id]) likesA = asyncUpvotes[a.id].length
                                                    if (asyncUpvotes[b.id]) likesB = asyncUpvotes[b.id].length
                                                }
                                                if (a.author.id == userId && b.author.id == userId) {
                                                    return compareLikes(likesA, likesB)
                                                }
                                                else if (a.author.id == userId && b.author.id != userId) {
                                                    return (-1)
                                                }
                                                else if (a.author.id != userId && b.author.id == userId) {
                                                    return (1)
                                                }
                                                else {
                                                    return compareLikes(likesA, likesB)
                                                }
                                            }
                                        }).slice(0, asyncCommentsShown)
                                        let init = []
                                        let initNested = []
                                        let initNestedReplyCharacterCounts = []
                                        let initNestedReplyPostText = []
                                        let initNestedOpenDelete = []
                                        for (let i in sortedCommmentsArray) {
                                            init.push(Math.min(sortedCommmentsArray[i].children.length, minReplies))
                                            initNested.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                            initNestedReplyCharacterCounts.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(0))
                                            initNestedReplyPostText.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill('Post'))
                                            initNestedOpenDelete.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                        }
                                        setRepliesShown((repliesShown) => init)
                                        setNestedOpenReplies((nestedOpenReplies) => initNested)
                                        setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => initNestedReplyCharacterCounts)
                                        setNestedReplyPostText((nestedReplyPostText) => initNestedReplyPostText)
                                        setNestedOpenDelete((nestedOpenDelete) => initNestedOpenDelete)
                                        refNestedReplyTextarea.current = [...Array(asyncCommentsShown)].map(e => Array())
                                        refNestedCommentTextarea.current = [...Array(asyncCommentsShown)].map(e => Array())
                                        setCommentsShown(asyncCommentsShown)
                                    }
                                    else {
                                        setShowReplies((showReplies) => new Array(minComments).fill(false))
                                        setOpenReplies((openReplies) => new Array(minComments).fill(false))
                                        setReplyCharacterCounts((openReplies) => new Array(minComments).fill(0))
                                        setReplyPostText((replyPostText) => new Array(minComments).fill('Post'))
                                        let sortedCommmentsArray = comments.sort((a, b) => {
                                            if (filter === 'Newest') {
                                                const dateA = new Date(a.createdAt)
                                                const dateB = new Date(b.createdAt)
                                                const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                                                const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                                                if (timeElapsedA > timeElapsedB) return (1)
                                                else return (-1)
                                            }
                                            else if (filter === 'Most Popular') {
                                                let likesA = 0
                                                let likesB = 0
                                                if (asyncUpvotes) {
                                                    if (asyncUpvotes[a.id]) likesA = asyncUpvotes[a.id].length
                                                    if (asyncUpvotes[b.id]) likesB = asyncUpvotes[b.id].length
                                                }
                                                if (a.author.id == userId && b.author.id == userId) {
                                                    return compareLikes(likesA, likesB)
                                                }
                                                else if (a.author.id == userId && b.author.id != userId) {
                                                    return (-1)
                                                }
                                                else if (a.author.id != userId && b.author.id == userId) {
                                                    return (1)
                                                }
                                                else {
                                                    return compareLikes(likesA, likesB)
                                                }
                                            }
                                        }).slice(0, minComments)
                                        let init = []
                                        let initNested = []
                                        let initNestedReplyCharacterCounts = []
                                        let initNestedReplyPostText = []
                                        let initNestedOpenDelete = []
                                        for (let i in sortedCommmentsArray) {
                                            init.push(Math.min(sortedCommmentsArray[i].children.length, minReplies))
                                            initNested.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                            initNestedReplyCharacterCounts.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(0))
                                            initNestedReplyPostText.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill('Post'))
                                            initNestedOpenDelete.push(new Array(Math.min(sortedCommmentsArray[i].children.length, minReplies)).fill(false))
                                        }
                                        setRepliesShown((repliesShown) => init)
                                        setNestedOpenReplies((nestedOpenReplies) => initNested)
                                        setNestedReplyCharacterCounts((nestedReplyCharacterCounts) => initNestedReplyCharacterCounts)
                                        setNestedReplyPostText((nestedReplyPostText) => initNestedReplyPostText)
                                        setNestedOpenDelete((nestedOpenDelete) => initNestedOpenDelete)
                                        refNestedReplyTextarea.current = [...Array(asyncCommentsShown)].map(e => Array())
                                        refNestedCommentTextarea.current = [...Array(asyncCommentsShown)].map(e => Array())
                                        setCommentsShown(minComments)
                                        scrollToStats()
                                    }
                                }}>{commentsShown < comments.length ? 'Show More' : 'Hide Comments'}</button>
                        </div>
                    </div>
                    <div className={`${comments.length > minComments ? 'hidden' : 'none'} h-[1.5rem]`}></div>
                </>
            )
        case 2:
            return (
                <div className='flex flex-col flex-1 justify-center items-center'>
                    <div className='text-3xl text-center'>
                        You scored {triviaScore}/{total}.</div>
                    <div className='text-2xl text-violet-600 text-center w-[90%]'>{text}</div>
                    <div className='mt-4 text-lg'>Share Your Result</div>
                    <div className='flex flex-row w-[21rem] h-[2rem] justify-center gap-x-1'>
                        <a href={`https://facebook.com/sharer.php?u=https://kuizme.com${postUrl}`} target='_blank'
                            className='flex flex-row basis-[47.5%] bg-[#4267B2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/facebook.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <FacebookIcon className='h-[1.3rem] w-[1.3rem] fill-white' />
                            <p className='text-white'>Facebook</p>
                        </a>
                        <a href={`https://twitter.com/share?url=https://www.kuizme.com${postUrl}&text=${postTitle}`} target='_blank'
                            className='flex flex-row basis-[47.5%] bg-[#1DA1F2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/twitter.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <TwitterIcon className='h-[1.5rem] w-[1.5rem] fill-white' />
                            <p className='text-white'>Twitter</p>
                        </a>
                    </div>
                    {/* <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('test'); console.log(comments) }}>
                        Post
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                        Update
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                        Reply
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { deleteComment(comments[0].id); console.log(comments) }}>
                        Delete
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { console.log(comments) }}>
                        Log
                    </button> */}
                    <div className='flex flex-col gap-y-3 w-full mt-6 items-center'>
                        <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-indigo-600 
                    hover:cursor-pointer hover:bg-indigo-700'>
                            <button onClick={() => router.reload()}
                                className='text-xl text-white font-bold w-full'>
                                Play Again
                            </button>
                            {/*<div className='flex flex-row mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()} disabled={likeButton}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                            {/*<div className={`${error ? 'none' : 'invisible' } mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                        </div>
                        <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-rose-500
                    hover:cursor-pointer hover:bg-rose-600'>
                            <Link href={`/anime/${subcategory}`}>
                                <button className='w-full text-xl text-white font-bold px-2 md:px-4 2xl:px-8'>
                                    Try Other {animeTitle} Quizzes</button>
                            </Link>
                        </div>
                        <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-indigo-600
                    hover:cursor-pointer hover:bg-indigo-700'>
                            <Link href={`/anime`}>
                                <button className='text-xl text-white font-bold w-full'>
                                    Browse Anime Quizzes</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className='flex flex-col flex-1 justify-center items-center'>
                    <div className='text-3xl text-center'>
                        You scored {triviaScore}/{total}.</div>
                    <div className='text-2xl text-violet-600 text-center w-[90%]'>{text}</div>
                    <div className='mt-4 text-lg'>Share Your Result</div>
                    <div className='flex flex-row w-[21rem] h-[2rem] justify-center gap-x-1'>
                        <a href={`https://facebook.com/sharer.php?u=https://kuizme.com${postUrl}`} target='_blank'
                            className='flex flex-row basis-[47.5%] bg-[#4267B2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/facebook.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <FacebookIcon className='h-[1.3rem] w-[1.3rem] fill-white' />
                            <p className='text-white'>Facebook</p>
                        </a>
                        <a href={`https://twitter.com/share?url=https://www.kuizme.com${postUrl}&text=${postTitle}`} target='_blank'
                            className='flex flex-row basis-[47.5%] bg-[#1DA1F2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/twitter.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <TwitterIcon className='h-[1.5rem] w-[1.5rem] fill-white' />
                            <p className='text-white'>Twitter</p>
                        </a>
                    </div>
                    {/* <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('test'); console.log(comments) }}>
                        Post
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                        Update
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { postComment('Testing postComment'); console.log(comments) }}>
                        Reply
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { deleteComment(comments[0].id); console.log(comments) }}>
                        Delete
                    </button>
                    <button className='mt-2 bg-green-300 rounded py-2 px-4' onClick={() => { console.log(comments) }}>
                        Log
                    </button> */}
                    <div className='flex flex-col gap-y-3 w-full mt-6 items-center'>
                        <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-indigo-600 
                    hover:cursor-pointer hover:bg-indigo-700'>
                            <button onClick={() => router.reload()}
                                className='text-xl text-white font-bold w-full'>
                                Play Again
                            </button>
                            {/*<div className='flex flex-row mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()} disabled={likeButton}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                            {/*<div className={`${error ? 'none' : 'invisible' } mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                        </div>
                        <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-rose-500
                    hover:cursor-pointer hover:bg-rose-600'>
                            <Link href={`/anime/${subcategory}`}>
                                <button className='w-full text-xl text-white font-bold px-2 md:px-4 2xl:px-8'>
                                    Try Other {animeTitle} Quizzes</button>
                            </Link>
                        </div>
                        <div className='flex flex-row w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] rounded justify-center py-2 bg-indigo-600
                    hover:cursor-pointer hover:bg-indigo-700'>
                            <Link href={`/anime`}>
                                <button className='text-xl text-white font-bold w-full'>
                                    Browse Anime Quizzes</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )

    }
}

function calculatePercentageText(score = 0, total = 0) {
    const percentage = 100 * score / total
    let text = 'Nice.'
    if (percentage == 0) { text = 'Don\'t worry. We all struggle sometimes.' }
    else if (percentage < 20) { text = 'You just need a little more practice.' }
    else if (percentage < 40) { text = 'You\'re on the right track.' }
    else if (percentage < 60) { text = 'Not bad!' }
    else if (percentage < 80) { text = 'Nice job!' }
    else if (percentage < 100) { text = 'Brilliant! You know just about everything!' }
    else { text = 'Perfect! Your knowledge is impressive.' }
    return text
}

function getAnimeTitle(subcat = '') {
    let animeTitleArray = subcat.split('-')
    for (let i = 0; i < animeTitleArray.length; i++) {
        animeTitleArray[i] = animeTitleArray[i][0].toUpperCase() + animeTitleArray[i].substring(1)
    }
    return animeTitleArray.join(' ')
}

function calculateTimeSinceComment(tempCommentDate = '') {
    const tempCurrentDate = new Date().toUTCString()
    const currentDate = new Date(tempCurrentDate)
    const commentDate = new Date(tempCommentDate)
    const timeElapsed = (currentDate.valueOf() - commentDate.valueOf()) / 1000 // time in seconds
    if (timeElapsed < 60) {
        return 'Now'
    }
    else if (timeElapsed < 3600) {
        return `${(timeElapsed / 60).toFixed(0)} minutes ago`
    }
    else if (timeElapsed < 86400) {
        return `${(timeElapsed / 3600).toFixed(0)} hours ago`
    }
    else if (timeElapsed < 31536000) {
        return `${(timeElapsed / 86400).toFixed(0)} days ago`
    }
    else {
        return `${(timeElapsed / 31536000).toFixed(0)} years ago`
    }
}

function compareLikes(likesA, likesB) {
    if (likesA === undefined && likesB === undefined) return (-1)
    else if (likesA === undefined && likesB !== undefined) return (1)
    else if (likesA !== undefined && likesB === undefined) return (-1)
    else { if (likesA > likesB) { return (-1) } }
}

export default Conclusion
