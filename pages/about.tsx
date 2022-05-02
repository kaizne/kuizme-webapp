import Link from 'next/link'
import Image from 'next/image'
import Footer from '../components/Footer'

const About = () => (
  <>
    <div className='min-h-screen'>
      <h1 className='px-6 md:px-40 font-Poppins text-4xl font-bold mt-10'>About Us</h1>
      <br></br>
      <div className='text-justify px-6 md:px-40 md:px-40 py-4 md:text-xl font-Poppins'>
        <a>
          Kuizme is the leading trivia and quiz entertainment provider 
          on the web and mobile devices. Kuizme has dozens of quizzes on 
          a variety of topics, ranging from films to video games, that have been 
          played hundreds of times. Kuizme is a privately held company headquartered 
          in Vancouver, Canada, with several remote offices around the country. 
          For inquiries and questions, find our contact information at&nbsp;
          <Link href='/contact'>
            <a className='font-Poppins md:text-xl text-blue-500'>kuizme.com/contact</a>
          </Link> 
          .
        </a>
      </div>
    </div>
    <Footer />
  </>
)

export default About
