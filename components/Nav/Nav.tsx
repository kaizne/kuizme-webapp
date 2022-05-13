import requests from '../../utils/requests'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Nav() {
    const router = useRouter()
    return (
        <nav className='sticky top-0 z-50 flex flex-row justify-between h-14 md:h-16 w-screen pt-2 pb-2
                      bg-white border-b shadow-sm'>
                <div className='flex flex-row items-center'>
                <Link href='/'>
                    <a className='w-16 md:w-44 mt-1 ml-4
                                  text-sm md:text-4xl font-extrabold text-sky-500 md:hover:text-sky-300
                                  cursor-pointer'>KUIZME</a>
                </Link> 
                <div className='flex flex-row gap-x-2 md:mt-3 md:gap-x-6'>
                {Object.entries(requests).map(([key, { title }]) => (
                <div key={key}
                    onClick={() => router.push(`/${key}`)}
                    className='text-base md:text-lg font-semibold 
                               cursor-pointer transition duration-10 
                               md:hover:scale-125 md:hover:text-red-600
                             active:text-orange-400'>{title}</div>))}
                </div>
                </div>
                <button className='w-16 h-8 md:mt-2 mr-4 md:mr-8 pl-1 pr-1
                                   text-sm text-white font-semibold bg-sky-400 rounded'>
                    Sign In
                </button>
        </nav>
    )
}

export default Nav
