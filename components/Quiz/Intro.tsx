import Image from 'next/image'

const Intro = ({ title, intro, setStart, plays, publishedAt, likes, incrementPlay, featured }) => (
    <div className='flex flex-col items-center z-100'>
        <h1 className='text-center text-xl font-semibold w-80 md:w-1/2 md:h-12 mb-4'>{title}</h1>
        { featured && <Image className='rounded-lg' src={featured} width={200} height={200} /> }
        <div className='flex flex-col justify-start gap-x-4 w-80 md:w-96 mt-4
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
        <p className='w-80 md:w-96 text-justify mt-4'>{intro}</p>
        <div className='text-center mt-4'>
            <button onClick={() => {setStart(true), incrementPlay()}}
            className='w-20 h-10 pt-1 pb-1
                       text-xl font-bold text-white rounded bg-sky-400'>Play</button>
        </div>
    </div>
)

export default Intro
