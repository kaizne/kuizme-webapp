import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import {
    ChatIcon,
    EyeIcon,
    HeartIcon,
    ShareIcon,
} from '@heroicons/react/outline'

const Intro = ({ title, intro, introText, setStart, plays, publishedAt, likes, incrementPlay, featured, section,
                 difficulty, setDifficulty, label, commentsNum=0, shares=0, comments, postComment }) => {

    const colourListThree = ['bg-green-500', 'bg-red-500', 'bg-slate-800']
    const colourListFour = ['bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-slate-800']
    const [difficultyList, setDifficultyList] = useState([])
    const [colourList, setColourList] = useState([])
    useEffect(() => {
        if (introText.difficulties) {
            const tempDifficultyList = introText.difficulties.split('-')
            setDifficultyList((difficultyList) => tempDifficultyList)
            let tempColourList = []
            switch (tempDifficultyList.length) {
                case 3:
                    tempColourList = colourListThree
                    break
                case 4:
                    tempColourList = colourListFour
                    break
            }
            setColourList((colourList) => tempColourList)
        }
    }, [])

    return (
    <div className='flex flex-col items-center z-100 md:mt-6'>
        <div className='flex flex-col items-center md:rounded-lg bg-indigo-600'>
            <h1 className='w-screen max-w-sm md:w-[37.5rem] md:max-w-2xl md:h-16 mb-4 md:mb-0 pt-4
                           text-center text-2xl font-medium text-white'>{title}</h1>
            <div className='relative w-screen max-w-sm h-56 
                            md:max-w-2xl md:w-[37.5rem] md:h-[21.1rem]'>
                { featured && <Image src={featured} layout='fill' priority /> }
            </div>
            <button onClick={() => {setDifficulty(difficulty), setStart(true), incrementPlay()}}
                    className='w-screen max-w-sm h-12 md:w-[37.5rem] md:max-w-none pt-1 pb-1
                               text-xl font-bold text-white md:rounded-b bg-indigo-600 hover:cursor-pointer
                             hover:bg-indigo-800'>
                                Play</button>
        </div>
        { section.length > 0 && 
            <div className='text-center relative z-10 mt-2'>
                <button onClick={() => {if (difficulty >= difficultyList.length - 1) setDifficulty(0)
                                        else setDifficulty(difficulty + 1)}}
                        className={`w-[21.3rem] md:w-[37.5rem] h-12 pt-1 pb-1 text-xl font-bold text-white rounded
                                    ${colourList[difficulty]}`}>
                                    <div className='animate-fade'>
                                        {difficultyList[difficulty] ? difficultyList[difficulty] : <></>}
                                    </div>
                </button>
            </div>
        }
        <div className='flex flex-col items-center gap-x-3 md:gap-x-4 mt-3'> 
            <div className='flex flex-row gap-x-4'>
                <div className='flex flex-row text-base'>
                    <EyeIcon className='w-6 h-6' />
                    <span><span className='ml-1 font-semibold'>{plays} </span> 
                          <span className='hidden md:inline'>Plays</span></span>
                </div>
                <div className='flex flex-row text-base'>
                    <HeartIcon className='w-6 h-6' />
                    <span><span className='ml-1 font-semibold'>{likes} </span> 
                        <span className='hidden md:inline'>Likes</span></span>
                </div>
                <div className='hidden flex-row text-base'>
                    <ChatIcon className='w-6 h-6' />
                    <span><span className='ml-1 font-semibold'>{commentsNum} </span> 
                        <span className='hidden md:inline'>Comments</span></span>
                </div>
                <div className='hidden flex-row text-base'>
                    <ShareIcon className='w-6 h-6' />
                    <span><span className='ml-1 font-semibold'>{shares} </span> 
                        <span className='hidden md:inline'>Shares</span></span>
                </div>
                { /*
                <div className='flex flex-row text-base'>
                    <Image src='/date.svg' width={20} height={20} />
                    <div className='text-sm md:text-base'>
                        {publishedAt} 
                    </div>
                </div>
                */ }
            </div>
        </div>
        { /* <div className='w-80 md:w-96 text-justify mt-4'>{intro}</div> */ }
        <div className='w-screen max-w-sm md:w-[37.5rem] md:max-w-2xl
                        py-2 bg-violet-600 mt-3 text-center md:rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>Quiz Description</p>
        </div> 
        <div className='w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>{ introText.description }</p>
        </div>
        <div className={`w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-violet-600 mt-2 text-center md:rounded 
                        ${introText.instructions ? 'none' : 'hidden'}`}>
            <p className='text-white font-semibold text-lg md:text-xl'>How to Play</p>
        </div>
        <div className={`w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded
                        ${introText.instructions ? 'none' : 'hidden'}`}>
            <p className='text-black text-sm md:text-base'>{ introText.instructions }</p>
        </div>
        <div className={`w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-violet-600 mt-2 text-center md:rounded 
                        ${introText.anime ? 'none' : 'hidden'}`}>
            <p className='text-white font-semibold text-lg md:text-xl'>{ introText.anime }</p>
        </div>
        <div className={`w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded 
                        ${introText.anime ? 'none' : 'hidden'}`}>
            <p className='text-black text-sm md:text-base'>{ introText.title }</p>
        </div>
        <div className={`w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-violet-600 mt-2 text-center md:rounded
                        ${introText.background ? 'none': 'hidden'}`}>
            <p className='text-white font-semibold text-lg md:text-xl'>Background</p>
        </div>
        <div className={`w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded
                        ${introText.background ? 'none': 'hidden'}`}>
            <p className='text-black text-sm md:text-base'>{ introText.background }</p>
        </div>
        <div className={`w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-pink-700 mt-2 text-center md:rounded
                        ${introText.background ? 'none' : 'hidden'}`}>
            <p className='text-white font-semibold text-lg md:text-xl'>Our Goal</p>
        </div>
        <div className={`w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded
                        ${introText.background ? 'none' : 'hidden'}`}>
            <p className='text-black text-sm md:text-base'>What matters most to us at Kuizme is 
            making sure our users have the best experience possible. We try our best to provide 
            you with interesting and thought-provoking questions, which means carefully considering 
            which questions to include and how to ask them. We strive to ask you meaningful questions 
            in our personality, kin, and boyfriend or girlfriend quizzes for accurate assessments. 
            We strive to ask you questions that are challenging but not impossibly so to test your 
            knowledge. We hope everyone who visits our site has fun and wants to come back.</p>
        </div>
        <div className={`w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-pink-700 mt-2 text-center md:rounded
                        ${introText.background ? 'none' : 'hidden'}`}>
            <p className='text-white font-semibold text-lg md:text-xl'>We Care About Your Feedback</p>
        </div>
        <div className={`w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded
                        ${introText.background ? 'none' : 'hidden'}`}>
            <p className='text-black text-sm md:text-base'>Although we wish we could provide our users 
            with endless content, we are only human. With such a small cast, it can be a struggle at 
            times to keep up with the ever-expanding world of anime. If you ever find that Kuizme is 
            missing one of your favorite series, or if you have any particular quiz in mind that you 
            think we should make, please let us know. You can contact us via our social media or support 
            email found <a href='https://www.kuizme.com/contact' target='_blank'
            className='text-red-500 font-bold hover:cursor-pointer hover:text-red-700'>here</a>. 
            And although we prioritize attention to detail and accuracy in our quizzes, 
            we are not perfect. If you notice inaccuracies in this quiz or any others, please reach out 
            to us so that we can fix them as soon as possible.</p>
        </div>
        <div className='h-[2rem]'></div>
    </div>
)}

export default Intro
