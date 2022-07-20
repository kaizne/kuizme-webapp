import React, { useEffect, useState } from 'react';
import Image from 'next/image'

const Intro = ({ title, intro, setStart, plays, publishedAt, likes, incrementPlay, featured, section,
                 difficulty, setDifficulty }) => {

    const [difficultyList, setDifficultyList] = useState([])

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
    </div>
)}

export default Intro
