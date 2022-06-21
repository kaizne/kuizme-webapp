import Image from 'next/image'
import Link from 'next/link'

const Category = ({category, slug, title}) => {
    return (
        <Link href={`${category}/${slug}`}>
        <div className='w-80 h-48 flex flex-col items-center 
                      bg-white rounded shadow 
                      hover:bg-gray-300 cursor-pointer'>
            <div className='relative w-80 h-48'>
                <Image className='rounded-t' src={`/category/${slug}.png`} layout='fill' />
            </div>
            <div className='flex h-12 place-items-center'>
                <div className='text-md font-medium text-center'>{title}</div>
            </div>
        </div>
        </Link>
    )
}

export default Category
