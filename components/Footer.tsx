import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Footer() {
    return (
        <div className='absolute bottom-0 w-full'>
            <div className='bg-black text-white grid grid-cols-2 
            sm:grid-cols-4 py-10 justify-center gap-y-5'>
                <div className='text-center'>
                    <Link href='/'>
                        <a className='font-Poppins text-lg'>Home</a>
                    </Link> 
                </div>
                <div className='text-center'>
                    <Link href='/about'>
                        <a className='font-Poppins text-lg'>About</a>
                    </Link> 
                </div>
                <div className='text-center'>
                    <Link href='/contact'>
                        <a className='font-Poppins text-lg'>Contact</a>
                    </Link> 
                </div>
                <div className='text-center'>
                    <Link href='/privacy'>
                        <a className='font-Poppins text-lg'>Privacy</a>
                    </Link> 
                </div>
            </div>
        </div>
    )
}

export default Footer;
