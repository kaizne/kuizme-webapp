import Preview from './Preview'

const New = ({ quizData }) => {
    console.log(quizData)
    return (
        <div className='font-Poppins'>
            <div className='text-lg font-bold mt-4 ml-4 md:ml-8'>NEW</div>
            <div className='flex flex-col md:flex-row flex-wrap md:gap-x-2 gap-y-2
                            ml-3 md:ml-8 mr-3 mt-1'>
            { quizData.map((elem, index) => 
                <Preview key={index} 
                         slug={elem.attributes.slug}
                         title={elem.attributes.title} 
                         thumbnail={elem.attributes.featured.data.attributes.url} />) }
            </div>
        </div>
    )
}

export default New
