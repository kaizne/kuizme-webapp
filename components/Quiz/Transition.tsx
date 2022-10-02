import { useEffect, useState } from 'react'
import Image from 'next/image'

const Transition = ({ title, difficulty, opening }) => {
    const [countdown, setCountdown] = useState(0)
    const [url, setUrl] = useState()

    useEffect(() => {
        setUrl(opening.data.attributes.url)
    }, [opening])

    useEffect(() => {
        if (countdown < 100) setTimeout(() => setCountdown(countdown + 5), 100)
    }, [countdown])

    const mode = (difficulty) => {
        switch (difficulty) {
            case 0: return 'Easy'
            case 1: return 'Medium'
            case 2: return 'Hard'
            case 3: return 'Expert'
            default: return 'Easy'
        }
    }

    return (
        <div className='flex flex-col items-center md:mt-6'>
            <div className='w-80 text-center text-lg font-semibold'>{title}</div>
            <div className='text-xl font-bold text-violet-600'>{mode(difficulty)}</div>
            {url && 
                <div className='relative w-72 h-40 rounded'>
                    <Image className='rounded' src={url} layout='fill' priority />
                </div> }
            <div className='mt-4'>Loading...</div>
            <div className='w-64 bg-indigo-200 mb-2 rounded'>
                <div style={{ width: `${countdown}%`, transition: '0.1s linear' }} className='h-2 bg-indigo-500 rounded'></div>
            </div>
        </div>
    )
}

export default Transition
