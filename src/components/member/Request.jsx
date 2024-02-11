import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from 'react-select';

export default function Request({ type, user, accessToken, setModalOpen, farms, getSubsidies }) {
    const [credentials, setCredentials] = useState({ type: type, user_id: user.id });

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

    const handleSubmit = async () => {

        if (!credentials.farm_id) return showErrorMessage("Error, Please select farm.")
        if (!credentials.area_planted) return showErrorMessage("Error, Area to be planted is required.")
        if (credentials.type === 'CASH') {
            if (!credentials.amount) return showErrorMessage("Error, Amount is required.")
        } else if (credentials.type === 'RCEF RICE SEED DISTIBUTION') {
            if (!credentials.number_bags) return showErrorMessage("Error, Number of Bags is required.")
        } else {
            if (!credentials.quantity_received) return showErrorMessage("Error, Quantity is required.")
        }
        await axios
            .post(`/subsidy`, credentials, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then(async (res) => {
                showSuccessMessage(res.data.message)
                getSubsidies();
                setTimeout(() => {
                    setModalOpen(false);
                }, 2000)

            }).catch(error => {
                console.log(error)
                // showErrorMessage(error.response.data.error + error.response.data.message)
            })
    }
    return (
        <>
            <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center z-40'>
                <ToastContainer />
                <div className='flex flex-col gap-2 w-2/6 bg-white rounded-lg p-4'>
                    <p className='py-2 text-lg text-slate-600 font-semibold border-b-2 border-slate-200'>REQUEST {type} SUBSIDY</p>
                    <div className='flex flex-col gap-2'>
                        <label className='ps-2'>Farm I.D</label>
                        <Select options={farmOpt} onChange={(e) => setCredentials({...credentials, farm_id: e.value})} value={{value: credentials.farm_id, label: credentials.farm_id}} />
                    </div>

                    <div className={`flex flex-col gap-2 w-full ${credentials.type !== 'CASH' ? 'hidden' : ''}`}>
                        <div className="flex flex-col">
                            <label className="ps-2">Area to be Planted (ha)</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.area_planted}
                                onChange={(e) => setCredentials({ ...credentials, area_planted: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ps-2">Amount</label>
                            <input
                                type="text"
                                placeholder="5000"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.amount}
                                onChange={(e) => setCredentials({ ...credentials, amount: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* RICESEED */}
                    <div className={`flex flex-col gap-2 w-full ${credentials.type !== 'RCEF RICE SEED DISTIBUTION' ? 'hidden' : ''}`}>
                        <div className="flex flex-col">
                            <label className="ps-2">Area to be Planted (ha)</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.area_planted}
                                onChange={(e) => setCredentials({ ...credentials, area_planted: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ps-2">Number of Bags</label>
                            <input
                                type="number"
                                placeholder="2"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.number_bags}
                                onChange={(e) => setCredentials({ ...credentials, number_bags: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="ps-2">Variety Received</label>
                            <input
                                type="text"
                                placeholder="480"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.variety_received}
                                onChange={(e) => setCredentials({ ...credentials, variety_received: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* BIO-N ETC */}
                    <div className={`${credentials.type === 'CASH' || credentials.type === 'RCEF RICE SEED DISTIBUTION' ? 'hidden' : ''}`}>
                        <div className="flex flex-col">
                            <label className="ps-2">Area to be Planted (ha)</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.area_planted}
                                onChange={(e) => setCredentials({ ...credentials, area_planted: e.target.value })}
                            />
                        </div>
                        <div className={`flex flex-col`}>
                            <label className="ps-2">Type</label>
                            <input
                                type="text"
                                placeholder="Taylor"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.type}
                                disabled
                            />
                        </div>

                        <div className="flex gap-2 flex-col">
                            <label className="ps-2">Quantity (g)</label>
                            <input
                                type="number"
                                placeholder="400"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.quantity_received}
                                onChange={(e) => setCredentials({ ...credentials, quantity_received: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='flex justify-end gap-2 py-2'>
                        <button
                            className='text-red-600 py-1 px-2 hover:font-semibold duration-200'
                            onClick={(e) => setModalOpen(false)}>CLOSE</button>
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
