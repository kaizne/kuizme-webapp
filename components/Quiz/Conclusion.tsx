import Image from 'next/image'
import Link from 'next/link'

const Conclusion = ({ type=0, score=0, total=0, character='', characterImageUrl='',
                    conclusion='', category='', subcategory='', title='' }) => {
    const percentage = Percentage(score, total)
    let endText = 'You are'
    console.log(character)
    if (title.includes('Breathing')) {
        endText = 'You got'
    }
    else if (title.includes('Kin')) {
        endText = 'You kin'
    }
    else if (title.includes('Boyfriend')) {
        endText = 'Your boyfriend is'
    }
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
    <div>
        <>
        { type === 0 ? 
            <>
            <div className='flex h-screen justify-center items-center'>
                <h1 className='text-4xl text-center text-black'>
                You scored {score}/{total}.
                <br></br>
                <a className='text-3xl text-[#b19aff]'>{text}</a>
                <br></br><br></br>
                <a className='cursor-pointer text-2xl font-semibold
                text-black md:hover:text-[#ce3131] active:text-[#ff9c00]'
                onClick={() => location.reload()}>Play Again</a>
                <br></br>
                <Link href={`/${category}/${subcategory}`}><a className='cursor-pointer text-2xl font-semibold
                text-black md:hover:text-[#ce3131] active:text-[#ff9c00]'>Try Other Quizzes</a></Link>
                <br></br>
                <Link href='/'><a className='cursor-pointer text-2xl font-semibold
                text-black md:hover:text-[#ce3131] active:text-[#ff9c00]'>Home</a></Link>
                </h1>
            </div>
            </>
            : 
            <>
            <div className='flex flex-col min-h-screen justify-center items-center px-2 md:px-0'>
                <div>
                    <div className='mt-2 text-black text-3xl'>{endText}</div>
                </div>
                <div>
                    { characterImageUrl && <Image className='rounded-lg' src={characterImageUrl} width={imgWidth} height={imgHeight} /> }
                </div>
                <div>
                    <div className='text-3xl text-[#b19aff]'>{character}</div>
                </div>
                <div>
                    <br></br>
                    <div className={`rounded-lg bg-gray-200 border-solid border-gray-600 ring-4 ring-offset-1 ring-violet-900 
                    border-2 text-2xl text-black text-center md:max-w-[25%] md:relative md:top-1/2 md:left-[37.5%]`}>{conclusion}</div>
                </div>
                <div>
                    <h1 className='text-xl text-center text-black'>
                    <br></br>
                    <a className='cursor-pointer text-2xl font-semibold
                    text-black md:hover:text-[#ce3131] active:text-[#ff9c00]'
                    onClick={() => location.reload()}>Play Again</a>
                    <br></br>
                    <Link href={`/${category}/${subcategory}`}><a className='cursor-pointer text-2xl font-semibold
                    text-black md:hover:text-[#ce3131] active:text-[#ff9c00]'>Try Other Quizzes</a></Link>
                    <br></br>
                    <Link href='/'><a className='cursor-pointer text-2xl font-semibold
                    text-black md:hover:text-[#ce3131] active:text-[#ff9c00]'>Home</a></Link>
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
