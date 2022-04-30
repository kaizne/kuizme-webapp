import Image from 'next/image'

const Conclusion = ({ type=0, score=0, total=0, character='', characterImageUrl='' }) => {
    return (
    <div className='flex flex-col place-content-center place-items-center h-80 mt-4'>
        <>
        { type === 0 ? 
            <>
            <div>Your score is {score} out of {total}.</div>
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
