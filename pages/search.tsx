import categories from '../utils/categories'
import slugs from '../utils/slugs'
import titles from '../utils/titles'
import slugcategories from '../utils/slugcategories'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
    ChevronLeftIcon,
} from '@heroicons/react/outline'

const Search = () => {
    const [search, setSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState('') 

    const categoriesArray = categories.map(element => element.category)
    const linksArray = categories.map(element => element.link)
    const titlesAndCategories = titles.concat(categoriesArray)

    return (
        <div className='flex flex-row w-screen justify-center mt-2'>
        <div className='flex flex-col basis-11/12'>
        <div className='min-h-vh flex flex-row w-full items-center justify-between'>
            <ChevronLeftIcon className='h-5 w-5' onClick={() => history.back()}/>
            <input type='text' placeholder='Search...' className='bg-gray-200 basis-11/12 md:basis-[92.5%]
            xl:basis-[93.5%] indent-2 h-8 border-2 border-gray-400 focus:border-indigo-600 focus:outline-none 
            focus:bg-white placeholder:text-gray-700 rounded' autoFocus onChange={(event) => { 
                setSearchTerm(event.target.value)
                if  (event.target.value === '') { setSearch(false) }
                else { setSearch(true) }
            }}>
            </input>
        </div>
        <div className={`${search ? '' : 'hidden'}`}>
        <div className='mt-4'></div>
        { titlesAndCategories.filter(element => element.substring(0,searchTerm.length).toLowerCase() === searchTerm.toLowerCase()).sort()
        .slice(0,7).map((element, index) => {
        let titlesIndex = null
        let categoriesIndex = null
        if (titles.includes(element)) { 
            titlesIndex = titles.indexOf(element)
            return (
            <Link href={`/${slugs[titlesIndex]}`} key={index}>
                <div className='flex flex-row gap-x-2 items-center md:hover:cursor-pointer font-medium mb-3.5'>
                    <img src={`/category/${slugcategories[titlesIndex]}.jpg`} className='w-[2.4rem] h-[3.2rem]
                    md:w-[3.6rem] md:h-[4.8rem]'/>
                    <p className='text-sm md:text-lg'>
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
                <div className='flex flex-row gap-x-2 items-center md:hover:cursor-pointer font-medium mb-3.5'>
                    <img src={`/category/${linksArray[categoriesIndex]}.jpg`} className='w-[2.4rem] h-[3.2rem]
                    md:w-[3.6rem] md:h-[4.8rem]'/>
                    <p className='text-sm md:text-lg'>
                        {element[0] + element.substring(1,searchTerm.length)}
                        <span className='font-bold'>{element.substring(searchTerm.length)}</span>
                    </p>
                </div>
            </Link>)
        } })}
        </div>
        </div>
        </div>
    )
}

export default Search

