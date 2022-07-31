import Categories from '../utils/categories'
import Category from '../components/Category'

const Anime = ({ quizData }) => {
    return (
        <div className='min-h-screen w-vh mt-4'>
            <div className='grid justify-items-center'>
                <h1 className='text-2xl mb-4 font-semibold'>Anime</h1>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-4'>
                {Categories.map((elem, i) => 
                    <Category key={i} category={elem.category} image={elem.image} link={elem.link} />)}
                </div>
            </div>
        </div>
    )
}

export default Anime

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
