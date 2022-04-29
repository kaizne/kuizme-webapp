import Link from 'next/link'

const IndexPage = () => (
  <>
    <p>Wuck Finston!</p>
    <p>
      <Link href="/page2">
        <a>Go to Page2</a>
      </Link>
    </p>
  </>
)

export default IndexPage
