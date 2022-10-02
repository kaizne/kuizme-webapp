import Link from 'next/link'

const Verified = () => {
    return (
        <div className='min-h-screen'>
            <div className='flex flex-col items-center'>
            <Link href='/'>
                <button className='mt-8 md:mt-12 text-center
                                   text-2xl font-semibold text-indigo-600'>Kuizme</button>
            </Link>
            <h1 className='mt-2 text-center
                           text-xl font-semibold'>Email Successfully Verified</h1>
            <div className='w-80 mt-2 text-center'>You are now able to log in. This page can be closed now.</div>
            </div>
        </div>
    )
}

export default Verified
