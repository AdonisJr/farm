import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SubModal from './SubModal';
// import Request from './Request';

export default function AdmRice({ user, accessToken, farms }) {
    const [subsidies, setSubsidies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [q, setQ] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [type, setType] = useState("");
    const [selected, setSelected] = useState("");

    const getDate = (dateTime) => {
        const dateObj = new Date(dateTime);
        // Formatting date in words format
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateInWords = dateObj.toLocaleDateString('en-US', options);
        return dateInWords;
      };

    const getSubsidies = async () => {
        await axios
            .get(`/subsidy?type=RCEF RICE SEED DISTIBUTION&q=${q}`, {
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
            });

    };

    useEffect(() => {
        getSubsidies();
    }, [currentPage, isCompleted, q])
    return (
        <div className='p-4 bg-white rounded-lg shadow-sm text-sm'>
            {
                !isModalOpen ? "" :
                    <SubModal type={type} user={user} accessToken={accessToken} setModalOpen={setModalOpen} selected={selected} getSubsidies={getSubsidies} />
            }
            <p className='font-bold text-lg text-slate-600 py-3'>RCEF RICE SEED DISTIBUTION SUBSIDY</p>
            <div className='flex items-center px-5 pb-2'>
                <div className='flex gap-2 py-2 cursor-pointer'>
                    <p>Filter: </p>
                    <input type='checkbox' className='cursor-pointer' onChange={(e) => setIsCompleted(e.target.checked)} />COMPLETED <span className='text-slate-300'>|</span>
                </div>
                <div className="flex items-center gap-2 w-3/6">
                    <label className="ps-2">Search</label>
                    <input
                        type="text"
                        placeholder="Name, Barangay"
                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-5/6"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>
            </div>
            <table className='table-auto w-full text-xs'>
                <thead>
                    <tr className='bg-blue-100'>
                        <th className='p-2'>Farm ID</th>
                        <th>Owner</th>
                        <th>Area to be Planted (ha)</th>
                        <th>Barangay</th>
                        <th>No. of Bags</th>
                        <th>Variety</th>
                        <th>Requested Date</th>
                        <th>Received Date</th>
                        <th>Remarks</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !subsidies ? "" :
                            subsidies.map(subsidy => (
                                <tr className='text-center border-b-2 border-slate-200 hover:bg-slate-100 duration-200'>
                                    <td className='p-4'>{subsidy.farm_id}</td>
                                    <td>{`${subsidy.first_name}${subsidy.middle_name ? ` ${subsidy.middle_name}` : ''}${subsidy.last_name ? ` ${subsidy.last_name}` : ''}${subsidy.suffix ? ` ${subsidy.suffix}` : ''}`}</td>
                                    <td>{subsidy.area_planted}</td>
                                    <td>{subsidy.barangay}</td>
                                    <td>{subsidy.no_bags}</td>
                                    <td>{subsidy.variety}</td>
                                    <td>{getDate(subsidy.created_at)}</td>
                                    <td>{getDate(subsidy.received_date)}</td>
                                    <td>{subsidy.remarks}</td>
                                    <td className='p-4'><p className={`${subsidy.status === 'COMPLETED' ? 'bg-emerald-300' : subsidy.status === 'CANCELED' ? 'bg-red-400' : 'bg-amber-300'}`}>{subsidy.status}</p></td>
                                    <td>
                                        <div className='flex gap-1 items-center cursor-pointer hover:underline'
                                            onClick={(e) => [setModalOpen(true), setSelected(subsidy)]}
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
                    <button key={pageNumber} className={`rounded-full text-sm p-1 w-10 ${currentPage === pageNumber ? 'bg-slate-200 font-bold' : ''} hover:underline hover:font-bold`} onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    )
}
