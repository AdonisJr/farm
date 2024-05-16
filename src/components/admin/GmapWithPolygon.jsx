// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const GmapWithPolygon = ({ user, accessToken }) => {

//     const [farms, setFarms] = useState([]);

//     const getFarms = async () => {
//         await axios
//             .get(`/farm`, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 }
//             })
//             .then((res) => {
//                 setFarms(res.data.data)
//                 console.log(res.data.data)
//             });

//     };

//     useEffect(() => {
//         getFarms();
//     }, [])

//     useEffect(() => {
//         // Initialize the map
//         const map = new window.google.maps.Map(document.getElementById('map'), {
//             center: { lat: 8.077048, lng: 126.194797 }, // Adjust this to center the map
//             zoom: 12, // Adjust the initial zoom level as needed
//         });

//         // Define the polygons
//         // const polygons = [
//         //     {
//         //         coordinates: [
//         //             { lat: 8.211715, lng: 125.978827 },
//         //             { lat: 8.290380, lng: 125.959861 },
//         //             { lat: 8.291032, lng: 126.034027 },
//         //         ],
//         //         fillColor: '#FF0000',
//         //         title: 'Consuelo'
//         //     }
//         // ];

//         const polygons = [];
//         if (farms.length !== 0) {
//             farms.map(farm => {
//                 if (farm.polygon.length !== 0 && farm.status === 'APPROVED') {
//                     let polygonArray = JSON.parse(farm.polygon);
//                     let coordinates = [];
//                     polygonArray.forEach(point => {
//                         coordinates.push({ lat: point.lat, lng: point.lng });
//                     });

//                     // Assuming you have other properties like fillColor and title
//                     polygons.push({
//                         coordinates: coordinates,
//                         fillColor: farm.type === 'CORN' ? '#ffff00' : '#008000', // You can customize this as needed
//                         title: `Farmer: ${farm.first_name + ' ' + farm.middle_name + ' ' + farm.last_name}<br>
//                                 Lot size: ${farm.lot_size} (ha)<br>
//                                 Crops: ${farm.type}`
//                     });
//                 }
//             });
//         }

//         // Create polygons
//         polygons.forEach(polygonData => {
//             const polygon = new window.google.maps.Polygon({
//                 paths: polygonData.coordinates,
//                 strokeColor: '#ffffff',
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//                 fillColor: polygonData.fillColor,
//                 fillOpacity: 0.60,


//             });

//             const infoWindow = new window.google.maps.InfoWindow({
//                 content: polygonData.title
//             });
//             // Add mouseover event listener
//             polygon.addListener('mouseover', function (event) {
//                 infoWindow.setPosition(event.latLng);
//                 infoWindow.open(map);
//             });

//             // Add mouseout event listener
//             polygon.addListener('mouseout', function () {
//                 infoWindow.close();
//             });
//             polygon.setMap(map);
//         });
//     }, [farms]); // Re-run effect when crimes change

//     return <div id="map" style={{ width: '100%', height: '700px' }}></div>;
// };

// export default GmapWithPolygon;
// import React, { useEffect, useState, useRef } from 'react';
// import RequestFarm from './RequestFarm';
// import ReqFarm from './ReqFarm';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const MapWithPolygon = ({ farms, user, accessToken }) => {
//     const [drawingPolygon, setDrawingPolygon] = useState(false);
//     const [polygonCoordinates, setPolygonCoordinates] = useState([]);
//     const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
//     const mapRef = useRef(null);
//     const drawnPolygonRef = useRef(null);
//     const [isModalOpen, setIsModalOpen] = useState(false)

//     const showErrorMessage = (message) => {
//         toast.error(message, {
//             position: toast.POSITION.TOP_LEFT,
//             autoClose: 2000,
//         });
//     };
//     const showSuccessMessage = (message) => {
//         toast.success(message, {
//             position: toast.POSITION.TOP_LEFT,
//             autoClose: 2000,
//         });
//     };

//     useEffect(() => {
//         if (window.google && window.google.maps) {
//             setGoogleMapsLoaded(true);
//         } else {
//             const script = document.createElement('script');
//             script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCTLAeQSemUohsGu1_orPQIKXaUvu8t0zs&libraries=geometry`;
//             script.onload = () => setGoogleMapsLoaded(true);
//             document.head.appendChild(script);

