import { setDefaultResultOrder } from 'dns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { FacebookIcon, TwitterIcon } from '@remixicons/react/fill'
import { ThumbUpIcon, MenuAlt2Icon, ChevronDownIcon, ChevronUpIcon, 
    ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/outline'

const Conclusion = ({ type=0, score=0, triviaScore=0, total=0, character='', characterImageUrl='',
                    conclusion='', category='', subcategory='', title='', imageUrls,
                    incrementLike, decrementLike, updateLibrary, slug,
                    conclusionStats, conclusionCharacters, conclusionIndex, updateConclusionStats, comments, postComment }) => {

    const minComments = 10
    const commentsIncrement = 10
    const characterLimit = 400
    const minReplies = 5
    const repliesIncrement = 5

    const refComment = useRef(null)
    const refStats = useRef(null)
    const refFilter = useRef(null)
    const refTextarea = useRef(null)
    const [forceRenderState, setForceRenderState] = useState(false)
    const [dropDownFilter, setDropDownFilter] = useState(false)
    const [filter, setFilter] = useState('Newest')
    const [commentsShown, setCommentsShown] = useState(minComments)
    const [profile, setProfile] = useState(false)
    const [like, setLike] = useState(false)
    const [error, setError] = useState(false)
    const [likeText, setLikeText] = useState('Add to library')
    const [likeButton, setLikeButton] = useState(false)
    const [characterCounter, setCharacterCounter] = useState(0)
    const [showReplies, setShowReplies] = useState(new Array(commentsShown).fill(false))
    const [openReplies, setOpenReplies] = useState(new Array(commentsShown).fill(false))
    const [replyCharacterCounts, setReplyCharacterCounts] = useState(new Array(commentsShown).fill(0))
    const [repliesShown, setRepliesShown] = useState(new Array(commentsShown).fill(0))
    const animeTitle = getAnimeTitle(subcategory)

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
        statsArray = Object.values(conclusionStats)
        charactersArray = Object.values(conclusionCharacters)
    }
    const keys = Array.from(statsArray.keys()).sort((a, b) => statsArray[b] - statsArray[a])
    const sortedStats = keys.map(i => statsArray[i])
    const sortedCharacters = keys.map(i => charactersArray[i])
    const sortedImageUrls = keys.map(i => imageUrls[i])
    const statsTotal = statsArray.reduce((partialSum, a) => partialSum + a, 0)

    const colourArray = ['bg-indigo-900','bg-indigo-800','bg-indigo-700','bg-indigo-600','bg-indigo-500',
    'bg-indigo-400','bg-indigo-300','bg-violet-400','bg-violet-500','bg-violet-600','bg-violet-700',
    'bg-violet-800','bg-violet-900']
    {/* How to save dates for time zone compatibility?
    let commentDate = new Date().toUTCString()
    *save commentDate to the comment object in Strapi
    *retrive commentDate from comment object in Strapi when displaying
    let currentDate = new Date().toUTCString()
    let commentDateObj = new Date(commentDate)
    let currentDateObj = new Date(currentDate)
    const timeElapsed = currentDateObj.valueOf() - commentDateObj.valueOf() * time in milliseconds *
    */}
    const commentsJson = {'1':{username:'pResmETa',date:`${new Date().toUTCString()}`,likes:10,replies:{'1':{username:'redblueorange',date:`${new Date().toUTCString()}`,likes:5,replies:{},
    text:'I am replying to your comment. This is the first reply. I am now writing additional text to test the overflow wrapping on the reply comment.'},
    '2':{username:'secondreply',date:`${new Date().toUTCString()}`,likes:2,replies:{},
    text:'I am replying to your comment. This is the second reply.'}},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '2':{username:'fRUDIOUS',date:`${new Date('Sunday July 31 2022 21:04:00 GMT+0500').toUTCString()}`,likes:72,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '3':{username:'uncEcApH871',date:`${new Date('Thursday June 16 2022 13:01:54 GMT-0200').toUTCString()}`,likes:14,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '4':{username:'mCfresh',date:`${new Date('Friday July 22 2022 13:01:54 GMT+0200').toUTCString()}`,likes:83,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '5':{username:'mjdagoat',date:`${new Date('Sunday July 31 2022 11:59:54 GMT+0600').toUTCString()}`,likes:501,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '6':{username:'yujishuji109481lol',date:`${new Date('Tuesday July 26 2022 13:01:54 GMT+0100').toUTCString()}`,likes:11,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '7':{username:'alex',date:`${new Date('Wednesday July 27 2022 13:01:54 GMT+0700').toUTCString()}`,likes:1,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '8':{username:'k',date:`${new Date('Friday July 28 2022 13:01:54 GMT+0700').toUTCString()}`,likes:2,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '9':{username:'rickross',date:`${new Date('Tuesday March 1 2022 13:01:54 GMT-0600').toUTCString()}`,likes:3,replies:{'1':{username:'pinkpurple',date:`${new Date().toUTCString()}`,likes:1,replies:{},
    text:'I am replying to your comment. This is the first reply.'}},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '10':{username:'hehexd',date:`${new Date('Friday May 11 2018 13:01:54 GMT-0500').toUTCString()}`,likes:3,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '11':{username:'beTiCTiV',date:`${new Date('Tuesday January 10 2022 13:01:54 GMT-0600').toUTCString()}`,likes:9,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '12':{username:'randomUsername',date:`${new Date('Monday July 25 2022 13:01:54 GMT+0500').toUTCString()}`,likes:54,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '13':{username:'seanbrawn',date:`${new Date('Saturday April 8 2017 13:01:54 GMT+0200').toUTCString()}`,likes:1,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '14':{username:'bunnyxx',date:`${new Date('Wednesday September 8 2021 13:01:54 GMT+0200').toUTCString()}`,likes:0,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '15':{username:'lavender',date:`${new Date('Monday July 25 2022 13:01:54 GMT-0100').toUTCString()}`,likes:0,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '16':{username:'coral',date:`${new Date('Thursday April 7 2022 13:01:54 GMT-0400').toUTCString()}`,likes:5,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '17':{username:'Kevin Durant',date:`${new Date('Tuesday July 26 2022 13:01:54 GMT-0700').toUTCString()}`,likes:179,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '18':{username:'Lebron James',date:`${new Date('Wednesday October 13 2021 13:01:54 GMT+0800').toUTCString()}`,likes:180,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '19':{username:'cantwinwiththesecats',date:`${new Date('Monday February 1 2021 13:01:54 GMT+0100').toUTCString()}`,likes:1723,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'},
    '20':{username:'chumb',date:`${new Date('Saturday July 2 2022 13:01:54 GMT+0200').toUTCString()}`,likes:10529,replies:{},
    text:'I think its hilarious u kids talking about chumb. u wouldnt say this stuff to him at lan, hes jacked. not only that but he wears the freshest clothes, eats at the chillest restaurants and hangs out with the hottest dudes. yall are pathetic lol'}}
    const [commentsArray, setCommentsArray] = useState(Object.values(commentsJson))

    useEffect(() => {
        if (localStorage.getItem('jwt')) setProfile(true)
        else setProfile(false)
        document.addEventListener('click', handleClickOutsideFilter, true)
        if (localStorage.getItem('user')) {
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
    const handleClickPost = (e) => {
        if (refTextarea.current) {
            if (refTextarea.current.value) {
                setCommentsArray((commentsArray) => [{username:'testName',date:new Date().toUTCString(),likes:0,replies:{},text:refTextarea.current.value},...commentsArray])
                refTextarea.current.value = ''
                refTextarea.current.style.height = '38px'
                refTextarea.current.style.height = `${refTextarea.current.scrollHeight}px`
                setCharacterCounter(refTextarea.current.value.length)
            }
        }
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
    if (type === 0) postTitle = `I got ${score/total} on this ${subcategory} quiz... let
    me know if you can beat my score.`
    else if (type === 1) postTitle = `I got ${character}! Let me know what you get.`
    else if (type === 2) postTitle = `I got ${triviaScore/total} on this ${subcategory} quiz... let
    me know if you can beat my score.`
    else if (type === 3) postTitle = `I got ${score/total} on this ${subcategory} quiz... let
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
    
    switch (type) {
        case 0:
            return (
                <div className='flex flex-col flex-1 justify-center items-center'>
                    <div className='text-4xl text-center'>
                        You scored {score}/{total}.
                    </div>
                    <div className='text-3xl text-violet-600'>{text}</div>
                    <div className='mt-4 text-lg'>Share Your Score</div>
                    <div className='flex flex-row w-[21rem] h-[2rem] justify-center gap-x-1'>
                        <a href={`https://facebook.com/sharer.php?u=https://kuizme.com${postUrl}`} target='_blank'
                        className='flex flex-row basis-[47.5%] bg-[#4267B2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/facebook.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <FacebookIcon className='h-[1.3rem] w-[1.3rem] fill-white'/>
                            <p className='text-white'>Facebook</p>
                        </a>
                        <a href={`https://twitter.com/share?url=https://www.kuizme.com${postUrl}&text=${postTitle}`} target='_blank' 
                        className='flex flex-row basis-[47.5%] bg-[#1DA1F2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/twitter.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <TwitterIcon className='h-[1.5rem] w-[1.5rem] fill-white'/>
                            <p className='text-white'>Twitter</p>
                        </a>
                    </div>
                    <div className='flex flex-col items-center mt-4'>
                        <button onClick={() => router.reload()}
                                className='text-xl font-semibold md:hover:text-red-600'>
                            Play Again
                        </button>
                        {/*<div className='flex flex-row mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()}
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
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime/${subcategory}`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Try Other {animeTitle} Quizzes</button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Browse Anime Quizzes</button>
                        </Link>
                    </div>
                </div>
            )
        case 1:
            return ( 
                <div className='flex flex-col flex-1 justify-center items-center bg-white'>
                    <div className='mt-3 text-black text-3xl'>{endText}</div>
                    { characterImageUrl && <Image className='rounded-lg' src={characterImageUrl} width={200} height={200} priority /> }
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
                            <FacebookIcon className='h-[1.3rem] w-[1.3rem] fill-white'/>
                            <p className='text-white'>Facebook</p>
                        </a>
                        <a href={`https://twitter.com/share?url=https://www.kuizme.com${postUrl}&text=${postTitle}`} target='_blank' 
                        className='flex flex-row basis-[47.5%] bg-[#1DA1F2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/twitter.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <TwitterIcon className='h-[1.5rem] w-[1.5rem] fill-white'/>
                            <p className='text-white'>Twitter</p>
                        </a>
                    </div>
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
                        const percentage = (100*(element/statsTotal)).toFixed(1)
                        const width = 100*(element/sortedStats[0])
                        let isCharacter = false
                        if (characterImageUrl === sortedImageUrls[index]) isCharacter = true
                        return (
                            <div key={index} className='flex flex-col w-full'>
                            <div className={`h-[0.25rem] ${colourArray[index]}`} 
                            style={{'width': `${width}%`}}></div>
                            <div className='flex flex-row items-center mt-[0.2rem]'>
                                <p className='w-[2.5rem] text-gray-500 text-sm'>{percentage}%</p>
                                <img src={sortedImageUrls[index]} className='ml-2 h-[2rem] w-[2rem] border-black'></img>
                                <p className={`${isCharacter ? 'font-semibold text-amber-500' : 'none'} ml-1`}>{sortedCharacters[index]}</p>
                            </div>
                            </div>    
                        )})}
                    </div>
                    <textarea ref={refTextarea} placeholder='Leave a comment...' rows={1} spellCheck='false' className='resize-none w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%] mt-4 
                    bg-gray-200 border-2 border-gray-200 rounded hover:border-gray-300 focus:bg-white placeholder:text-gray-700 
                    focus:border-indigo-600 focus:outline-none md:block px-2 py-1 h-38px scrollbar-hide text-[15.4px] md:text-[14.8px]' maxLength={characterLimit} onChange={(event) => {
                        event.target.style.height = '38px'
                        event.target.style.height = `${event.target.scrollHeight}px`
                        if (event.target.value.length > characterLimit) {
                            event.target.value = event.target.value.substring(0,characterLimit)
                        }
                        setCharacterCounter(event.target.value.length)
                        //scrollToComment()
                    }}></textarea>
                    <div className='w-11/12 flex flex-row justify-start md:w-3/5 xl:w-2/5 3xl:w-[30%] mt-1 h-[2rem] items-center gap-x-4'>
                        <button className='w-[15%] bg-indigo-600 rounded text-white text-center font-semibold hover:bg-indigo-700 py-1' onClick={() => {
                            //commentsArray.splice(0, 0, refTextarea.current.value)
                            handleClickPost(refTextarea)
                        }}>
                            Post
                        </button>
                        <p className='text-sm text-gray-600'>
                            { characterCounter }<span className='text-black'>/{ characterLimit }</span>
                        </p>
                    </div>
                    <div className='w-11/12 flex flex-row justify-start md:w-3/5 xl:w-2/5 3xl:w-[30%] mt-4 h-[2rem] items-center'>
                        <p className='text-gray-700'>
                            { commentsArray.length } Comments
                        </p>
                        <div ref={refFilter} className='flex flex-col ml-6'>
                            <div className='flex flex-row gap-x-1 items-center hover:cursor-pointer hover:outline hover:outline-2 hover:outline-indigo-600' onClick={() => {
                                setDropDownFilter(!dropDownFilter)
                            }}>
                                <MenuAlt2Icon className='h-[1.7rem] w-[1.7rem]'/>
                                <p className='pr-1'>Sort by</p>  
                            </div>
                            <div className={`${ dropDownFilter ? 'none' : 'hidden' } absolute flex flex-col mt-9 pr-2 gap-y-1 shadow-lg bg-white outline outline-2`}>
                                <button className='text-left ml-2 px-1 md:hover:bg-gray-300 md:hover:rounded mt-1.5' onClick={() => {
                                    setFilter('Newest')
                                    setDropDownFilter(false)
                                    setShowReplies((showReplies) => new Array(commentsShown).fill(false))
                                    setOpenReplies((openReplies) => new Array(commentsShown).fill(false))
                                }}>Newest</button>
                                <button className='text-left ml-2 px-1 md:hover:bg-gray-300 md:hover:rounded mb-1.5' onClick={() => {
                                    setFilter('Most Popular')
                                    setDropDownFilter(false)
                                    setShowReplies((showReplies) => new Array(commentsShown).fill(false))
                                    setOpenReplies((openReplies) => new Array(commentsShown).fill(false))
                                }}>Most Popular</button>
                            </div>
                        </div>
                    </div>
                    <div ref={refComment} className='h-2'></div>
                    <div className='flex flex-col w-11/12 md:w-3/5 xl:w-2/5 3xl:w-[30%]'>
                    {commentsArray.sort((a,b) => {
                        if (forceRenderState) {}
                        if (filter === 'Newest') {
                            const dateA = new Date(a.date)
                            const dateB = new Date(b.date)
                            const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                            const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                            if (timeElapsedA > timeElapsedB) return (1)
                            else return (-1)
                        }
                        else if (filter === 'Most Popular') {
                            const likesA = a.likes
                            const likesB = b.likes
                            if (likesA > likesB) return (-1)
                            else return (1)
                        }
                      }).slice(0,commentsShown).map((element,index) => {
                        const timeSinceComment = calculateTimeSinceComment(element.date)
                        let repliesArray = []
                        let viewComments = false
                        if (Object.keys(element.replies).length > 0) {
                            repliesArray = Object.values(element.replies)
                        }
                        //asyncCommentsArray = 
                        let tempRepliesShown = 0
                        if (repliesShown[index] === 0) tempRepliesShown = repliesArray.length
                        else tempRepliesShown = repliesShown[index]
                        return (
                            <div key={index} className='flex flex-row w-full mb-4'>
                                <div className='h-[2.5rem] w-[2.5rem]'>
                                    {/*<div className='rounded-full bg-indigo-600 h-[2.5rem] w-[2.5rem] flex items-center justify-center'>
                                        <p className='text-white text-center'>A</p>
                                    </div>
                                    */}
                                    <img src='/goku.jpg' className='rounded-full'/>
                                </div>
                                <div className='flex flex-col w-full ml-4'>
                                    <div className='flex flex-row items-end'>
                                        <p className='text-sm font-semibold'>{ element.username }</p>
                                        <p className='text-[12px] text-gray-600 ml-2'>{ timeSinceComment }</p>
                                    </div>
                                    <div className='flex flex-row mt-1'>
                                        <p className='text-sm break-all'>{ element.text }</p>
                                    </div>
                                    <div className='flex flex-row mt-2 items-center'>
                                        <ThumbUpIcon className='h-[1.1rem] hover:cursor-pointer hover:stroke-indigo-600' onClick={() => {}}/>
                                        <p className='text-sm text-gray-600 ml-1'>{ element.likes }</p>
                                        <button className='ml-4 text-sm text-gray-600 hover:text-black' onClick={() => {
                                            let tempOpenReplies = openReplies
                                            if (!tempOpenReplies[index]) {
                                                tempOpenReplies[index] = true
                                                setOpenReplies((openReplies) => tempOpenReplies)
                                                setForceRenderState(!forceRenderState)
                                            }
                                        }}>Reply</button>
                                    </div>
                                    <div className={`${!openReplies[index] ? 'hidden' : 'none'}`}>
                                        <div className='flex flex-row w-full mt-2'>
                                            <div className='h-[2rem] w-[2rem]'>
                                                <img src='/goku.jpg' className='rounded-full'/>
                                            </div>
                                            <div className='flex flex-col w-full ml-4 gap-y-1'>
                                                <textarea placeholder='Leave a reply...' rows={1} spellCheck='false' className='resize-none
                                                bg-gray-200 border-2 border-gray-200 rounded hover:border-gray-300 focus:bg-white placeholder:text-gray-700 
                                                focus:border-indigo-600 focus:outline-none md:block px-2 h-33px scrollbar-hide py-[0.1rem] text-[14px] md:text-[14px]' maxLength={characterLimit} onChange={(event) => {
                                                    event.target.style.height = '33px'
                                                    event.target.style.height = `${event.target.scrollHeight}px`
                                                    if (event.target.value.length > characterLimit) {
                                                        event.target.value = event.target.value.substring(0,characterLimit)
                                                    }
                                                    let tempCharacterCount = replyCharacterCounts
                                                    tempCharacterCount[index] = event.target.value.length
                                                    setReplyCharacterCounts((replyCharacterCounts) => tempCharacterCount)
                                                    setForceRenderState(!forceRenderState)
                                                }}></textarea>
                                                <div className='flex flex-row items-center'>
                                                    <p className='text-sm text-gray-600'>
                                                        { replyCharacterCounts[index] }<span className='text-black'>/{ characterLimit }</span>
                                                    </p>
                                                    <div className='relative w-full flex justify-end'>
                                                    <button className='w-[15%] bg-gray-200 rounded text-black text-center font-semibold text-sm hover:bg-gray-300 py-1 mr-1 relative right-0' onClick={() => {
                                                        let tempOpenReplies = openReplies
                                                        tempOpenReplies[index] = false
                                                        setOpenReplies((openReplies) => tempOpenReplies)
                                                        setForceRenderState(!forceRenderState)
                                                    }}>Cancel</button>
                                                    <button className='w-[15%] bg-indigo-600 rounded text-white text-center font-semibold text-sm hover:bg-indigo-700 py-1 relative right-0'>Post</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex flex-row my-2 ${repliesArray.length > 0 ? 'none' : 'hidden'}`}>
                                        <button className='flex flex-row items-center gap-x-2' onClick={() => {
                                            let tempShowReplies = showReplies
                                            tempShowReplies[index] = !tempShowReplies[index]
                                            setShowReplies((showReplies) => tempShowReplies)
                                            setForceRenderState(!forceRenderState)
                                        }}>
                                        {!showReplies[index] ? 
                                        <ChevronDownIcon className='h-[1rem] stroke-blue-600'/>
                                        :
                                        <ChevronUpIcon className='h-[1rem] stroke-blue-600'/>
                                        }
                                        <p className='text-sm text-blue-600'>{ repliesArray.length > 1 ? 
                                        !showReplies[index] ? `View ${ repliesArray.length } replies` : `Hide ${ repliesArray.length } replies`
                                        :
                                        !showReplies[index] ? 'View 1 reply' : 'Hide 1 reply'}</p>
                                        </button>
                                    </div>
                                    {showReplies[index] ? repliesArray.sort((a,b) => {
                                        const dateA = new Date(a.date)
                                        const dateB = new Date(b.date)
                                        const timeElapsedA = new Date().valueOf() - dateA.valueOf()
                                        const timeElapsedB = new Date().valueOf() - dateB.valueOf()
                                        if (timeElapsedA > timeElapsedB) return (1)
                                        else return (-1)
                                    }).slice(0,tempRepliesShown).map((element,index) => {
                                        const timeSinceComment = calculateTimeSinceComment(element.date)
                                        return (
                                            <div key={index} className='flex flex-row w-full mb-4'>
                                                <div className='h-[2rem] w-[2rem]'>
                                                    <img src='/goku.jpg' className='rounded-full'/>
                                                </div>
                                                <div className='flex flex-col w-full ml-4'>
                                                    <div className='flex flex-row items-end'>
                                                        <p className='text-sm font-semibold'>{ element.username }</p>
                                                        <p className='text-[12px] text-gray-600 ml-2'>{ timeSinceComment }</p>
                                                    </div>
                                                    <div className='flex flex-row mt-1'>
                                                        <p className='text-sm break-all'>{ element.text }</p>
                                                    </div>
                                                    <div className='flex flex-row mt-2 items-center'>
                                                        <ThumbUpIcon className='h-[1.1rem] hover:cursor-pointer hover:stroke-indigo-600' onClick={() => { let aaaaa = 1 }}/>
                                                        <p className='text-sm text-gray-600 ml-1'>{ element.likes }</p>
                                                        <button className='ml-4 text-sm text-gray-600 hover:text-black'>Reply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )    
                                    })
                                    :
                                    <></>}
                                    <div className={`flex flex-row w-full hover:cursor-pointer items-center ${(showReplies[index]) && (tempRepliesShown < repliesArray.length) ? 'none' : 'hidden'}`} onClick={() => {

                                    }}>
                                        <ChevronDoubleRightIcon className='h-[1rem] stroke-blue-600'></ChevronDoubleRightIcon>
                                        <p className='ml-2 text-sm text-blue-600 text-center'>Show more replies</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <button className='w-full py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold text-center rounded mb-8' onClick={() => {
                        if (commentsShown < commentsArray.length) { setCommentsShown(commentsShown + commentsIncrement); setShowReplies((showReplies) => new Array(commentsShown).fill(false));
                            setOpenReplies((openReplies) => new Array(commentsShown).fill(false)) }
                        else { setCommentsShown(minComments); setShowReplies((showReplies) => new Array(commentsShown).fill(false)); setOpenReplies((openReplies) => new Array(commentsShown).fill(false)); 
                            scrollToStats() }
                    }}>{ commentsShown < commentsArray.length ? 'Show More' : 'Hide Comments' }</button>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className='flex flex-col flex-1 justify-center items-center'>
                    <div className='text-4xl text-center'>
                        You scored {triviaScore}/{total}.</div>
                    <div className='text-3xl text-violet-600'>{text}</div>
                    <div className='mt-4 text-lg'>Share Your Score</div>
                    <div className='flex flex-row w-[21rem] h-[2rem] justify-center gap-x-1'>
                        <a href={`https://facebook.com/sharer.php?u=https://kuizme.com${postUrl}`} target='_blank'
                        className='flex flex-row basis-[47.5%] bg-[#4267B2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/facebook.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <FacebookIcon className='h-[1.3rem] w-[1.3rem] fill-white'/>
                            <p className='text-white'>Facebook</p>
                        </a>
                        <a href={`https://twitter.com/share?url=https://www.kuizme.com${postUrl}&text=${postTitle}`} target='_blank' 
                        className='flex flex-row basis-[47.5%] bg-[#1DA1F2] rounded justify-center items-center gap-x-2 hover:cursor-pointer'>
                            {/*<img src='/twitter.svg' className='hover:cursor-pointer h-[1.8rem] w-[1.8rem]'/>
                            */}
                            <TwitterIcon className='h-[1.5rem] w-[1.5rem] fill-white'/>
                            <p className='text-white'>Twitter</p>
                        </a>
                    </div>
                    <div className='flex flex-col items-center mt-4'>
                        <button onClick={() => router.reload()}
                                className='text-xl font-semibold md:hover:text-red-600'>
                            Play Again
                        </button>
                        {/*<div className='flex flex-row items-center mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                        {/*<div className={`${error ? 'none' : 'invisible'} mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime/${subcategory}`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Try Other {animeTitle} Quizzes</button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Browse Anime Quizzes</button>
                        </Link>
                    </div>
                </div>
            )
        case 3:
            return (
                <div className='flex flex-col flex-1 justify-center items-center'>
                    <div className='text-4xl text-center'>
                        You scored {triviaScore}/{total}.</div>
                    <div className='text-3xl text-violet-600'>{text}</div>
                    <div className='flex flex-col items-center mt-4'>
                        <button onClick={() => router.reload()}
                                className='text-xl font-semibold md:hover:text-red-600'>
                            Play Again
                        </button>
                        {/*<div className='flex flex-row items-center mt-2'>
                            <Image src={`${like ? '/red-heart.svg' : '/heart.svg'}`} width={20} height={20} />
                            <button onClick={() => likeQuiz()}
                                    className='ml-1 text-xl font-semibold md:hover:text-red-600'>
                                {likeText}
                            </button>
                        </div>
                        */}
                        {/*<div className={`${error ? 'none' : 'invisible'} mt-1 text-red-500`}>
                            Please sign in to add to library.
                        </div>
                        */}
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime/${subcategory}`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Try Other {animeTitle} Quizzes</button>
                        </Link>
                    </div>
                    <div className='flex flex-col items-center mt-2'>
                        <Link href={`/anime`}>
                            <button className='text-xl font-semibold md:hover:text-red-600'>
                            Browse Anime Quizzes</button>
                        </Link>
                    </div>
                </div>
            )
            
    }
}

function calculatePercentageText(score=0, total=0) {
    const percentage = 100*score/total
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

function getAnimeTitle(subcat='') {
    let animeTitleArray = subcat.split('-')
    for (let i = 0; i < animeTitleArray.length; i++) {
        animeTitleArray[i] = animeTitleArray[i][0].toUpperCase() + animeTitleArray[i].substring(1)
    }
    return animeTitleArray.join(' ')
}

function calculateTimeSinceComment(tempCommentDate='') {
    const tempCurrentDate = new Date().toUTCString()
    const currentDate = new Date(tempCurrentDate)
    const commentDate = new Date(tempCommentDate)
    const timeElapsed = (currentDate.valueOf() - commentDate.valueOf())/1000 // time in seconds
    if (timeElapsed < 60) {
        return 'Now'
    }
    else if (timeElapsed < 3600) {
        return `${(timeElapsed/60).toFixed(0)} minutes ago`
    }
    else if (timeElapsed < 86400) {
        return `${(timeElapsed/3600).toFixed(0)} hours ago`
    }
    else if (timeElapsed < 31536000) {
        return `${(timeElapsed/86400).toFixed(0)} days ago`
    }
    else {
        return `${(timeElapsed/31536000).toFixed(0)} years ago`
    }  
}

export default Conclusion
