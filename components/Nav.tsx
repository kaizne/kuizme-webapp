import { Router } from 'next/router'
import requests from '../utils/requests'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

function Nav() {
    const router = useRouter()
    return (
        <nav className='relative'>
            <div className='flex px-5 py-5 justify-center items-end sm:px-10
            text-2xl flex-nowrap space-x-5 sm:space-x-10 md:space-x-20
            overflow-x-scroll scrollbar-hide'>
                <Link href='/'>
                    <a className='font-Montserrate text-5xl font-extrabold
                    text-[#1BA5E4]'>KUIZME</a>
                </Link> 
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
