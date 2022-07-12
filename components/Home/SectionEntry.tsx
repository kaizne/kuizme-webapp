import Image from 'next/image'
import Link from 'next/link'

const SectionEntry = ({ slug, title, image }) => {

    return (
        <Link href={`/${slug}`} >
            <div className='w-56 md:w-72 cursor-pointer bg-white'>
                <div className='flex flex-col'>
                    <div className='relative w-56 md:w-72 h-36 md:h-44 rounded md:hover:bg-indigo-600 '>
                    { image && <Image src={image} layout='fill'
                                      className='rounded md:hover:-translate-y-1.5' /> }
                    </div>
                    <div className='w-56 md:w-72 mt-1 text-sm font-semibold truncate'>
                        {title}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SectionEntry
