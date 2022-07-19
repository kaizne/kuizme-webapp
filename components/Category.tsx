import Image from 'next/image'
import Link from 'next/link'

const Category = ({ category, image, link }) => {    
    return (
        <Link href={`/anime/${link}`}>
            <div className='flex flex-col hover:cursor-pointer'>
                <div className='relative w-40 h-52 flex-none rounded-md md:hover:bg-indigo-600'>
                    <Image src={`/category/${image}.jpg`} layout='fill' 
                           className='rounded-md md:hover:-translate-y-1.5'/>
                </div>
                <div className='mt-1 font-semibold text-sm truncate overflow-hidden w-36'>{category}</div>
            </div>
        </Link>
    )
}

export default Category
