import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Image from 'next/image'

const Anime = ({ quizData }) => (
  <div>
    <Nav />
    <div className='ml-3 md:ml-8 mt-4 font-Poppins'>
        <h1 className='text-xl mb-2 font-semibold'>Categories</h1>
        <div className='flex flex-col items-center w-40 h-40 border rounded-lg'>
            <div className='mt-1'>
                <Image className='rounded-lg' src={'/category/naruto.png'} width={120} height={120} />
            </div>
            <div className='text-xl -mt-1 font-bold'>Naruto</div>
        </div>
    </div>
    <Footer />
  </div>
)

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
