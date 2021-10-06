import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';




function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({});

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }));

    // we create the coordinates array of objects with those specific keys because that is what geolib requires

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/jblack530/cktyv5jn50pn217pl9prs96j7'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => {
                setViewport(nextViewport);
            }}
            style={{padding:'0', background:'transparent'}}
        >
            {searchResults.map( (result) => (
                <div key={result.long}>
                    <Marker
                        latitude={result.lat}
                        longitude={result.long}
                        offsetLeft={-20}
                        offsetTop={-10}
                        className=''
                    >
                        <p
                            className='cursor-pointer text-sm  z-0 bg-red-400 text-white rounded-lg px-1 py-1 shadow-sm'
                            onClick={() => setSelectedLocation(result)}  
                            aria-label='push-pin'  
                        >
                            {result.price.replace('£','$').split('/')[0]}
                        </p>
                    </Marker>

                    {/* Popup that should show when marker is clicked */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() =>  setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                            className='z-50'
    
                        >
                            <div className='relative min-w-[300px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration 200 ease-out'>
                                <div>
                                        <img src={result.img} className='w-full object-cover z-50 h-48 rounded-xl rounded-b-none mb-3 image'/>
                                </div>
                                <div>
                                    <p className="cursor-pointer flex items-center px-2 font-light">
                                        <StarIcon className="h-4 text-red-500 mr-1 " />
                                        {result.star}
                                    </p>
                                </div>
                                <h3 className='text-lg font-light text-black px-3 mb-2'>{result.title}</h3>
                                <div className="flex justify-between items-center px-2 py-2">
                                    <div>
                                        <p className="text-xl text-black font-md px-1">{result.price.replace('£', '$')}</p>
                                    </div>
                                    <HeartIcon className="cursor-pointer h-7 text-red-600" />
                                </div>
                            </div>
                        </Popup>
                    ):(
                        false
                    )}
                </div>
            ))}
        </ReactMapGL>
    );
}

export default Map
