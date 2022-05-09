import tv from '../../utils/tv'
import Preview from '../../components/Preview'

const TV = ({ tvName, quizData }) => {
    return (
        <div className='min-h-screen'>
            <div className='text-lg font-bold mt-4 ml-4 md:ml-8'>{tvName}</div>
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

export default TV

export async function getStaticPaths() {
    const paths = []
    Object.keys(tv).forEach(elem => paths.push({ params: { tv: elem } }))
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes?filters[subcategory][$eq]=${params.tv}&populate=*`)
    const data = await res.json()
    const quizData = data.data
    const tvName = tv[params.tv].title
    return {
        props: {
            tvName,
            quizData
        }  
    }
}
