import Image from 'next/image'
import Link from 'next/link'

const PreviewTwo = ({ slug, title, thumbnail }) => {
    return (
        <Link href={`/${slug}`}>
            <div className='w-80 hover:bg-gray-300 cursor-pointer rounded bg-white'>
            <div className='flex flex-col'>
                <div className='relative w-80 h-56'>
                { thumbnail && <Image src={thumbnail} layout='fill' /> }
                <div className='absolute ml-1 bottom-0 w-72 font-bold text-white text-2xl'>{title}</div>
                </div>
                
            </div>
            </div>
        </Link>
    )
}

export default PreviewTwo
