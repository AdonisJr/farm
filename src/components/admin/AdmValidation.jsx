import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdmValidationForm from './AdmValidationForm';

export default function AdmValidation({ user, accessToken }) {

    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [datas, setData] = useState([]);
    const [showForm, setShowForm] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [selectedImage, setSelectedImage] = useState("");
    const [selected, setSelected] = useState({})
    const [deleteSelected, setDeleteSelected] = useState();

    const getData = async () => {
        await axios
            .get(`/validation`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    page: currentPage,
                    limit: 5
                }
            })
            .then((res) => {
                setData(res.data.data)
                setTotalPages(Math.ceil(res.data.totalCount / 5))
                console.log(res.data.data)
            });
    };

    const handleDelete = async (e) =>{
        e.preventDefault();

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='relative bg-white flex flex-col gap-3 w-full p-5 h-5/6'>
            {
                !showForm ? "" :
                    <AdmValidationForm user={user} accessToken={accessToken} setShowForm={setShowForm} getData={getData} selected={selected} />
            }
            {/* {
                !showImage ? "" :
                    <DisplayImage selectedImage={selectedImage} setShowImage={setShowImage} />
            } */}
            <div className='flex justify-between pe-10'>
                <p className='text-lg font-bold text-slate-500'>RFFA VALIDATION FOR FARMERS ACCROSS TRENTO AGUSAN DEL SUR</p>
                <button className='py-1 px-2 bg-teal-500 text-white flex gap-1 items-center hover:bg-teal-600 duration-200'
                    onClick={(e) => setShowForm(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                    </svg>
                    Request
                </button>
            </div>
            <table className='text-xs relative'>
                <thead>
                    <tr className='bg-blue-50'>
                        <th className='p-1'>Reference Number</th>
                        <th className='p-1'>Name</th>
                        <th className='p-1'>ID Number</th>
                        <th className='p-1'>Valid ID</th>
                        <th className='p-1'>Purok</th>
                        <th className='p-1'>Barangay</th>
                        <th className='p-1'>Birth Date</th>
                        <th className='p-1'>Place of Birth</th>
                        <th className='p-1'>Contact No.</th>
                        <th className='p-1'>Nationality</th>
                        <th className='p-1'>Source of Income</th>
                        <th className='p-1'>Mothers Maiden Name</th>
                        <th className='p-1'>No. Parcel</th>
                        <th className='p-1'>Total Farm Area (ha)</th>
                        <th className='p-1'>Requested Date</th>
                        <th className='p-1'>Status</th>
                        <th className='p-1'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datas.map(data => (
                            <tr className='text-center border-b-2 border-slate-200 hover:bg-slate-50'>
                                <td className='p-1'>{data.id}</td>
                                <td className='p-1'>{data.first_name + " " + data.middle_name + " " + data.last_name}</td>
                                <td className='p-1'>{data.user_id}</td>
                                <td className='p-1 cursor-pointer' onClick={(e) => [setShowImage(true), setSelectedImage(data.valid_id)]}>
                                    <img src={`data:image/jpeg;base64,${data.valid_id}`} className='w-32' />
                                </td>
                                <td className='p-1'>{data.purok}</td>
                                <td className='p-1'>{data.barangay}</td>
                                <td className='p-1'>{data.birth_date}</td>
                                <td className='p-1'>{data.birth_place}</td>
                                <td className='p-1'>{data.phone_number}</td>
                                <td className='p-1'>{data.nationality}</td>
                                <td className='p-1'>{data.source_income}</td>
                                <td className='p-1'>{data.mother_name}</td>
                                <td className='p-1'>{data.no_parcel}</td>
                                <td className='p-1'>{data.lot_size}</td>
                                <td className='p-1'>{data.created_at}</td>
                                <td className='p-1'>{data.status}</td>
                                <td className='flex flex-col gap-2 p-2'>
                                    <div className='flex gap-1 items-center cursor-pointer hover:underline'
                                        onClick={(e) => [setSelected(data), setShowForm(true)]}>
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
                                    <div className='flex items-center cursor-pointer gap-1 hover:underline'
                                        onClick={(e) => [handleDelete(), setDeleteSelected(data.id)]}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-trash2-fill text-red-500 cursor-pointer"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                        </svg>
                                        Delete
                                    </div>

                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
