import tv from '../utils/tv'
import Category from '../components/Category'

const TV = ({ quizData }) => {
    return (
        <div className='min-h-screen mt-4'>
            <div className='grid justify-items-center'>
                <h1 className='text-2xl mb-4 font-semibold'>TV</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-4'>
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
