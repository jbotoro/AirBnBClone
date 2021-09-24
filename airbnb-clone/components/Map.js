import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

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
        >
            {searchResults.map( (result) => (
                <div key={result.long}>
                    <Marker
                        latitude={result.lat}
                        longitude={result.long}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            className='cursor-pointer text-2xl'
                            onClick={() => setSelectedLocation(result)}  
                            aria-label='rounded-push-pin'  
                        >
                            📍
                        </p>
                    </Marker>

                    {/* Popup that should show when marker is clicked */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                            onClose={() =>  setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={result.lat}
                            longitude={result.long}
                            className='background-none'
                        >
                            <div className='flex h-10 items-center rounded-full'>
                                {result.title}
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
