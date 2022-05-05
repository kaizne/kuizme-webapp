import logos from '../utils/logos'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Category from '../components/Category'

const Logos = ({ quizData }) => {
    return (
    <div>
        <Nav />
        <div className='ml-3 md:ml-8 mt-4 font-Poppins min-h-screen'>
            <h1 className='text-xl mb-2 font-semibold'>Categories</h1>
            <div className='flex flex-row flex-wrap gap-x-4 md:gap-x-8 gap-y-2
                            mr-3 mt-1'>
            {Object.values(logos).map((elem, index) => 
                <Category key={index} category={elem.category} slug={elem.slug} title={elem.title} />
            )}
            </div>
        </div>
        <Footer />
    </div>
    )
}

export default Logos

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
