import Link from 'next/link'

const contact = () => {
  return (
  <>
    <div className='flex flex-row h-25v sm:h-30v bg-indigo-600 
    justify-center items-center'>
      <p className='text-sm md:text-xl lg:text-2xl text-white text-center w-4/6
      mt-8'>
        Here at Kuizme, we care about every single one of our visitors.
        We strive to ensure that our visitors are always entertained and satisfied with
        the content on our site.
      </p>
    </div>
    <div className='flex flex-row h-25v sm:h-30v bg-indigo-600 
    justify-center items-center'>
      <p className='text-sm md:text-xl lg:text-2xl text-white text-center w-4/6
      mb-8'>
        If you have any questions or concerns, find any bugs, or have
        any trouble at all, please reach out to us at 
        <span className='text-red-500 font-bold'> support@kuizme.com</span>.
      </p>
    </div>
    <div className='flex flex-row h-25v sm:h-30v 
    justify-center items-center'>
      <p className='text-sm md:text-xxl lg:text-2xl text-black text-center w-4/6
      mt-8'>
        For news, promotions, and all things quizzes, follow Kuizme on Facebook,
        Instagram, and Twitter!
      </p>
    </div>
    <div className='flex flex-row h-20v sm:h-20v 
    justify-center items-start gap-x-8 md:gap-x-16'>
      <a href='https://www.facebook.com/kuizmeofficial' target='_blank'>
        <img src='/facebook.svg' className='hover:cursor-pointer w-[3.5rem] h-[3.5rem]
        md:w-[5rem] md:h-[5rem]'/>
      </a>
      <a href='https://www.instagram.com/kuiz.me/?hl=en' target='_blank'>
        <img src='/instagram.svg' className='hover:cursor-pointer w-[3.5rem] h-[3.5rem]
        md:w-[5rem] md:h-[5rem]'/>  
      </a>
      <a href='https://twitter.com/kuizmeofficial' target='_blank'>
        <img src='/twitter.svg' className='hover:cursor-pointer w-[3.5rem] h-[3.5rem]
        md:w-[5rem] md:h-[5rem]'/>  
      </a>
    </div>
    <div className='flex row items-center justify-center h-7.5v sticky bg-gray-900 
     bottom-0 text-white text-center text-sm md:text-base lg:text-2xl'>
      <p className='w-4/5 md:w-11/12'>Sign up to receive updates on the latest content!
      </p>
    </div>
  </> )
}

export default contact
