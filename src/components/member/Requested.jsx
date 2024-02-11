import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Gmap from './Gmap';

export default function Requested({ user, accessToken }) {
    const [showMap, setShowMap] = useState(false);
    const [farms, setFarms] = useState([]);
    const [farm, setFarm] = useState({});
    const getFarm = async () => {
        await axios
            .get(`/farm/${user.id}?status=PENDING`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setFarms(res.data.data);
            });
    }

    useEffect(() => {
        getFarm();
    }, [])
    return (
        <div className='w-full flex flex-col gap-2 rounded-lg bg-white p-4 text-sm'>
        {
            !showMap ? "" :
            <Gmap selected={farm} user={user} accessToken={accessToken} setShowMap={setShowMap} />
        }
            <p className='font-bold text-lg text-slate-600 py-3'>REQUESTED FARM LAND</p>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='bg-blue-100'>
                        <th className='p-2'>Farm ID</th>
                        <th>Lot Size (ha)</th>
                        <th>Latitude</th>
                        <th>Longitudes</th>
                        <th>Established Date</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Visual</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !farms ? "" :
                            farms.map(farm => (
                                <tr className='text-center border-b-2 border-slate-200'>
                                    <td className='p-4'>{farm.id}</td>
                                    <td>{farm.lot_size}</td>
                                    <td>{farm.lat}</td>
                                    <td>{farm.lng}</td>
                                    <td>{farm.establish_date}</td>
                                    <td>{farm.remarks}</td>
                                    <td className='p-4'><p className={`${farm.status === 'COMPLETED' ? 'bg-emerald-300' : farm.status === 'CANCELED' ? 'bg-red-300' : 'bg-amber-300'}`}>{farm.status}</p></td>
                                    <td>
                                        <button className='flex gap-1 items-center bg-blue-500 py-1 text-white px-2 hover:bg-blue-600 rounded-lg duration-200'
                                        onClick={(e) => [setShowMap(true), setFarm(farm)]}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}
