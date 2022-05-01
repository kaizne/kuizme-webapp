import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Anime = () => (
  <div>
    <Nav />
    <p>
      <br></br>
      <Link href="/guess-the-demon-slayer-character">
        <a>Guess the Demon Slayer Character Quiz</a>
      </Link>
    </p>
    <Footer />
  </div>
)

export default Anime
