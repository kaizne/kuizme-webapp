import axios from 'axios'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { XIcon } from '@heroicons/react/solid'

const ConvinceSignUp = ({ setOverlay }) => {

    return (
        <>
        <div className='absolute top-0 right-0 md:-mt-64'>
            <XIcon className='h-7 w-7 mt-1 mr-2 hover:cursor-pointer hover:bg-gray-200'
                    onClick={() => setOverlay('')} />
        </div>
        <div className='w-screen md:w-96 md:h-auto h-screen md:-ml-48 md:-mt-64 rounded bg-white'>
           <div className='flex flex-col items-center'>
                <div className='mt-16 md:mt-10 text-center hover:text-indigo-400
                                text-2xl font-semibold text-indigo-600'>Kuizme
                </div>
                <div className='w-80 mt-8 text-left text-lg font-medium'>
                    You must be logged in to play the next difficutly.
                </div>
                <h2 className='w-80 mt-4 text-left text-xl font-semibold'>Join the Kuizme community</h2>
                <div className='w-80 mt-1 text-left text-gray-700'>🤓 Play every quiz and difficulty </div>
                <div className='w-80 mt-1 text-left text-gray-700'>✍️ Ability to post comments</div>
                <div className='w-80 mt-1 text-left text-gray-700'>✉️ Be invited to the Discord server</div>
                <div className='w-80 mt-1 text-left text-gray-700'>🧠 Save your progress on each quiz</div>
                <div className='w-80 mt-1 text-left text-gray-700 font-medium'>+ many other features</div>
                <button className={`w-80 h-10 mt-20 md:mt-8 rounded text-white 
                                   bg-indigo-600 hover:bg-indigo-400 hover:cursor-pointer`}>
                                Sign up</button>
                                <button className={`w-80 h-10 mt-4 mb-10 rounded text-indigo-600
                                   border-2 border-indigo-600 hover:bg-indigo-200 hover:cursor-pointer`}>
                                Log in</button>
            </div>
        </div>
        </>
    )
}

export default ConvinceSignUp
