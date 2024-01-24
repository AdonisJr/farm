import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';
import FindLocation from './FindLocation';

export default function FarmLandForm({ setSelected, setModal, selected, accessToken, setUpdate, update, farms }) {
    const [credentials, setCredentials] = useState({ lat: "", lng: "" });
    const [user, setUser] = useState([]);
    const [showFindLoc, setFindLoc] = useState(false);


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
    const handleSubmit = async (e) => {

        if (!credentials.user_id) return showErrorMessage("Error, Please select owner.")
        if (!credentials.lat) return showErrorMessage("Error, Latitude is required.")
        if (!credentials.lng) return showErrorMessage("Error, Longitude is required.")
        await axios
            .post(`/farm`, credentials, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                showSuccessMessage(res.data.message)
                setUpdate(!update)
                setTimeout(() => { setModal(false) }, 2000)
            }).catch(error => {
                showErrorMessage(error.response.data.error + error.response.data.message)
            })

    }

    const getUser = async () => {
        await axios
            .get(`/user?id=${user.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setUser(res.data.data)
            });

    };
    useEffect(() => {
        getUser();
    }, [selected])

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-20 outline-none focus:outline-none">
                <ToastContainer />
                {
                    showFindLoc ? <FindLocation setCredentials={setCredentials} credentials={credentials} setFindLoc={setFindLoc} farms={farms} /> : ""
                }
                <form className="relative w-4/6 my-6 mx-auto w-3xl z-30">
                    {/*content*/}
                    <div className="flex flex-col border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold">NEW FARM LAND</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex flex-col gap-4 p-6 flex-auto">
                            {/* First Row */}
                            <div className="flex flex-col gap-2 w-full">

                                <label className="ps-2">Owner</label>
                                <Select
                                    // options={userOpt}
                                    options={user.map(data => ({ label: data.first_name + " " + data.middle_name + " " + data.last_name + " " + data.suffix, value: data.id }))}
                                    onChange={(e) => setCredentials({ ...credentials, user_id: e.value })}
                                // defaultValue={{ label: credentials.gender, value: credentials.gender }}
                                />

                            </div>
                            {/*  */}
                            <div className='flex gap-2 items-center'>
                                <div className="flex flex-col w-5/12">
                                    <label className="ps-2">Latitude</label>
                                    <input
                                        type="text"
                                        placeholder="8.222376"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.lat}
                                        onChange={(e) => setCredentials({ ...credentials, lat: e.target.value })}
                                        disabled
                                    />
                                </div>
                                <div className="flex flex-col w-7/12">
                                    <label className="ps-2">Longitude</label>
                                    <div className='flex gap-2'>
                                        <input
                                            type="text"
                                            placeholder="125.990180"
                                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400 w-9/12"
                                            value={credentials.lng}
                                            onChange={(e) => setCredentials({ ...credentials, lng: e.target.value })}
                                            disabled
                                        />
                                        <p className='bg-teal-400 hover:bg-teal-500 text-white cursor-pointer w-3/12 text-center p-2 rounded-full duration-200' onClick={(e) => setFindLoc(true)}>Find Location</p>
                                    </div>

                                </div>
                            </div>

                            {/* Second Row */}
                            <div className="flex gap-2">
                                <div className="flex w-full flex-col">
                                    <label className="ps-2">Establish Date</label>
                                    <input
                                        type="date"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.establish_date}
                                        onChange={(e) => setCredentials({ ...credentials, establish_date: e.target.value })}
                                    />
                                </div>
                                <div className="flex w-full flex-col">
                                    <label className="ps-2">Lot Size (Hectar)</label>
                                    <input
                                        type="text"
                                        placeholder="1"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.lot_size}
                                        onChange={(e) => setCredentials({ ...credentials, lot_size: e.target.value })}
                                    />
                                </div>
                            </div>
                            {/* Third Row */}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleSubmit}
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='w-full h-full fixed top-0 left-0 bg-teal-900 z-10 opacity-50'>

            </div>
        </>

    )
}
