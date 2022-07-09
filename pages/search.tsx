import {
    ChevronLeftIcon,
} from '@heroicons/react/outline'

const Search = () => {
    return (
        <div className='min-h-screen'>
            <ChevronLeftIcon className='h-6 w-6 absolute mt-3 ml-6' onClick={() => history.back()}/>
            <input type='text' placeholder='Search...' className='bg-gray-200 w-64 ml-[4.6rem] mt-2 indent-2 h-8
            border-2 border-gray-400 focus:border-indigo-600 focus:outline-none focus:bg-white
            placeholder:text-gray-700' autoFocus>
            </input>
        </div>
    )
}

export default Search