//             return () => {
//                 document.head.removeChild(script);
//             };
//         }
//     }, []);

//     useEffect(() => {
//         if (!googleMapsLoaded) return;
//         mapRef.current = new window.google.maps.Map(document.getElementById('map'), {
//             center: { lat: 8.077048, lng: 126.194797 },
//             zoom: 12,
//         });

//         const clickListener = mapRef.current.addListener('click', (e) => {
//             if (drawingPolygon) {
//                 const newCoordinate = { lat: e.latLng.lat(), lng: e.latLng.lng() };
//                 setPolygonCoordinates((prevCoords) => [...prevCoords, newCoordinate]);
//             }
//         });

//         return () => {
//             window.google.maps.event.removeListener(clickListener);
//         };
//     }, [googleMapsLoaded, drawingPolygon]);

//     useEffect(() => {
//         if (drawnPolygonRef.current) {
//             drawnPolygonRef.current.setMap(null); // Remove previous drawn polygon
//         }

//         if (polygonCoordinates.length > 0) {
//             drawnPolygonRef.current = new window.google.maps.Polygon({
//                 paths: polygonCoordinates,
//                 strokeColor: '#ffffff',
//                 strokeOpacity: 0.8,
//                 strokeWeight: 2,
//                 fillColor: '#FF0000',
//                 fillOpacity: 0.6,
//                 editable: true,
//                 draggable: true
//             });

//             drawnPolygonRef.current.setMap(mapRef.current);
//         }
//     }, [polygonCoordinates, drawingPolygon]);

//     const startDrawingPolygon = () => {
//         setDrawingPolygon(true);
//         setPolygonCoordinates([]);
//         if (drawnPolygonRef.current) {
//             drawnPolygonRef.current.setMap(null);
//         }
//     };

//     const finishDrawingPolygon = () => {
//         setDrawingPolygon(false);
//         if (drawnPolygonRef.current) {
//             drawnPolygonRef.current.setMap(mapRef.current);
//         }
//     };

//     const handleRequest = () => {
//         if (polygonCoordinates.length === 0) return showErrorMessage('Please select farm coordinates')
//         if (drawingPolygon) return showErrorMessage('Please stop mapping')
//         setIsModalOpen(true)
//     }

//     return (
//         <div>
//             {googleMapsLoaded && (
//                 <div className='relative'>
//                     <ToastContainer />
//                     <div className='flex text-white font-bold justify-start gap-2 py-2'>
//                         <button onClick={startDrawingPolygon} disabled={drawingPolygon === true}
//                             className={`bg-teal-500 w-40 py-1 hover:bg-teal-600 duration-200 ${drawingPolygon === true ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Start Mapping</button>
//                         <button onClick={finishDrawingPolygon} disabled={drawingPolygon === false}
//                             className={`bg-teal-500 w-40 py-1 hover:bg-teal-600 duration-200 ${drawingPolygon === false ? 'cursor-not-allowed' : 'cursor-pointer'}`}>Stop Mapping</button>
//                     </div>
//                     {
//                         !isModalOpen ? "" :
//                             <ReqFarm user={user} accessToken={accessToken} polygonCoordinates={polygonCoordinates} setIsModalOpen={setIsModalOpen} />
//                     }

//                     <div id="map" style={{ width: '100%', height: '700px' }}>


//                     </div>

//                 </div>

