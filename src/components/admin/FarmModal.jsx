import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';

export default function FarmModal({ selected, getFarms, accessToken, setModalOpen, farms, clearSelected }) {
    const [credentials, setCredentials] = useState(selected);

    const farmOpt = farms.map(farm => ({
        value: farm.id,
        label: farm.id
    }))

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

    const statusOpt = [
        { label: 'PENDING', value: 'PENDING' },
        { label: 'PROCESSING', value: 'PROCESSING' },
        { label: 'APPROVED', value: 'APPROVED' },
        { label: 'CANCELED', value: 'CANCELED' },
    ]

    const handleSubmit = async () => {
        await axios
            .put(`/farm`, credentials, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(async (res) => {
                showSuccessMessage(res.data.message)
                getFarms();
                clearSelected();
                setTimeout(() => {
                    setModalOpen(false);
                }, 2000)

            }).catch(error => {
                showErrorMessage(error.response.data.error + error.response.data.message)
            })
    }
    return (
        <>
            <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center z-40'>
                <ToastContainer />
                <div className='flex flex-col gap-2 w-3/6 bg-white rounded-lg p-4'>
                    <p className='py-2 text-lg text-slate-600 font-semibold border-b-2 border-slate-200'>UPDATE FARM DETAILS</p>
                    {/* <div className='flex flex-col gap-2'>
                        <label className='ps-2'>Farm I.D</label>
                        <Select options={farmOpt} onChange={(e) => setCredentials({...credentials, farm_id: e.value})} value={{value: credentials.farm_id, label: credentials.farm_id}} />
                    </div> */}
                    <div className='flex gap-2'>
                        <div className="flex flex-col w-3/6">
                            <label className="ps-2">Farm I.D</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.id}
                                onChange={(e) => setCredentials({ ...credentials, area_planted: e.target.value })}
                                disabled
                            />

                        </div>
                        <div className="flex flex-col w-3/6">
                            <label className="ps-2">Owner</label>
                            <input
                                type="text"
                                placeholder="5000"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={`${credentials.first_name}${credentials.middle_name ? ` ${credentials.middle_name}` : ''}${credentials.last_name ? ` ${credentials.last_name}` : ''}${credentials.suffix ? ` ${credentials.suffix}` : ''}`}
                                onChange={(e) => setCredentials({ ...credentials, amount: e.target.value })}
                                disabled
                            />
                        </div>
                    </div>
                    <div className={`flex flex-col gap-2 w-full`}>

                        <div className="flex flex-col">
                            <label className="ps-2">Remarks</label>
                            <input
                                type="text"
                                placeholder="Remarks"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.remarks}
                                onChange={(e) => setCredentials({ ...credentials, remarks: e.target.value })}
                            />
                        </div>
                        <div className="flex w-full flex-col">
                            <label className="ps-2">Status</label>
                            <Select
                                options={statusOpt}
                                onChange={(e) => setCredentials({ ...credentials, status: e.value })}
                                defaultValue={{ label: credentials.status, value: credentials.status }}
                            />
                        </div>
                    </div>


                    <div className='flex justify-end gap-2 py-2'>
                        <button
                            className='text-red-600 py-1 px-2 hover:font-semibold duration-200'
                            onClick={(e) => [setModalOpen(false), clearSelected()]}>CLOSE</button>
                        <button className='py-1 px-2 bg-blue-500 text-white hover:bg-blue-600 duration-200'
                            onClick={handleSubmit}>SUBMIT
                        </button>
                    </div>
                </div>

            </div>
            <div className='w-full h-full absolute top-0 left-0 bg-teal-500 opacity-30'>

            </div>
        </>
    )
}
