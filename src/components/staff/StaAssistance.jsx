import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from 'axios';
import CustomConfirmModal from '../CustomConfirmModal';

export default function StaAssistance({ user, accessToken }) {
    const [showConfirm, setConfirm] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [schoolarship, setSchoolarship] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleteSelected, setDeleteSelected] = useState("");
    const [isModalOpen, setModal] = useState(false)

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

    const handleConfirm = async () => {
        // Perform delete operation or call the delete function
        await axios
            .delete(`/assistance?id=${deleteSelected.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                showSuccessMessage(res.data.message)
                setRefresh(!refresh)
            }).catch(error => {
                showErrorMessage(error.response.data.error + error.response.data.message)
            })
        setConfirm(false);
    };

    const handleCancel = () => {
        // User clicked "No" or closed the dialog
        setConfirm(false);
        setDeleteSelected("");
    };

    // GET
    const getSpecificDate = (created_at) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        const date = new Date(created_at);
        const longDate = date.toLocaleDateString("en-US", options);
        return longDate;
    };

    const getBurials = async () => {
        await axios
            .get(`/assistance`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                setSchoolarship(res.data.data)
            }).catch(error => {
                console.log(error.response.data.error + error.response.data.message)
            })
    }

    useEffect(() => {
        getBurials();
    }, [refresh])
    // useEffect(()=>{console.log(schoolarship)},[schoolarship])
    return (
        <div className='flex flex-col gap-2'>
            {showConfirm ?
                <CustomConfirmModal
                    message={`Are you sure you wan't to delete?`}
                    selected={deleteSelected}
                    delete={true}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                /> : ''
            }
            {/* table */}
            <div className='flex flex-col gap-2 bg-white p-5 rounded-lg shadow-md'>
                <div>
                    <p className='font-bold'>Burial Requested List</p>
                </div>
                <div className='w-full overflow-x-scroll'>
                    <table className='min-w-full table table-auto'>
                        <thead>
                            <tr className='bg-blue-50'>
                                <td className='p-2'>ID</td>
                                <td>Type</td>
                                <td>Application Letter</td>
                                <td>Grades</td>
                                <td>Medical Abstractr</td>
                                <td>Death Certificate</td>
                                <td>Barangay Indigency</td>
                                <td>Valid ID</td>
                                <td>Date Requested</td>
                                <td>Status</td>
                                <td>Remarks</td>
                                <td>Action</td>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                !schoolarship ? "" :
                                    schoolarship.map(data => (
                                        <tr className='hover:bg-emerald-100'>
                                            <td className='p-2'>{data.id}</td>
                                            <td>{data.type}</td>
                                            <td>{data.application_letter}</td>
                                            <td>{data.grades}</td>
                                            <td>{data.medical_abstract}</td>
                                            <td>{data.death_certificate}</td>
                                            <td>{data.indigency}</td>
                                            <td>{data.valid_id}</td>
                                            <td>{getSpecificDate(data.created_at)}</td>
                                            <td>{data.status}</td>
                                            <td>{data.remarks}</td>
                                            <td className='flex flex-col gap-2'>
                                                <div className='flex items-center cursor-pointer hover:underline'
                                                    onClick={(e) => [setModal(true), setSelected(data), console.log(data)]}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-pencil-fill text-emerald-500 cursor-pointer"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                                    </svg>
                                                    Edit
                                                </div>
                                                <div className='flex items-center cursor-pointer hover:underline'
                                                    onClick={(e) => [setConfirm(true), setDeleteSelected(data.id)]}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-trash2-fill text-red-500 cursor-pointer"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                                                    </svg>
                                                    Delete
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
