import Link from 'next/link'

const Verified = () => {
    return (
        <div className='min-h-screen'>
            <div className='flex flex-col items-center'>
            <Link href='/'>
                <button className='mt-8 md:mt-12 text-center
                                   text-2xl font-semibold text-sky-500'>Kuizme</button>
            </Link>
            <h1 className='mt-2 text-center
                           text-xl font-semibold'>Email Successfully Verified</h1>
            <p className='mt-2 text-center'>You are now able to sign in.</p>
            <Link href='/signin'>
            <button className='w-36 h-10 mt-3  rounded text-white
                                bg-sky-500 hover:bg-sky-600 hover:cursor-pointer'>
                                Sign in</button>
            </Link>
            </div>
        </div>
    )
}

export default Verified
