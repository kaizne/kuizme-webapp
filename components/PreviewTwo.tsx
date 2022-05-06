import Image from 'next/image'
import Link from 'next/link'

const PreviewTwo = ({ slug, title, thumbnail }) => {
    return (
        <Link href={`/${slug}`}>
            <div className='w-40 hover:bg-gray-300 cursor-pointer rounded border shadow'>
            <div className='font-Poppins h-52 flex flex-col items-center'>
                <div className='w-32 mt-1 ml-1'>
                { thumbnail && <Image className='rounded-lg' src={thumbnail} width={120} height={120} /> }
                </div>
                <div className='w-40 mt-1 text-center'>{title}</div>
            </div>
            </div>
        </Link>
    )
}

export default PreviewTwo
