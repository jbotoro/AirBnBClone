import Image from 'next/image';
import { 
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

function Header() {

    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStateDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numGuest, setNumGuests] = useState(1);

    const selectionRange = {
        startDate,
        endDate,
        key: 'Selection'
    }

    return (
        // tailwind css enables easy breakpoint styling instead of media queries
        // i.e. md:px-10 changing padding at medium screen breakpoint

        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white 
        shadow-md py-5 px-5 md:px-10'>
            {/* Left  - AirBnB Logo */}
            <div className='relative flex items-center h-10 cursor-pointer 
            my-auto'>
                <Image 
                    src='https://links.papareact.com/qd3'
                    layout='fill'
                    objectFit='contain'
                    objectPosition='left'
                />
            </div>
            {/* Middle - Search & Search Icon */}
            {/* search icon hidden by default but on medium screen or bigger it becomes inline flex another use of easy tailwind breakpoint styling */}
            <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm '>
                <input 
                    className=' flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400'
                    type='text' 
                    placeholder='Start your search' 
                    value={searchInput} 
                    onChange={(e) => setSearchInput(e.target.value)} 
                />
                <SearchIcon className=' hidden md:inline-flex h-8 bg-red-400 
                text-white rounded-full p-2 cursor-pointer md:mx-2'/>
            </div>
            {/* Right - Menu/Icons */}
            <div className='flex items-center justify-end text-gray-500 space-x-4 '> 
                <p className='hidden md:inline cursor-pointer'> Become a host </p>
                <GlobeAltIcon className='h-6 cursor-pointer'/>
                <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
                    <MenuIcon className='h-6' />
                    <UserCircleIcon className='h-6'/>
                </div>
            </div>

            {/* When Search Input Value present then show calender component */}
            {searchInput && (
                <div>
                    <DateRangePicker 
                        ranges={[selectionRange]}
                    />
                </div>
            )}
        </header>
    )
}

export default Header
