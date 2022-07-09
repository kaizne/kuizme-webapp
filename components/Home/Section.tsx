import SectionEntry from './SectionEntry'

const Section = ({ title, entries }) => {
    console.log(entries)
    return (
        <div className='w-11/12'>
            <div className='mt-4 text-sm md:text-lg font-semibold'>{title}</div>
            <div className='flex flex-row overflow-hidden'>
                {entries.map((entry, i) => 
                    <SectionEntry key={i} 
                                  title={entry.attributes.title} />)}
            </div>
        </div>
    )
}

export default Section
