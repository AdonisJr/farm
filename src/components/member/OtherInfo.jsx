import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";

export default function OtherInfo({ setInformation, isAdmin, user, setMemberSelected, accessToken }) {
    const [credentials, setCredentials] = useState({ ...user, user_id: user.id });
    const [isUpdate, setIsUpdate] = useState(false)
    console.log(user)
    const [accountDetails, setAccountDetails] = useState(user)
    const genderOpt = [
        { label: 'male', value: "male" },
        { label: 'female', value: 'female' }
    ]
    console.log(user)
    // TOAST
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

    // HANDLE FUNCTIONS

    const handlePhilhealth = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, philhealth: 1 })
        } else {
            setCredentials({ ...credentials, philhealth: 0 })
        }
    }
    const handleFourps = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, fourps: 1 })
        } else {
            setCredentials({ ...credentials, fourps: 0 })
        }
    }
    const handleSenior = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, senior_citizen: 1 })
        } else {
            setCredentials({ ...credentials, senior_citizen: 0 })
        }
    }
    const handlePensioner = (e) => {
        if (e.target.checked) {
            setCredentials({ ...credentials, pensioner: 1 })
        } else {
            setCredentials({ ...credentials, pensioner: 0 })
        }
    }
    return (
        <>
            <div className='z-30 absolute top-0 left-0 flex justify-center items-center w-screen h-4/6 p-5'>
                <ToastContainer />
                <div className='relative bg-white p-2 z-50 rounded-lg w-5/6 border-4 h-full overflow-y-scroll border-slate-200'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-x absolute top-3 right-3 cursor-pointer"
                        viewBox="0 0 16 16"
                        onClick={(e) => setInformation(false)}
                    >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                    </svg>
                    <div className='border-b-2 p-2 border-slate-600'>
                        <p className='text-lg font-semibold'>Account Information</p>
                    </div>
                    {/* sec1 */}
                    <div className='flex gap-2 py-2'>
                        <div className="flex w-3/12 flex-col">
                            <label className="ps-2">First Name</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.first_name}
                                onChange={(e) => setAccountDetails({ ...accountDetails, first_name: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-3/12 flex-col">
                            <label className="ps-2">Middle Name</label>
                            <input
                                type="text"
                                placeholder="Middle Name"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.middle_name}
                                onChange={(e) => setAccountDetails({ ...accountDetails, middle_name: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-4/12 flex-col">
                            <label className="ps-2">Last Name</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.last_name}
                                onChange={(e) => setAccountDetails({ ...accountDetails, last_name: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-2/12 flex-col">
                            <label className="ps-2">Suffix</label>
                            <input
                                type="text"
                                placeholder="Jr"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.suffix}
                                onChange={(e) => setAccountDetails({ ...accountDetails, suffix: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                    </div>
                    {/* sec2 */}
                    <div className='flex gap-2 py-2'>

                        <div className="flex w-4/12 flex-col">
                            <label className="ps-2">Email</label>
                            <input
                                type="email"
                                placeholder="sample@gmail.com"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.email}
                                onChange={(e) => setAccountDetails({ ...accountDetails, email: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-2/12 flex-col">
                            <label className="ps-2">Gender</label>
                            <Select
                                options={genderOpt}
                                onChange={(e) => setAccountDetails({ ...accountDetails, gender: e.value })}
                                value={{ label: accountDetails.gender, value: accountDetails.gender }}
                                isSearchable={true}
                                isDisabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-4/12 flex-col">
                            <label className="ps-2">Phone Number</label>
                            <input
                                type="text"
                                placeholder="090909090954"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.phone_number}
                                onChange={(e) => setAccountDetails({ ...accountDetails, phone_number: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                        <div className="flex w-2/12 flex-col">
                            <label className="ps-2">Role</label>
                            <input
                                type="text"
                                placeholder="090909090954"
                                className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                                value={accountDetails.role}
                                onChange={(e) => setAccountDetails({ ...accountDetails, role: e.target.value })}
                                disabled={isAdmin}
                            />
                        </div>
                    </div>
                    <div className="flex w-2/12 flex-col">
                        <label className="ps-2">Address</label>
                        <input
                            type="text"
                            placeholder="090909090954"
                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                            value={accountDetails.barangay}
                            disabled={isAdmin}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full h-screen absolute top-0 left-0 bg-indigo-900 z-10 opacity-40'>

            </div>
        </>
    )
}
