import Image from 'next/image'
import Link from 'next/link'

const Preview = ({ slug, title, thumbnail }) => {
    return (
        <Link href={`/${slug}`}>
            <div className='md:w-80 hover:bg-gray-300 cursor-pointer rounded shadow bg-white'>
            <div className='flex flex-row h-32'>
                <div className='w-32'>
                { thumbnail && <Image className='rounded' src={thumbnail} width={200} height={200} /> }
                </div>
                <div className='w-40 mt-8 ml-4 font-universal'>{title}</div>
            </div>
            </div>
        </Link>
    )
}

export default Preview
