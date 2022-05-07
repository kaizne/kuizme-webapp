import { Router } from 'next/router'
import requests from '../utils/requests'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

function Nav() {
    const router = useRouter()
    return (
        <nav className='flex flex-col md:flex-row pl-3 md:pl-8 pt-2 pb-2 h-full w-screen scrollbar-hide 
                      bg-white border-b shadow-sm'>
                <Link href='/'>
                    <a className='w-32 md:w-44 font-Montserrate text-3xl md:text-5xl font-extrabold
                    text-[#1BA5E4] cursor-pointer hover:text-[#7acaef] active:text-[#acdef5]'>KUIZME</a>
                </Link> 
                <div className='flex flex-row md:ml-8 md:mt-3 gap-x-6'>
                {Object.entries(requests).map(([key, { title }]) => (
                <div key={key}
                    onClick={() => router.push(`/${key}`)}
                    className='text-base md:text-lg font-semibold cursor-pointer transition duration-10 md:hover:scale-125 md:hover:text-[#ce3131]
                    active:text-[#ff9c00]'>{title}</div>))}
                </div>
            <div className='absolute top-0 right-0 bg-gradient-to-l
            from-[#ffffff] h-10 w-1/12'></div>
        </nav>
    )
}

export default Nav
