import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';

export default function ReqFarm({ user, polygonCoordinates, accessToken, setIsModalOpen }) {
    const [credentials, setCredentials] = useState({ user_id: user.id, polygon: polygonCoordinates, status: "PENDING" })

    const typeOpt = [
        { label: 'CORN', value: "CORN" },
        { label: 'RICE', value: "RICE" }
    ]

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

    const handleSubmit = async () => {

        if (!credentials.lot_size) return showErrorMessage("Error, Please lot size is required.")
        if (!credentials.establish_date) return showErrorMessage("Error, Please select establish date.")

        axios.post(`/farm`, credentials, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(async (res) => {
                showSuccessMessage(res.data.message)
                setTimeout(() => {
                    setCredentials({ ...credentials, lot_size: "", establish_date: "" })
                    setIsModalOpen(false);
                }, 2000)

            }).catch(error => {
                showErrorMessage(error.response.data.error + error.response.data.message)
            })
    }
    return (
        <>
            <div className='flex justify-center items-center absolute top-0 left-0 z-40 w-full h-full'>
                <ToastContainer />
                <div className='bg-white flex flex-col gap-3 relative p-5 w-4/6'>
                    <p className='text-2xl text-slate-600 py-2'>Request Farm Land Form</p>
                    <p className='absolute top-2 right-4 text-xl cursor-pointer text-red-500 hover:text-red-600 duration-200' onClick={(e) => setIsModalOpen(false)}>x</p>
                    <div>
                        <label className='ps-2'>Polygon Coordinates</label>
                        <div className='h-48 overflow-y-scroll border-2 border-slate-400 p-2 overflow-x-hidden'>
                            <pre>{JSON.stringify(polygonCoordinates, null, 2)}</pre>
                        </div>
                    </div>
                    <div className='flex gap-2 w-full'>
                        <div className="flex flex-col w-3/6">
                            <label className="ps-2">Lot Size (ha)</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.lot_size}
                                onChange={(e) => setCredentials({ ...credentials, lot_size: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col w-3/6">
                            <label className="ps-2">Established Date</label>
                            <input
                                type="date"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.establish_date}
                                onChange={(e) => setCredentials({ ...credentials, establish_date: e.target.value })}
                            />
                        </div>

                    </div>
                    <div className="flex flex-col w-full">
                        <label className="ps-2">Type</label>
                        <Select
                            options={typeOpt}
                            defaultValue={credentials.type}
                            onChange={(e) => setCredentials({ ...credentials, type: e.value })}
                        />
                    </div>
                    <div className='flex py-5 text-white items-center justify-center'>
                        <button className='px-5 w-5/6 py-1 bg-teal-500 hover:bg-teal-600 duration-200'
                        onClick={handleSubmit}>
                            SUBMIT REQUEST
                        </button>
                    </div>
                </div>

            </div>
            <div className='absolute w-full h-full top-0 left-0 bg-teal-600 opacity-30 z-30'>

            </div>
        </>
    )
}
