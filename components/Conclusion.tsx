import Image from 'next/image'

const Conclusion = ({ type=0, score=0, total=0, character='', characterImageUrl='' }) => {
    return (
    <div className='fixed w-full h-full bg-opacity-95 bg-[#505050] justify-center bottom-0 left-0'>
        <>
        { type === 0 ? 
            <>
            <h1 className='text-center'>Your score is {score} out of {total}.</h1>
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

export default Conclusion
