import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GmapViewAdmin = ({ user, accessToken, selected, farms, setShowMap, clearSelected }) => {
    const [drawingPolygon, setDrawingPolygon] = useState(false);
    const [polygonCoordinates, setPolygonCoordinates] = useState([]);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const mapRef = useRef(null);
    const drawnPolygonRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

        const polygonArray = JSON.parse(selected.polygon);
        const coordinates = polygonArray.map((point) => ({ lat: point.lat, lng: point.lng }));

        const farmPolygon = new window.google.maps.Polygon({
            paths: coordinates,
            strokeColor: '#ffffff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: selected.type === 'CORN' ? '#ffff00' : '#008000', // You can customize this as needed
            fillOpacity: 0.6,
        });

        const infoWindow = new window.google.maps.InfoWindow({
            content: `Farmer: ${selected.first_name} ${selected.middle_name} ${selected.last_name}<br>
                            Lot size: ${selected.lot_size} (ha)<br>
                            Crops: ${selected.type}<br>
                            Status: ${selected.status}`
        });

        farmPolygon.addListener('click', function (event) {
            infoWindow.setPosition(event.latLng);
            infoWindow.open(mapRef.current);
        });

        farmPolygon.setMap(mapRef.current);
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
        <div className='relative flex flex-col justify-center w-full h-full items-center'>
        
        <p className='z-50 absolute top-20 right-10 text-2xl text-red-500 cursor-pointer hover:text-red-600 duration-200 font-bold'
        onClick={(e) => [setShowMap(false), clearSelected()]}>X</p>
            {googleMapsLoaded && (
                <div className='absolute top-0 left-0 w-full h-full p-3'>
                    <div id="map" style={{ width: '100%', height: '700px' }}>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GmapViewAdmin;
