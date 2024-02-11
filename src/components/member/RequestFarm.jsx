import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

export default function RequestFarm({ user, accessToken, credentials, setCredentials, setModalOpen }) {

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
                    <p className='py-2 text-lg text-slate-600 font-semibold border-b-2 border-slate-200'>REQUEST FARM LAND</p>
                    
                    <div className={``}>
                        <div className="flex flex-col">
                            <label className="ps-2">Latitude</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.lat}
                                onChange={(e) => setCredentials({ ...credentials, lat: e.target.value })}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ps-2">Longitude</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.lng}
                                onChange={(e) => setCredentials({ ...credentials, lng: e.target.value })}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="ps-2">Lot Size (ha)</label>
                            <input
                                type="text"
                                placeholder="1"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={credentials.lot_size}
                                onChange={(e) => setCredentials({ ...credentials, lot_size: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
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
