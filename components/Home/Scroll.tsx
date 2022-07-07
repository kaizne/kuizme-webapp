import { useEffect, useState } from 'react'
import Categories from '../../utils/categories'
import ScrollEntry from '../ScrollEntry'

const Scroll = () => {
    const [categories, setCategories] = useState(Categories.concat(Categories))
    const [marginLeft, setMarginLeft] = useState(0)
    const [transition, setTransition] = useState('')

    useEffect(() => {
        const marginInterval = setInterval(() => {
            setMarginLeft(marginLeft => {
                if (marginLeft <= -(Categories.length * 10.75)) {
                    setTransition('')
                    return 0
                }
                setTransition('ease 0.1s')
                return marginLeft - 0.5
            })
        }, 50)
        
        return () => {
            clearInterval(marginInterval)
        }
    })

    return (
        <div className='flex flex-col w-5/6 overflow-hidden'>
            <div className='mt-4 mb-2 text-lg font-semibold'>Categories</div>
            <div className='flex flex-row gap-x-3' 
                 style={{marginLeft: `${marginLeft}rem`, transition: transition}}>
                {categories.map((elem, i) => 
                    <ScrollEntry key={i} category={elem.category} image={elem.image} link={elem.link} />)}
            </div>
        </div>
    )
}

export default Scroll
