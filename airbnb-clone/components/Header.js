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
import { useRouter } from 'next/dist/client/router';


function Header( {placeholder} ) {

    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [numGuests, setNumGuests] = useState(1);
    const router = useRouter();

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const resetInput = () => {
        setSearchInput('');
    }

    const search = () => {
        router.push({
            pathname: '/search',
            query: {
                location: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                numGuests,

            }
        })
    }

    const selectionRange = {
        startDate,
        endDate,
        key: 'selection'
    }


    return (
        // tailwind css enables easy breakpoint styling instead of media queries
        // i.e. md:px-10 changing padding at medium screen breakpoint

        <header className='sticky top-0 z-50 grid grid-cols-3 bg-white 
        shadow-md py-5 px-5 md:px-10'>
            {/* Left  - AirBnB Logo */}
            <div 
                onClick={() =>  router.push('/')}
                className='relative flex items-center h-10 cursor-pointer my-auto'
            >
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
                    placeholder={placeholder || 'Start your search'} 
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
            {/* wrapper div given flex-col and col-span-3 combined with auto 
            margin on x axis to make sure the date range picker component spans 
            the entire grid created via the Header and is centered */}

            {searchInput && (
                
                <div className='flex flex-col col-span-3 mx-auto mt-1'>
                    <DateRangePicker 
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={['#FD5B61']}
                        onChange={handleSelect}
                    />
                    <div className='flex items-center border-b mb-4'>
                        <h2 className='text-2xl flex-grow font-semibold'>Number of Guests</h2>
                        <UsersIcon className='h-5'/>
                        <input 
                            type='number' 
                            className='w-12 pl-2 text-lg outline-none text-red-400' 
                            value={numGuests} 
                            onChange={(e) => setNumGuests(e.target.value)}
                            min={1}
                        />
                    </div>
                    <div className='flex'>
                        <button 
                            className='flex-grow text-gray-500'
                            onClick={resetInput}
                        >Cancel</button>
                        <button 
                            className='flex-grow text-red-400'
                            onClick={search}
                        >Search</button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
