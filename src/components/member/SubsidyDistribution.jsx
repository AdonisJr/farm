import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';

export default function SubsidyDistribution({ selectedSubsidy, setSelectedSubsidy, setDistributeModal, selected, update, setUpdate, accessToken }) {
    const [credentials, setCredentials] = useState(selectedSubsidy.id ? selectedSubsidy : { status: 'PENDING', type: 'RCEF RICE SEED DISTIBUTION', farm_id: selected.id, user_id: selected.user_id, email: selected.email });

    const typeOpt = [
        { label: 'RCEF RICE SEED DISTIBUTION', value: 'RCEF RICE SEED DISTIBUTION' },
        { label: 'CASH', value: 'CASH' },
        { label: 'RODENTICIDE', value: 'RODENTICIDE' },
        { label: 'LIQUID ZINC', value: 'LIQUID ZINC' },
        { label: 'FUNGICIDE', value: 'FUNGICIDE' },
        { label: 'BIO-N', value: 'BIO-N' },
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
    const yearOpt = Array.from({ length: 2051 - 2023 }, (_, index) => ({ label: (2010 + index).toString(), value: 2010 + index }));

    const statusOpt = [
        { label: "PENDING", value: "PENDING" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "REJECTED", value: "REJECTED" },
        { label: "PROCESSING", value: "PROCESSING" },
        { label: "COMPLETED", value: "COMPLETED" },
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credentials.month) return showErrorMessage("Error, Please select month.");
        if (!credentials.year) return showErrorMessage("Error, Please select year.");
        !selectedSubsidy.id ?
            await axios
                .post(`/subsidy`, credentials, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then(async(res) => {
                    showSuccessMessage(res.data.message)
                    await axios.post("sendEmail", {to: selected.email, first_name: selected.first_name, last_name: selected.last_name, middle_name: selected.middle_name, type: credentials.type, status: credentials.status}).then(res =>{console.log(res)})
                    setTimeout(() => {
                        setDistributeModal(false);
                        setUpdate(!update)
                    }, 2000)

                }).catch(error => {
                    showErrorMessage(error.response.data.error + error.response.data.message)
                }) :
            await axios
                .put(`/subsidy?id=${selectedSubsidy.id}`, credentials, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((res) => {
                    showSuccessMessage(res.data.message)
                    setTimeout(() => {
                        setDistributeModal(false);
                        setUpdate(!update)
                    }, 2000)

                }).catch(error => {
                    showErrorMessage(error.response.data.error + error.response.data.message)
                })
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <ToastContainer />
                <form className="relative my-6 mx-auto w-4/6">
                    {/*content*/}
                    <div className="flex flex-col border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold"> Distrubute Subsidy Form {!selectedSubsidy.id ? '(ADD)' : '(UPDATE)'}</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={(e) => setDistributeModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex flex-col gap-4 p-6 flex-auto">
                            {/* First Row */}
                            <div className="flex gap-2 w-full">
                                <div className="flex flex-col w-4/12">
                                    <label className="ps-2">Subsidy</label>
                                    <Select
                                        options={typeOpt}
                                        className='w-full'
                                        onChange={(e) => setCredentials({ ...credentials, type: e.value })}
                                        value={{ label: credentials.type, value: credentials.type }}
                                        isDisabled={selectedSubsidy.id}
                                    />
                                </div>
                                <div className="flex flex-col w-4/12">
                                    <label className="ps-2">Month</label>
                                    <Select
                                        options={monthOpt}
                                        className='w-full'
                                        onChange={(e) => setCredentials({ ...credentials, month: e.value })}
                                        value={{ label: credentials.month, value: credentials.month }}
                                    />
                                </div>

                                <div className="flex flex-col w-4/12">
                                    <label className="ps-2">Year</label>
                                    <Select
                                        options={yearOpt}
                                        className='w-full'
                                        onChange={(e) => setCredentials({ ...credentials, year: e.value })}
                                        value={{ label: credentials.year, value: credentials.year }}
                                    />
                                </div>
                            </div>
                            {/* CASH */}
                            <div className={`flex gap-2 w-full ${credentials.type !== 'CASH' ? 'hidden' : ''}`}>
                                <div className="flex flex-col w-6/12">
                                    <label className="ps-2">Area to be Planted (ha)</label>
                                    <input
                                        type="text"
                                        placeholder="1"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.area_planted}
                                        onChange={(e) => setCredentials({ ...credentials, area_planted: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col w-6/12">
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
                            {/* LIQUID ZING ETC. */}
                            <div className={`flex gap-2 w-full ${!['RODENTICIDE', 'LIQUID ZINC', 'FUNGICIDE', 'BIO-N'].includes(credentials.type) ? 'hidden' : ''}`}>
                                <div className="flex flex-col w-6/12">
                                    <label className="ps-2">Area to be Planted (ha)</label>
                                    <input
                                        type="text"
                                        placeholder="1"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.area_planted}
                                        onChange={(e) => setCredentials({ ...credentials, area_planted: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col w-6/12">
                                    <label className="ps-2">Quantity Received (g)</label>
                                    <input
                                        type="number"
                                        placeholder="30"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.quantity_received}
                                        onChange={(e) => setCredentials({ ...credentials, quantity_received: e.target.value })}
                                    />
                                </div>
                            </div>
                            {/* RICESEED */}
                            <div className={`flex gap-2 w-full ${credentials.type !== 'RCEF RICE SEED DISTIBUTION' ? 'hidden' : ''}`}>
                                <div className="flex flex-col w-4/12">
                                    <label className="ps-2">Area to be Planted (ha)</label>
                                    <input
                                        type="text"
                                        placeholder="1"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.area_planted}
                                        onChange={(e) => setCredentials({ ...credentials, area_planted: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col w-4/12">
                                    <label className="ps-2">Number of Bags</label>
                                    <input
                                        type="number"
                                        placeholder="2"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.number_bags}
                                        onChange={(e) => setCredentials({ ...credentials, number_bags: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col w-4/12">
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
                            <div className="flex gap-2 w-full">
                                <div className="flex flex-col w-3/6">
                                    <label className="ps-2">Status</label>
                                    <Select
                                        options={statusOpt}
                                        className='w-full'
                                        onChange={(e) => setCredentials({ ...credentials, status: e.value })}
                                        value={{ label: credentials.status, value: credentials.status }}
                                    />
                                </div>
                                <div className="flex flex-col w-3/6">
                                    <label className="ps-2">Remarks</label>
                                    <input
                                        type="text"
                                        placeholder="Remarks"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials?.remarks}
                                        onChange={(e) => setCredentials({ ...credentials, remarks: e.target.value })}
                                    />
                                </div>
                            </div>

                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={(e) => [setDistributeModal(false), setSelectedSubsidy([])]}
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
            <div className='w-full h-full fixed top-0 left-0 bg-emerald-900 z-40 opacity-30'>

            </div>
        </>

    )
}
