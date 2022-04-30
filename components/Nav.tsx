import { Router } from 'next/router'
import requests from '../utils/requests'
import { useRouter } from 'next/router'
import Image from 'next/image'

function Nav() {
    const router = useRouter();
    return (
        <nav className=''>
            <div className='flex px-10 py-5 justify-center items-end sm:px-20
            text-2xl flex-nowrap space-x-10 sm:space-x-20 overflow-x-scroll 
            scrollbar-hide'>
                <Image src='/kuizme.png' 
                className='hover:opacity-75' width={266.5} height={48} />
                {Object.entries(requests).map(([key, { title, url }]) => (
                    <h2 key={key}
                    onClick={() => router.push('/about')}
                    className='cursor-pointer transition
                    duration-10 hover:scale-150 hover:text-[#ce3131]
                    active:text-[#ff9c00]'>{title}</h2>
                ))}
            </div>
            <div className='absolute top-0 right-0 bg-gradient-to-l
            from-[#ffffff] h-10 w-1/12' />
        </nav>
    )
}

export default Nav
