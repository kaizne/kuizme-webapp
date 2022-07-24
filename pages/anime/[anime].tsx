import anime from '../../utils/anime'
import Preview from '../../components/Preview'

const Anime = ({ animeName, quizData }) => {
    return (
        <div className='min-h-vh'>
            <div className='text-lg font-bold mt-4 ml-4 md:ml-8'>{animeName}</div>
            <div className='flex flex-col md:flex-row flex-wrap md:gap-x-4 gap-y-2
                            ml-3 md:ml-8 mr-3 mt-1'>
            { quizData.map((elem, index) => 
                <Preview key={index} 
                         slug={elem.attributes.slug}
                         title={elem.attributes.title} 
                         thumbnail={elem.attributes.featured.data.attributes.url} />
            )}
            </div>
        </div>
    )
}

export default Anime

export async function getStaticPaths() {
    const paths = []
    Object.keys(anime).forEach(elem => paths.push({ params: { anime: elem } }))
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?filters[subcategory][$eq]=${params.anime}&populate=*`)
    const data = await res.json()
    const quizData = data.data
    const animeName = anime[params.anime].title
    return {
        props: {
            animeName,
            quizData
        }  
    }
}
