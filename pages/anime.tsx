import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/Nav'

const Anime = () => (
  <div>
    <Nav />
    <p>
      <br></br>
      <Link href="/guess-the-demon-slayer-character">
        <a>Guess the Demon Slayer Character Quiz</a>
      </Link>
    </p>
  </div>
)

export default Anime
