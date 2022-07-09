import { useEffect, useState } from 'react'
import Categories from '../../utils/categories'
import ScrollEntry from '../ScrollEntry'

const Scroll = () => {
    const [categories, setCategories] = useState(Categories)
    const [marginLeft, setMarginLeft] = useState(0)
    const [transition, setTransition] = useState('')
    const [hover, setHover] = useState(false)
    const [width, setWidth] = useState(0)
    const isMobile = width <= 768

    useEffect(() => {
        setWidth(window.innerWidth)
        if (!isMobile) setCategories(categories => categories.concat(Categories))

        const marginInterval = setInterval(() => {
            setMarginLeft(marginLeft => {
                if (hover) return marginLeft
                else if (marginLeft <= -(Categories.length * 9.75)) {
                    setTransition('')
                    return 0
                }
                setTransition('ease 0.1s')
                return marginLeft - 0.5
            })
        }, 50)

        if (isMobile) clearInterval(marginInterval)
        
        return () => {
            clearInterval(marginInterval)
        }
    }, [hover, width])

    return (
        <div className='flex flex-col w-11/12 overflow-hidden'>
            <div className='mt-4 mb-2 text-md md:text-lg font-semibold'>Categories</div>
            <div className='flex flex-row gap-x-3 overflow-x-auto scrollbar-hide'
                 style={{marginLeft: `${marginLeft}rem`, transition: transition}}
                 onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {categories.map((elem, i) => 
                    <ScrollEntry key={i} category={elem.category} image={elem.image} link={elem.link} />)}
            </div>
        </div>
    )
}

export default Scroll
