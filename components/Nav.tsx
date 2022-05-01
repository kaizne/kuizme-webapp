import { Router } from 'next/router'
import requests from '../utils/requests'
import { useRouter } from 'next/router'
import Image from 'next/image'

function Nav() {
    const router = useRouter()
    return (
        <nav className='flex flex-col md:flex-row gap-x-4 font-Poppins mt-4
                        overflow-x-scroll scrollbar-hide'>
                <div className='ml-4 md:ml-8'>
                <Image src='/kuizme.png' 
                       className='hover:opacity-75 cursor-pointer' 
                       width={110} height={30} 
                       onClick={() => router.push(`/`)}/>
                </div>
                <div className='flex gap-x-4 ml-4 mt-1'>
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
