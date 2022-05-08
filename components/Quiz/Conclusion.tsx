import Image from 'next/image'
import Link from 'next/link'

const Conclusion = ({ type=0, score=0, total=0, character='', characterImageUrl='',
                    conclusion='' }) => {
    const percentage = Percentage(score, total)
    let text = 'Nice.'
    if (percentage == 0) {
        text = 'At least you tried...'
    }
    else if (percentage < 20) {
        text = 'Better than zero...'
    }
    else if (percentage < 40) {
        text = 'Better luck next time.'
    }
    else if (percentage < 60) {
        text = 'Not bad!'
    }
    else if (percentage < 80) {
        text = 'Nice job!'
    }
    else if (percentage < 100) {
        text = 'Brilliant!'
    }
    else {
        text = 'Perfect!'
    }
    const width = screen.width
    var imgWidth = 120
    var imgHeight = 120
    if (width > 640) {
        imgWidth = 360
        imgHeight = imgWidth
    }
    return (
    <div className='fixed w-full h-full bg-opacity-90 bg-[#000000] justify-center bottom-0 left-0'>
        <>
        { type === 0 ? 
            <>
            <div className='flex h-screen justify-center items-center'>
                <h1 className='text-xl text-center text-white'>
                You scored {score}/{total}.
                <br></br>
                <a className='text-2xl text-[#b19aff]'>{text}</a>
                <br></br><br></br><br></br>
                <a className='cursor-pointer text-4xl font-semibold
                text-white md:hover:text-[#ce3131] active:text-[#ff9c00]'
                onClick={() => location.reload()}>Try Again</a>
                <br></br><br></br>
                <Link href='/'><a className='cursor-pointer text-4xl font-semibold
                text-white md:hover:text-[#ce3131] active:text-[#ff9c00]'>Try Other Quizzes</a></Link>
                <br></br><br></br>
                <Link href='/'><a className='cursor-pointer text-4xl font-semibold
                text-white md:hover:text-[#ce3131] active:text-[#ff9c00]'>Home</a></Link>
                </h1>
            </div>
            </>
            : 
            <>
            <div className='flex flex-col h-screen justify-center items-center'>
                <div>
                    <div className='mt-2 text-white text-xl'>You got</div>
                </div>
                <div>
                    { characterImageUrl && <Image className='rounded-lg' src={characterImageUrl} width={imgWidth} height={imgHeight} /> }
                </div>
                <div>
                    <div className='text-2xl text-[#b19aff]'>{character}</div>
                </div>
                <div>
                    <div className='text-2xl text-white'>{conclusion}</div>
                </div>
                <div>
                    <h1 className='text-xl text-center text-white'>
                    <br></br>
                    <a className='cursor-pointer text-4xl font-semibold
                    text-white md:hover:text-[#ce3131] active:text-[#ff9c00]'
                    onClick={() => location.reload()}>Try Again</a>
                    <br></br><br></br>
                    <Link href='/'><a className='cursor-pointer text-4xl font-semibold
                    text-white md:hover:text-[#ce3131] active:text-[#ff9c00]'>Try Other Quizzes</a></Link>
                    <br></br><br></br>
                    <Link href='/'><a className='cursor-pointer text-4xl font-semibold
                    text-white md:hover:text-[#ce3131] active:text-[#ff9c00]'>Home</a></Link>
                    </h1>
                </div>
            </div>
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
