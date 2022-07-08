import requests from '../../utils/requests'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

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

    return (
        <>
        {(asPath !== '/signup' && asPath !== '/signin' && asPath !== '/verified') &&
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
                { !profile ? 
                    <Link href='/signin'>
                        <button className='w-16 h-8 md:mt-2 mr-4 md:mr-8 pl-1 pr-1
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
