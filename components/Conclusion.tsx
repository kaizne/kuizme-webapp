import Image from 'next/image'
import Link from 'next/link'
import { useLocation } from 'react-router-dom'

const Conclusion = ({ type=0, score=0, total=0, character='', characterImageUrl='' }) => {
    const percentage = Percentage(score, total)
    var text = ''
    if (percentage < 20) {
        text = 'Better luck next time.'
    }
    else if (percentage < 40) {
        text = 'Better than zero!'
    }
    else if (percentage < 60) {
        text = 'Not bad!'
    }
    else if (percentage < 80) {
        text = 'Nice job!'
    }
    else {
        text = 'Brilliant!'
    }
    return (
    <div className='fixed w-full h-full bg-opacity-95 bg-[#abadb9] justify-center bottom-0 left-0'>
        <>
        { type === 0 ? 
            <>
            <div className='flex h-screen justify-center items-center'>
                <h1 className='text-xl text-center'>
                You scored {score}/{total}.
                <br></br>
                <a className='text-2xl text-[#615477]'>{text}</a>
                <br></br><br></br><br></br>
                <a className='cursor-pointer text-4xl font-semibold
                md:hover:text-[#ce3131] active:text-[#ff9c00]'
                onClick={() => location.reload()}>Try Again</a>
                <br></br><br></br>
                <Link href='/'><a className='cursor-pointer text-4xl font-semibold
                md:hover:text-[#ce3131] active:text-[#ff9c00]'>Try Other Quizzes</a></Link>
                <br></br><br></br>
                <Link href='/'><a className='cursor-pointer text-4xl font-semibold
                md:hover:text-[#ce3131] active:text-[#ff9c00]'>Home</a></Link>
                </h1>
            </div>
            </>
            : 
            <>
            { characterImageUrl && <Image className='rounded-lg' src={characterImageUrl} width={120} height={120} /> }
            <div className='mt-2'>You got {character}.</div>
            </>
        }
        </>
    </div>
    )
}

function Percentage(score=0, total=0) {
    const percentage = 100*score/total
    return percentage
}

export default Conclusion
