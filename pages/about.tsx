const about = () => {
  return (
  <>
    <div className='flex flex-row h-25v sm:h-30v bg-indigo-600 
    justify-center items-center'>
      <p className='text-sm md:text-2xl lg:text-4xl text-white text-center w-5/6 md:w-4/6
      mt-8'>
        Kuizme is a place for casual and veteran anime enjoyers alike to 
        discover their personality types, match with their kins, and
        put their knowledge to the test.
      </p>
    </div>
    <div className='flex flex-row h-25v sm:h-30v bg-indigo-600 
    justify-center items-center'>
      <p className='text-sm md:text-2xl lg:text-4xl text-white text-center w-5/6 md:w-4/6
      mb-8'>
        Whether you have seen two anime or two dozen, 
        and whether it has been two days since you last watched 
        them or two years, Kuizme has a quiz for you!
      </p>
    </div>
    <div className='flex flex-row h-25v sm:h-30v 
    justify-center items-center'>
      <p className='text-sm md:text-2xl lg:text-4xl text-black text-center w-5/6 md:w-4/6'>
        Kuizme was founded by two friends with a shared passion for quizzes,
        web development, and anime. Our goal at Kuizme is to provide high quality
        quizzes with a sleek user experience.
      </p>
    </div>
    <div className='flex flex-row h-25v sm:h-30v 
    justify-center items-center'>
      <p className='text-sm md:text-2xl lg:text-4xl text-black text-center w-5/6 md:w-4/6'>
        We hope you will stick with us as we continue to improve your experience 
        and expand our content library. If you have any suggestions, find any bugs, 
        or notice any inaccuracies, please contact us
        <a href='https://www.kuizme.com/contact' target='_blank' 
        className='text-pink-500 font-bold hover:text-rose-300 hover:cursor-pointer'> here</a>.
      </p>
    </div>
    <div className='flex flex-row h-5v sm:h-7.5v bg-black
    justify-center items-center'>
      <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-bold'>
        What can you find on Kuizme?
      </p>
    </div>
    <div className='flex flex-row h-10v sm:h-32 bg-black 
    justify-center gap-x-8 sm:gap-x-16 md:gap-x-32 lg:gap-x-48'>
      <div className='flex flex-col sm:mt-2'>
        <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-500 text-center font-bold'>
          15+
        </p>
        <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-semibold'>
          Anime
        </p>
      </div>
      <div className='flex flex-col sm:mt-2'>
        <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-500 text-center font-bold'>
          40+
        </p>
        <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-semibold'>
          Quizzes
        </p>
      </div>
      <div className='flex flex-col sm:mt-2'>
        <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl text-rose-500 text-center font-bold'>
          700+
        </p>
        <p className='text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center font-semibold'>
          Questions
        </p>
      </div>
    </div>
  </> )
}

export default about
