import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/solid'
import Categories from '../../utils/categories'
import Category from '../Category'

const Scroll = () => {
    const [categories, setCategories] = useState(Categories)
    const [marginLeft, setMarginLeft] = useState(0)
    const [transition, setTransition] = useState('')
    const [hover, setHover] = useState(false)
    const [width, setWidth] = useState(0)
    const [slider, setSlider] = useState(true)
    const isMobile = width <= 768

    useEffect(() => {
        setWidth(window.innerWidth)
        if (!isMobile) setCategories(categories.concat(Categories))
    }, [width])

    useEffect(() => {
        const marginInterval = setInterval(() => {
            if (!hover) {
                setMarginLeft(marginLeft => {
                    if (marginLeft <= -(Categories.length * 10.75)) {
                        setTransition('')
                        return 0
                    }
                    setTransition('ease all 0.1s')
                    return marginLeft - 0.5
                })
            }
        }, 50)

        if (isMobile) clearInterval(marginInterval)
        if (!slider) clearInterval(marginInterval)

        return () => {
            clearInterval(marginInterval)
        }
    })

    return (
        <div className='flex flex-col w-11/12 overflow-hidden static'>
            <div className='flex flex-row items-center gap-x-2'>
                <div className='mt-8 mb-4 text-md md:text-lg text-indigo-600 font-semibold'>Categories</div>
                <div className='flex-row items-center gap-x-2 hidden md:flex'>
                    <button className='h-8 mt-4 hover:bg-gray-200'
                            onClick={() => { 
                                if (marginLeft < 0) setMarginLeft(marginLeft + 10)}
                            }>
                        <ChevronLeftIcon className='w-8 h-6' />
                    </button>
                    { slider ? 
                        <button className='h-8 mt-4 hover:bg-gray-200'
                                onClick={() => setSlider(!slider)}>
                            <PauseIcon className='w-8 h-6' />
                        </button> : 
                        <button className='h-8 mt-4 hover:bg-gray-200'
                                onClick={() => setSlider(!slider)}>
                            <PlayIcon className='w-8 h-6' />
                        </button>
                    }
                    <button className='h-8 mt-4  hover:bg-gray-200'
                            onClick={() => setMarginLeft(marginLeft - 10)}>
                        <ChevronRightIcon className='w-8 h-6' />
                    </button>
                </div>
            </div>
            <div className='flex flex-row gap-x-3 overflow-x-auto scrollbar-hide'
                style={{marginLeft: `${marginLeft}rem`, transition: transition}}
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {categories.map((elem, i) => 
                    <Category key={i} category={elem.category} image={elem.image} link={elem.link} />)}
            </div>
        </div>
    )
}

export default Scroll
