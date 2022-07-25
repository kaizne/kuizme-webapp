import React, { useEffect, useState } from 'react';
import Image from 'next/image'

const Intro = ({ title, intro, introText, setStart, plays, publishedAt, likes, incrementPlay, featured, section,
                 difficulty, setDifficulty, label }) => {

    const [difficultyList, setDifficultyList] = useState([])
    if (label === 'popular') {
        plays += 30
    }
    else if (label === 'trending') {
        plays += 10
    }
    useEffect(() => {
        for (let idx in section)
            if (!difficultyList.includes(section[idx].difficulty)) {
                setDifficultyList(difficultyList => [...difficultyList, section[idx].difficulty])
            }
    }, [])
    const difficultyTypes = ['easy', 'medium', 'hard', 'advanced', 'expert', 'master']
    const colourTypes = ['bg-green-500', 'bg-orange-500', 'bg-red-500', 'bg-cyan-500', 'bg-violet-800', 'bg-slate-800']

    let colourList = []
    for (let idx in difficultyTypes) {
        if (difficultyList.indexOf(difficultyTypes[idx]) > -1) {
            colourList.push(colourTypes[idx])
        }
    }
    
    return (
    <div className='flex flex-col items-center z-100 md:mt-6'>
        <div className='flex flex-col items-center md:rounded-lg bg-indigo-600'>
            <h1 className='w-screen max-w-sm md:w-[37.5rem] md:max-w-2xl md:h-16 mb-4 md:mb-0 pt-4
                           text-center text-2xl font-medium text-white'>{title}</h1>
            <div className='relative w-screen max-w-sm h-56 
                            md:max-w-2xl md:w-[37.5rem] md:h-[21.1rem]'>
                { featured && <Image src={featured} layout='fill' /> }
            </div>
            <button onClick={() => {setDifficulty(difficulty), setStart(true), incrementPlay()}}
                    className='w-screen max-w-sm h-12 md:w-[37.5rem] md:max-w-none pt-1 pb-1
                               text-xl font-bold text-white md:rounded-b bg-indigo-600 hover:cursor-pointer
                             hover:bg-indigo-800'>
                                Play</button>
        </div>
        {section.length > 0 ? <div className='text-center relative z-10 mt-2'>
                <button onClick={() => {if (difficulty >= difficultyList.length - 1) setDifficulty(0)
                                        else setDifficulty(difficulty + 1)}}
                        className={`w-[21.3rem] md:w-[37.5rem] h-12 pt-1 pb-1 text-xl font-bold text-white rounded
                                    ${colourList[difficulty]}`}>
                                    <div className='animate-fade'>
                                        {difficultyList[difficulty] ? difficultyList[difficulty][0].toUpperCase() 
                                                                            + difficultyList[difficulty].substring(1) 
                                        : <></>}
                                    </div>
                </button>
        </div> : <></> }
        <div className='flex flex-col items-center gap-x-3 md:gap-x-4 mt-3 border-b border-gray-300'> 
            <div className='flex flex-row gap-x-4'>
                <div className='flex flex-row text-sm md:text-base'>
                    <Image src='/play.svg' width={20} height={20} />
                    <span><span className='font-semibold'>&nbsp;{plays}</span> Plays</span>
                </div>
            <div className='flex flex-row text-base'>
                <Image src='/date.svg' width={20} height={20} />
                <div className='text-sm md:text-base font-semibold'>
                    {publishedAt} 
                </div>
            </div>
            
            <div className='flex flex-row text-base'>
                <Image src='/red-heart.svg' width={20} height={20} />
                <span><span className='ml-1 font-semibold'>{likes}</span> Likes</span>
            </div>
            </div>
        </div>
        {/*<div className='w-80 md:w-96 text-justify mt-4'>{intro}</div>
        */}
        <div className='w-screen max-w-sm md:w-[37.5rem] md:max-w-2xl
                        py-2 bg-violet-600 mt-4 text-center md:rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>Quiz Description</p>
        </div> 
        <div className='w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>{ introText.description }</p>
        </div>
        <div className='w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-violet-600 mt-2 text-center md:rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>How to Play</p>
        </div>
        <div className='w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>{ introText.instructions }</p>
        </div>
        <div className='w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-violet-600 mt-2 text-center md:rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>{ introText.anime }</p>
        </div>
        <div className='w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>{ introText.title }</p>
        </div>
        <div className='w-screen max-w-sm md:max-w-2xl md:w-[37.5rem] 
                        py-2 bg-pink-700 mt-2 text-center md:rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>We Care About Your Feedback</p>
        </div>
        <div className='w-[21.3rem] md:w-[37.5rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>What matters most to us at Kuizme is making sure
            our users have the best experience possible. We try our best to provide you with interesting
            and thought-provoking questions. If you notice inaccuracies or in this quiz or any others, please
            reach out to us so that we can fix them as soon as possible. You can contact us via our social 
            media or support email found <a href='https://www.kuizme.com/contact' target='_blank'
            className='text-red-500 font-bold hover:cursor-pointer hover:text-red-700'>here</a>.</p>
        </div>
        <div className='h-[2rem]'></div>
    </div>
)}

export default Intro
