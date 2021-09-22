import Footer from "../components/Footer"
import Header from "../components/Header"

function Search() {

    return (
        <div>
            <Header />
        
            <main className='flex'>
                <section className='flex-grow pt-14 px-6'>
                    <p className='text-xs'>300+ Stays for 5 number of guests</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'> Stays on Jupiter </h1>
                    <div className='hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap'>
                        {/* Button styling was lengthy and reusable for all 
                        buttons so I made a custom tailwindCSS "button" utility 
                        class and applied it to all buttons to clean up styling 
                        code 

                        All that was necessary was adding a styles folder, adding
                        global.css and then adding the button class styling to 
                        he components layer of tailwind which can be seen in global.css file
                        Lastly global.css needs to be imported in _app.js
                        */}
                        <p className='button'>Cancellation Flexibility</p>
                        <p className='button'>Type of Place</p>
                        <p className='button'>Price</p>
                        <p className='button'>Rooms and Beds</p>
                        <p className='button'>More filters</p>
                    </div>
                </section>

            </main>


            <Footer />
        </div>
    )
}

export default Search