import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Footer() {
    const router = useRouter()
    const asPath = router.asPath
    return (
        <>
        {(asPath !== '/signup' && asPath !== '/signin' && asPath !== '/verified') &&
        <div className='w-full h-12 bg-white mt-4'>
            <div className='border-t-2 border-[#D0D0D0] text-black grid grid-cols-2 
            md:grid-cols-5 md:py-3 justify-center'>
                <div className='text-center'>
                    <Link href='/'>
                        <a className='font-Poppins text-xs md:text-lg'>Home</a>
                    </Link> 
                </div>
                <div className='text-center'>
                    <Link href='/about'>
                        <a className='font-Poppins text-xs md:text-lg'>About</a>
                    </Link> 
                </div>
                <div className='text-center'>
                    <Link href='/contact'>
                        <a className='font-Poppins text-xs md:text-lg'>Contact</a>
                    </Link> 
                </div>
                <div className='text-center'>
                    <Link href='/privacy'>
                        <a className='font-Poppins text-xs md:text-lg'>Privacy</a>
                    </Link> 
                </div>
                <div className='text-center'>
                    <Link href='/terms-of-service'>
                        <a className='font-Poppins text-xs md:text-lg'>Terms of Service</a>
                    </Link> 
                </div>
            </div>
        </div> }
        </>
    )
}

export default Footer;
