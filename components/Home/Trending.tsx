import PreviewTwo from '../PreviewTwo'
import PreviewThree from '../PreviewThree'

const Trending = ({ title, quizData }) => {
    return (
        <div className='flex flex-col items-center mb-4'>
            <div className='flex flex-col'>
                <div className='mt-4 mb-4 text-2xl md:text-3xl font-semibold bg-red-400'>{title}</div>
                <div className='flex flex-col md:flex-row'>
                <div className='grid md:grid-cols-4 md:grid-rows-2
                                md:gap-x-1 gap-y-1'>
                { quizData.slice(4, 12).map((elem, index) => 
                    <PreviewTwo key={index} 
                                slug={elem.attributes.slug}
                                title={elem.attributes.title} 
                                thumbnail={elem.attributes.featured.data.attributes.url} />) }
                </div>
                </div>
            </div>
        </div>
    )
}

export default Trending
