import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import SubsidyDistribution from './SubsidyDistribution';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubsidyModal({ selected, setModal, accessToken }) {
    const [filter, setFilter] = useState({ subsidy: "ALL" });
    const [distributeModal, setDistributeModal] = useState(false);
    const [update, setUpdate] = useState(false);
    const [subsidies, setSubsidies] = useState([]);
    const [selectedSubsidy, setSelectedSubsidy] = useState([]);
    const [credentials, setCredentials] = useState([]);

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

    const typeOpt = [
        { label: 'ALL', value: 'ALL' },
        { label: 'RCEF RICE SEED DISTIBUTION', value: 'RCEF RICE SEED DISTIBUTION' },
        { label: 'CASH', value: 'CASH' },
        { label: 'RODENTICIDE', value: 'RODENTICIDE' },
        { label: 'LIQUID ZINC', value: 'LIQUID ZINC' },
        { label: 'FUNGICIDE', value: 'FUNGICIDE' },
        { label: 'BIO-N', value: 'BIO-N' },
    ]

    const statusOpt = [
        { label: "PENDING", value: "PENDING" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "REJECTED", value: "REJECTED" },
        { label: "PROCESSING", value: "PROCESSING" },
        { label: "COMPLETED", value: "COMPLETED" },
    ]

    const monthOpt = [
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'August', value: 'August' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' }
    ]
    // const yearOpt = Array.from({ length: 2051 - 2023 }, (_, index) => ({ label: (2023 + index).toString(), value: 2023 + index }));
    const yearOpt = Array.from({ length: 2051 - 2023 }, (_, index) => ({ label: ` ${2023 + index}`, value: 2023 + index }));

    const getSubsidy = async () => {
        await axios
            .get(`/subsidy?user_id=${selected.user_id}&type=${filter.type}&month=${filter.month}&year=${filter.year}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSubsidies(res.data.data)
            });

    };

    const handleDelete = async (id) => {
        const isConfirm = window.confirm("Are you sure you wan't to delete this item?")

        if (isConfirm) {
            await axios
                .delete(`/subsidy?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    showSuccessMessage(res.data.message)
                    getSubsidy();
                    setTimeout(() => {
                    }, 2000)
                }).catch(error => {
                    showErrorMessage(error.response.data.error + error.response.data.message)
                })
        }
    }

    useEffect(() => {
        getSubsidy();
    }, [update, filter])

    return (
        <>
            <div className='w-full flex flex-col gap-2 h-full absolute top-0 left-0 bg-white p-5 overflow-x-scroll'>
                <ToastContainer />
                {
                    !distributeModal ? "" : <SubsidyDistribution selectedSubsidy={selectedSubsidy} setSelectedSubsidy={setSelectedSubsidy} setDistributeModal={setDistributeModal} update={update} setUpdate={setUpdate} selected={selected} accessToken={accessToken} />
                }
                <p className='text-2xl absolute top-3 right-10 cursor-pointer' onClick={(e) => setModal(false)}>x</p>
                <p className='text-xl font-bold border-b-2 border-slate-200 p-2'>Distribution of Subsidies</p>
                <div className='flex w-full items-center gap-5 border-b-2 border-slate-50 p-5'>
                    <p className='font-bold text-xl'>Filter:</p>
                    <div className='w-2/6'>
                        <label className='ps-2'>
                            Subsidies
                        </label>
                        <Select
                            options={typeOpt}
                            className='w-full'
                            onChange={(e) => setFilter({ ...filter, type: e.value })}
                            value={{ label: filter.type, value: filter.type }}
                        />
                    </div>
                    <div className='flex w-3/6 gap-2'>
                        <div className='w-2/6'>
                            <label className='ps-2'>
                                Month
                            </label>
                            <div className='flex gap-2'>
                                <Select
                                    options={monthOpt}
                                    className='w-full'
                                    onChange={(e) => setFilter({ ...filter, month: e.value })}
                                    value={{ label: filter.month, value: filter.month }}
                                />

                            </div>
                        </div>

                        <div className='flex flex-col w-3/6'>
                            <label className='ps-2'>
                                Year
                            </label>
                            <div className='flex gap-2'>
                                <Select
                                    options={yearOpt}
                                    className='w-4/6'
                                    onChange={(e) => setFilter({ ...filter, year: e.value })}
                                    value={{ label: filter.year, value: filter.year }}
                                />
                                <button className='bg-blue-500 text-white font-bold hover:bg-blue-600 rounded-lg duration-200 w-2/6'>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 p-2 border-b-2 border-slate-50'>
                    <p>Owner : <span className='font-bold'>{`${selected.first_name}${selected.middle_name ? ` ${selected.middle_name}` : ''}${selected.last_name ? ` ${selected.last_name}` : ''}${selected.suffix ? ` ${selected.suffix}` : ''}`}</span></p>
                    <p>Barangay : <span className='font-bold'>{selected.barangay}</span></p>
                    <p>
                        Lot Size: <span className='font-bold underline'>{selected.lot_size } </span>
                         Latitude : <span className='font-bold underline'>{selected.lat} </span>
                         Longitude : <span className='font-bold underline'>{selected.lng} </span>
                    </p>
                    <button className='p-2 w-2/6 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 duration-200' onClick={(e) => setDistributeModal(true)}>Distrubute Subsidy</button>
                </div>
                <table>
                    <thead className='bg-blue-50'>
                        <tr>
                            <th className='p-5'>Farm ID</th>
                            <th>Type</th>
                            <th>Area to be Planted (ha)</th>
                            <th>Amount</th>
                            <th>No. of Bags</th>
                            <th>Variety Received</th>
                            <th>Quantity Received</th>
                            <th>Date Received</th>
                            <th>Remarks</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !subsidies ? "" :
                                subsidies.map(subsidy => (
                                    <tr className='text-center cursor-pointer hover:bg-emerald-50'>
                                        <td className='p-2'>{subsidy.id}</td>
                                        {/* <td>{`${subsidy.first_name}${subsidy.middle_name ? ` ${subsidy.middle_name}` : ''}${subsidy.last_name ? ` ${subsidy.last_name}` : ''}${subsidy.suffix ? ` ${subsidy.suffix}` : ''}`}</td> */}
                                        <td>{subsidy.type}</td>
                                        <td>{subsidy.area_planted}</td>
                                        <td>{subsidy.amount}</td>
                                        <td>{subsidy.number_bags}</td>
                                        <td>{subsidy.variety_received}</td>
                                        <td>{subsidy.quantity_received}</td>
                                        <td>{subsidy.month + ", " + subsidy.year}</td>
                                        <td>{subsidy.remarks}</td>
                                        <td>{subsidy.status}</td>
                                        <td className='flex flex-col gap-2 p-2'>
                                            <div className='flex gap-1 items-center cursor-pointer hover:underline'
                                                onClick={(e) => [setSelectedSubsidy(subsidy), setDistributeModal(true)]}>
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
                                                onClick={(e) => handleDelete(subsidy.id)}>
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
            {/* <div className='w-full h-full fixed top-0 left-0 bg-indigo-900 z-40 opacity-10'>

            </div> */}
        </>
    )
}
