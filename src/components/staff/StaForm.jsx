import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';

export default function StaForm({ setSelected, setModal, selected, accessToken }) {
    const [credentials, setCredentials] = useState(selected.id ? selected : { role: "staff" });


    const genderOpt = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!credentials.first_name) return showErrorMessage("Error, First name is required.")
        if (!credentials.last_name) return showErrorMessage("Error, Last name is required.")
        if (!credentials.email) return showErrorMessage("Error, Email is required.")
        if (!emailRegex.test(credentials.email)) return showErrorMessage("Invalid email address.")
        if (!credentials.gender) return showErrorMessage("Error, Gender is required.")
        if (!selected.id){
            if (credentials.password.length <6) return showErrorMessage("Error, Password must be at least 6 characters long.")
            if (credentials.password !== credentials.cpassword) return showErrorMessage("Error, Passwords do not match.")
        }
        if(selected.id && credentials.password){
            if (credentials.password.length <6) return showErrorMessage("Error, Password must be at least 6 characters long.")
            if (credentials.password !== credentials.cpassword) return showErrorMessage("Error, Passwords do not match.")
        }
        if (selected.id) {
          await axios
            .put(`/user?id=${credentials.id}`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }, credentials)
            .then((res) => {
              showSuccessMessage(res.data.message)
              setTimeout(() => { 
                setSelected({})
                setModal(false); 
                setSelected({});
              }, 2000)
    
            }).catch(error => {
                showErrorMessage(error.response.data.error + error.response.data.message)
            })
        } else {
          await axios
            .post(`/user`,{
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }, credentials)
            .then((res) => {
              showSuccessMessage(res.data.message)
              setTimeout(() => { setModal(false); setSelected({}) }, 2000)
            }).catch(error => {
              showErrorMessage(error.response.data.error + error.response.data.message)
            })
        }
    }
    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <ToastContainer />
                <form className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="flex flex-col border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-2xl font-semibold">{selected.id ? "UPDATE" : "ADD"} STAFF</h3>
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
                            <div className="flex gap-2">
                                <div className="flex flex-col">
                                    <label className="ps-2">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="Taylor"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.first_name}
                                        onChange={(e) => setCredentials({ ...credentials, first_name: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="ps-2">Middle Name</label>
                                    <input
                                        type="text"
                                        placeholder="S"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.middle_name}
                                        onChange={(e) => setCredentials({ ...credentials, middle_name: e.target.value })}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="ps-2">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Swift"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.last_name}
                                        onChange={(e) => setCredentials({ ...credentials, last_name: e.target.value })}
                                    />
                                </div>
                            </div>
                            {/* Second Row */}
                            <div className="flex gap-2">
                                <div className="flex w-4/6 flex-col">
                                    <label className="ps-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="taylor@gmail.com"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.email}
                                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    />
                                </div>
                                <div className="flex w-2/6 flex-col">
                                    <label className="ps-2">Gender</label>
                                    <Select 
                                    options={genderOpt} 
                                    onChange={(e) => setCredentials({ ...credentials, gender: e.value })} 
                                    defaultValue={{ label: credentials.gender, value: credentials.gender }} 
                                        isSearchable={false}
                                    />
                                </div>
                            </div>
                            {/* Third Row */}
                            <div className="flex gap-2">
                                <div className="flex w-full flex-col">
                                    <label className="ps-2">Password</label>
                                    <input
                                        type="password"
                                        placeholder="******"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    />
                                </div>
                                <div className="flex w-full flex-col">
                                    <label className="ps-2">Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="******"
                                        className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                        value={credentials.cpassword}
                                        onChange={(e) => setCredentials({ ...credentials, cpassword: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex w-full flex-col">
                                <label className="ps-2">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="+63"
                                    className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                    value={credentials.phone_number}
                                    onChange={(e) => setCredentials({ ...credentials, phone_number: e.target.value })}
                                />
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => [setModal(false), setSelected({})]}
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
            <div className='w-full h-full fixed top-0 left-0 bg-indigo-900 z-40 opacity-10'>

            </div>
        </>

    )
}
