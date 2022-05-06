import Preview from './Preview'

const Section = ({ title, quizData, type }) => {
    return (
        <div className='flex flex-col'>
            <div className='text-center text-2xl font-semibold mt-4 mb-4'>{title}</div>
            <div className='flex flex-col justify-center md:flex-row flex-wrap 
                            md:gap-x-4 gap-y-2 md:gap-y-4 ml-2 mr-2 mt-1'>
            { quizData.slice(0,8).map((elem, index) => 
                <Preview key={index} 
                         slug={elem.attributes.slug}
                         title={elem.attributes.title} 
                         thumbnail={elem.attributes.featured.data.attributes.url} />) }
            </div>
        </div>
    )
}

export default Section
