const Quiz = ({ quizData }) => (
    <p>Test</p>
)

export default Quiz

export async function getStaticPaths() {
    const paths = []
    const res = await fetch('https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes')
    const data = await res.json()

    data.data.map(elem => paths.push({ params: { quiz: elem.attributes.slug } }))

    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {
            
        }
    }
}
