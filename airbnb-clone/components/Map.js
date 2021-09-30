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
        zoom: 12,
    });

    return (
        <ReactMapGL
            mapStyle='mapbox://styles/jblack530/cktyv5jn50pn217pl9prs96j7'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => {
                setViewport(nextViewport);
            }}
            // className='sticky -mb-[40vh]'
            style={{padding:'0', background:'transparent'}}
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
                            className='cursor-pointer text-2xl w-5 z-0'
                            onClick={() => setSelectedLocation(result)}  
                            aria-label='push-pin'  
                        >
                            📌
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
                            <div className='px-4 py-1.5 rounded-xl bg-white '>
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
