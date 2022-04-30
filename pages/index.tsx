import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/Nav'

const IndexPage = () => (
  <div>
    <Nav />
    <p>
      <br></br>
      <Link href="/about">
        <a>About</a>
      </Link>
      <br></br>
      <Link href="/privacy">
        <a>Privacy</a>
      </Link>
    </p>
  </div>
)

export default IndexPage
