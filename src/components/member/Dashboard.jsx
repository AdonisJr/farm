import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gmap from './Gmap';
import MainMap from './MainMap';
import MapWithPolygon from './MapWithPolygon';

export default function Dashboard({ accessToken, user, farms }) {
    const [showMap, setShowMap] = useState(false);
    const [location, setLocation] = useState({})
    const [credentials, setCredentials] = useState({ user_id: user.id, status: "PENDING" })
    

    return (
        <div className='bg-white p-5 rounded-lg shadow-lg flex flex-col'>
            {
                !farms[0] ? "" :
                    <p className='text-lg text-slate-500 font-bold'>FARM LIST</p>
            }
            {
                !farms ? "" :
                    farms.map(farm => (
                        <div className='bg-slate-50 p-4 text-sm'>
                            <p className='flex gap-2 items-center'>
                                Farm ID: <span className='font-semibold underline text-lg'> {farm.id} </span>
                                Latitude: <span className='font-semibold underline text-lg'> {farm.lat} </span>
                                Longitude: <span className='font-semibold underline text-lg'> {farm.lng} </span>
                                Farm Size (ha): <span className='font-semibold underline text-lg'> {farm.lot_size} </span>

                            </p>
                        </div>
                    ))
            }

            <div>
                {/* <MainMap farms={farms} user={user} setCredentials={setCredentials} credentials={credentials} accessToken={accessToken} /> */}
                <MapWithPolygon user={user} accessToken={accessToken} farms={farms} />
            </div>
        </div>
    )
}
