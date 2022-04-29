import Link from 'next/link'

const IndexPage = () => (
  <>
    <p>Wuck Finston!</p>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
      <br></br>
      <Link href="/privacy">
        <a>Privacy</a>
      </Link>
    </p>
  </>
)

export default IndexPage
