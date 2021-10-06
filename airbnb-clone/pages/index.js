import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

export default function Home({exploreData, cardsData}) {
    return (
      <div className="">
        <Head>
          <title>JBBnB</title>
          <link rel="icon" href="/favicon.ico" />
          
        </Head>
        
        <Header />
        <Banner />
        { /* Main */ }

        <main className='max-w-5xl mx-auto px-8 sm:px-16'>
          <section className='py-6 shadow-sm px-6 rounded-xl mt-4 hover:shadow-lg hover:opacity-95 transition translate duration-300 ease-out'>
            <h2 className='text-4xl font-semibold pb-5'> Explore Nearby </h2>

            {/* Pull data from server - API endpoints */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {exploreData?.map(({img, location, distance}) => (
                <SmallCard 
                  key={img}
                  img={img} 
                  distance={distance} 
                  location={location}
                />
              ))}
            </div>
          </section>

          <section className='shadow-sm px-6 py-6 rounded-xl hover:shadow-lg hover:opacity-95 transition translate duration-300 ease-out'>
            <h2 className='text-4xl font-semibold py-8'>Live Anywhere </h2>
            <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
              {cardsData.map(({img,title}) => (
                <MediumCard key={img} img={img} title={title} />
              ))}
            </div>
          </section>
          
          <LargeCard 
            img='https://links.papareact.com/4cj'  
            title='The Greatest Outdoors'
            description='Wishlists curated by Airbnb.'
            buttonText='Get Inspired'
          />

        </main>
        <Footer/>
      </div>
    )
  }

  export async function getStaticProps() {
    const exploreData = await fetch('https://links.papareact.com/pyp').
    then(
      (res) => res.json()
    );

    const cardsData = await fetch('https://links.papareact.com/zp1').
    then(
      (res) => res.json()
    )

 
    

    return {
      props: {
        exploreData,
        cardsData,
      }
    }
  }
