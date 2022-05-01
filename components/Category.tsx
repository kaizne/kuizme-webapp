import Image from 'next/image'
import Link from 'next/link'

const Category = ({category, slug, title}) => {
    return (
        <Link href={`${category}/${slug}`}>
        <div className='flex flex-col items-center w-40 border rounded-lg shadow hover:bg-gray-300 cursor-pointer'>
            <div className='mt-4'>
                <Image className='rounded-lg' src={`/category/${slug}.png`} width={120} height={120} />
            </div>
            <div className='flex h-12 place-items-center'>
                <div className='text-xl font-medium text-center'>{title}</div>
            </div>
        </div>
        </Link>
    )
}

export default Category
