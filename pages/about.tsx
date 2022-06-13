import Link from 'next/link'

const About = () => (
  <>
    <div className='min-h-screen'>
      <h1 className='px-6 md:px-40 font-Poppins text-4xl font-bold mt-10'>About Us</h1>
      <br></br>
      <div className='text-justify px-6 md:px-40 py-4 md:text-xl font-Poppins'>
        <a>
          Kuizme is the leading anime, movie, and TV trivia and quiz entertainment provider 
          on the web and mobile devices. Kuizme has quizzes on 
          a variety of topics - ranging from Naruto to Harry Potter to Breaking Bad - that have been 
          played thousands of times. For inquiries and questions, find our contact information at&nbsp;
          <Link href='/contact'>
            <a className='font-Poppins md:text-xl text-blue-500'>kuizme.com/contact</a>
          </Link> 
          .
        </a>
      </div>
    </div>
  </>
)

export default About
