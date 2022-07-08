import Preview from '../Preview'

const Section = ({ title, quizData }) => {
    return (
        <div className='flex flex-col items-center mb-2'>
            <div className='flex flex-col'>
                <div className='mt-4 mb-4 text-2xl md:text-3xl font-semibold bg-sky-400 text-white'>{title}</div>
                <div className='flex flex-col md:flex-row flex-wrap 
                                md:gap-x-12 gap-y-4'>
                { quizData.slice(0, 4).map((elem, index) => 
                    <Preview key={index} 
                             slug={elem.attributes.slug}
                             title={elem.attributes.title} 
                             thumbnail={elem.attributes.featured.data.attributes.url} />) }
                </div>
            </div>
        </div>
    )
}

export default Section