//             )}
//             <div className='flex w-full justify-center items-center py-3'>
//                 <button className='bg-blue-500 py-1 w-2/6 text-white hover:bg-blue-600 duration-200'
//                     onClick={handleRequest}>
//                     Request Farm Land
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default MapWithPolygon;
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GmapWithPolygon = ({ user, accessToken }) => {
    const [drawingPolygon, setDrawingPolygon] = useState(false);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const mapRef = useRef(null);
    const drawnPolygonRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [farms, setFarms] = useState([]);

    const cityCoordinates = [
        { lat: 7.997840, lng: 126.364055 },
        { lat: 7.993420, lng: 126.150165 },
        { lat: 7.957040, lng: 126.073948 },
        { lat: 8.047814, lng: 126.034466 },
        { lat: 8.062432, lng: 126.012493 },
        { lat: 8.070250, lng: 126.058498 },
        { lat: 8.092684, lng: 126.087337 },
        { lat: 8.097103, lng: 126.112057 },
        { lat: 8.178331, lng: 126.135059 },
        { lat: 8.205176, lng: 126.220203 },
        { lat: 8.179704, lng: 126.215368 },
        { lat: 8.177184, lng: 126.249515 },
        { lat: 8.124167, lng: 126.286250 },
        { lat: 8.128925, lng: 126.342898 },
        { lat: 8.066384, lng: 126.265994 },
        { lat: 8.055166, lng: 126.278354 },
        { lat: 8.053806, lng: 126.307880 },
        { lat: 8.050067, lng: 126.331225 },
        { lat: 8.037829, lng: 126.351481 },
        { lat: 8.027630, lng: 126.360065 }
    ];

    const getFarms = async () => {
        await axios
            .get(`/farm`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            .then((res) => {
                setFarms(res.data.data)
                console.log(res.data.data)
            });
    };

    useEffect(() => {
        getFarms();
    }, [drawingPolygon]);

    const showErrorMessage = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
        });
    };

    const showSuccessMessage = (message) => {
        toast.success(message, {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 2000,
        });
    };

    useEffect(() => {
        if (window.google && window.google.maps) {
            setGoogleMapsLoaded(true);
        } else {
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry`;
            script.onload = () => setGoogleMapsLoaded(true);
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, []);

    useEffect(() => {
        if (!googleMapsLoaded) return;
        mapRef.current = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 8.077048, lng: 126.194797 },
            zoom: 12,
        });

        const clickListener = mapRef.current.addListener('click', (e) => {
            if (drawingPolygon) {
                const newCoordinate = { lat: e.latLng.lat(), lng: e.latLng.lng() };
                setPolygonCoordinates((prevCoords) => [...prevCoords, newCoordinate]);
            }
        });

        return () => {
            window.google.maps.event.removeListener(clickListener);
        };
    }, [googleMapsLoaded, drawingPolygon]);

    useEffect(() => {
        if (drawnPolygonRef.current) {
            drawnPolygonRef.current.setMap(null); // Remove previous drawn polygon
        }

        if (polygonCoordinates.length > 0) {
            drawnPolygonRef.current = new window.google.maps.Polygon({
                paths: polygonCoordinates,
                strokeColor: '#ffffff',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.6,
                editable: true,
                draggable: true
            });

            drawnPolygonRef.current.setMap(mapRef.current);
        }
    }, [polygonCoordinates, drawingPolygon]);

    useEffect(() => {
        if (!googleMapsLoaded) return;
        if (!farms || farms.length === 0) return;

        farms.forEach((farm) => {
            if (farm.polygon.length === 0 || farm.status !== 'APPROVED') return;

            const polygonArray = JSON.parse(farm.polygon);
            const coordinates = polygonArray.map((point) => ({ lat: point.lat, lng: point.lng }));

            const farmPolygon = new window.google.maps.Polygon({
                paths: coordinates,
                strokeColor: '#ffffff',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: farm.type === 'CORN' ? '#ffff00' : '#008000', // You can customize this as needed
                fillOpacity: 0.6,
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: `Farmer: ${farm.first_name} ${farm.middle_name} ${farm.last_name}<br>
                            Lot size: ${farm.lot_size} (ha)<br>
                            Crops: ${farm.type}`
            });

            farmPolygon.addListener('mouseover', function (event) {
                infoWindow.setPosition(event.latLng);
                infoWindow.open(mapRef.current);
            });

            farmPolygon.addListener('mouseout', function () {
                infoWindow.close();
            });

            farmPolygon.setMap(mapRef.current);
        });
    }, [googleMapsLoaded, farms]);

    useEffect(() => {
        if (!googleMapsLoaded) return;

        const cityPolygon = new window.google.maps.Polygon({
            paths: cityCoordinates,
            strokeColor: '#888888', // Gray border color
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: 'transparent', // No fill color
            clickable: false
        });

        const cityInfoWindow = new window.google.maps.InfoWindow({
            content: 'Trento Agusan del Sur', // Hover handle title
        });

        cityPolygon.setMap(mapRef.current);

    }, [googleMapsLoaded]);
    
    return (
        <div>
            {googleMapsLoaded && (
                <div className='relative'>
                    <div id="map" style={{ width: '100%', height: '700px' }}>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GmapWithPolygon;
