const Quiz = () => (
    <p>Quiz</p>
)

export default Quiz

export async function getStaticPaths() {
    return {
        paths: [
            { params: { quiz: 'which-naruto-character-are-you'} }
        ],
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    return {
        props: {

        }
    }
}
