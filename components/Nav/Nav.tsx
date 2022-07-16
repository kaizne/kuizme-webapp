import requests from '../../utils/requests'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import {
    MenuAlt1Icon,
    SearchIcon,
    UserIcon,
} from '@heroicons/react/outline'

const Nav = () => {
    const router = useRouter()
    const asPath = router.asPath

    const [profile, setProfile] = useState(false)
    const [dropDown, setDropDown] = useState(false)
    const [drop, setDrop] = useState(false)

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
        <nav className='sticky top-0 z-50 flex flex-row h-14 w-vh justify-between
                    bg-white shadow-lg'>
                <div className='flex flex-row mt-3.5 md:mt-2 ml-[1rem]'>
                    <div className='mt-[0.15rem]'>
                    <Link href='/'>
                        <a className='text-xl md:text-4xl font-extrabold text-indigo-600 md:hover:text-indigo-400
                        cursor-pointer'>KUIZME</a>
                    </Link>    
                    </div>
                    <div className='mt-[0.2rem] md:mt-[0.5rem] ml-[1rem]'>
                    <Link href='/anime'>
                        <a className='text-lg md:text-2xl font-bold text-black sm:hover:text-indigo-600
                        cursor-pointer'>Browse</a>
                    </Link>
                    </div>
                    <div className='ml-[1rem] md:mt-[0.4rem]'>
                    <MenuAlt1Icon className='h-8 w-8 hover:cursor-pointer sm:hover:stroke-indigo-600' 
                                    onClick={() => setDrop(!drop)}/>
                    </div>
                </div>
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
                <div className='flex flex-row mt-[1.1rem] md:mt-4 gap-x-0.5'>
                    <input type='text' placeholder='Search' className='w-4 md:w-64 h-[1.7rem] bg-gray-300 border-2 border-gray-300 
                    rounded-l hover:border-gray-500 focus:bg-white indent-2 placeholder:text-gray-500 focus:border-indigo-600 
                    focus:outline-none hidden md:block'>
                    </input>
                    <div className='w-[1.7rem] h-[1.7rem] bg-gray-400 border-2 border-gray-400 rounded-r hidden md:block'>
                        <SearchIcon className='w-4 h-4 mt-[0.2rem] ml-[0.2rem]'/>
                    </div>
                    <div className='w-6 h-6 md:hidden mr-[0.1rem]' 
                        onClick={() => router.push('/search')}>
                        <SearchIcon className='w-6 h-6'/>
                    </div>
                </div>
                { !profile ?
                    <div className='flex flex-row mt-[0.7rem] md:mt-3 relative right-0 mr-[1rem] md:w-20 lg:w-64 justify-end'>
                        <Link href='/signin'>
                            <button className='w-16 h-8 text-sm text-white font-semibold bg-indigo-600 rounded 
                            md:hover:bg-indigo-400'>
                                Sign In
                            </button>
                        </Link>
                    </div> 
                    :
                    <div ref={ref} className='flex flex-row md:mt-[0.1rem] relative right-0 mr-[1rem] 
                                            md:w-20 lg:w-64 justify-end'>
                        <button className=''
                                onClick={() => setDropDown(!dropDown)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:hover:fill-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className={`flex flex-col gap-y-1 w-32 h-20 bg-white shadow-lg rounded absolute
                                        pl-3 py-2 right-0 sm:ml-[10rem] mt-[3rem] ${dropDown ? 'none' : 'hidden'}`}>
                            <Link href='/profile'>
                            <button className='text-left text-sm w-[6rem] pl-1 py-1.5
                                            md:hover:bg-gray-200 md:hover:rounded'>My Profile</button>
                            </Link>
                            <button onClick={() => signOut()}
                                    className='text-left text-sm w-[6rem] pl-1 py-1.5
                                             md:hover:bg-gray-200 md:hover:rounded'>Sign Out</button>
                        </div>
                    </div> }
                <div className={`flex flex-col gap-y-1 w-40 h-40 bg-white shadow-lg rounded absolute left-0
                                pl-3 py-2 ml-[10rem] sm:ml-[16rem] mt-[3rem] ${drop ? 'none' : 'hidden'}`}>
                    <Link href='/about'>
                    <button className='text-left text-sm w-[7.7rem] pl-1 py-1.5
                                    md:hover:bg-gray-200 md:hover:rounded'>About</button>    
                    </Link>
                    <Link href='/contact'>
                    <button className='text-left text-sm w-[7.7rem] pl-1 py-1.5
                                    md:hover:bg-gray-200 md:hover:rounded'>Contact</button>    
                    </Link>
                    <Link href='/privacy'>
                    <button className='text-left text-sm w-[7.7rem] pl-1 py-1.5
                                    md:hover:bg-gray-200 md:hover:rounded'>Privacy</button>    
                    </Link>
                    <Link href='/terms-of-service'>
                    <button className='text-left text-sm w-[7.7rem] pl-1 py-1.5
                                    md:hover:bg-gray-200 md:hover:rounded'>Terms of Service</button>    
                    </Link>
                </div>        
        </nav> }
        </>
    )
}

export default Nav
