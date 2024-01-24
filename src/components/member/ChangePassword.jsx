import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword({ accessToken, setShowChangePass, user }) {
    const [credentials, setCredentials] = useState([])
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
        if (!credentials.password) return showErrorMessage("Error, Password is required.")
        if (credentials.password !== credentials.cpassword) return showErrorMessage("Error, Password does not match.")
        await axios
            .put(`/user/changepassword?id=${user.id}`, credentials, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                showSuccessMessage(res.data.message)
                setTimeout(() => { setShowChangePass(false)}, 2000)
            }).catch(error => {
                showErrorMessage(error.response.data.error + error.response.data.message)
            })
    }
    return (
        <>
            <div className='flex justify-center items-center absolute w-full h-full top-0 left-0 z-50 p-2'>
                <ToastContainer />
                <div className='flex flex-col gap-4 bg-white rounded-lg p-4 w-2/6'>
                    <p className='font-bold text-xl p-4 border-b-2 border-slate-200'>Change Password</p>
                    <div className="flex w-full flex-col">
                        <label className="p-2">Passwword</label>
                        <input
                            type="password"
                            placeholder="*****"
                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                    </div>
                    <div className="flex w-full flex-col">
                        <label className="p-2">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="*****"
                            className="shadow-md px-3 py-1 rounded-md border-2 border-slate-400"
                            value={credentials.cpassword}
                            onChange={(e) => setCredentials({ ...credentials, cpassword: e.target.value })}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <button className='w-full bg-slate-200 hover:bg-slate-300 text-red-600 font-bold rounded-lg duration-200 p-2'
                            onClick={(e) => setShowChangePass(false)}>CLOSE</button>
                        <button className='w-full bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg duration-200 p-2'
                            onClick={(e) => handleSubmit()}>SAVE</button>
                    </div>
                </div>
            </div>
            <div className='w-full h-full absolute top-0 left-0 bg-teal-900 z-10 opacity-40'>

            </div>
        </>
    )
}
