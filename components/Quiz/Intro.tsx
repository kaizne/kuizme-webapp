import Image from 'next/image'

const Intro = ({ title, intro, setStart, featured }) => (
    <div className='flex flex-col items-center z-100'>
        <h1 className='text-center text-xl font-semibold w-80 mb-4'>{title}</h1>
        { featured && <Image className='rounded-lg' src={featured} width={200} height={200} /> }
        <p className='w-72 text-justify mt-4'>{intro}</p>
        <div className='text-center mt-4'>
            <button onClick={() => setStart(true)}
            className='w-20 h-10 pt-1 pb-1
                       text-xl font-bold text-white rounded bg-sky-400'>Play</button>
        </div>
    </div>
)

export default Intro
