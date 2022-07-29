import { useEffect, useState } from 'react'
import Link from 'next/link'
import SectionEntry from './SectionEntry'

const Section = ({ title, category, entries }) => {
    return (
        <div className='w-11/12 mt-6 pb-6 border-b-2 border-gray-200'>
            <div className='mb-1 text-md md:text-lg font-semibold'>
                { category !== '' ? 
                    <div className='mb-1'>Recommended 
                        <Link href={`/anime/${category}`}>
                            <span className='text-indigo-600 hover:cursor-pointer'> {title}</span>
                        </Link> Quizzes</div> 
                    : <span>{title} Quizzes</span> 
                }
            </div>
            <div className='flex flex-row gap-x-2.5 overflow-y-auto scrollbar-hide'>
                {entries.map((entry, i) => 
                    <SectionEntry key={i} slug={entry.attributes.slug}
                                  title={entry.attributes.title}
                                  image={entry.attributes.featured.data.attributes.url} />
                )}
            </div>
        </div>
    )
}

export default Section
