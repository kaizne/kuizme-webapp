import Image from 'next/image'
import Link from 'next/link'

const PreviewTwo = ({ slug, title, thumbnail }) => {
    return (
        <Link href={`/${slug}`}>
            <div className='w-60 hover:bg-gray-300 cursor-pointer rounded border shadow bg-white'>
            <div className='h-48 flex flex-col items-center'>
                <div className='relative w-60 h-52'>
                { thumbnail && <Image className='rounded' src={thumbnail} layout='fill' /> }
                </div>
                <div className='w-48 h-20 mt-1 text-center'>{title}</div>
            </div>
            </div>
        </Link>
    )
}

export default PreviewTwo
