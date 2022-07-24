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
    const [dropDownProfile, setDropDownProfile] = useState(false)
    const [dropDownMenu, setDropDownMenu] = useState(false)

    const refProfile = useRef(null)
    const refMenu = useRef(null)
    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMenu, true)
        if (localStorage.getItem('jwt')) {
            setProfile(true)
            document.addEventListener('click', handleClickOutsideProfile, true)
        } else {
            setProfile(false)
        }
    })

    const handleClickOutsideProfile = (e) => {
        if (refProfile.current && !refProfile.current.contains(e.target))
            setDropDownProfile(false)
    }
    const handleClickOutsideMenu = (e) => {
        if (refMenu.current && !refMenu.current.contains(e.target))
            setDropDownMenu(false)
    }
    const signOut = () => {
        localStorage.clear()
        setProfile(false)
        setDropDownProfile(false)
        router.push('/')
    }
    const size = 43
    return (
        <>
        {(asPath !== '/signup' && asPath !== '/signin' && asPath !== '/verified') &&
        <nav className='sticky top-0 z-50 h-14 flex flex-row justify-center w-100v bg-white shadow-md'>
                <div className='w-11/12 flex flex-row justify-between'>
                <div className='flex flex-row mt-3.5 md:mt-2'>
                    <div className='mt-1'>
                    <Link href='/'>
                        <a className='text-xl md:text-3xl font-extrabold text-indigo-600 md:hover:text-indigo-400
                        cursor-pointer'>KUIZME</a>
                    </Link>    
                    </div>
                    <div className='mt-1 md:mt-2 ml-4'>
                    <Link href='/anime'>
                        <a className='text-lg md:text-xl font-semibold text-black sm:hover:text-indigo-600
                        cursor-pointer'>Browse</a>
                    </Link>
                    </div>
                    <div ref={refMenu} className='ml-[1rem] md:mt-[0.4rem] w-8'>
                        <MenuAlt1Icon className='h-8 w-8 hover:cursor-pointer sm:hover:stroke-indigo-600' 
                                    onClick={() => setDropDownMenu(!dropDownMenu)} />
                        <div className={`flex flex-col gap-y-1 w-[8.7rem] h-[9.5rem] bg-white shadow-lg rounded relative left-0
                                    pl-2 py-2 mr-[1rem] ${dropDownMenu ? 'none' : 'hidden'}`}>
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
                { /* <div className='flex flex-row mt-[1.1rem] md:mt-[0.6rem] gap-x-0.5'>
                    <input type='text' placeholder='Search' className='w-4 md:w-64 h-[2.3rem] bg-gray-200 border-2 border-gray-200 
                    rounded-l hover:border-gray-300 focus:bg-white indent-2 placeholder:text-gray-700 focus:border-indigo-600 
                    focus:outline-none hidden md:block'>
                    </input>
                    <div className='w-[2.3rem] h-[2.3rem] bg-gray-100 border-2 border-gray-100 rounded-r hidden md:block'>
                        <SearchIcon className='w-5 h-5 mt-[0.4rem] ml-[0.4rem]'/>
                    </div>
                    <div className='w-6 h-6 md:hidden mr-[0.1rem]' 
                        onClick={() => router.push('/search')}>
                        <SearchIcon className='w-6 h-6'/>
                    </div>
                </div>
                */
                }
                { !profile ?
                    <div className='flex flex-row mt-[0.7rem] md:mt-3 relative right-0 md:w-20 lg:w-64 justify-end'>
                        <Link href='/signin'>
                            <button className='w-16 h-8 text-sm text-white font-semibold bg-indigo-600 rounded 
                            md:hover:bg-indigo-400'>
                                Sign In
                            </button>
                        </Link>
                    </div> 
                    :
                    <div ref={refProfile} className='flex flex-row md:mt-[0.1rem] relative right-0 justify-end'>
                        <button className=''
                                onClick={() => setDropDownProfile(!dropDownProfile)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:hover:fill-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <div className={`flex flex-col gap-y-1 w-[7rem] h-[5rem] bg-white shadow-lg rounded absolute
                                        pl-2 py-2 right-0 mt-[3rem] items-start ${dropDownProfile ? 'none' : 'hidden'}`}>
                            <Link href='/profile'>
                            <button className='text-left text-sm w-[6rem] pl-1 py-1.5
                                            md:hover:bg-gray-200 md:hover:rounded'>My Profile</button>
                            </Link>
                            <button onClick={() => signOut()}
                                    className='text-left text-sm w-[6rem] pl-1 py-1.5
                                             md:hover:bg-gray-200 md:hover:rounded'>Sign Out</button>
                        </div>
                    </div> } 
                </div>       
        </nav> }
        </>
    )
}

export default Nav
