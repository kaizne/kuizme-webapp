import Image from 'next/image'
import Link from 'next/link'

const Preview = ({ slug, title, thumbnail }) => {
    return (
        <Link href={slug}>
            <div className='md:w-80 hover:bg-gray-300 cursor-pointer rounded border shadow'>
            <div className='font-Poppins h-32 flex flex-row'>
                <div className='w-32 mt-1 ml-1'>
                { thumbnail && <Image className='rounded-lg' src={thumbnail} width={120} height={120} /> }
                </div>
                <div className='w-40 mt-8 ml-4'>{title}</div>
            </div>
            </div>
        </Link>
    )
}

export default Preview
