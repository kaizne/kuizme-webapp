import Image from 'next/image'
import Link from 'next/link'

const Preview = ({ slug, title, thumbnail }) => {
    return (
        <Link href={`/${slug}`}>
            <div className='flex flex-col hover:cursor-pointer'>
                <div className='relative w-72 h-44 flex-none 
                                rounded overflow-hidden md:hover:bg-indigo-600'>
                    <Image src={thumbnail} layout='fill' 
                           className='md:hover:-translate-y-1.5'/>
                </div>
                <div className='mt-1 font-semibold text-sm truncate overflow-hidden w-72'>{title}</div>
            </div>
            {/*<div className='w-72 hover:bg-gray-300 cursor-pointer rounded bg-white'>
            <div className='flex flex-col'>
                <div className='relative w-72 h-44'>
                { thumbnail && <Image src={thumbnail} layout='fill'
                                      className='rounded' /> }
                </div>
                <div className='flex flex-col w-56 h-12 justify-center'>
                <div className='w-72 mt-1 text-md font-semibold font-Roboto'>{title}</div>
                </div>
            </div>
            </div>
            */}
        </Link>
    )
}

export default Preview
