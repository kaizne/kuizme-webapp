import PreviewTwo from '../PreviewTwo'

const Trending = ({ quizData }) => {
    return (
        <div className='flex flex-col'>
            <div className='text-center text-2xl font-semibold mt-4 mb-4'>TRENDING</div>
            <div className='grid justify-items-center'>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-y-4 justify-items-center
                            w-full md:w-2/3'>
            { quizData.slice(0,10).map((elem, index) => 
                <PreviewTwo key={index} 
                            slug={elem.attributes.slug}
                            title={elem.attributes.title} 
                            thumbnail={elem.attributes.featured.data.attributes.url} />) }
            </div>
            </div>
        </div>
    )
}

export default Trending
