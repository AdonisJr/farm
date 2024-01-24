import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';


export default function FindLocation({ crimes, currentLocation, credentials, setCredentials, setFindLoc, farms }) {

    const currentPosition = {
        lat: 8.044897231351126,
        lng: 126.21871469053765,
    };
    const [markers, setMarkers] = useState([]);
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

    const handleMapClick = (event) => {
        // Retrieve the clicked location's latitude and longitude
        console.log(event)
        const clickedLatLng = {
            lat: event.detail.latLng.lat,
            lng: event.detail.latLng.lng,
        };

        // Add the clicked location to the markers state
        setMarkers(clickedLatLng);

        // You can now use clickedLatLng as needed, for example, send it to the server or perform other actions.
        console.log('Clicked Location:', clickedLatLng);
    };


    const getSpecificDate = (created_at) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        const date = new Date(created_at);
        const longDate = date.toLocaleDateString("en-US", options);
        return longDate;
    };

    return (
        <div className='flex justify-center items-center absolute top-0 left-0 w-screen h-screen z-50'>
            <APIProvider apiKey={apiKey}>
                <div className='w-4/6 h-5/6 bg-teal-300 rounded-lg p-5'>
                    <Map center={currentPosition} zoom={15} mapId={"73ea4a8d7bc51562"} onClick={handleMapClick} className='h-full'>
                        {
                            markers.lat ?
                                <p className='absolute top-10 left-80 bg-slate-200 p-2 rounded-lg opacity-90'>lat: {markers.lat} lng: {markers.lng}</p>
                                : ""
                        }

                        <Marker
                            position={markers}
                            title={`SELECTED LOCATION`} />
                        <button className='absolute bottom-10 left-80 p-2 w-3/6 bg-blue-600 text-white font-bold rounded-lg' onClick={(e) => [setCredentials({ ...credentials, lat: markers.lat, lng: markers.lng }), setFindLoc(false)]}>Continue</button>
                        {farms.map((farm) => (
                            farms.latitude === null || farm.longitude === null ? <div key={farm.id}></div> :

                                <Marker
                                    key={farm.id}
                                    position={{ lat: farm.lat, lng: farm.lng }}
                                    title={`Owner: ${farm.first_name}${farm.middle_name ? ` ${farm.middle_name}` : ''}${farm.last_name ? ` ${farm.last_name}` : ''}${farm.suffix ? ` ${farm.suffix}` : ''}\n`}
                                    icon={"http://localhost:3000/currentMark.png"}
                                    
                                />
                        ))

                        }
                    </Map>
                </div>
            </APIProvider>

        </div>

    )
}
// import React, { useState, useEffect } from 'react';
// import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

// export default function FindLocation({ crimes, currentLocation, credentials, setCredentials, setFindLoc, farms }) {
//   const currentPosition = {
//     lat: 8.044897231351126,
//     lng: 126.21871469053765,
//   };
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

//   const handleMapClick = async (event) => {
//     const clickedLatLng = {
//       lat: event.detail.latLng.lat,
//       lng: event.detail.latLng.lng,
//     };

//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clickedLatLng.lat},${clickedLatLng.lng}&key=${apiKey}`
//       );

//       if (!response.ok) {
//         throw new Error('Failed to fetch address');
//       }

//       const data = await response.json();
      
//       console.log(data)
//       const addressComponents = data.results[0].address_components;

//       // Assuming barangay is in the locality field, adjust as needed
//       const barangay = addressComponents.find((component) =>
//         component.types.includes('locality')
//       );

//       setSelectedLocation({
//         ...clickedLatLng,
//         barangay: barangay ? barangay.long_name : 'Unknown Barangay',
//       });
//     } catch (error) {
//       console.error('Error fetching address:', error);
//     }
//   };

//   return (
//     <div className='flex justify-center items-center absolute top-0 left-0 w-screen h-screen z-50'>
//       <APIProvider apiKey={apiKey}>
//         <div className='w-4/6 h-5/6 bg-teal-300 rounded-lg p-5'>
//           <Map center={currentPosition} zoom={15} mapId={"73ea4a8d7bc51562"} onClick={handleMapClick} className='h-full'>
//             {selectedLocation && (
//               <p className='absolute top-10 left-80 bg-slate-200 p-2 rounded-lg opacity-90'>
//                 {`lat: ${selectedLocation.lat} lng: ${selectedLocation.lng} Barangay: ${selectedLocation.barangay}`}
//               </p>
//             )}

//             <Marker position={selectedLocation} title={`SELECTED LOCATION`} />
//             <button className='absolute bottom-10 left-80 p-2 w-3/6 bg-blue-600 text-white font-bold rounded-lg' onClick={(e) => [setCredentials({ ...credentials, lat: selectedLocation.lat, lng: selectedLocation.lng }), setFindLoc(false)]}>
//               Continue
//             </button>

//             {farms.map((farm) => (
//               farms.latitude === null || farm.longitude === null ? (
//                 <div key={farm.id}></div>
//               ) : (
//                 <Marker
//                   key={farm.id}
//                   position={{ lat: farm.lat, lng: farm.lng }}
//                   title={`Owner: ${farm.first_name}${farm.middle_name ? ` ${farm.middle_name}` : ''}${farm.last_name ? ` ${farm.last_name}` : ''}${farm.suffix ? ` ${farm.suffix}` : ''}\n`}
//                   icon={"http://localhost:3000/currentMark.png"}
//                 />
//               )
//             ))}
//           </Map>
//         </div>
//       </APIProvider>
//     </div>
//   );
// }
