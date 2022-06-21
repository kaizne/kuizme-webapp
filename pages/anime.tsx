import anime from '../utils/anime'
import Category from '../components/Category'

const Anime = ({ quizData }) => {
    return (
        <div className='min-h-screen w-screen mt-4'>
            <div className='grid justify-items-center'>
                <h1 className='text-2xl mb-4 font-semibold'>Anime</h1>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-4'>
                    {Object.values(anime).map((elem, index) => 
                    <Category key={index} category={elem.category} slug={elem.slug} title={elem.title} />
                )}
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
