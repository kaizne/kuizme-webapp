import tv from '../utils/tv'
import Category from '../components/Category'

const TV = ({ quizData }) => {
    return (
    <div>
        <div className='ml-3 md:ml-8 mt-4 font-Poppins min-h-screen'>
            <h1 className='text-xl mb-2 font-semibold'>Categories</h1>
            <div className='flex flex-row flex-wrap gap-x-4 md:gap-x-8 gap-y-2
                            mr-3 mt-1'>
            {Object.values(tv).map((elem, index) => 
                <Category key={index} category={elem.category} slug={elem.slug} title={elem.title} />
            )}
            </div>
        </div>
    </div>
    )
}

export default TV

export async function getStaticProps({ params }) {
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?populate=*`)
    const data = await res.json()
    const quizData = data.data
    return {
        props: {
            quizData
        }
    }
}
