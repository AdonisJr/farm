import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

export default function AdmValidationForm({ user, accessToken, setShowForm, getData, selected }) {
    const [credentials, setCredentials] = useState(selected);

    const [files, setFiles] = useState(null);

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

    const statusOpt = [
        { label: 'QUALIFIED', value: 'QUALIFIED' },
        { label: 'DISQUALIFIED', value: 'DISQUALIFIED' }
    ]

    const handleSubmit = async () => {
        if (!credentials.purok) return showErrorMessage('Purok is required');
        if (!credentials.birth_place) return showErrorMessage('Birth place is required');
        if (!credentials.phone_number) return showErrorMessage('Phone number is required');
        if (!credentials.nationality) return showErrorMessage('Nationality is required');
        if (!credentials.source_income) return showErrorMessage('Source of income is required');
        if (!credentials.profession) return showErrorMessage('Profession is required');
        if (!credentials.mother_name) return showErrorMessage("Mother's maiden name is required");
        if (!credentials.lot_size) return showErrorMessage("Farm Area is required");
        if (!credentials.status) return showErrorMessage("Status is required");

        await axios.put(`/validation?id=${credentials.id}`, credentials, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(res => {
            showSuccessMessage(res.data.message)
            console.log(res.data.data)
            setTimeout(() => {
                getData();
                setShowForm(false)
            }, 1000)
        }).catch(error => {
            showErrorMessage(error.response.data.message)
        })
    }
    useEffect(() => {
        setCredentials({ ...credentials, valid_id: "" })
    }, [])
    return (
        <>
            <div className='absolute flex justify-center items-center top-0 left-0 w-full h-full z-40'>
                <div className='relative bg-white flex flex-col gap-3 w-4/6 p-5 text-sm'>
                    <ToastContainer />
                    <p className='text-lg font-bold text-slate-500'>RFFA VALIDATION FORM</p>
                    {/* 1 */}
                    <div className='flex gap-2 w-full border-t-2 border-slate-200 pt-2'>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">First Name</label>
                            <input
                                type="text"
                                placeholder="Taylor"
                                className="shadow-md px-3 py-1 border-2 border-slate-400 bg-orange-50"
                                value={credentials.first_name}
                                onChange={(e) => setCredentials({ ...credentials, first_name: e.target.value })}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Middle Name</label>
                            <input
                                type="text"
                                placeholder="Taylor"
                                className="shadow-md px-3 py-1 border-2 border-slate-400 bg-orange-50"
                                value={credentials.middle_name}
                                onChange={(e) => setCredentials({ ...credentials, middle_name: e.target.value })}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Last Name</label>
                            <input
                                type="text"
                                placeholder="Taylor"
                                className="shadow-md px-3 py-1 border-2 border-slate-400 bg-orange-50"
                                value={credentials.last_name}
                                onChange={(e) => setCredentials({ ...credentials, last_name: e.target.value })}
                                disabled
                            />
                        </div>

                    </div>
                    {/* 2 */}
                    {/* 3 */}
                    <div className='flex gap-2'>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Purok*</label>
                            <input
                                type="text"
                                placeholder="Purok"
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.purok}
                                onChange={(e) => setCredentials({ ...credentials, purok: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Barangay</label>
                            <input
                                type="text"
                                placeholder="Barangay"
                                className="shadow-md px-3 py-1 border-2 border-slate-400 bg-orange-50"
                                value={credentials.barangay}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">City/Municipality</label>
                            <input
                                type="text"
                                placeholder="Taylor"
                                className="shadow-md px-3 py-1 border-2 border-slate-400 bg-orange-50"
                                value={"Trento"}
                                disabled
                            />
                        </div>
                    </div>{/* 4 */}
                    <div className='flex gap-2'>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Birth Date</label>
                            <input
                                type="date"
                                className="shadow-md px-3 py-1 border-2 border-slate-400 bg-orange-50"
                                value={credentials.birth_date}
                                disabled
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Place of Birth*</label>
                            <input
                                type="text"
                                placeholder="Birth Place"
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.birth_place}
                                onChange={(e) => setCredentials({ ...credentials, birth_place: e.target.value })}

                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Phone Number*</label>
                            <input
                                type="text"
                                placeholder="Phone Number"
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.phone_number}
                                onChange={(e) => setCredentials({ ...credentials, phone_number: e.target.value })}
                            />
                        </div>
                    </div>
                    {/* 5 */}
                    <div className='flex gap-2'>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Nationality*</label>
                            <input
                                type="text"
                                placeholder='Nationality'
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.nationality}
                                onChange={(e) => setCredentials({ ...credentials, nationality: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Source of Income*</label>
                            <input
                                type="text"
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.source_income}
                                onChange={(e) => setCredentials({ ...credentials, source_income: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Profession*</label>
                            <input
                                type="text"
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.profession}
                                onChange={(e) => setCredentials({ ...credentials, profession: e.target.value })}
                            />
                        </div>
                    </div>{/* 6 */}
                    <div className='flex items-center gap-2'>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Total Farm Area (ha)*</label>
                            <input
                                type="text"
                                placeholder='Lot size(ha)'
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.lot_size}
                                onChange={(e) => setCredentials({ ...credentials, lot_size: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Number Parcel*</label>
                            <input
                                type="text"
                                placeholder='1'
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.no_parcel}
                                onChange={(e) => setCredentials({ ...credentials, no_parcel: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col w-4/12">
                            <label className="ps-2">Mother's Maiden Name*</label>
                            <input
                                type="text"
                                className="shadow-md px-3 py-1 border-2 border-slate-400"
                                value={credentials.mother_name}
                                onChange={(e) => setCredentials({ ...credentials, mother_name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full border-b-2 border-slate-200 pb-2">
                        <label className="ps-2">Status*</label>
                        <Select options={statusOpt} defaultValue={{ label: credentials.status, value: credentials.status }}
                            onChange={(e) => setCredentials({ ...credentials, status: e.value })}
                            className='w-2/6'
                        />
                    </div>
                    <div className='flex justify-end gap-3'>
                        <button className='text-red-500 font-bold hover:text-red-600 duration-200' onClick={(e) => setShowForm(false)}>CLOSE</button>
                        <button className='bg-teal-500 px-5 py-2 text-white font-bold hover:bg-teal-600 duration-200'
                            onClick={handleSubmit}>SUBMIT REQUEST</button>
                    </div>
                </div>
            </div>
            <div className='absolute w-full h-full left-0 top-0 bg-teal-600 z-30 opacity-40'>

            </div>
        </>
    )
}
