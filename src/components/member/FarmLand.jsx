import React, { useState, useEffect } from 'react';
import GoogleMap from './GoogleMap';
import FarmLandForm from './FarmLandForm';
import axios from 'axios';

export default function FarmLand({ currentLocation, accessToken }) {
    const [modal, setModal] = useState(false);
    const [farms, setFarms] = useState([]);
    const [update, setUpdate] = useState(false);
    const googleApi = process.env.REACT_APP_GOOGLE_API_KEY;

    const getFarms = async () => {
        await axios
            .get(`/farm`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setFarms(res.data.data)
            });

    };

    useEffect(()=>{
        getFarms();
    },[update])

    return (
        <div className='w-full bg-white p-2 me-5'>
            {
                modal ? <FarmLandForm accessToken={accessToken} setModal={setModal} setUpdate={setUpdate} update={update} farms={farms} /> : ""
            }
            <div className=' border-b-2 border-slate-200 p-5'>
                <button className='bg-teal-500 p-2 w-2/6 hover:bg-teal-600 rounded-lg text-white font-bold duration-200' onClick={(e) => setModal(true)}>ADD FARM</button>
            </div>
            <GoogleMap currentLocation={currentLocation} apiKey={googleApi} farms={farms} setUpdate={setUpdate} update={update} />
        </div>
    )
}
