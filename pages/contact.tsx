import Link from 'next/link'
import Image from 'next/image'
import 'remixicon/fonts/remixicon.css'

const contact = () => {
  return (
  <>
    <div className='flex flex-row h-25v sm:h-30v bg-indigo-600 
    justify-center items-center'>
      <p className='text-sm md:text-2xl lg:text-4xl text-white text-center w-4/6
      mt-8'>
        Here at Kuizme, we care about every single one of our visitors.
        We strive to ensure that our visitors are always entertained and satisfied with
        the content on our site.
      </p>
    </div>
    <div className='flex flex-row h-25v sm:h-30v bg-indigo-600 
    justify-center items-center'>
      <p className='text-sm md:text-2xl lg:text-4xl text-white text-center w-4/6
      mb-8'>
        If you have any questions or concerns, find any bugs, or have
        any trouble at all, please reach out to us at 
        <span className='text-red-500 font-bold'> support@kuizme.com</span>.
      </p>
    </div>
    <div className='flex flex-row h-25v sm:h-30v 
    justify-center items-center'>
      <p className='text-sm md:text-2xl lg:text-4xl text-black text-center w-4/6
      mt-8'>
        For news, promotions, and all things quizzes, follow Kuizme on Facebook,
        Instagram, and Twitter!
      </p>
    </div>
    <div className='flex flex-row h-20v sm:h-20v 
    justify-center items-start gap-x-8 md:gap-x-16'>
      {
      //<i className='ri-twitter-fill ri-5x hover:cursor-pointer mr-16' />
      //<i className='ri-instagram-fill ri-5x hover:cursor-pointer ml-16' />
      }
      <img src='/facebook.svg' className='hover:cursor-pointer w-[3.5rem] h-[3.5rem]
      md:w-[5rem] md:h-[5rem]'/>
      <img src='/instagram.svg' className='hover:cursor-pointer w-[3.5rem] h-[3.5rem]
      md:w-[5rem] md:h-[5rem]'/>
      <img src='/twitter.svg' className='hover:cursor-pointer w-[3.5rem] h-[3.5rem]
      md:w-[5rem] md:h-[5rem]'/>
    </div>
    <div className='flex row items-center justify-center h-7v sticky bg-gray-900 
    absolute bottom-0 text-white text-center text-sm md:text-base lg:text-2xl'>
      <p className='w-4/5 md:w-11/12'>Click <a href='https://www.kuizme.com/' 
      className='text-pink-500 font-bold hover:text-rose-300 hover:cursor-pointer'>
      here</a> and enter your email to receive updates on the latest content!
      </p>
    </div>
  </> )
}

export default contact
