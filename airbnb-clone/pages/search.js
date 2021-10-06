import Footer from "../components/Footer"
import Header from "../components/Header"
import { useRouter } from 'next/dist/client/router'
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults }) {

    const router = useRouter();

    const {location, startDate, endDate, numGuests} = router.query;

    const formattedStartDate = format(new Date(startDate),"dd MMMM yy");
    const formattedEndDate = format(new Date(endDate),"dd MMMM yy");
    const range = `${formattedStartDate} - ${formattedEndDate}`

    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numGuests} guests`}/>
        
            <main className='flex'>
                <section className='flex-grow pt-14 px-6 lg:justify-around'>
                    <p className='text-xs'>300+ Stays in {location} - 
                        <span className='bg-red-400 mx-1 px-1 py-1 text-white rounded-md'>{formattedStartDate}</span> - <span className='bg-red-400 mx-1 px-1 py-1 text-white rounded-md'>{formattedEndDate}</span>
                        - for {numGuests} guests</p>
                    <h1 className='text-3xl font-semibold mt-2 mb-6'> Stays in {location} </h1>
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

                    {/* Ideally key for InfoCard components are a specific id from backend but in this 
                    demo case we just use the img as the key */}

                    <div className='flex flex-col'>
                        {searchResults.map(({img,location, title, description, star, price, total}) => {
                            // Changed output of location and title to change based on user query
                            // as API originally returned only London as well as price to be Dollars not Pounds
                            location = `Private room in the center of ${router.query.location}`
                            title = title.replace('London',`${router.query.location}`)
                            price = price.replace('£','$')
                            total = total.replace('£','$')
                            return ( 
                            <InfoCard
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                star={star}
                                price={price}
                                total={total}

                            />
                            )
                        })}
                    </div>
                </section>
                
                <section className='hidden md:inline-flex md:min-w-[600px] '>
                    <Map searchResults={searchResults} />
                </section>

            </main>


            <Footer />
        </div>
    )
}

export default Search


// Server side rendering Next.js

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz').
    then((res) => res.json())

    return {
        props: {
            searchResults,
        }
    }
}