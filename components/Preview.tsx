import Image from 'next/image'
import Link from 'next/link'

const Preview = ({ slug, title, thumbnail }) => {
    return (
        <Link href={`/${slug}`}>
            <div className='w-72 hover:bg-gray-300 cursor-pointer rounded bg-white'>
            <div className='flex flex-col'>
                <div className='relative w-72 h-44'>
                { thumbnail && <Image src={thumbnail} layout='fill'
                                      className='rounded' /> }
                </div>
                <div className='flex flex-col w-56 h-12 justify-center'>
                <div className='w-72 mt-1 text-lg font-semibold'>{title}</div>
                </div>
            </div>
            </div>
        </Link>
    )
}

export default Preview
