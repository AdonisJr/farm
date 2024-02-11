import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import RequestFarm from './RequestFarm';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function FindLocation({ user, currentLocation, credentials, setCredentials, setFindLoc, farms, accessToken }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const currentPosition = {
        lat: 8.044897231351126,
        lng: 126.21871469053765,
    };
    const [markers, setMarkers] = useState([]);
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

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

    const handleMapClick = (event) => {
        const clickedLatLng = {
            lat: event.detail.latLng.lat,
            lng: event.detail.latLng.lng,
        };

        setMarkers(clickedLatLng);
        setCredentials({ ...credentials, lat: event.detail.latLng.lat, lng: event.detail.latLng.lng })
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

    const handleRequest = () => {
        if (!credentials.lat) return showErrorMessage("Error, Please select location.")
        setModalOpen(true);
    }

    return (
        <div className='flex flex-col justify-center relative top-0 left-0 w-full h-screen'>

            <p className='text-lg text-slate-500 font-bold py-2'>FARM LAND VISUAL</p>
            <ToastContainer />
            {
                !isModalOpen ? "" :
                    <RequestFarm user={user} credentials={credentials} accessToken={accessToken} setCredentials={setCredentials} setModalOpen={setModalOpen} markers={markers} />
            }
            <APIProvider apiKey={apiKey}>
                <Map center={currentPosition} zoom={15} mapId={"73ea4a8d7bc51562"} onClick={handleMapClick} className='h-full w-full'>
                    {
                        markers.lat ?
                            <p className='absolute top-10 left-80 bg-slate-200 p-2 rounded-lg opacity-90'>lat: {markers.lat} lng: {markers.lng}</p>
                            : ""
                    }
                    <Marker
                        position={markers}
                        title={`SELECTED LOCATION`} />
                    <button className='absolute bottom-10 left-80 p-2 w-3/6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 duration-200'
                        onClick={(e) => [handleRequest()]}>
                        REQUEST FARM LAND
                    </button>
                    {farms.map((farm) => (
                        farms.latitude === null || farm.longitude === null ? <div key={farm.id}></div> :

                            <Marker
                                key={farm.id}
                                position={{ lat: farm.lat, lng: farm.lng }}
                                title={`Owner: ${user.first_name}${user.middle_name ? ` ${user.middle_name}` : ''}${user.last_name ? ` ${user.last_name}` : ''}${user.suffix ? ` ${user.suffix}` : ''}\n`}
                                icon={"http://localhost:3000/currentMark.png"}

                            />
                    ))

                    }
                </Map>
            </APIProvider>

        </div>

    )
}

