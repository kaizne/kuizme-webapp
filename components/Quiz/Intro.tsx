import Image from 'next/image'

const Intro = ({ title, intro, setStart, featured }) => (
    <div className='flex flex-col items-center'>
        <h1 className='text-center text-xl font-bold w-80 mb-4'>{title}</h1>
        { featured && <Image className='rounded-lg' src={featured} width={200} height={200} /> }
        <p className='text-justify mt-4'>{intro}</p>
        <div className='text-center mt-4'>
            <button onClick={() => setStart(true)}
            className='w-20 h-10
                       text-xl 
                       rounded pt-1 pb-1 bg-sky-400 text-white font-bold'>Play</button>
        </div>
    </div>
)

export default Intro
