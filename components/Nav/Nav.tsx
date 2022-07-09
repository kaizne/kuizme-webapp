import requests from '../../utils/requests'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
    SearchIcon,
} from '@heroicons/react/outline'

const Nav = () => {
    const router = useRouter()
    const asPath = router.asPath

    const [profile, setProfile] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            setProfile(true)
            document.addEventListener('click', handleClickOutside, true)
        } else {
            setProfile(false)
        }
    })

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target))
            setDropDown(false)
    }

    const signOut = () => {
        localStorage.clear()
        setProfile(false)
        setDropDown(false)
        router.push('/')
    }
    const size = 43
    return (
        <>
        {(asPath !== '/signup' && asPath !== '/signin' && asPath !== '/verified') &&
        <nav className='sticky top-0 z-50 flex flex-row h-14 w-vh
                    bg-white shadow-lg'>
                <div className='absolute mt-2 ml-2'>
                <Link href='/'>
                    <a className='text-2xl md:text-4xl font-extrabold text-indigo-600 md:hover:text-indigo-400
                    cursor-pointer'>KUIZME</a>
                </Link>
                { /*
                  <div className='flex flex-row gap-x-2 md:mt-3 md:gap-x-6'>
                  {Object.entries(requests).map(([key, { title }]) => (
                  <div key={key}
                       onClick={() => router.push(`/${key}`)}
                       className='text-base md:text-lg font-semibold 
                                  cursor-pointer transition duration-10 
                                  md:hover:scale-125 md:hover:text-red-600
                                active:text-orange-400'>{title}</div>))}
                  </div>
                  */ 
                }
                </div>
                <div className='absolute mt-3 md:mt-4 ml-28 md:ml-48'>
                <Link href='/anime'>
                    <a className='text-lg md:text-2xl font-bold text-black md:hover:text-indigo-600
                    cursor-pointer'>Browse</a>
                </Link>
                </div>
                <div className='flex flex-box absolute right-1/4 mr-[0.5rem] md:right-1/3 md:mr-[9.6rem] mt-3 md:mt-4
                gap-x-0.5'>
                    <input type='text' placeholder='Search' className='w-4 md:w-64 h-[1.7rem] bg-gray-300 border-2 border-gray-300 
                    rounded-l hover:border-gray-500 focus:bg-white indent-2 placeholder:text-gray-500 focus:border-indigo-600 
                    focus:outline-none hidden md:block'>
                    </input>
                    <div className='w-[1.7rem] h-[1.7rem] bg-gray-400 border-2 border-gray-400 rounded-r hidden md:block'>
                        <SearchIcon className='w-4 h-4 mt-[0.2rem] ml-[0.2rem]'/>
                    </div>
                    <div className='w-6 h-6 md:hidden mr-[1.4rem]' 
                        onClick={() => router.push('/search')}>
                        <SearchIcon className='w-6 h-6'/>
                    </div>
                </div>
                { !profile ? 
                    <Link href='/signin'>
                        <button className='absolute w-16 h-8 mt-1.5 md:mt-3 right-0 mr-2
                            text-sm text-white font-semibold bg-indigo-600 rounded md:hover:bg-indigo-400'>
                            Sign In
                        </button>
                    </Link> :
                    <div ref={ref} className='relative w-28 h-28'>
                        <button className='w-10 mt-2 ml-14 mr-4 md:mr-4 rounded md:hover:bg-gray-300'
                                onClick={() => setDropDown(!dropDown)}>
                            <Image src='/profile.svg' width={30} height={30} />
                        </button>
                        <div className={`flex flex-col gap-y-1 w-24 h-16 bg-white shadow rounded
                                        ${dropDown ? 'none' : 'hidden'}`}>
                            <Link href='/profile'>
                            <button className='ml-1 mt-2 w-20 text-left text-base
                                            md:hover:bg-gray-200'>My Profile</button>
                            </Link>
                            <button onClick={() => signOut()}
                                    className='ml-1 w-20 text-left text-base
                                             md:hover:bg-gray-200'>Sign Out</button>
                        </div>
                    </div> }        
        </nav> }
        </>
    )
}

export default Nav
