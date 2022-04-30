import Image from 'next/image'
import HeaderItem from './HeaderItem'
import {
    HomeIcon,
    SearchIcon
} from '@heroicons/react/outline'


const Header = () => (
    <header className='flex flex-col sm:flex-row m-5 justify-between
    items-center h-auto'>
        <div className='flex flex-grow justify-evenly max-w-2xl'>
            <HeaderItem title='HOME' Icon={HomeIcon} />
            <HeaderItem title='SEARCH' Icon={SearchIcon} />
        </div>
        <Image 
            src='/header.png'
            width={200}
            height={100}
        />
    </header>
)

export default Header
