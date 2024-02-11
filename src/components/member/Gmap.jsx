import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';


export default function Gmap({ selected, farms, user, setShowMap, isAdmin, clearSelected }) {

    const currentPosition = {
        lat: 8.044897231351126,
        lng: 126.21871469053765,
    };
    const [markers, setMarkers] = useState([]);
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

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
        <>
            <div className='flex justify-center items-center absolute top-0 left-0 w-full h-full z-50'>
                <APIProvider apiKey={apiKey}>
                    <div className='w-4/6 h-5/6 bg-white rounded-lg p-5 relative'>
                        <Map center={currentPosition} zoom={15} mapId={"73ea4a8d7bc51562"} className='h-full'>
                            <Marker
                                key={user.id}
                                position={{ lat: selected.lat, lng: selected.lng }}
                                title={`Owner: ${selected.first_name}${selected.middle_name ? ` ${selected.middle_name}` : ''}${selected.last_name ? ` ${selected.last_name}` : ''}${selected.suffix ? ` ${selected.suffix}` : ''}\n Status: ${selected.status}\n Lot Size (ha): ${selected.lot_size}`}
                                icon = {`${selected.status === 'APPROVED' ? 'http://localhost:3000/currentMark.png' : ''}`}
                            />
                        </Map>
                        <div className='absolute top-8 right-20 text-2xl bg-white w-8 h-8 rounded-full text-center flex justify-center items-center cursor-pointer'
                            // onClick={`${!isAdmin ? '(e) => setShowMap(false)' : '(e) =>[setShowMap(false), setFarm("")]' }`}
                            onClick={!isAdmin ? (e) => setShowMap(false) : (e) => [ setShowMap(false), clearSelected() ]}

                        >

                            <span className='text-red-400'>X</span>
                        </div>
                    </div>
                </APIProvider>

            </div>
            <div className='w-full h-full fixed top-0 left-0 bg-emerald-900 z-40 opacity-40'>

            </div>
        </>


    )
}