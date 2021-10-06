import Image from 'next/image';


function Banner() {


    
    return (
        // tailwind with jit engine allows for custom exact height in brackets like seen below
        // this allows for specific sizing of Banner component based on every screen size
        <div className='relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]'>
            <Image 
                layout='fill'
                src={'https://s3.us-west-2.amazonaws.com/images.unsplash.com/application-1633481762343-84f9d69d51caimage'}
                objectFit='cover'
            />
            
            <div className='absolute top-1/2 w-full text-center'>
                <p className='text-sm sm:text-lg font-md text-white'> Not sure where to go? Perfect.</p>

                <button className='text-purple-500 bg-white px-10 py-4 shadow-md 
                rounded-full font-bold my-3 hover:shadow-xl active:scale-90 
                transition duration-150'> I'm flexible</button>
            </div>
        </div>
    )
}

export default Banner
