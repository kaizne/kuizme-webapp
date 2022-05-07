import Image from 'next/image'
import Link from 'next/link'

const Category = ({category, slug, title}) => {
    return (
        <Link href={`${category}/${slug}`}>
        <div className='flex flex-col items-center 
                        w-40 bg-white rounded shadow 
                      hover:bg-gray-300 cursor-pointer'>
            <div className='w-40 h-40'>
                <Image className='rounded-t' src={`/category/${slug}.png`} width={160} height={160} />
            </div>
            <div className='flex h-12 place-items-center'>
                <div className='text-md font-medium text-center'>{title}</div>
            </div>
        </div>
        </Link>
    )
}

export default Category
