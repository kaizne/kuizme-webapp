import requests from '../../utils/requests'
import Image from 'next/image'
import categories from '../../utils/categories'
import slugs from '../../utils/slugs'
import titles from '../../utils/titles'
import slugcategories from '../../utils/slugcategories'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router';
import {
    MenuAlt1Icon,
    SearchIcon
} from '@heroicons/react/outline'

const Nav = ({ setOverlay }) => {
    const router = useRouter()
    const asPath = router.asPath

    const [profile, setProfile] = useState(false)
    const [dropDownProfile, setDropDownProfile] = useState(false)
    const [dropDownMenu, setDropDownMenu] = useState(false)

    const refProfile = useRef(null)
    const refMenu = useRef(null)
    const refSearch = useRef(null)
    const [search, setSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchPageOpen, setSearchPageOpen] = useState(false)

    const categoriesArray = categories.map(element => element.category)
    const linksArray = categories.map(element => element.link)
    const titlesAndCategories = titles.concat(categoriesArray)

    useEffect(() => {
        if (asPath === '/search') {
            setSearchPageOpen(true)
        }
        else {
            setSearchPageOpen(false)
        }
        document.addEventListener('click', handleClickOutsideMenu, true)
        document.addEventListener('click', handleClickOutsideSearch, true)
        if (localStorage.getItem('jwt')) {
            setProfile(true)
            document.addEventListener('click', handleClickOutsideProfile, true)
        } else {
            setProfile(false)
        }
    })

    useEffect(() => {
        setDropDownMenu(false)
        setDropDownProfile(false)
    },[asPath])

    const handleClickOutsideProfile = (e) => {
        if (refProfile.current && !refProfile.current.contains(e.target))
            setDropDownProfile(false)
    }
    const handleClickOutsideMenu = (e) => {
        if (refMenu.current && !refMenu.current.contains(e.target))
            setDropDownMenu(false)
    }
    const handleClickOutsideSearch = (e) => {
        if (refMenu.current && !refMenu.current.contains(e.target))
            setSearch(false)
    }
    const signOut = () => {
        //localStorage.clear()
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')
        setProfile(false)
        setDropDownProfile(false)
        // router.push('/')
        // router.reload()
    }
    const size = 43
    return (
        <>
        {(asPath !== '/signup' && asPath !== '/signin' && asPath !== '/verified') &&
        <nav className='sticky top-0 z-40 h-14 pb-2 flex flex-row justify-center w-vh bg-white shadow-md'>
                <div className='w-11/12 flex flex-row justify-between'>
                <div className='flex flex-row mt-3.5 md:mt-2'>
                    <div className='mt-[0.3rem]'>
                    <Link href='/'>
                        <div className='hidden text-xl md:text-3xl font-extrabold text-indigo-600 md:hover:text-indigo-400
                        cursor-pointer md:block'>KUIZME</div>
                    </Link>    
                    <Link href='/'>
                        <img src='/favicon.jpg' className='md:hidden h-[1.5rem] hover:cursor-pointer'/>
                    </Link>
                    </div>
                    <div className='mt-1 md:mt-2.5 ml-3 md:ml-5'>
                    <Link href='/anime'>
                        <a className='text-lg md:text-xl font-semibold text-black sm:hover:text-indigo-600
                        cursor-pointer'>Browse</a>
                    </Link>
                    </div>
                    <div ref={refMenu} className='ml-2 md:ml-4 mt-[0.05rem] md:mt-[0.4rem] w-8'>
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
                <div ref={refSearch} className='flex flex-col items-center'>
                        { !searchPageOpen ?  
                        <div className={`flex flex-row mt-[1.1rem] md:mt-[0.6rem] gap-x-0.5 
                        ${search ? 'md:bg-white md:px-[0.3rem] md:pt-[0.3rem] md:shadow-xl md:mt-[0.3rem]' : 'none'}`}>
                        <input type='text' placeholder='Search' className='w-48 lg:w-64 h-[2.3rem] bg-gray-200 border-2 border-gray-200 
                        rounded-l hover:border-gray-300 focus:bg-white indent-2 placeholder:text-gray-700 focus:border-indigo-600 
                        focus:outline-none hidden md:block text-sm lg:text-base' 
                        onChange={(event) => { 
                            setSearchTerm(event.target.value)
                            if  (event.target.value === '') { setSearch(false) }
                            else { setSearch(true) }
                        }}/>
                        <div className='w-[2.3rem] h-[2.3rem] bg-gray-100 border-2 border-gray-100 rounded-r hidden md:block'>
                        <SearchIcon className='w-5 h-5 mt-[0.4rem] ml-[0.4rem]'/>
                        </div>
                        </div>
                        :
                        <div></div>
                        }
                        <div className={`w-6 h-6 md:hidden mr-[0.3rem] hover:cursor-pointer ${searchPageOpen ? 'mt-[1.1rem]' : 'none'}`}
                            onClick={() => router.push('/search')}>
                            <SearchIcon className='w-6 h-6'/>
                        </div>
                    <div className={`hidden ${search ? 'md:block md:bg-white md:shadow-xl md:rounded-b w-[15rem] lg:w-[19.1rem]' : 'none'}`}>
                            <div className='mt-2.5'></div>
                            { titlesAndCategories.filter(element => element.substring(0,searchTerm.length).toLowerCase() === searchTerm.toLowerCase()).sort()
                                .slice(0,7).map((element, index) => {
                                let titlesIndex = null
                                let categoriesIndex = null
                                if (titles.includes(element)) { 
                                    titlesIndex = titles.indexOf(element)
                                    return (
                                    <Link href={`/${slugs[titlesIndex]}`} key={index}>
                                        <div className='flex flex-row gap-x-2 pr-2 pl-2.5 items-center md:hover:cursor-pointer font-medium mb-2.5'>
                                            <img src={`/category/${slugcategories[titlesIndex]}.jpg`} className='w-[1.8rem] h-[2.4rem]'/>
                                            <p className='text-sm'>
                                                {element[0] + element.substring(1,searchTerm.length)}
                                                <span className='font-bold'>{element.substring(searchTerm.length)}</span>
                                            </p>
                                        </div>
                                    </Link>) 
                                }
                                else {
                                    categoriesIndex = categoriesArray.indexOf(element)
                                    return (
                                    <Link href={`/anime/${linksArray[categoriesIndex]}`} key={index}>
                                        <div className='flex flex-row gap-x-2 pr-2 pl-2.5 items-center md:hover:cursor-pointer font-medium mb-2.5'>
                                            <img src={`/category/${linksArray[categoriesIndex]}.jpg`} className='w-[1.8rem] h-[2.4rem]'/>
                                            <p className='text-sm'>
                                                {element[0] + element.substring(1,searchTerm.length)}
                                                <span className='font-bold'>{element.substring(searchTerm.length)}</span>
                                            </p>
                                        </div>
                                    </Link>)
                                } })}
                    </div>
                </div>
                <div className='flex flex-row'>
                { !profile ? 
                <div className='w-0 lg:w-[7.5rem]'></div>
                :
                <div className='w-0 lg:w-[13.9rem]'></div>
                }
                { !profile ?
                    <div className='flex flex-row gap-x-2 mt-[0.8rem] md:mt-3
                                    relative justify-end'>
                        <button className='w-16 h-8 text-sm text-black font-semibold bg-gray-200 rounded 
                                         md:hover:bg-gray-300'
                                onClick={() => setOverlay('logIn')}>
                            Log In
                        </button>
                        <button className='w-16 h-8 text-sm text-white font-semibold bg-indigo-600 rounded 
                                         md:hover:bg-indigo-700'
                                onClick={() => setOverlay('signUp')}>
                            Sign Up
                        </button>
                    </div> 
                    :
                    <div ref={refProfile} className='flex flex-row md:mt-[0.1rem] relative right-0 justify-end'>
                        <button className=''
                                onClick={() => setDropDownProfile(!dropDownProfile)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-8 w-8 md:hover:fill-indigo-600 mt-2 md:mt-1' viewBox="0 0 20 20" fill="currentColor">
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
                </div>
        </nav> }
        </>
    )
}

export default Nav
