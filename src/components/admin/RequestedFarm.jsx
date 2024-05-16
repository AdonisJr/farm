import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gmap from '../member/Gmap';
import FarmModal from './FarmModal';
import GmapWithPolygon from './GmapWithPolygon';
import GmapViewAdmin from './GmapViewAdmin';

export default function RequestedFarm({ user, accessToken }) {
    const [farms, setFarms] = useState([]);
    const [selected, setSelected] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [q, setQ] = useState("");


    const clearSelected = () => {
        setSelected("")
    }

    const getFarms = async () => {
        await axios
            .get(`/farm/list?q=${q}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    limit: 5,
                    isCompleted: isCompleted
                }
            })
            .then((res) => {
                setFarms(res.data.data)
                setTotalPages(Math.ceil(res.data.totalCount / 5))
                console.log(res.data.data)
            });

    };

    useEffect(() => {
        getFarms();
        // console.log(farms)
        // farms.map(data => {
        //     if (data.polygon) {
        //         let polygonArray = JSON.parse(data.polygon);
        //         polygonArray.forEach(point => {
        //             console.log("Latitude:", point.lat);
        //             console.log("Longitude:", point.lng);
        //         });
        //     }

        // })
        // Now polygonArray is an array of objects
        // You can access each object's properties like this

    }, [currentPage, isCompleted, q])
    return (
        <div className='p-4 bg-white rounded-lg shadow-sm text-sm'>
            {
                !showMap ? "" :
                    <GmapViewAdmin user={user} accessToken={accessToken} setShowMap={setShowMap} selected={selected} isAdmin={true} clearSelected={clearSelected} />
            }
            {
                !isModalOpen ? "" :
                    <FarmModal user={user} accessToken={accessToken} selected={selected} setModalOpen={setModalOpen} getFarms={getFarms} farms={farms} clearSelected={clearSelected} />

            }
            <p className='font-bold text-lg text-slate-600 py-3'>REQUESTED FARM LAND</p>
            <div className='flex justify-between px-5'>
                <div className='flex items-center gap-2 py-2 cursor-pointer w-full'>
                    <p>Filter: </p>
                    <input type='checkbox' className='cursor-pointer' onChange={(e) => setIsCompleted(e.target.checked)} />APPROVED <span className='text-slate-400'>|</span>
                    <div className="flex gap-2 items-center w-3/6">
                        <label className="ps-2">Search</label>
                        <input
                            type="text"
                            placeholder="Name, Barangay"
                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-full"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    {/* <button className='py-1 px-2 bg-teal-500 text-white flex gap-1 items-center hover:bg-teal-600 duration-200'
                        onClick={(e) => [setModalOpen(true), setType("CASH")]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                        Request
                    </button> */}
                </div>
            </div>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='bg-blue-100'>
                        <th className='p-2'>Farm ID</th>
                        <th>Owner</th>
                        <th>Lot Size (ha)</th>
                        <th>Date Established</th>
                        <th>Brgy.</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Visual</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !farms ? "" :
                            farms.map(farm => (
                                <tr className={`text-center border-b-2 border-slate-200 hover:bg-slate-100 ${selected.id === farm.id ? 'bg-teal-200' : ''}`}>
                                    <td className='p-4'>{farm.id}</td>
                                    <td>{`${farm.first_name}${farm.middle_name ? ` ${farm.middle_name}` : ''}${farm.last_name ? ` ${farm.last_name}` : ''}${farm.suffix ? ` ${farm.suffix}` : ''}`}</td>
                                    <td>{farm.lot_size}</td>
                                    <td>{farm.establish_date}</td>
                                    <td>{farm.barangay}</td>
                                    <td>{farm.remarks}</td>
                                    <td className='p-4'><p className={`${farm.status === 'APPROVED' ? 'bg-emerald-300' : farm.status === 'CANCELED' ? 'bg-red-300' : 'bg-amber-300'}`}>{farm.status}</p></td>
                                    <td className='p-2 pe-2'>
                                        <button className='flex gap-1 items-center bg-blue-500 py-1 text-white px-2 hover:bg-blue-600 rounded-lg duration-200'
                                            onClick={(e) => [setShowMap(true), setSelected(farm)]}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                            </svg>
                                            View
                                        </button>
                                    </td>
                                    <td>
                                        <div className='flex gap-1 items-center cursor-pointer hover:underline'
                                            onClick={(e) => [setModalOpen(true), setSelected(farm)]}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-pencil-fill text-emerald-500 cursor-pointer"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                            </svg>
                                            Edit
                                        </div>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <div className='flex gap-2 justify-center py-5'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button key={pageNumber} className={`rounded-full text-sm p-1 w-10 ${currentPage === pageNumber ? 'bg-slate-300' : ''}`} onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    )
}
