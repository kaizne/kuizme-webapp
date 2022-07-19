import Image from 'next/image'
import Link from 'next/link'

const Category = ({category, slug, title}) => {
    return (
        <Link href={`${category}/${slug}`}>
        <div className='w-80 h-52 flex flex-col items-center 
                      bg-white rounded shadow 
                      hover:bg-gray-300 cursor-pointer'>
            <div className='relative w-80 h-48'>
                <Image className='rounded-t' src={`/category/${slug}.jpg`} layout='fill' />
            </div>
            <div className='text-md font-medium text-left mt-1'>{title}</div>
        </div>
        </Link>
    )
}

export default Category
