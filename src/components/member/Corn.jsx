import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Request from './Request';

export default function Corn({ user, accessToken, farms }) {
    const [subsidies, setSubsidies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState("");

    const getDate = (dateTime) => {
        const dateObj = new Date(dateTime);
        // Formatting date in words format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateInWords = dateObj.toLocaleDateString('en-US', options);
        return dateInWords;
      };

    const getSubsidies = async () => {
        await axios
            .get(`/subsidy/${user.id}?type=CORN`, {
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
                setSubsidies(res.data.data)
                setTotalPages(Math.ceil(res.data.totalCount / 5))
                console.log(res.data.data)
            });

    };

    useEffect(() => {
        getSubsidies();
    }, [currentPage, isCompleted])
    return (
        <div className='p-4 bg-white rounded-lg shadow-sm text-sm'>
            {
                !isModalOpen ? "" :
                    <Request type={type} user={user} accessToken={accessToken} setModalOpen={setModalOpen} farms={farms} getSubsidies={getSubsidies} />
            }
            <p className='font-bold text-lg text-slate-600 py-3'>CORN SEED DISTIBUTION SUBSIDY</p>
            <div className='flex justify-between px-5'>
                <div className='flex gap-2 py-2 cursor-pointer'>
                    <p>Filter: </p>
                    <input type='checkbox' className='cursor-pointer' onChange={(e) => setIsCompleted(e.target.checked)} />COMPLETED
                </div>
                <div>
                    <button className='py-1 px-2 bg-teal-500 text-white flex gap-1 items-center hover:bg-teal-600 duration-200'
                        onClick={(e) => [setModalOpen(true), setType("CORN")]}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                        Request</button>
                </div>
            </div>
            <table className='table-auto w-full'>
                <thead>
                    <tr className='bg-blue-100'>
                        <th className='p-2'>Farm ID</th>
                        <th>Area to be Planted (ha)</th>
                        <th>No. Of Bags</th>
                        <th>Variety</th>
                        <th>Date Received</th>
                        <th>Date Requested</th>
                        <th>Remarks</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !subsidies ? "" :
                            subsidies.map(subsidy => (
                                <tr className='text-center border-b-2 border-slate-200'>
                                    <td className='p-4'>{subsidy.farm_id}</td>
                                    <td>{subsidy.area_planted}</td>
                                    <td>{subsidy.number_bags}</td>
                                    <td>{subsidy.variety_received}</td>
                                    <td>{subsidy.received_date ? getDate(subsidy.received_date) : ''}</td>
                                    <td>{getDate(subsidy.created_at)}</td>
                                    <td>{subsidy.remarks}</td>
                                    <td className='p-4'><p className={`${subsidy.status === 'COMPLETED' ? 'bg-emerald-300' : 'bg-amber-300'}`}>{subsidy.status}</p></td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
            <div className='flex gap-2 justify-center py-5'>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button key={pageNumber} className={`rounded-full p-1 w-10 ${currentPage === pageNumber ? 'bg-slate-300' : ''}`} onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    )
}
