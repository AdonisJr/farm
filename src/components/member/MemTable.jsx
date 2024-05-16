import React, { useState } from 'react';
import CustomConfirmModal from '../CustomConfirmModal';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtherInfo from './OtherInfo';

export default function MemTable({ member, setSelected, setModal, selected, accessToken }) {

    const [showConfirm, setConfirm] = useState(false);
    const [deleteSelected, setDeleteSelected] = useState("");
    const [showOtherInfo, setInformation] = useState(false);
    const [memberSelected, setMemberSelected] = useState([]);

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
    const handleDelete = async () => {
        setConfirm(true)
    }
    const handleConfirm = async() => {
        // Perform delete operation or call the delete function
        await axios
        .delete(`/user?id=${deleteSelected}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
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
        setDeleteSelected("");
        setConfirm(false);
    };

    const handleCancel = () => {
        // User clicked "No" or closed the dialog
        setDeleteSelected("");
        setConfirm(false);
    };
    return (
        <>
            <ToastContainer />
            {
                showOtherInfo ? <OtherInfo accessToken={accessToken} setInformation={setInformation} isAdmin={true} user={memberSelected} setMemberSelected={setMemberSelected} /> : ""
            }
            {showConfirm ?
                <CustomConfirmModal
                    message={`Are you sure you want to delete this item?`}
                    selected={deleteSelected}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
                : ""
            }
            <table className='table-auto w-full text-xs'>
                <thead className='bg-blue-100'>
                    <tr>
                        <th className='p-2'>ID</th>
                        <th>First Name</th>
                        <th>M.I</th>
                        <th>Last Name</th>
                        <th>Suffix</th>
                        <th>Email</th>
                        <th>Barangay</th>
                        <th>Birth Date</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        !member ? <tr className='w-full text-center'>No Record.</tr> :
                            member.map((data) => (
                                <tr key={data.id} className={`border-b-2 border-slate-300 ${deleteSelected === data.id ? 'bg-red-100' : ''} ${selected.id === data.id ? 'bg-emerald-100' : ''}`}>
                                    <td className='p-2'>{data.id}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.middle_name}</td>
                                    <td>{data.last_name}</td>
                                    <td>{data.suffix}</td>
                                    <td>{data.email}</td>
                                    <td>{data.barangay}</td>
                                    <td>{data.birth_date}</td>
                                    <td>{data.gender}</td>
                                    <td>{data.phone_number}</td>
                                    <td>{data.role === 'member' ? 'farmer' : 'member'}</td>
                                    <td><p className={`${data.status === 'active' ? 'bg-emerald-300' :'bg-red-200'} py-1`}>{data.status}</p></td>
                                    <td className='flex flex-col gap-2 p-2'> 
                                        <div className='flex gap-1 items-center cursor-pointer hover:underline'
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
                                        <div className='flex items-center cursor-pointer gap-1 hover:underline'
                                            onClick={(e) => [handleDelete(), setDeleteSelected(data.id)]}>
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
        </>

    )
}
