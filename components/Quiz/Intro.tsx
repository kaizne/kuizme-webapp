import React, { useEffect, useState } from 'react';
import Image from 'next/image'

const Intro = ({ title, intro, setStart, plays, publishedAt, likes, incrementPlay, featured, section,
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
            setDifficultyList(difficultyList => [...difficultyList, section[idx].difficulty])
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
        <div className='flex flex-col items-center w-auto
                        md:rounded-lg bg-indigo-600'>
            <h1 className='w-80 md:w-full md:h-16 mb-4 md:mb-0 pt-4
                           text-center text-2xl font-medium text-white'>{title}</h1>
            { featured && <Image className='md:rounded-b-lg' src={featured} width={600} height={338} /> }
        </div>
        <div className='flex flex-row justify-center gap-x-1 md:gap-x-2 w-80 md:w-96 mt-4'>
            <div className='text-center'>
                    <button onClick={() => {setDifficulty(difficulty), setStart(true), incrementPlay()}}
                            className='w-52 md:w-80 h-12 pt-1 pb-1
                                    text-xl font-bold text-white rounded bg-indigo-600'>Play</button>
                </div>
            {section.length > 0 ? <div className='text-center relative z-10'>
                    <button onClick={() => {if (difficulty >= difficultyList.length - 1) setDifficulty(0)
                                            else setDifficulty(difficulty + 1)}}
                            className={`w-32 md:w-40 h-12 pt-1 pb-1 text-xl font-bold text-white rounded
                                        ${colourList[difficulty]}`}>
                                        <div className='animate-fade'>
                                            {difficultyList[difficulty] ? difficultyList[difficulty][0].toUpperCase() 
                                                                               + difficultyList[difficulty].substring(1) 
                                            : <></>}
                                        </div>
                    </button>
            </div> : <></> }
        </div>
        <div className='flex flex-col justify-start gap-x-3 md:gap-x-4 w-80 md:w-96 mt-4
                        border-b border-gray-300'>
            <div className='flex flex-row gap-x-4'>
                <div className='flex flex-row text-base'>
                    <Image src='/play.svg' width={20} height={20} />
                    <span><span className='font-semibold'>&nbsp;{plays}</span> Plays</span>
                </div>
            <div className='flex flex-row text-base'>
                <Image src='/date.svg' width={20} height={20} />
                <div className='text-base font-semibold'>
                    {publishedAt} 
                </div>
            </div>
            
            <div className='flex flex-row text-base'>
                <Image src='/red-heart.svg' width={20} height={20} />
                <span><span className='ml-1 font-semibold'>{likes}</span> Likes</span>
            </div>
            </div>
        </div>
        <div className='w-80 md:w-96 text-justify mt-4'>{intro}</div>
        {/*<div className='w-[21.3rem] md:w-[30.5rem] py-2 bg-violet-600 mt-4 text-center rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>Quiz Description</p>
        </div> 
        <div className='w-[19.5rem] md:w-[29rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>{ introText.description }</p>
        </div>
        <div className='w-[21.3rem] md:w-[30.5rem] py-2 bg-violet-600 mt-2 text-center rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>How to Play</p>
        </div>
        <div className='w-[19.5rem] md:w-[29rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>{ introText.instructions }</p>
        </div>
        <div className='w-[21.3rem] md:w-[30.5rem] py-2 bg-violet-600 mt-2 text-center rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>{ introText.anime }</p>
        </div>
        <div className='w-[19.5rem] md:w-[29rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>{ introText.title }</p>
        </div>
        <div className='w-[21.3rem] md:w-[30.5rem] py-2 bg-pink-700 mt-2 text-center rounded'>
            <p className='text-white font-semibold text-lg md:text-xl'>We Care About Your Feedback</p>
        </div>
        <div className='w-[19.5rem] md:w-[29rem] py-2 text-justify rounded'>
            <p className='text-black text-sm md:text-base'>What matters most to us at Kuizme is making sure
            our users have the best experience possible. We try our best to provide you with interesting
            and thought-provoking questions. If you notice inaccuracies or in this quiz or any others, please
            reach out to us so that we can fix them as soon as possible. You can contact us via our social 
            media or support email found <span className='text-red-500 font-bold'>here.</p>
        </div>
        */}
    </div>
)}

export default Intro
