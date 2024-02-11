import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemForm from './MemForm';
import MemTable from './MemTable';

export default function Mem({ accessToken, user }) {
    const [member, setMember] = useState([]);
    const [isModalOpen, setModal] = useState(false);
    const [selected, setSelected] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [q, setQ] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    // GET FUNCTION
    const getMember = async () => {
        await axios
            .get(`/user?id=${user.id}&q=${q}`, {
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
                setMember(res.data.data)
                setTotalPages(Math.ceil(res.data.totalCount / 5))
            });

    };
    useEffect(() => {
        getMember();
    }, [selected, currentPage, q, isCompleted])
    return (
        <div className='flex flex-col gap-5 w-full bg-white p-2 text-sm'>

            <div>
                {
                    !isModalOpen ? <></> :
                        <MemForm setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken} />
                }
            </div>

            <div className='w-full p-2 bg-'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center w-5/6 px-5 pb-2'>
                        <div className="flex items-center gap-2 w-3/6">
                            <label className="ps-2">Search</label>
                            <input
                                type="text"
                                placeholder="Name, Email, Barangay"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-5/6"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className='flex gap-1 items-center py-1 px-4 rounded-md bg-blue-400 text-white hover:bg-blue-500 hover:font-bold duration-200'
                        onClick={(e) => setModal(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                        ADD NEW
                    </button>
                </div>

                <MemTable member={member} setModal={setModal} setSelected={setSelected} selected={selected} accessToken={accessToken} />
            </div>
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
